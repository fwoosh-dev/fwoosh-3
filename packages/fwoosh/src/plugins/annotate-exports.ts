import micromatch from "micromatch";
import dedent from "dedent";
import { promises as fs } from "fs";
import { glob } from "glob";
import { FwooshConfig, FwooshTool, defaultConfig } from "@fwoosh/types";
import { UserConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

function getAllPages() {
  return glob(`${process.env.TARGET_DIRECTORY}/**/*.stories.tsx`);
}

// this needs to also be a custom loader for node
// this will only run for client side code
export async function annotateExportPlugin(): Promise<
  NonNullable<UserConfig["plugins"]>[0]
> {
  const {
    docgen,
    plugins = [],
    theme,
    logo,
  } = (await import(process.env.FWOOSH_CONFIG!).then((mod) => {
    // TODO: ....idk
    if ("default" in mod.default) {
      return mod.default.default;
    }
    return mod.default;
  })) as FwooshConfig;

  const activeStoryFiles = new Set<string>();

  return [
    // For compat replace defined __filename for ESM.
    {
      name: "inject-filename",
      transform(src, id) {
        if (src.includes("__filename")) {
          return `const __filename = "${id}";\n` + src;
        }
      },
    },
    // Connected a story to a source file with the component definitions is hard.
    // To get this info we annotate the exports of files included in the docgen
    // globs.
    {
      name: "annotate-exports",
      async transform(src, id) {
        // Only match some files cause doing all of them is too slow
        // Instead of this we could try to use something like es-module-lexer
        // to follow all the imports and exports to the source file.
        const isIncluded = ["!**/*.stories.*", ...docgen].every((glob) =>
          micromatch.isMatch(id, glob, {
            cwd: process.env.TARGET_DIRECTORY,
          })
        );

        if (isIncluded) {
          return (
            src +
            "\n" +
            dedent`
              import * as currentModule from "${id}";
              let fwoosh_visited = [];

              try {
                function fwoosh_traverseExports(obj) {
                  if (!obj || typeof obj === "function" || typeof obj !== "object") {
                    return;
                  }

                  Object.entries(obj).forEach(([name, ex]) => {
                    if (
                      typeof ex === "function" ||
                      (ex != undefined && typeof ex === "object" && "render" in ex)
                    ) {
                      ex.fwoosh_file = "${id}";
                      ex.displayName = name;
                    } else if (
                      typeof ex === "object" && ex !== null &&
                      Object.values(ex).length > 0 &&
                      !fwoosh_visited.includes(ex)
                    ) {
                      fwoosh_visited.push(ex);
                      fwoosh_traverseExports(ex);
                    }
                  });
                }

                fwoosh_traverseExports(currentModule);
              } catch (error) {
                console.error("COULD NOT ANNOTATE EXPORTS", "${id}");
                throw error;
              }
            `
          );
        }

        return src;
      },
    },
    // When you 'use client' in a file all exports from that fill are wrapped in
    // a function and cannot be used in the server. This plugin creates a virtual
    // module that removes that so that in can be evaluated in the server.
    // We do this mainly to be able to access the `meta` object.
    {
      name: "fwoosh-meta",
      resolveId: (name) => {
        // Vite only accepts virtual modules with the identifier at the
        // start (aka /fwoosh-meta) but to get the vite transforms/optimize deps
        // to work it needs to be a real path so we can resolve all of the deps
        // appropriately. That's why it changes to a query string.
        if (name.startsWith("/fwoosh-meta")) {
          return name.replace("/fwoosh-meta?file=", "") + "?meta=true";
        }
      },
      load: async (id) => {
        if (id.endsWith("?meta=true")) {
          const actualFile = id.replace("?meta=true", "");
          const contents = await fs
            .readFile(actualFile, "utf-8")
            // Remove the `use client` line so that the file can be evaluated in the server
            .then((c) => c.replace(/['"`]use client['"`]/, ""));

          return contents;
        }
      },
      handleHotUpdate({ server, file, modules }) {
        if (activeStoryFiles.has(file)) {
          const virtualModule = server.moduleGraph.getModuleById(
            `/fwoosh-meta?file=${file}`
          );

          if (virtualModule) {
            return [...modules, virtualModule];
          }
        }
      },
    },
    // This defined a virtual module that makes it to dynamically import
    // all of the pages, meta, and plugins.
    {
      name: "@fwoosh/pages",
      resolveId: (name) => {
        if (name === "@fwoosh/pages") {
          return name;
        }
      },
      load: async (id) => {
        if (id === "@fwoosh/pages") {
          const pages = await getAllPages();

          // During development keep it simple and just use the dynamic import.
          // This way we don't have to worry about HMR and reloading the virtual file
          if (process.env.NODE_ENV === "development") {
            return dedent`
              import path from "path";

              export const importPage = (filename) => import(/* @vite-ignore */ filename);

              export const importPlugin = (filename) => {
                const esmPath = path.join(filename.replace("commonjs", "esm"));
                return import(/* @vite-ignore */ esmPath).then((mod) => mod.default);
              };

              export const importMeta = (filename) => 
                import(/* @vite-ignore */ \`/fwoosh-meta?file=\${filename}\`)
            `;
          }

          const pluginPaths = plugins
            .map((plugin) => plugin.tools)
            .filter((tools): tools is FwooshTool[] => Boolean(tools))
            .flat()
            .map((item) => item.filepath);

          // During production we want all the things to be available
          // so we need to generate this imports. The resulting file
          // will contain references to all the files and they'll be
          // included in the bundle
          return dedent`
            export function importPage(filename) {
              switch (filename) {
                ${pages
                  .map((page) => {
                    return dedent`
                    case '${page}':
                      return import('${page}');
                  `;
                  })
                  .join("\n")}
                default:
                  throw new Error(\`Page "\${filename}" not found\`);
              }
            }

            export function importPlugin(filename) {
              switch (filename) {
                ${pluginPaths
                  .map((plugin) => {
                    return dedent`
                    case '${plugin}':
                      return import("${plugin}").then((mod) => mod.default);
                  `;
                  })
                  .join("\n")}
                default:
                  throw new Error(\`No plugin "\${filename}" not found\`);
              }
            }

            export function importMeta(filename) {
              switch (filename) {
                ${pages
                  .map((page) => {
                    return dedent`
                    case '${page}':
                      return import('/fwoosh-meta?file=${page}')
                  `;
                  })
                  .join("\n")}
                default:
                  throw new Error(\`Meta for page "\${filename}" not found\`);
              }
            }
          `;
        }
      },
    },
    // Stylex doesn't support dynamic imports so we need to modify the
    // tokens file to inject the user defined theme.
    {
      name: "fwoosh-theme",
      transform(src, id) {
        if (theme && id.endsWith("theme/tokens.stylex.js")) {
          return src
            .replaceAll(defaultConfig.theme.chrome, theme.chrome)
            .replaceAll(defaultConfig.theme.primary, theme.primary);
        }
      },
    },
    // Vite/Waku only supports static assets in the public/
    // We could probably figure out a way to fake them into using
    // as user defined public/
    ...(logo
      ? [
          viteStaticCopy({
            targets: [{ src: logo, dest: "public" }],
          }),
        ]
      : []),
  ];
}

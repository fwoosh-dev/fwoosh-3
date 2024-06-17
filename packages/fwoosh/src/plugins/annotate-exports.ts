import micromatch from "micromatch";
import dedent from "dedent";
import { promises as fs } from "fs";
import path from "path";
import { getProdMetaCache } from "../utils/cache.js";
import { glob } from "glob";
import { getConfig } from "../utils/config.js";
import { FwooshTool } from "@fwoosh/types";

function getAllPages() {
  return glob(`${process.env.TARGET_DIRECTORY}/**/*.stories.tsx`);
}

// this needs to also be a custom loader for node
// this will only run for client side code
export function annotateExportPlugin() {
  const {
    config: { docgen, plugins = [] },
  } = getConfig();

  const activeStoryFiles = new Set<string>();

  return [
    // Connected a story to a source file with the component definitions is hard.
    // To get this info we annotate the exports of files included in the docgen
    // globs.
    {
      name: "annotate-exports",
      async transform(src: string, id: string) {
        // Only match some files cause doing all of them is too slow
        // Instead of this we could try to use something like es-module-lexer
        // to follow all the imports and exports to the source file.
        const isIncluded = ["!**/*.stories.*", ...docgen].every((glob) =>
          micromatch.isMatch(id, glob)
        );

        if (isIncluded) {
          return (
            src +
            "\n" +
            dedent`
              import * as currentModule from "${id}";
              let fwoosh_visited = [];

              function fwoosh_traverseExports(obj) {
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
      resolveId: (name: string) => {
        // Match any import that starts with /fwoosh-meta
        if (name.startsWith("/fwoosh-meta")) {
          return name;
        }
      },
      load: async (id: string) => {
        if (id.startsWith("/fwoosh-meta")) {
          const actualFile = id.replace("/fwoosh-meta?file=", "");
          const contents = await fs
            .readFile(actualFile, "utf-8")
            // Remove the `use client` line so that the file can be evaluated in the server
            .then((c) => c.replace(/['"`]use client['"`]/, ""));

          return contents;
        }
      },
      transform(code: string, id: string) {
        if (id.startsWith("/fwoosh-meta")) {
          const actualFile = id.replace("/fwoosh-meta?file=", "");
          const dir = path.dirname(actualFile);
          activeStoryFiles.add(actualFile);

          // Update the relative paths in the file to be absolute
          // I couldn't find another way of making it seem like this file is
          // resolved from the same place as the original file.
          const modifiedCode = code.replace(
            /from\s+['"](.+)['"]/g,
            (_, importPath) => {
              if (importPath.startsWith(".")) {
                const resolvedImportPath = path.join(dir, importPath);
                return `from '${resolvedImportPath}'`;
              }

              return `from '${importPath}'`;
            }
          );

          return {
            code: modifiedCode,
            map: null,
          };
        }
      },
      handleHotUpdate({
        server,
        file,
        modules,
      }: {
        server: { moduleGraph: { getModuleById: (id: string) => any } };
        file: string;
        modules: string[];
      }) {
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
    {
      name: "@fwoosh/pages",
      resolveId: (name: string) => {
        if (name === "@fwoosh/pages") {
          return name;
        }
      },
      load: async (id: string) => {
        if (id === "@fwoosh/pages") {
          const pages = await getAllPages();

          if (process.env.NODE_ENV === "development") {
            return dedent`
              import path from "path";

              // During development keep it simple and just use the dynamic import.
              // This way we don't have to worry about HMR and reloading the virtual file
              export const importPage = (filename) => import(/* @vite-ignore */ filename);

              export const importPlugin = (filename) => {
                const esmPath = path.join(filename.replace("commonjs", "esm"));
                return import(/* @vite-ignore */ esmPath).then((mod) => mod.default);
              };

              export const importMeta = (filename) => 
                import(/* @vite-ignore */ \`/fwoosh-meta?file=\${filename}\`)
                  .then((mod) => mod.meta)
            `;
          }

          const pluginPaths = plugins
            .map((plugin) => plugin.tools)
            .filter((tools): tools is FwooshTool[] => Boolean(tools))
            .flat()
            .filter((item) => item.type === "toolbar")
            .map((item) => item.filepath);

          return dedent`
            // During production we want all the pages to be available
            // so we need to generate this imports. The resulting file
            // will contain references to all the pages and they'll be
            // included in the bundle
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
                      return import('/fwoosh-meta?file=${page}').then((mod) => mod.meta);
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
  ];
}

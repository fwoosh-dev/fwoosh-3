import micromatch from "micromatch";
import dedent from "dedent";
import { promises as fs } from "fs";
import path from "path";

// this needs to also be a custom loader for node
// this will only run for client side code
export function annotateExportPlugin({ include }: { include: string[] }) {
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
        const isIncluded = ["!**/*.stories.*", ...include].every((glob) =>
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
  ];
}

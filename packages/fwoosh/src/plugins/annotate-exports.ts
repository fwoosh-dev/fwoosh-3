import micromatch from "micromatch";
import dedent from "dedent";

// this needs to also be a custom loader for node
// this will only run for client side code
export function annotateExportPlugin({ include }: { include: string[] }) {
  return [
    {
      name: "annotate-exports",

      async transform(src: string, id: string) {
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
  ];
}

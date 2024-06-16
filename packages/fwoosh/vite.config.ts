// import styleX from "vite-plugin-stylex";

import { promises as fs } from "fs";
import { UserConfig } from "vite";
import { annotateExportPlugin } from "./src/plugins/annotate-exports";
import { getConfig } from "./src/utils/config";
import path from "path";

const fwooshConfig = getConfig();
const config: UserConfig = {
  plugins: [
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
      transform(code, id) {
        if (id.startsWith("/fwoosh-meta")) {
          const actualFile = id.replace("/fwoosh-meta?file=", "");
          const dir = path.dirname(actualFile);

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
    },
    annotateExportPlugin({ include: fwooshConfig.config.docgen }),
  ],
};

export default config;

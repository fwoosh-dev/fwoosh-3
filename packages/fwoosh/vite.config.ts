import styleX from "vite-plugin-stylex-dev";

import { defineConfig } from "vite";
import { annotateExportPlugin } from "./src/plugins/annotate-exports";

const config = defineConfig({
  plugins: [
    annotateExportPlugin(),
    styleX({
      libraries: ["@fwoosh/ui/components", "@fwoosh/ui/app"],
    }),
  ],
});

export default config;

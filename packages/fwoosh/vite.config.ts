import styleX from "vite-plugin-stylex-dev";

import { UserConfig } from "vite";
import { annotateExportPlugin } from "./src/plugins/annotate-exports";

const config: UserConfig = {
  plugins: [
    // @ts-ignore
    annotateExportPlugin(),
    styleX({
      libraries: ["@fwoosh/ui/components", "@fwoosh/ui/colors"],
    }),
  ],
};

export default config;

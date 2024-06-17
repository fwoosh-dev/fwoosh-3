// import styleX from "vite-plugin-stylex";

import { UserConfig } from "vite";
import { annotateExportPlugin } from "./src/plugins/annotate-exports";

const config: UserConfig = {
  plugins: [annotateExportPlugin()],
};

export default config;

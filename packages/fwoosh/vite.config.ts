// import styleX from "vite-plugin-stylex";

import { UserConfig } from "vite";
import { annotateExportPlugin } from "./src/plugins/annotate-exports";
import { getConfig } from "./src/utils/config";

const fwooshConfig = getConfig();
const config: UserConfig = {
  plugins: [annotateExportPlugin({ include: fwooshConfig.config.docgen })],
};

export default config;

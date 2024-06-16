import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function reactDocgen(): FwooshPluginConfig {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Props",
        id: "react-docgen",
        filepath: resolveFile("ReactDocgenPanel.js"),
      },
    ],
  };
}

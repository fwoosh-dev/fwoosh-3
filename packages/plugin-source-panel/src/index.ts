import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function sourcePanel(): FwooshPluginConfig {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Source",
        id: "source",
        filepath: resolveFile("./SourcePanel.js"),
      },
    ],
  };
}

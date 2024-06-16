import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function zoomPlugin(): FwooshPluginConfig {
  return {
    tools: [
      {
        id: "zoom",
        type: "toolbar",
        scope: "story",
        filepath: resolveFile("ZoomToolbarControl.js"),
      },
    ],
  };
}

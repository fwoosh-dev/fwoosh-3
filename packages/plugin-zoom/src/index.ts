import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function zoomPlugin() {
  return {
    tools: [
      {
        id: "zoom" as const,
        type: "toolbar",
        scope: "story",
        filepath: resolveFile("ZoomToolbarControl.js"),
      },
    ],
  } satisfies FwooshPluginConfig;
}

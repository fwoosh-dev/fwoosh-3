import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function controlPanel() {
  return {
    tools: [
      {
        type: "panel",
        id: "control-panel",
        panelTitle: "Controls",
        filepath: resolveFile("ControlPanel.js"),
      },
    ],
  } satisfies FwooshPluginConfig;
}

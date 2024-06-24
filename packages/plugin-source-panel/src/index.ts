import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function sourcePanel() {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Source",
        id: "source" as const,
        filepath: resolveFile("./SourcePanel.js"),
      },
    ],
  } satisfies FwooshPluginConfig;
}

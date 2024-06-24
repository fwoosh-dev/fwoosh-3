import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function descriptionPlugin() {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Description",
        id: "description" as const,
        filepath: resolveFile("DescriptionPanel.js"),
      },
    ],
  } satisfies FwooshPluginConfig;
}

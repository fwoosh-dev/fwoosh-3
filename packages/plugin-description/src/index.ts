import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function descriptionPlugin(): FwooshPluginConfig {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Description",
        id: "description",
        filepath: resolveFile("DescriptionPanel.js"),
      },
    ],
  };
}

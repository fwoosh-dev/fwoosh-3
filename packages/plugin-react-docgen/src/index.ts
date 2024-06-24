import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";

export function reactDocgen() {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Props",
        id: "reactDocgen" as const,
        filepath: resolveFile("ReactDocgenPanel.js"),
      },
    ],
  } satisfies FwooshPluginConfig;
}

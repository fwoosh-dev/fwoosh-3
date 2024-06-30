import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";
import { A11yOptions } from "./types.js";

export { A11yOptions } from "./types.js";
export function a11y(options: A11yOptions = {}) {
  return {
    tools: [
      {
        type: "panel",
        panelTitle: "Accessibility",
        id: "a11y",
        filepath: resolveFile("A11y.js"),
        options,
      },
      {
        type: "decorator",
        id: "a11y-decorator",
        filepath: resolveFile("A11yDecorator.js"),
        options,
      },
      {
        type: "toolbar",
        id: "vision-tool",
        scope: "story",
        filepath: resolveFile("VisionTool.js"),
        options,
      },
    ],
  } satisfies FwooshPluginConfig;
}

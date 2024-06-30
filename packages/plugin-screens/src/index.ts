import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";
import { ScreensOptions } from "./types.js";

export { ScreensOptions } from "./types.js";
export function screens(options?: ScreensOptions) {
  return {
    tools: [
      {
        type: "toolbar",
        id: "screens",
        scope: "story",
        filepath: resolveFile("ScreensTool.js"),
        options,
      },
      {
        type: "frame-wrapper",
        id: "screens-frame-wrapper",
        filepath: resolveFile("ScreensFrameWrapper.js"),
        options,
      },
    ],
  } satisfies FwooshPluginConfig;
}

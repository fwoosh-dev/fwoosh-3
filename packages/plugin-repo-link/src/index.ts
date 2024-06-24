import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";
import { RepoLinkOptions } from "./types.js";

export { RepoLinkOptions } from "./types.js";
export function repoLink(options: RepoLinkOptions) {
  return {
    tools: [
      {
        id: "repoLink" as const,
        type: "toolbar",
        scope: "global",
        filepath: resolveFile("RepoLinkToolbarControl.js"),
        options,
      },
    ],
  } satisfies FwooshPluginConfig;
}

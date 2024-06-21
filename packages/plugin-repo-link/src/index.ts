import { FwooshPluginConfig } from "@fwoosh/types";
import { resolveFile } from "@fwoosh/types/resolve-file";
import { RepoLinkOptions } from "./types.js";

export function repoLink(options: RepoLinkOptions): FwooshPluginConfig {
  return {
    tools: [
      {
        id: "repo-link",
        type: "toolbar",
        scope: "global",
        filepath: resolveFile("RepoLinkToolbarControl.js"),
        options,
      },
    ],
  };
}

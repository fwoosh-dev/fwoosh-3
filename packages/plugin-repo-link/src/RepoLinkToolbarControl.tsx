import { FwooshPluginProps } from "@fwoosh/types";
import { IconLink } from "@fwoosh/ui/components/IconButton";
import { Tooltip, TooltipTrigger } from "@fwoosh/ui/components/Tooltip";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { RepoLinkOptions } from "./types.js";

export default function RepoLinkToolbarControl({
  options,
}: FwooshPluginProps<RepoLinkOptions>) {
  if (!options?.repo) {
    return null;
  }

  let repoUrl = options.repo;

  if (!repoUrl.startsWith("https://github.com/")) {
    repoUrl = `https://github.com/${repoUrl}`;
  }

  return (
    <TooltipTrigger>
      <IconLink variant="toolbar" href={repoUrl}>
        <GitHubLogoIcon />
      </IconLink>
      <Tooltip>Open on GitHub</Tooltip>
    </TooltipTrigger>
  );
}

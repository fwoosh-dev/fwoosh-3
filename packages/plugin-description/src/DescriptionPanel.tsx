import { StoryContext } from "@fwoosh/types";
import { TabPanelContent } from "@fwoosh/ui/components";

export default function DescriptionPanel({ story }: StoryContext) {
  if (!story.description) {
    return <TabPanelContent>No description for story...</TabPanelContent>;
  }

  return <TabPanelContent>{story.description}</TabPanelContent>;
}

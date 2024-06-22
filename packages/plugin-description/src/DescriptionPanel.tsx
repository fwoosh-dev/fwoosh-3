import { StoryContext } from "@fwoosh/types";
import { TabPanelContent, Markdown } from "@fwoosh/ui/components";

export default function DescriptionPanel({ story }: StoryContext) {
  if (!story.description) {
    return <TabPanelContent>No description for story...</TabPanelContent>;
  }

  return (
    <TabPanelContent>
      <Markdown>{story.description}</Markdown>
    </TabPanelContent>
  );
}

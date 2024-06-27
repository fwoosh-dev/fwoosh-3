import { StoryContext } from "@fwoosh/types";
import { TabPanelContent } from "@fwoosh/ui/components/Tabs";
import { Markdown } from "@fwoosh/ui/components/Markdown";

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

import { StoryContext } from "@fwoosh/types";

export default function DescriptionPanel({ story }: StoryContext) {
  if (!story.description) {
    return <div>No description for story...</div>;
  }

  return <div>{story.description}</div>;
}

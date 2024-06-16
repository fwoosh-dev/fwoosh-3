"use client";

import { useStoryContext } from "@fwoosh/ui";

export default function DescriptionPanel() {
  const currentStory = useStoryContext("DescriptionPanel");

  if (!currentStory.story.description) {
    return <div>No description for story...</div>;
  }

  return <div>{currentStory.story.description}</div>;
}

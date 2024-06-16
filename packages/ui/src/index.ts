"use client";

import { Page, Story } from "@fwoosh/types";
import { createContext } from "@radix-ui/react-context";

export const [StoryContextProvider, useStoryContext] = createContext<{
  page: Page;
  story: Story;
}>("StoryContext");

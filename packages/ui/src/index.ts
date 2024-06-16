"use client";

import { StoryContext } from "@fwoosh/types";
import { createContext } from "@radix-ui/react-context";

export const [StoryContextProvider, useStoryContext] =
  createContext<StoryContext>("StoryContext");

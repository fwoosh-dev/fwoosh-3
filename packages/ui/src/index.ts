"use client";

import { StoryContext } from "@fwoosh/types";
import { createContext } from "@radix-ui/react-context";

const [_StoryContextProvider, _useStoryContext] =
  createContext<StoryContext>("StoryContext");

export const StoryContextProvider = _StoryContextProvider;
export const useStoryContext = _useStoryContext;

"use client";

import { PageMeta, StoryMeta } from "fwoosh";
import { useControl } from "@fwoosh/plugin-control-panel/react";

import { Button } from "./Button.js";

export const meta: PageMeta = {
  title: "Components/Button",
  component: Button,
  description: "A button is something that can be clicked",
};

/**
 * Use a button to trigger an action
 *
 * - A list
 * - of things
 *
 * ```tsx
 * <Button>Even code</Button>
 * ```
 *
 * | Column 1 | Column 2 | Column 3 |
 * | -------- | -------- | -------- |
 * | Row 1    | Row 2    | Row 3    |
 */
export const Primary = () => {
  const [label] = useControl({
    type: "text",
    label: "Label",
    value: "Click me",
  });
  const [size] = useControl({
    type: "select",
    label: "Size",
    options: ["small", "medium", "large"],
    value: "medium",
  });

  return <Button size={size}>{label}</Button>;
};

/** A button can be disabled */
export function Disabled() {
  return <Button disabled>Disabled</Button>;
}

Disabled.story = {
  displayName: "Disabled",
  options: {
    centered: {
      enabled: false,
    },
  },
} satisfies StoryMeta;

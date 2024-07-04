"use client";

import { PageMeta } from "fwoosh";

import { Spinner } from "@fwoosh/ui/components/Spinner";
import { useControl } from "@fwoosh/plugin-control-panel/react";

export const meta: PageMeta = {
  title: "Components/Spinner",
  component: [Spinner],
  description: "A spinner.",
};

/** A spinner is used to indicate that something is loading. */
export const Basic = () => {
  return <Spinner delay={0} />;
};

/** You can delay the spinner from being shown for a certain amount of time. */
export const WithDelay = () => {
  const [delay] = useControl({
    type: "number",
    label: "Delay",
    min: 0,
    max: 60_000,
    value: 2_000,
  });

  return <Spinner delay={delay} />;
};

"use client";

import { PageMeta } from "fwoosh";

import { Label } from "@fwoosh/ui/components/Label";
import { useControl } from "@fwoosh/plugin-control-panel/react";

export const meta: PageMeta = {
  title: "Components/Label",
  component: [Label],
  description: "A label for labeling form elements.",
};

export const Basic = () => {
  const [label] = useControl({
    type: "text",
    label: "Label",
    value: "Username",
  });
  return <Label>{label}</Label>;
};

"use client";

import { PageMeta } from "fwoosh";

import { Label } from "@fwoosh/ui/components/Label";

export const meta: PageMeta = {
  title: "Components/Label",
  component: [Label],
  description: "A label for labeling form elements.",
};

export const Basic = () => {
  return <Label>Username</Label>;
};

"use client";

import { PageMeta } from "fwoosh";

import { Input, TextArea, TextField } from "@fwoosh/ui/components/TextField";
import { Label } from "@fwoosh/ui/components/Label";
import { useControl } from "@fwoosh/plugin-control-panel/react";

export const meta: PageMeta = {
  title: "Components/TextField",
  component: [TextField],
  description: "An input field for text.",
};

export const Basic = () => {
  return (
    <TextField>
      <Label>Username</Label>
      <Input />
    </TextField>
  );
};

export const Area = () => {
  const [rows] = useControl({
    type: "number",
    label: "Rows",
    min: 1,
    value: 3,
  });

  return (
    <TextField orientation="vertical">
      <Label>Input</Label>
      <TextArea rows={rows} />
    </TextField>
  );
};

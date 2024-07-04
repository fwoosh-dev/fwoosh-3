"use client";

import { PageMeta } from "fwoosh";

import { NumberField } from "@fwoosh/ui/components/NumberField";
import { useControl } from "@fwoosh/plugin-control-panel/react";

export const meta: PageMeta = {
  title: "Components/NumberField",
  component: [NumberField],
  description: "An input field for numbers.",
};

export const Basic = () => {
  const [label] = useControl({
    type: "text",
    label: "Label",
    value: "Count",
  });
  const [min] = useControl({
    type: "number",
    label: "Min",
    min: 0,
    max: 10,
    value: 0,
  });
  const [max] = useControl({
    type: "number",
    label: "Max",
    min: 0,
    max: 10,
    value: 10,
  });

  return (
    <NumberField label={label} minValue={min} maxValue={max} defaultValue={0} />
  );
};

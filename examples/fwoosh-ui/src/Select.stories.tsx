"use client";

import { PageMeta } from "fwoosh";

import { Select, SelectOption } from "@fwoosh/ui/components/Select";

export const meta: PageMeta = {
  title: "Components/Select",
  component: [Select],
  description:
    "A select displays a collapsible list of options and allows a user to select one of them.",
};

const options = ["Volvo", "Saab", "Mercedes", "Audi", "BMW"];

export const Basic = () => {
  return (
    <Select label="Car Type" items={options.map((o) => ({ label: o, id: o }))}>
      {(item) => <SelectOption>{item.label}</SelectOption>}
    </Select>
  );
};

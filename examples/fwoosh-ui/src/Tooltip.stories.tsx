"use client";

import { PageMeta } from "fwoosh";
import { CookieIcon } from "@radix-ui/react-icons";

import { IconButton } from "@fwoosh/ui/components/IconButton";
import { Tooltip, TooltipTrigger } from "@fwoosh/ui/components/Tooltip";
import { useControl } from "@fwoosh/plugin-control-panel/react";

export const meta: PageMeta = {
  title: "Components/Tooltip",
  component: [Tooltip],
  description:
    "A tooltip displays a description of an element on hover or focus.",
};

export const Basic = () => {
  const [label] = useControl({
    type: "text",
    label: "Label",
    value: "A message",
  });
  return (
    <TooltipTrigger>
      <IconButton>
        <CookieIcon />
      </IconButton>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
};

export const Customized = () => {
  const [label] = useControl({
    type: "text",
    label: "Label",
    value: "A message",
  });
  const [placement] = useControl({
    type: "select",
    label: "Placement",
    options: ["top", "bottom", "left", "right"],
    value: "top",
  });
  const [offset] = useControl({
    type: "number",
    label: "Offset",
    value: 0,
  });
  const [crossOffset] = useControl({
    type: "number",
    label: "Cross Offset",
    value: 0,
  });

  return (
    <TooltipTrigger isOpen={true}>
      <IconButton>
        <CookieIcon />
      </IconButton>
      <Tooltip placement={placement} offset={offset} crossOffset={crossOffset}>
        {label}
      </Tooltip>
    </TooltipTrigger>
  );
};

"use client";

import { Select, ListBox } from "react-aria-components";
import { Popover } from "@fwoosh/ui/components/Popover";
import { SelectOption } from "@fwoosh/ui/components/Select";
import { TooltipTrigger, Tooltip } from "@fwoosh/ui/components/Tooltip";
import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { storyPreviewId } from "@fwoosh/types";
import { borderRadius, space } from "@fwoosh/ui/theme/tokens.stylex";
import { IconButton } from "@fwoosh/ui/components/IconButton";

const styles = stylex.create({
  hidden: {
    display: "none",
  },
  colorPreview: {
    background:
      "linear-gradient(to right, #F44336, #FF9800, #FFEB3B, #8BC34A, #2196F3, #9C27B0)",
    borderRadius: borderRadius.round,
    height: space[5],
    width: space[5],
  },
});

const Filters = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} {...stylex.props(styles.hidden)}>
    <defs>
      <filter id="protanopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="protanomaly">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.817, 0.183, 0, 0, 0 0.333, 0.667, 0, 0, 0 0, 0.125, 0.875, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="deuteranopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="deuteranomaly">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.8, 0.2, 0, 0, 0 0.258, 0.742, 0, 0, 0 0, 0.142, 0.858, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="tritanopia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.95, 0.05,  0, 0, 0 0,  0.433, 0.567, 0, 0 0,  0.475, 0.525, 0, 0 0,  0, 0, 1, 0"
        />
      </filter>
      <filter id="tritanomaly">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.967, 0.033, 0, 0, 0 0, 0.733, 0.267, 0, 0 0, 0.183, 0.817, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
      <filter id="achromatopsia">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0, 0, 0, 1, 0"
        />
      </filter>
    </defs>
  </svg>
);

const types = [
  { name: "none" },
  { name: "blurred vision", percentage: 22.9 },
  { name: "deuteranomaly", percentage: 2.7 },
  { name: "deuteranopia", percentage: 0.56 },
  { name: "protanomaly", percentage: 0.66 },
  { name: "protanopia", percentage: 0.59 },
  { name: "tritanomaly", percentage: 0.01 },
  { name: "tritanopia", percentage: 0.016 },
  { name: "achromatopsia", percentage: 0.0001 },
  { name: "grayscale" },
] as const;

type FilterName = (typeof types)[number]["name"];

const getFilter = (filterName: string) => {
  if (!filterName) {
    return "none";
  }
  if (filterName === "blurred vision") {
    return "blur(2px)";
  }
  if (filterName === "grayscale") {
    return "grayscale(100%)";
  }
  return `url('#${filterName}')`;
};

function ColorPreview({ filter }: { filter: FilterName }) {
  return (
    <div
      {...stylex.props(styles.colorPreview)}
      style={{ filter: getFilter(filter) }}
    />
  );
}

export default function VisionTool() {
  const [filter, setFilter] = useState<FilterName>("none");

  useEffect(() => {
    const iframe = document.getElementById(storyPreviewId);

    if (!iframe) {
      return;
    }

    iframe.style.filter = getFilter(filter);
  }, [filter]);

  return (
    <>
      <Select onSelectionChange={(key) => setFilter(key as FilterName)}>
        <TooltipTrigger>
          <IconButton variant="toolbar" aria-label={`Vision filter: ${filter}`}>
            <ColorPreview filter={filter} />
          </IconButton>
          <Tooltip>Vision filter: {filter}</Tooltip>
        </TooltipTrigger>
        <Popover>
          <ListBox items={types}>
            {(item) => (
              <SelectOption id={item.name} key={item.name}>
                {item.name}
              </SelectOption>
            )}
          </ListBox>
        </Popover>
      </Select>
      <Filters />
    </>
  );
}

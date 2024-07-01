"use client";

import { PageMeta } from "fwoosh";
import {
  ArchiveIcon,
  BarChartIcon,
  CalendarIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import {
  IconButton,
  IconLink,
  IconWrapper,
} from "@fwoosh/ui/components/IconButton";

export const meta: PageMeta = {
  title: "Components/IconButton",
  component: [IconButton, IconLink, IconWrapper],
  description: "A button that is represented by an icon.",
};

/**
 * A basic IconButton does something when pressed.
 */
export const Basic = () => {
  return (
    <IconButton>
      <ArchiveIcon />
    </IconButton>
  );
};

/**
 * The `toolbar` variant should be used when the IconButton is used in a toolbar.
 */
export const Toolbar = () => {
  return (
    <IconButton variant="toolbar">
      <BarChartIcon />
    </IconButton>
  );
};

/**
 * You can also use an `IconLink` to link to an external page.
 */
export const Link = () => {
  return (
    <IconLink href="https://google.com" target="_blank">
      <CalendarIcon />
    </IconLink>
  );
};

/**
 * If you want to display and icon you should use an `IconWrapper` to get the correct spacing.
 */
export const Wrapper = () => {
  return (
    <IconWrapper>
      <GitHubLogoIcon />
    </IconWrapper>
  );
};

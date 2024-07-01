"use client";

import { PageMeta } from "fwoosh";
import {
  ArchiveIcon,
  BarChartIcon,
  CalendarIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import * as stylex from "@stylexjs/stylex";

import { useControl } from "@fwoosh/plugin-control-panel/react";
import { appChrome, borderRadius } from "@fwoosh/ui/theme/tokens.stylex";
import { HStack } from "@fwoosh/ui/components/HStack";
import { IconButton } from "@fwoosh/ui/components/IconButton";

const styles = stylex.create({
  wrapper: {
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    height: 80,
    width: 300,
  },
});

export const meta: PageMeta = {
  title: "Components/HStack",
  component: HStack,
  description: "Create a horizontal stack of components.",
};

/**
 * A basic IconButton does something when pressed.
 */
export const Basic = () => {
  const [justify] = useControl({
    type: "select",
    label: "Justify",
    options: ["start", "center", "end", "between", "around"],
    value: "center",
  });
  const [align] = useControl({
    type: "select",
    label: "Align",
    options: ["start", "center", "end"],
    value: "center",
  });
  const [gap] = useControl({
    type: "select",
    label: "Gap",
    options: [0, 1, 2, 3, 4, 5],
    value: 0,
  });

  return (
    <HStack align={align} justify={justify} gap={gap} style={styles.wrapper}>
      <IconButton>
        <ArchiveIcon />
      </IconButton>
      <IconButton>
        <BarChartIcon />
      </IconButton>
      <IconButton>
        <CalendarIcon />
      </IconButton>
      <IconButton>
        <GitHubLogoIcon />
      </IconButton>
    </HStack>
  );
};

"use client";

import {
  TooltipProps,
  Tooltip as TooltipPrimitive,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { appChrome } from "../theme/colors.stylex.js";
import { borderRadius, space, text } from "../theme/tokens.stylex.js";

const styles = stylex.create({
  tooltip: {
    backgroundColor: appChrome.text,
    color: appChrome.appBg,
    fontSize: text.xs,
    padding: `${space[4]} ${space[5]}`,
    borderRadius: borderRadius.sm,
  },
});

interface MyTooltipProps
  extends Omit<Omit<TooltipProps, "children">, "style" | "className"> {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}

export function Tooltip({
  children,
  style,
  offset = 4,
  ...props
}: MyTooltipProps) {
  return (
    <TooltipPrimitive
      offset={offset}
      {...props}
      {...stylex.props(styles.tooltip, style)}
    >
      {children}
    </TooltipPrimitive>
  );
}

export { TooltipTrigger } from "react-aria-components";

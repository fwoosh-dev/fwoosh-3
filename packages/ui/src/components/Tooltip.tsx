"use client";

import {
  TooltipProps,
  Tooltip as TooltipPrimitive,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { appChrome } from "../theme/tokens.stylex.js";
import { borderRadius, space, text } from "../theme/tokens.stylex.js";
import { mergeProps } from "react-aria";

const styles = stylex.create({
  tooltip: {
    backgroundColor: appChrome.text,
    borderRadius: borderRadius.sm,
    color: appChrome.appBg,
    fontSize: text.xs,
    padding: `${space[4]} ${space[5]}`,
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
      {...mergeProps(props, stylex.props(styles.tooltip, style), {
        className: "inter",
      })}
    >
      {children}
    </TooltipPrimitive>
  );
}

export { TooltipTrigger } from "react-aria-components";

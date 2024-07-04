"use client";

import {
  Popover as PopoverPrimitive,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { mergeProps } from "react-aria";

import { appChrome, borderRadius } from "../theme/tokens.stylex.js";
import { forwardRef } from "react";

const styles = stylex.create({
  popover: {
    backgroundColor: appChrome.appBg,
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export interface PopoverProps
  extends Omit<PopoverPrimitiveProps, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ style, ...props }, ref) => (
    <PopoverPrimitive
      {...mergeProps(props, stylex.props(styles.popover, style), {
        ref,
        className: "inter",
      })}
    />
  )
);

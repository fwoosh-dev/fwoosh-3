"use client";

import {
  Popover as PopoverPrimitive,
  PopoverProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { mergeProps } from "react-aria";

import { appChrome, borderRadius } from "../theme/tokens.stylex.js";

const styles = stylex.create({
  popover: {
    backgroundColor: appChrome.appBg,
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export function Popover(props: PopoverProps) {
  return (
    <PopoverPrimitive {...mergeProps(props, stylex.props(styles.popover))} />
  );
}

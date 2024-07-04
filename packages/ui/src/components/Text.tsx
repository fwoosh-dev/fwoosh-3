"use client";

import { Text as TextPrimitive } from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { appChrome } from "../theme/tokens.stylex.js";
import { mergeProps } from "react-aria";

const styles = stylex.create({
  base: {
    color: appChrome.text,
  },
});

export interface TextProps
  extends Omit<
    React.HTMLAttributes<HTMLParagraphElement>,
    "style" | "className"
  > {
  style?: stylex.StyleXStyles;
}

export function Text({ style, ...props }: TextProps) {
  return (
    <TextPrimitive {...mergeProps(props, stylex.props(styles.base, style))} />
  );
}

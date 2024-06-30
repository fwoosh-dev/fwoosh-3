"use client";

import {
  Label as LabelPrimitive,
  LabelProps as LabelPrimitiveProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { appChrome, space, text } from "../theme/tokens.stylex.js";

const styles = stylex.create({
  label: {
    color: appChrome.subtleText,
    fontSize: text.xs,
    padding: `0 ${space[4]}`,
    textAlign: "right",
  },
});

export function Label({ children, ...props }: LabelPrimitiveProps) {
  return (
    <LabelPrimitive {...props} {...stylex.props(styles.label)}>
      {children}
    </LabelPrimitive>
  );
}

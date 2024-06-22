import * as stylex from "@stylexjs/stylex";
import { borderRadius, focusRing } from "../theme/tokens.stylex.js";

const focusRingStyles = stylex.create({
  base: {
    position: "absolute",
    inset: "-4px",
    borderRadius: borderRadius.mdInset,
    borderWidth: 2,
    borderColor: focusRing.color,
    borderStyle: "solid",
  },
});

export interface FocusRingProps {
  style?: stylex.StyleXStyles;
}

export function FocusRing({ style }: FocusRingProps) {
  return <div {...stylex.props(focusRingStyles.base, style)} />;
}

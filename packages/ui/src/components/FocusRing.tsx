import * as stylex from "@stylexjs/stylex";
import { borderRadius, focusRing } from "../theme/tokens.stylex.js";

const focusRingStyles = stylex.create({
  base: {
    borderColor: focusRing.color,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: focusRing.width,
    inset: -6,
    pointerEvents: "none",
    position: "absolute",
    zIndex: 10,
  },
});

export interface FocusRingProps {
  style?: stylex.StyleXStyles;
}

export function FocusRing({ style }: FocusRingProps) {
  return <div {...stylex.props(focusRingStyles.base, style)} />;
}

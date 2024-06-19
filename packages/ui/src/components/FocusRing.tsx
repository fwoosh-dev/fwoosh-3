import * as stylex from "@stylexjs/stylex";
import { blue } from "../theme/colors.stylex.js";
import { borderRadius } from "../theme/theme.stylex.js";

const focusRingStyles = stylex.create({
  base: {
    position: "absolute",
    inset: "-4px",
    borderRadius: borderRadius.mdInset,
    borderWidth: 2,
    borderColor: blue.hoveredBorder,
    borderStyle: "solid",
  },
});

export interface FocusRingProps {
  style?: stylex.StyleXStyles;
}

export function FocusRing({ style }: FocusRingProps) {
  return <div {...stylex.props(focusRingStyles.base, style)} />;
}

"use client";

import * as stylex from "@stylexjs/stylex";
import { gap } from "../theme/theme.stylex.js";

const styles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  alignStart: { alignItems: "flex-start" },
  alignEnd: { alignItems: "flex-end" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyCenter: { justifyContent: "center" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },
  gapXs: { gap: gap.xs },
  gapSm: { gap: gap.sm },
  gapMedium: { gap: gap.md },
  gapLarge: { gap: gap.lg },
});

export interface HStackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "className"> {
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "between" | "around";
  style?: stylex.StyleXStyles;
  gap?: "xs" | "sm" | "md" | "lg";
}

export function HStack({
  align = "center",
  justify = "start",
  style,
  gap: gapProp = "sm",
  ...props
}: HStackProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.base,
        align === "start"
          ? styles.alignStart
          : align === "end"
          ? styles.alignEnd
          : null,
        justify === "end"
          ? styles.justifyEnd
          : justify === "center"
          ? styles.justifyCenter
          : justify === "between"
          ? styles.justifyBetween
          : justify === "around"
          ? styles.justifyAround
          : null,
        gapProp === "xs"
          ? styles.gapXs
          : gapProp === "sm"
          ? styles.gapSm
          : gapProp === "md"
          ? styles.gapMedium
          : gapProp === "lg"
          ? styles.gapLarge
          : null,
        style
      )}
    />
  );
}

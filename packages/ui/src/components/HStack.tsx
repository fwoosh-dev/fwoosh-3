"use client";

import * as stylex from "@stylexjs/stylex";
import { space } from "../theme/tokens.stylex.js";

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
  gapXs: { gap: space[1] },
  gapSm: { gap: space[2] },
  gapMedium: { gap: space[3] },
  gapLarge: { gap: space[4] },
});

export interface HStackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "className"> {
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "between" | "around";
  style?: stylex.StyleXStyles;
  gap?: 1 | 2 | 3 | 4 | 5;
}

export function HStack({
  align = "center",
  justify = "start",
  style,
  gap: gapProp = 2,
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
        gapProp === 1
          ? styles.gapXs
          : gapProp === 2
          ? styles.gapSm
          : gapProp === 3
          ? styles.gapMedium
          : gapProp === 4
          ? styles.gapLarge
          : null,
        style
      )}
    />
  );
}

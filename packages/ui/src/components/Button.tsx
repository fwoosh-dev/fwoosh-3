"use client";

import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: "rgb(60,60,60)",
    background: "green",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The size of the button */
  size?: "small" | "medium" | "large";
  /** The type of button */
  variant?: "primary" | "secondary" | "tertiary";
}

export function Button(props: ButtonProps) {
  return (
    <button {...props} {...stylex.props(styles.base)}>
      Increment
    </button>
  );
}

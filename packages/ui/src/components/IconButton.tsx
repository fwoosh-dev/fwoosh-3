"use client";

import * as stylex from "@stylexjs/stylex";
import { Button, ButtonProps } from "react-aria-components";

import { borderRadius } from "../theme/theme.stylex.js";
import { blue, gray } from "../theme/colors.stylex.js";

const buttonStyles = stylex.create({
  base: {
    position: "relative",
    height: 32,
    width: 32,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: {
      default: gray.elementBg,
      ":hover": gray.hover,
      ":active": gray.active,
    },
    outline: {
      ":focus-visible": "none",
    },
    border: "none",
    borderRadius: borderRadius.mdInset,
  },
  toolbar: {
    height: 28,
    width: 28,
  },
});

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

function FocusRing() {
  return <div {...stylex.props(focusRingStyles.base)} />;
}

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  variant?: "toolbar";
  children: React.ReactNode;
}

export function IconButton({ variant, children, ...props }: IconButtonProps) {
  return (
    <Button
      {...props}
      {...stylex.props(
        buttonStyles.base,
        variant === "toolbar" && buttonStyles.toolbar
      )}
    >
      {({ isFocusVisible }) => {
        return (
          <>
            {isFocusVisible && <FocusRing />}
            {children}
          </>
        );
      }}
    </Button>
  );
}

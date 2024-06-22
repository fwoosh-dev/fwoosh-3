"use client";

import * as stylex from "@stylexjs/stylex";
import { Button, ButtonProps, Link, LinkProps } from "react-aria-components";

import { borderRadius } from "../theme/tokens.stylex.js";
import { appChrome } from "../theme/tokens.stylex.js";
import { FocusRing } from "./FocusRing.js";

const buttonStyles = stylex.create({
  base: {
    position: "relative",
    height: 32,
    width: 32,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: appChrome.text,
    background: {
      default: "transparent",
      ":hover": appChrome.elementBg,
      ":active": appChrome.hover,
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

export interface IconLinkProps extends Omit<LinkProps, "children"> {
  variant?: "toolbar";
  children: React.ReactNode;
}

export function IconLink({ variant, children, ...props }: IconLinkProps) {
  return (
    <Link
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
    </Link>
  );
}

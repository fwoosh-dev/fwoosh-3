"use client";

import * as stylex from "@stylexjs/stylex";
import { Button, ButtonProps, Link, LinkProps } from "react-aria-components";

import { appChromeA, borderRadius } from "../theme/tokens.stylex.js";
import { appChrome } from "../theme/tokens.stylex.js";
import { FocusRing } from "./FocusRing.js";

const buttonStyles = stylex.create({
  base: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",

    borderRadius: borderRadius.mdInset,
    borderWidth: 0,
    color: appChrome.text,
    outline: {
      ":focus-visible": "none",
    },
    position: "relative",

    height: 32,
    width: 32,
  },
  button: {
    backgroundColor: {
      default: "transparent",
      ":hover": appChromeA.elementBg,
      ":active": appChromeA.hover,
    },
  },
  toolbar: {
    height: 28,
    width: 28,
  },
});

export interface IconButtonProps
  extends Omit<ButtonProps, "children" | "style" | "className"> {
  variant?: "toolbar";
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}

export function IconButton({
  variant,
  children,
  style,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      {...stylex.props(
        buttonStyles.base,
        buttonStyles.button,
        variant === "toolbar" && buttonStyles.toolbar,
        style
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
        buttonStyles.button,
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

export function IconWrapper({
  children,
  style,
  variant,
}: {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
  variant?: "toolbar";
}) {
  return (
    <div
      {...stylex.props(
        buttonStyles.base,
        variant === "toolbar" && buttonStyles.toolbar,
        style
      )}
    >
      {children}
    </div>
  );
}

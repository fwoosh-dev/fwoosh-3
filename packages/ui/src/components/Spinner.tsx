"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { borderRadius, space, text } from "../theme/tokens.stylex.js";
import { primary, appChrome } from "../theme/tokens.stylex.js";

const spin = stylex.keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const spinnerStyles = stylex.create({
  root: {
    animationDuration: "1.1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",

    borderBottomColor: appChrome.subtleBorder,
    borderLeftColor: primary.solid,
    borderRightColor: appChrome.subtleBorder,
    borderTopColor: appChrome.subtleBorder,

    borderRadius: borderRadius.round,
    borderStyle: "solid",
    borderWidth: "0.3rem",

    opacity: 0,
    position: "relative",
    transform: "translateZ(0)",
  },
  message: {
    fontSize: text.sm,
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

export interface LazyLoaderProps {
  /** Delay the spinner being shown for N ms. */
  delay?: number;
  children: React.ReactNode;
}

export const DelayedRender = ({ delay = 1000, children }: LazyLoaderProps) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <>{children}</>;
};

type SpinnerProps = Pick<LazyLoaderProps, "delay"> &
  React.ComponentPropsWithoutRef<"div"> & {
    /** The size the spinner should display at. */
    size?: number;
    /** The message to display below the spinner. */
    children?: React.ReactNode;
  };

export const Spinner = ({
  delay = 1000,
  size = 20,
  children,
  ...props
}: SpinnerProps) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div {...props} {...stylex.props(spinnerStyles.wrapper)}>
      <div
        {...stylex.props(spinnerStyles.root, show && spinnerStyles.show)}
        style={{ width: size, height: size }}
      />
      {children && (
        <div
          {...stylex.props(spinnerStyles.message, show && spinnerStyles.show)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

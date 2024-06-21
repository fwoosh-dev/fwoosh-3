"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { borderRadius, space, text } from "../theme/tokens.stylex.js";
import { blue, appChrome } from "../theme/colors.stylex.js";

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
    opacity: 0,
    borderRadius: borderRadius.round,
    position: "relative",
    borderTop: `.3rem solid ${appChrome.subtleBorder}`,
    borderRight: `.3rem solid ${appChrome.subtleBorder}`,
    borderBottom: `.3rem solid ${appChrome.subtleBorder}`,
    borderLeft: `.3rem solid ${blue.solid}`,
    transform: "translateZ(0)",
    animation: `${spin} 1.1s infinite linear`,

    ":after": {
      borderRadius: borderRadius.round,
      width: 40,
      height: 40,
    },
  },
  message: {
    font: text.sm,
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  wrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[2],
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

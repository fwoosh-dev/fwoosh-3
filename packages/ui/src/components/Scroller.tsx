"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as stylex from "@stylexjs/stylex";
import {
  appChromeA,
  borderRadius,
  focusRing,
  space,
} from "../theme/tokens.stylex.js";
import { mergeProps } from "react-aria";

const styles = stylex.create({
  root: {
    overflow: "hidden",
  },
  viewport: {
    height: "100%",
    width: "100%",

    borderColor: {
      default: "transparent",
      ":focus": focusRing.color,
    },
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 4,
    boxSizing: "border-box",
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
  },
  bar: {
    boxSizing: "border-box",
    display: "flex",
    padding: space[2],
    touchAction: "none",
    userSelect: "none",

    height: {
      ":is([data-orientation=horizontal])": space[4],
    },
    width: {
      ":is([data-orientation=vertical])": space[4],
    },
  },
  thumb: {
    backgroundColor: {
      default: appChromeA.active,
      ":hover": appChromeA.solid,
    },
    borderRadius: borderRadius.sm,
    flexGrow: 1,
  },
  corner: {},
});

export interface ScrollRootProps
  extends Omit<React.ComponentProps<typeof ScrollAreaPrimitive.Root>, "style"> {
  style?: stylex.StyleXStyles;
}

export function ScrollRoot({ children, style, ...props }: ScrollRootProps) {
  return (
    <ScrollAreaPrimitive.Root
      {...mergeProps(props, stylex.props(styles.root, style))}
    >
      {children}
    </ScrollAreaPrimitive.Root>
  );
}

export function ScrollViewport({
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport {...props} {...stylex.props(styles.viewport)}>
      {children}
    </ScrollAreaPrimitive.Viewport>
  );
}

export function ScrollBars() {
  return (
    <>
      <ScrollAreaPrimitive.Scrollbar
        {...stylex.props(styles.bar)}
        orientation="vertical"
      >
        <ScrollAreaPrimitive.Thumb {...stylex.props(styles.thumb)} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        {...stylex.props(styles.bar)}
        orientation="horizontal"
      >
        <ScrollAreaPrimitive.Thumb {...stylex.props(styles.thumb)} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner {...stylex.props(styles.corner)} />
    </>
  );
}

export interface ScrollerProps {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}

export function Scroller({ children, ...props }: ScrollRootProps) {
  return (
    <ScrollRoot {...props}>
      <ScrollViewport tabIndex={0}>{children}</ScrollViewport>
      <ScrollBars />
    </ScrollRoot>
  );
}

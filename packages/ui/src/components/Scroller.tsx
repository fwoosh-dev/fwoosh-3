"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as stylex from "@stylexjs/stylex";
import {
  appChromeA,
  borderRadius,
  focusRing,
  space,
} from "../theme/tokens.stylex.js";
import { mergeProps, useFocusRing } from "react-aria";

const styles = stylex.create({
  root: {
    overflow: "hidden",
  },
  viewport: {
    height: "100%",
    width: "100%",

    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: focusRing.width,
    boxSizing: "border-box",
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
  },
  viewportFocused: {
    borderColor: focusRing.color,
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

export interface ScrollViewportProps
  extends Omit<
    React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>,
    "style" | "className"
  > {
  style?: stylex.StyleXStyles;
}

export function ScrollViewport({
  children,
  style,
  ...props
}: ScrollViewportProps) {
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <ScrollAreaPrimitive.Viewport
      tabIndex={0}
      {...mergeProps(
        props,
        focusProps,
        stylex.props(
          styles.viewport,
          isFocusVisible && styles.viewportFocused,
          style
        )
      )}
    >
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
      <ScrollViewport>{children}</ScrollViewport>
      <ScrollBars />
    </ScrollRoot>
  );
}

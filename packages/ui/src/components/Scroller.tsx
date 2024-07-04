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
import { useEffect, useRef, useState } from "react";

const styles = stylex.create({
  root: {
    overflow: "hidden",
  },
  rootHeight: (height) => ({ height }),
  viewport: {
    height: "100%",
    width: "100%",

    boxSizing: "border-box",
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
  },
  viewportFocused: {
    boxShadow: `inset 0 0 0 calc(${focusRing.width} * 1px) ${focusRing.color}`,
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
  setHeightOnMount?: boolean;
}

export function Scroller({
  children,
  setHeightOnMount,
  style,
  ...props
}: ScrollRootProps & ScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();

  useEffect(() => {
    function setSize() {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const frame = requestAnimationFrame(setSize);
    let setSizeTimeout: ReturnType<typeof setTimeout> | undefined;

    function onDocumentResize() {
      cancelAnimationFrame(frame);
      clearTimeout(setSizeTimeout);
      setHeight(undefined);
      setSizeTimeout = setTimeout(setSize, 1000);
    }

    window.addEventListener("resize", onDocumentResize);

    return () => {
      setHeight(undefined);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onDocumentResize);
    };
  }, [setHeightOnMount]);

  return (
    <ScrollRoot ref={ref} {...props} style={[styles.rootHeight(height), style]}>
      <ScrollViewport>{children}</ScrollViewport>
      <ScrollBars />
    </ScrollRoot>
  );
}

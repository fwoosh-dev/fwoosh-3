"use client";

import * as stylex from "@stylexjs/stylex";
import { appChrome, appChromeA } from "./theme/tokens.stylex.js";
import { borderRadius, space } from "./theme/tokens.stylex.js";
import { useHover, mergeProps } from "react-aria";

const DARK = "@media (prefers-color-scheme: dark)";

const inspectorStyles = stylex.create({
  base: {
    backgroundColor: appChrome.appBg,
    borderColor: {
      [DARK]: appChromeA.subtleBorder,
      default: appChromeA.elementBorder,
    },
    borderRadius: borderRadius.lg,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 4px 0px",
    height: `calc(100% - ${space[4]} * 2)`,
    margin: space[4],
    overflow: "hidden",
  },
});

export interface InspectorProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function Inspector({ style, ...props }: InspectorProps) {
  return <main {...props} {...stylex.props(inspectorStyles.base, style)} />;
}

const sidebarLayoutStyles = stylex.create({
  base: {
    backgroundColor: appChrome.subtleBg,
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    height: "100vh",
  },
});

export interface SidebarLayoutProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: stylex.StyleXStyles | stylex.Theme<any> | stylex.Theme<any>[];
}

export function SidebarLayout({ style, ...props }: SidebarLayoutProps) {
  return (
    <main
      {...props}
      {...mergeProps(stylex.props(sidebarLayoutStyles.base, style), {
        className: "app",
      })}
    />
  );
}

const InspectorToolbarStyles = stylex.create({
  base: {
    alignItems: "center",
    backgroundColor: appChrome.subtleBg,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderColor: {
      [DARK]: appChrome.subtleBorder,
      default: appChrome.elementBorder,
    },
    display: "flex",
    height: space[7],
    padding: `${space[2]} ${space[4]}`,
  },
});

export interface InspectorToolbarProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function InspectorToolbar({ style, ...props }: InspectorToolbarProps) {
  return (
    <div {...props} {...stylex.props(style, InspectorToolbarStyles.base)} />
  );
}

appChrome.hoveredBorder;

const resizeHandleStyles = stylex.create({
  base: {
    position: "relative",
    width: "100%",
    zIndex: 10,
  },
  line: {
    backgroundColor: appChrome.hoveredBorder,
    height: 2,
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    zIndex: 10,
  },
  hitArea: {
    height: 12,
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  },
});

export interface ResizeHandleProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
  isDragging: boolean;
}

export function ResizeHandle({
  style,
  isDragging,
  ...props
}: ResizeHandleProps) {
  const { hoverProps, isHovered } = useHover({});

  return (
    <div
      {...mergeProps(props, hoverProps)}
      {...stylex.props(resizeHandleStyles.base, style)}
    >
      {(isHovered || isDragging) && (
        <div {...stylex.props(resizeHandleStyles.line)} />
      )}
      <div {...stylex.props(resizeHandleStyles.hitArea)} />
    </div>
  );
}

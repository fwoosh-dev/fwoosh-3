import * as stylex from "@stylexjs/stylex";
import { gray } from "../theme/colors.stylex.js";
import { borderRadius, space } from "../theme/theme.stylex.js";

const inspectorStyles = stylex.create({
  base: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: gray.elementBorder,
    backgroundColor: gray.appBg,
    margin: space[5],
    borderRadius: borderRadius.md,
  },
});

export interface InspectorProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function Inspector({ style, ...props }: InspectorProps) {
  return <main {...props} {...stylex.props(inspectorStyles.base)} />;
}

const sidebarLayoutStyles = stylex.create({
  base: {
    backgroundColor: gray.subtleBg,
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    height: "100vh",
  },
});

export interface SidebarLayoutProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function SidebarLayout({ style, ...props }: SidebarLayoutProps) {
  return <main {...props} {...stylex.props(sidebarLayoutStyles.base)} />;
}

const InspectorToolbarStyles = stylex.create({
  base: {
    borderBottom: 1,
    borderBottomStyle: "solid",
    borderBottomColor: gray.elementBorder,
    display: "flex",
    alignItems: "center",
    padding: space[2],
  },
});

export interface InspectorToolbarProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function InspectorToolbar({ style, ...props }: InspectorToolbarProps) {
  return <div {...props} {...stylex.props(InspectorToolbarStyles.base)} />;
}

const resizeHandleStyles = stylex.create({
  base: {
    zIndex: 10,
    background: {
      default: gray.subtleBorder,
      ":hover": gray.hoveredBorder,
    },
    height: 1,
    width: "100%",
    position: "relative",
  },

  hitArea: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: 10,
  },
});

export interface ResizeHandleProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function ResizeHandle({ style, ...props }: ResizeHandleProps) {
  return (
    <div {...props} {...stylex.props(resizeHandleStyles.base)}>
      <div {...stylex.props(resizeHandleStyles.hitArea)} />
    </div>
  );
}

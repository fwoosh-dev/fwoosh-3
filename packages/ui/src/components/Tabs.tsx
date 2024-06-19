"use client";

import {
  Tabs as TabsPrimitive,
  TabsProps,
  TabList as TabListPrimitive,
  TabListProps,
  Tab as TabPrimitive,
  TabProps as TabPrimitiveProps,
  TabPanel as TabPanelPrimitive,
  TabPanelProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";

import { borderRadius, space, text } from "../theme/theme.stylex.js";
import { gray } from "../theme/colors.stylex.js";
import { FocusRing } from "./FocusRing.js";

export function Tabs(props: TabsProps) {
  return <TabsPrimitive {...props} />;
}

const tabListStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    gap: space[3],
    background: gray.subtleBg,
    borderTop: `1px solid ${gray.subtleBorder}`,
    borderBottom: `1px solid ${gray.subtleBorder}`,
    paddingTop: space[3],
    paddingBottom: space[3],
    paddingLeft: space[3],
    paddingRight: space[3],
  },
});

export function TabList<T>(props: TabListProps<T>) {
  // @ts-ignore
  return <TabListPrimitive {...props} {...stylex.props(tabListStyles.base)} />;
}

const tabStyles = stylex.create({
  wrapper: {
    outline: {
      ":focus-visible": "none",
    },
  },
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: `${space[3]} ${space[5]}`,
    boxSizing: "border-box",
    height: space[7],
    fontSize: text.sm,
    cursor: "default",
    border: "1px solid transparent",
    borderRadius: borderRadius.md,
    color: gray.subtleText,
    backgroundColor: {
      ":hover": gray.hover,
      ":active": gray.active,
    },
  },
  selected: {
    backgroundColor: gray.appBg,
    border: {
      default: `1px solid ${gray.subtleBorder}`,
      ":hover": `1px solid ${gray.hoveredBorder}`,
    },
  },
  focusRing: {
    borderRadius: borderRadius.md,
  },
});

export interface TabProps extends Omit<TabPrimitiveProps, "children"> {
  children: React.ReactNode;
}

export function Tab({ children, ...props }: TabProps) {
  return (
    <TabPrimitive {...props} {...stylex.props(tabStyles.wrapper)}>
      {({ isFocusVisible, isSelected }) => {
        return (
          <div
            {...stylex.props(tabStyles.base, isSelected && tabStyles.selected)}
          >
            {isFocusVisible && <FocusRing style={tabStyles.focusRing} />}
            {children}
          </div>
        );
      }}
    </TabPrimitive>
  );
}

export function TabPanel(props: TabPanelProps) {
  return <TabPanelPrimitive {...props} />;
}

const tabPanelContentStyles = stylex.create({
  base: {
    padding: space[5],
  },
});

export interface TabPanelContentProps
  extends Omit<React.ComponentProps<"div">, "className" | "style"> {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}

export function TabPanelContent({ style, ...props }: TabPanelContentProps) {
  return (
    <div {...props} {...stylex.props(tabPanelContentStyles.base, style)} />
  );
}

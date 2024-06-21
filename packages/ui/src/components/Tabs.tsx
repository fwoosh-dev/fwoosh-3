"use client";

import {
  Tabs as TabsPrimitive,
  TabsProps as TabsPrimitiveProps,
  TabList as TabListPrimitive,
  TabListProps,
  Tab as TabPrimitive,
  TabProps as TabPrimitiveProps,
  TabPanel as TabPanelPrimitive,
  TabPanelProps as TabPanelPrimitiveProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";

import { borderRadius, space, text } from "../theme/tokens.stylex.js";
import { appChrome } from "../theme/colors.stylex.js";
import { FocusRing } from "./FocusRing.js";

const tabRootStyles = stylex.create({
  base: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

export interface TabsProps
  extends Omit<TabsPrimitiveProps, "style" | "className"> {
  style?: stylex.StyleXStyles;
}

export function Tabs({ style, ...props }: TabsProps) {
  return (
    <TabsPrimitive {...props} {...stylex.props(tabRootStyles.base, style)} />
  );
}

const tabListStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    gap: space[3],
    background: appChrome.subtleBg,
    borderTop: `1px solid ${appChrome.subtleBorder}`,
    borderBottom: `1px solid ${appChrome.subtleBorder}`,
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
    height: space[7],
    fontSize: text.xs,
    cursor: "default",
    border: "1px solid transparent",
    borderRadius: borderRadius.md,
    color: appChrome.subtleText,
    backgroundColor: {
      ":hover": appChrome.hover,
      ":active": appChrome.active,
    },
  },
  selected: {
    backgroundColor: appChrome.appBg,
    border: {
      default: `1px solid ${appChrome.subtleBorder}`,
      ":hover": `1px solid ${appChrome.hoveredBorder}`,
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

const tabPanelStyles = stylex.create({
  base: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
  },
});

export interface TabPanelProps
  extends Omit<TabPanelPrimitiveProps, "className" | "style"> {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}

export function TabPanel({ style, ...props }: TabPanelProps) {
  return (
    <TabPanelPrimitive
      {...props}
      {...stylex.props(tabPanelStyles.base, style)}
    />
  );
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

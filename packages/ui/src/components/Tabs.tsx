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
import { appChrome } from "../theme/tokens.stylex.js";
import { FocusRing } from "./FocusRing.js";
import { mergeProps } from "react-aria";
import { Scroller } from "./Scroller.js";

const tabRootStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
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
    alignItems: "center",
    backgroundColor: appChrome.subtleBg,
    borderColor: appChrome.subtleBorder,

    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 1,

    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    gap: space[3],
    paddingBottom: space[3],
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[3],
  },
});

export function TabList<T>(props: TabListProps<T>) {
  // @ts-expect-error Couldn't get the generics to work
  return <TabListPrimitive {...props} {...stylex.props(tabListStyles.base)} />;
}

const tabStyles = stylex.create({
  wrapper: {
    outline: {
      ":focus-visible": "none",
    },
  },
  base: {
    alignItems: "center",
    backgroundColor: {
      ":hover": appChrome.hover,
      ":active": appChrome.active,
    },
    borderColor: "transparent",
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    boxSizing: "border-box",
    color: appChrome.subtleText,
    cursor: "default",
    display: "flex",
    fontSize: text.xs,
    height: space[7],
    padding: `${space[3]} ${space[5]}`,
    position: "relative",
  },
  selected: {
    backgroundColor: appChrome.appBg,
    borderColor: {
      default: appChrome.subtleBorder,
      ":hover": appChrome.hoveredBorder,
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
    flexGrow: 1,
    minHeight: 0,
  },
  scroller: {
    height: "100%",
  },
});

export interface TabPanelProps
  extends Omit<TabPanelPrimitiveProps, "className" | "style"> {
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}

export function TabPanel({ style, children, ...props }: TabPanelProps) {
  return (
    <TabPanelPrimitive
      {...mergeProps(props, stylex.props(tabPanelStyles.base, style))}
    >
      <Scroller style={tabPanelStyles.scroller}>{children}</Scroller>
    </TabPanelPrimitive>
  );
}

const tabPanelContentStyles = stylex.create({
  base: {
    color: appChrome.text,
    minHeight: "100%",
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

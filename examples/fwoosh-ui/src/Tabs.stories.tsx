"use client";

import { PageMeta } from "fwoosh";
import * as stylex from "@stylexjs/stylex";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanelContent,
  Tabs,
} from "@fwoosh/ui/components/Tabs";
import { appChrome, borderRadius } from "@fwoosh/ui/theme/tokens.stylex";

export const meta: PageMeta = {
  title: "Components/Tabs",
  component: [Tabs],
  description:
    "Tabs organize content into multiple sections and allow users to navigate between them.",
};

const styles = stylex.create({
  wrapper: {
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    height: 240,
    overflow: "hidden",
    width: 300,
  },
  list: {
    borderTopWidth: 0,
  },
});

export const Basic = () => {
  return (
    <Tabs style={styles.wrapper}>
      <TabList style={styles.list}>
        <Tab id="first">First</Tab>
        <Tab id="second">Second</Tab>
        <Tab id="third">Third</Tab>
      </TabList>
      <TabPanel id="first">
        <TabPanelContent>First</TabPanelContent>
      </TabPanel>
      <TabPanel id="second">
        <TabPanelContent>Second</TabPanelContent>
      </TabPanel>
      <TabPanel id="third">
        <TabPanelContent>Third</TabPanelContent>
      </TabPanel>
    </Tabs>
  );
};

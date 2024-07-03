import type { ReactNode } from "react";

import { StoryContext, getStorySlug } from "@fwoosh/types";
import { StoryContextProvider } from "@fwoosh/ui";
import { Inspector, SidebarLayout } from "@fwoosh/ui/app";
import { Scroller } from "@fwoosh/ui/components/Scroller";

import { SidebarHeader } from "./SidebarHeader";
import { StoryList } from "./StoryList";
import { ToolsToolbar } from "./ToolsToolbar";
import { Panels } from "./Panels";
import { Panel, PanelGroup, PanelResizeHandle } from "./ResizablePanels";
import * as stylex from "@stylexjs/stylex";
import { space } from "@fwoosh/ui/theme/tokens.stylex";
import {
  appChromeTheme,
  appChromeATheme,
  primaryTheme,
  primaryATheme,
} from "@fwoosh/ui/theme/theme.stylex";

const styles = stylex.create({
  scrollWrapper: {
    width: "calc(100% + 4px)",
  },
  SidebarLayout: {
    display: "flex",
    flexDirection: "column",
    padding: space[5],
  },
  panelWrapper: {
    height: "100%",
    width: "100%",
  },
  storyArea: {
    display: "flex",
    flexDirection: "column",
  },
});

export interface BenchLayoutProps extends StoryContext {
  children: ReactNode;
}

export async function BenchLayout({ children, page, story }: BenchLayoutProps) {
  return (
    <StoryContextProvider page={page} story={story}>
      <SidebarLayout
      // style={[appChromeTheme, appChromeATheme, primaryTheme, primaryATheme]}
      >
        <Scroller style={styles.scrollWrapper}>
          <aside {...stylex.props(styles.SidebarLayout)}>
            <SidebarHeader />
            <StoryList active={getStorySlug(page, story)} />
          </aside>
        </Scroller>

        <Inspector>
          <PanelGroup id="inspector" direction="vertical">
            <Panel
              defaultSize={50}
              id="preview"
              minSize={20}
              {...stylex.props(styles.storyArea)}
            >
              <ToolsToolbar page={page} story={story} />
              {children}
            </Panel>
            <PanelResizeHandle id="preview-panels-handle" />
            <Panel defaultSize={50} id="panels" minSize={20} collapsible={true}>
              <aside {...stylex.props(styles.panelWrapper)}>
                <Panels page={page} story={story} />
              </aside>
            </Panel>
          </PanelGroup>
        </Inspector>
      </SidebarLayout>
    </StoryContextProvider>
  );
}

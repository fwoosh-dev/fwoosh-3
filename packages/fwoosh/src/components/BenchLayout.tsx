import type { ReactNode } from "react";

import { StoryContext } from "@fwoosh/types";
import { StoryContextProvider } from "@fwoosh/ui";
import { Inspector, SidebarLayout } from "@fwoosh/ui/app";

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
import { getStorySlug } from "../utils/stories";

const styles = stylex.create({
  SidebarLayout: {
    display: "flex",
    flexDirection: "column",
    padding: space[5],
  },
  iframeWrapper: {
    backgroundColor: "white",
    height: "100%",
    overflow: "auto",
    width: "100%",
  },
  panelWrapper: {
    height: "100%",
    width: "100%",
  },
});

export interface BenchLayoutProps extends StoryContext {
  children: ReactNode;
}

export async function BenchLayout({ children, page, story }: BenchLayoutProps) {
  return (
    <StoryContextProvider page={page} story={story}>
      <SidebarLayout
        style={[appChromeTheme, appChromeATheme, primaryTheme, primaryATheme]}
      >
        <aside {...stylex.props(styles.SidebarLayout)}>
          <SidebarHeader />
          <StoryList active={getStorySlug(page, story)} />
        </aside>

        <Inspector>
          <PanelGroup id="inspector" direction="vertical">
            <Panel defaultSize={75} id="preview" minSize={20}>
              <ToolsToolbar page={page} story={story} />
              <div {...stylex.props(styles.iframeWrapper)}>{children}</div>
            </Panel>
            <PanelResizeHandle id="preview-panels-handle" />
            <Panel defaultSize={25} id="panels" minSize={20} collapsible={true}>
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

import type { ReactNode } from "react";

import { StoryContext } from "@fwoosh/types";
import { StoryContextProvider } from "@fwoosh/ui";
import { Inspector, SidebarLayout } from "@fwoosh/ui/app";

import { StoryList } from "./StoryList";
import { ToolsToolbar } from "./ToolsToolbar";
import { Panels } from "./Panels";
import { Panel, PanelGroup, PanelResizeHandle } from "./ResizablePanels";
import * as stylex from "@stylexjs/stylex";
import { space } from "@fwoosh/ui/tokens.stylex";
import {
  appChromeTheme,
  appChromeATheme,
  primaryTheme,
  primaryATheme,
} from "@fwoosh/ui/theme.stylex";
import { getStorySlug } from "../utils/stories";

const styles = stylex.create({
  SidebarLayout: {
    padding: space[5],
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
          <StoryList defaultActive={getStorySlug(page, story)} />
        </aside>
        <Inspector>
          <PanelGroup id="inspector" direction="vertical">
            <Panel id="preview" minSize={20}>
              <ToolsToolbar page={page} story={story} />
              <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                {children}
              </div>
            </Panel>
            <PanelResizeHandle id="preview-panels-handle" />
            <Panel id="panels" minSize={20} collapsible={true}>
              <aside style={{ height: "100%", width: "100%" }}>
                <Panels page={page} story={story} />
              </aside>
            </Panel>
          </PanelGroup>
        </Inspector>
      </SidebarLayout>
    </StoryContextProvider>
  );
}

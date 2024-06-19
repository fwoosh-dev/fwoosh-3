import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

import { StoryContext } from "@fwoosh/types";
import { StoryContextProvider } from "@fwoosh/ui";
import { Inspector, ResizeHandle, SidebarLayout } from "@fwoosh/ui/app";

import { StoryList } from "./StoryList";
import { ToolsToolbar } from "./ToolsToolbar";
import { Panels } from "./Panels";
import { Panel, PanelGroup, PanelResizeHandle } from "./ResizablePanels";

import { gray } from "@fwoosh/ui/colors.stylex";

const inspectorStyles = stylex.create({
  base: {
    backgroundColor: gray.subtleBg,
  },
});

export interface BenchLayoutProps extends StoryContext {
  children: ReactNode;
}

export async function BenchLayout({ children, page, story }: BenchLayoutProps) {
  return (
    <StoryContextProvider page={page} story={story}>
      <SidebarLayout>
        <aside>
          <StoryList />
        </aside>
        <Inspector>
          <PanelGroup id="inspector" direction="vertical">
            <Panel id="preview" minSize={20}>
              <ToolsToolbar />
              <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                {children}
              </div>
            </Panel>
            <PanelResizeHandle id="preview-panels-handle">
              <ResizeHandle />
            </PanelResizeHandle>
            <Panel id="panels" minSize={20} collapsible={true}>
              <aside>
                <Panels page={page} story={story} />
              </aside>
            </Panel>
          </PanelGroup>
        </Inspector>
      </SidebarLayout>
    </StoryContextProvider>
  );
}

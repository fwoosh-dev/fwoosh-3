import type { ReactNode } from "react";

import { StoryList } from "./StoryList";
import { ToolsToolbar } from "./ToolsToolbar";
import { Panels } from "./Panels";
import { StoryContext } from "@fwoosh/types";
import { StoryContextProvider } from "@fwoosh/ui";

export interface BenchLayoutProps extends StoryContext {
  children: ReactNode;
}

export async function BenchLayout({ children, page, story }: BenchLayoutProps) {
  return (
    <StoryContextProvider page={page} story={story}>
      <div style={{ display: "flex" }}>
        <aside>
          <StoryList />
        </aside>
        <div>
          <aside>
            <ToolsToolbar />
          </aside>
          <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
            {children}
          </main>
          <aside>
            <Panels page={page} story={story} />
          </aside>
        </div>
      </div>
    </StoryContextProvider>
  );
}

import type { ReactNode } from "react";

import { StoryList } from "./StoryList";
import { ToolsToolbar } from "./ToolsToolbar";
import { Panels } from "./Panels";

export async function BenchLayout({ children }: { children: ReactNode }) {
  return (
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
          <Panels />
        </aside>
      </div>
    </div>
  );
}

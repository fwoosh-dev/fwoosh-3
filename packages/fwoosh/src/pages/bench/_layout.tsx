import type { ReactNode } from "react";

import { StoryList } from "../../components/StoryList";
import { ToolsToolbar } from "../../components/ToolsToolbar";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <aside>
        <StoryList />
      </aside>
      <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
        {children}
      </main>
      <aside>
        <ToolsToolbar />
      </aside>
    </div>
  );
}

import { Suspense } from "react";
import { FwooshPanel, StoryContext } from "@fwoosh/types";
import { importPlugin } from "@fwoosh/pages";
import { Spinner, Tab, TabList, TabPanel, Tabs } from "@fwoosh/ui/components";
import { getConfig } from "../utils/config";

export async function Panel({
  panel,
  ...props
}: { panel: FwooshPanel } & StoryContext) {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const Component = await importPlugin(panel.filepath);
  return <Component {...props} />;
}

export async function Panels({ page, story }: StoryContext) {
  const { config } = getConfig();
  const panels = config.plugins
    ?.map((plugin) => plugin.tools)
    .flat()
    ?.filter((tool): tool is FwooshPanel =>
      Boolean(tool && tool.type === "panel")
    );

  if (!panels) {
    return null;
  }

  return (
    <Tabs>
      <TabList>
        {panels.map((panel) => (
          <Tab key={panel.id} id={panel.id}>
            {panel.panelTitle}
          </Tab>
        ))}
      </TabList>
      {panels.map((panel) => (
        <TabPanel key={panel.id} id={panel.id}>
          <Suspense fallback={<Spinner />}>
            <Panel key={panel.id} panel={panel} page={page} story={story} />
          </Suspense>
        </TabPanel>
      ))}
    </Tabs>
  );
}

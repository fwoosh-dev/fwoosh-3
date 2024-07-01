import { Suspense } from "react";
import { FwooshPanel, StoryContext, getConfig } from "@fwoosh/types";
import { importPlugin } from "@fwoosh/pages";
import { Tab, TabList, TabPanel, Tabs } from "@fwoosh/ui/components/Tabs";
import { Spinner } from "@fwoosh/ui/components/Spinner";

export async function Panel({
  panel,
  ...props
}: { panel: FwooshPanel } & StoryContext) {
  try {
    const Component = await importPlugin(panel.filepath);
    return <Component {...props} options={panel.options} />;
  } catch (error) {
    console.error("COULD NOT LOAD PANEL");
    console.error(error);
    return null;
  }
}

export async function Panels({ page, story }: StoryContext) {
  const config = await getConfig();
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

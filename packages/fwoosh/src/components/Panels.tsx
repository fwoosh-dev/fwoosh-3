import { FwooshPanel, StoryContext } from "@fwoosh/types";
import { importPlugin } from "@fwoosh/pages";
import { Tab, TabList, TabPanel, Tabs } from "@fwoosh/ui/components";
import { getConfig } from "../utils/config";

export async function Panel({
  panel,
  ...props
}: { panel: FwooshPanel } & StoryContext) {
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
          <Tab id={panel.id}>{panel.panelTitle}</Tab>
        ))}
      </TabList>
      {panels.map((panel) => (
        <TabPanel id={panel.id}>
          <Panel key={panel.id} panel={panel} page={page} story={story} />
        </TabPanel>
      ))}
    </Tabs>
  );
}

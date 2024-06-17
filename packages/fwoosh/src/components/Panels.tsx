import { FwooshPanel, StoryContext } from "@fwoosh/types";
import { importPlugin } from "@fwoosh/pages";
import { getConfig } from "../utils/config";
import path from "path";

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
    <div>
      <div>
        {panels.map((panel) => (
          <button>{panel.panelTitle}</button>
        ))}
      </div>
      {panels.map((panel) => (
        <Panel key={panel.id} panel={panel} page={page} story={story} />
      ))}
    </div>
  );
}

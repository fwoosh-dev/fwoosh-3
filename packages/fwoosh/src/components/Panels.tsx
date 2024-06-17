import { FwooshPanel, StoryContext } from "@fwoosh/types";
import { getConfig } from "../utils/config";
import path from "path";

export async function Panel({
  panel,
  ...props
}: { panel: FwooshPanel } & StoryContext) {
  const esmPath = path.join(panel.filepath.replace("commonjs", "esm"));
  const Component = await import(/* @vite-ignore */ esmPath).then(
    (mod) => mod.default
  );
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
      {/* {panels.map((panel) => (
        <Panel key={panel.id} panel={panel} page={page} story={story} />
      ))} */}
    </div>
  );
}

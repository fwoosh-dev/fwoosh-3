import { FwooshPanel } from "@fwoosh/types";
import { getConfig } from "../utils/config";
import path from "path";

export async function Panel({ panel }: { panel: FwooshPanel }) {
  const esmPath = path.join(panel.filepath.replace("commonjs", "esm"));
  const Component = await import(esmPath).then((mod) => mod.default);
  return <Component />;
}

export async function Panels() {
  const { config } = await getConfig();
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
        <Panel key={panel.id} panel={panel} />
      ))}
    </div>
  );
}

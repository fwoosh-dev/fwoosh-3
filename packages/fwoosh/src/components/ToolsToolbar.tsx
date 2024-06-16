import { FwooshConfig, FwooshToolbarButton } from "@fwoosh/types";
import { getConfig } from "../utils/config";
import path from "path";

export async function ToolsToolbarTool({
  tool,
  config,
}: {
  tool: FwooshToolbarButton;
  config: FwooshConfig;
}) {
  const Component = await import(
    path.join(tool.filepath.replace("commonjs", "esm"))
  ).then((mod) => mod.default);
  return <Component />;
}

export async function ToolsToolbar() {
  const { config } = await getConfig();
  const toolbarTools = config.plugins
    ?.find((plugin) => plugin)
    ?.tools?.filter((tool) => tool.type === "toolbar");

  if (!toolbarTools) {
    return <div>No tools found</div>;
  }

  return (
    <div>
      {toolbarTools.map((tool) => (
        <ToolsToolbarTool key={tool.id} tool={tool} config={config} />
      ))}
    </div>
  );
}

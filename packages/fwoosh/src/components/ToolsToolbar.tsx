import { FwooshToolbarButton } from "@fwoosh/types";
import { getConfig } from "../utils/config";
import path from "path";

export async function ToolsToolbarTool({
  tool,
}: {
  tool: FwooshToolbarButton;
}) {
  const esmPath = path.join(tool.filepath.replace("commonjs", "esm"));
  const Component = await import(/* @vite-ignore */ esmPath).then(
    (mod) => mod.default
  );
  return <Component />;
}

export async function ToolsToolbar() {
  const { config } = getConfig();
  const toolbarTools = config.plugins
    ?.find((plugin) => plugin)
    ?.tools?.filter(
      (tool): tool is FwooshToolbarButton => tool.type === "toolbar"
    );

  if (!toolbarTools) {
    return null;
  }

  return (
    <div>
      {toolbarTools.map((tool) => (
        <ToolsToolbarTool key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

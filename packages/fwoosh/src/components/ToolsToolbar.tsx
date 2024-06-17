import { FwooshToolbarButton } from "@fwoosh/types";
import { getConfig } from "../utils/config";
import { importPlugin } from "@fwoosh/pages";

export async function ToolsToolbarTool({
  tool,
}: {
  tool: FwooshToolbarButton;
}) {
  const Component = await importPlugin(tool.filepath);
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

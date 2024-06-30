import { FwooshToolbarButton, StoryContext, getConfig } from "@fwoosh/types";
import { importPlugin } from "@fwoosh/pages";
import { InspectorToolbar } from "@fwoosh/ui/app";
import { HStack, HStackProps } from "@fwoosh/ui/components/HStack";
import * as stylex from "@stylexjs/stylex";
import { space } from "@fwoosh/ui/theme/tokens.stylex";

const styles = stylex.create({
  section: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    gap: space[4],
  },
  shrinkingArea: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

function ToolsToolbarSection({
  children,
  style,
  ...props
}: { children?: React.ReactNode } & HStackProps) {
  return (
    <HStack {...props} style={[styles.section, style]}>
      {children}
    </HStack>
  );
}

interface ToolsToolbarToolProps extends StoryContext {
  tool: FwooshToolbarButton;
}

export async function ToolsToolbarTool({
  tool,
  ...props
}: ToolsToolbarToolProps) {
  const Component = await importPlugin(tool.filepath);
  return <Component {...props} options={tool.options} />;
}

export async function ToolsToolbar(props: StoryContext) {
  const config = await getConfig();
  const tools = config.plugins?.map((plugin) => plugin.tools).flat() || [];
  const toolbarTools = tools.filter((tool): tool is FwooshToolbarButton =>
    Boolean(tool && tool.type === "toolbar")
  );

  if (!toolbarTools) {
    return null;
  }

  const storyTools = toolbarTools.filter((tool) => tool.scope === "story");
  const otherTools = toolbarTools.filter((tool) => tool.scope !== "story");

  return (
    <InspectorToolbar>
      <ToolsToolbarSection style={styles.shrinkingArea} />
      <ToolsToolbarSection justify="center">
        {storyTools.map((tool) => (
          <ToolsToolbarTool key={tool.id} tool={tool} {...props} />
        ))}
      </ToolsToolbarSection>
      <ToolsToolbarSection justify="end">
        {otherTools.map((tool) => (
          <ToolsToolbarTool key={tool.id} tool={tool} {...props} />
        ))}
      </ToolsToolbarSection>
    </InspectorToolbar>
  );
}

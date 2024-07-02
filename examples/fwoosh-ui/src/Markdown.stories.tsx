import { PageMeta } from "fwoosh";
import * as stylex from "@stylexjs/stylex";
import dedent from "dedent";

import { Markdown } from "@fwoosh/ui/components/Markdown";
import { appChrome, borderRadius, space } from "@fwoosh/ui/theme/tokens.stylex";

const styles = stylex.create({
  buffer: {
    padding: `${space[6]} 0`,
  },
  wrapper: {
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 4px 0px",
    margin: "auto",
    maxWidth: 350,
    padding: `${space[4]} ${space[5]}`,
  },
});

export const meta: PageMeta = {
  title: "Components/Markdown",
  component: [Markdown],
  description:
    "Render markdown with components that match the style of the docs.",
  options: {
    centered: {
      enabled: false,
    },
  },
};

/**
 * The markdown component is a server component that renders markdown.
 */
export const Basic = () => {
  return (
    <div {...stylex.props(styles.buffer)}>
      <div {...stylex.props(styles.wrapper)}>
        <Markdown>
          {dedent`
            # Hello World

            This is a paragraph.

            - This is a list
            - With some items

            \`\`\`tsx
            <Button>Click me</Button>
            \`\`\`

            ## This is a sub heading

            This is a paragraph.

            | Column 1 | Column 2 | Column 3 |
            | -------- | -------- | -------- |
            | Row 1    | Row 2    | Row 3    |
          `}
        </Markdown>
      </div>
    </div>
  );
};

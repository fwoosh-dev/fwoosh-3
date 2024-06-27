import path from "path";
import { promises as fs } from "fs";
import * as stylex from "@stylexjs/stylex";

import { StoryContext } from "@fwoosh/types";
import { highlightSyntax } from "@fwoosh/ui/utils/highlightSyntax";

const styles = stylex.create({
  base: {
    height: "100%",
  },
});

export default async function SourcePanel({ page }: StoryContext) {
  const contents = await fs.readFile(page.file, "utf-8");
  const html = await highlightSyntax(contents, {
    lang: path.extname(page.file).slice(1),
  });

  console.log({ html });
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      {...stylex.props(styles.base)}
    />
  );
}

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

export default async function SourcePanel({ page, story }: StoryContext) {
  const contents = await fs.readFile(page.file, "utf-8");
  const lines = contents.split("\n");
  const start =
    lines.findIndex((i) => i.startsWith(`export const ${story.name} = `)) + 1;
  const end = lines[start]?.includes("{")
    ? lines.slice(start).findIndex((i) => i.match(/^};?$/))
    : start;
  const highlightLines = new Array(end - start + 1)
    .fill(start)
    .map((base, i) => base + i);
  const html = await highlightSyntax(contents, {
    highlightLines,
    lang: path.extname(page.file).slice(1),
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      {...stylex.props(styles.base)}
    />
  );
}

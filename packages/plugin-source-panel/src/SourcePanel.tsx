import path from "path";
import { promises as fs } from "fs";
import { codeToHtml } from "shiki";
import * as stylex from "@stylexjs/stylex";

import { StoryContext } from "@fwoosh/types";
import { borderRadius, space } from "@fwoosh/ui/tokens.stylex";
import { appChrome } from "@fwoosh/ui/colors.stylex";

const styles = stylex.create({
  base: {
    height: "100%",
  },
  pre: {
    height: "100%",
    padding: space[5],
    lineHeight: 1.2,
  },
  highlight: {
    display: "inline-flex",
    backgroundColor: appChrome.elementBg,
    width: `calc(100% + (${space[4]} * 2))`,
    borderRadius: borderRadius.sm,
    padding: `0 ${space[4]}`,
    margin: `0 calc(${space[4]} * -1)`,
  },
});
const highlightAttrs = stylex.attrs(styles.highlight);

export default async function SourcePanel({ page, story }: StoryContext) {
  const contents = await fs.readFile(page.file, "utf-8");
  const lines = contents.split("\n");
  const start =
    lines.findIndex((i) => i.startsWith(`export const ${story.name} = `)) + 1;
  const end = lines[start]?.includes("{")
    ? lines.slice(start).findIndex((i) => i.match(/^};?$/))
    : start;
  const html = await codeToHtml(contents, {
    meta: stylex.attrs(styles.pre),
    transformers: [
      {
        name: "test",
        line(hast, line) {
          if (line >= start && line <= end && highlightAttrs.class) {
            this.addClassToHast(hast, highlightAttrs.class);
          }
        },
      },
    ],
    lang: path.extname(page.file).slice(1),
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      {...stylex.props(styles.base)}
    />
  );
}

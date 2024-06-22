import {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  codeToHtml,
} from "shiki";
import * as stylex from "@stylexjs/stylex";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";

const styles = stylex.create({
  base: {
    height: "100%",
  },
  pre: {
    height: "fit-content",
    lineHeight: 1.2,
    padding: space[5],
  },
  highlight: {
    backgroundColor: appChrome.elementBg,
    borderRadius: borderRadius.sm,
    display: "inline-flex",
    margin: `0 calc(${space[4]} * -1)`,
    padding: `0 ${space[4]}`,
    width: `calc(100% + (${space[4]} * 2))`,
  },
});
const highlightAttrs = stylex.attrs(styles.highlight);

export async function highlightSyntax(
  code: string,
  {
    highlightLines,
    ...options
  }: Omit<CodeToHastOptions<BundledLanguage, BundledTheme>, "themes"> & {
    highlightLines?: number[];
  }
) {
  return await codeToHtml(code, {
    meta: {
      style: stylex.attrs(styles.pre).style,
      class: `${stylex.attrs(styles.pre).class} code`,
    },
    ...options,
    transformers: [
      {
        name: "test",
        line(hast, line) {
          if (highlightLines?.includes(line) && highlightAttrs.class) {
            this.addClassToHast(hast, highlightAttrs.class);
          }
        },
      },
    ],
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}

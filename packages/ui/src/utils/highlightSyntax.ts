import {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  codeToHtml,
} from "shiki";
import * as stylex from "@stylexjs/stylex";
import { appChrome, borderRadius, space } from "../theme/tokens.stylex.js";
import { defaultConfig, getConfig } from "@fwoosh/types";

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
    display: "inline-flex",
    margin: `0 calc(${space[4]} * -1)`,
    // minHeight: "1.2rem",
    padding: `0 ${space[4]}`,
    width: `calc(100% + (${space[4]} * 2))`,
  },
  firstLineOfHighlight: {
    borderTopLeftRadius: borderRadius.sm,
    borderTopRightRadius: borderRadius.sm,
    scrollMarginTop: space[4],
  },
  lastLineOfHighlight: {
    borderBottomLeftRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
  },
  emptyLine: {
    height: "1.3rem",
    marginBottom: -5,
  },
});

export async function highlightSyntax(
  code: string,
  {
    highlightLines,
    ...options
  }: Omit<CodeToHastOptions<BundledLanguage, BundledTheme>, "themes"> & {
    highlightLines?: number[];
  }
) {
  const themes = await getConfig().then(
    (c) => c.theme?.code || defaultConfig.theme.code
  );

  return await codeToHtml(code, {
    themes: {
      light: themes.light,
      dark: themes.dark,
    },
    meta: {
      style: stylex.attrs(styles.pre).style,
      class: `${stylex.attrs(styles.pre).class} code`,
    },
    ...options,
    transformers: [
      {
        name: "test",
        line(hast, line) {
          if (highlightLines?.includes(line)) {
            const highlightAttrs = stylex.attrs(
              styles.highlight,
              line === highlightLines[0] && styles.firstLineOfHighlight,
              line === highlightLines[highlightLines.length - 1] &&
                styles.lastLineOfHighlight,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.code.children[line - 1]?.value === "\n" && styles.emptyLine
            );

            if (highlightAttrs.class) {
              this.addClassToHast(hast, highlightAttrs.class);

              if (line === highlightLines[0]) {
                this.addClassToHast(hast, "first-line");
              }
            }
          }
        },
      },
    ],
  });
}

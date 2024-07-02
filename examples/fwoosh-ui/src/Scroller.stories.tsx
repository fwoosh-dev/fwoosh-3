"use client";

import { PageMeta } from "fwoosh";
import * as stylex from "@stylexjs/stylex";

import { Scroller } from "@fwoosh/ui/components/Scroller";
import { appChrome, borderRadius } from "@fwoosh/ui/theme/tokens.stylex";

const styles = stylex.create({
  wrapper: {
    borderColor: appChrome.subtleBorder,
    borderRadius: borderRadius.md,
    borderStyle: "solid",
    borderWidth: 1,
    height: "80vh",
    margin: "auto",
    width: 100,
  },
  row: {
    background: {
      ":nth-child(odd)": appChrome.appBg,
      ":nth-child(even)": appChrome.subtleBg,
    },
    height: 25,
    width: "100%",
  },
});

export const meta: PageMeta = {
  title: "Components/Scroller",
  component: [Scroller],
  description: "A styled scroll area.",
};

export const Basic = () => {
  return (
    <Scroller style={styles.wrapper}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} {...stylex.props(styles.row)}>
          {i}
        </div>
      ))}
    </Scroller>
  );
};

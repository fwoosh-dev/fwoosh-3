"use client";

import { FwooshPluginProps, getStorySlug, storyPreviewId } from "@fwoosh/types";
import { TabPanelContent } from "@fwoosh/ui/components/Tabs";
import { FocusRing } from "@fwoosh/ui/components/FocusRing";
import { IconWrapper } from "@fwoosh/ui/components/IconButton";
import { Spinner } from "@fwoosh/ui/components/Spinner";
import * as stylex from "@stylexjs/stylex";
import { CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";

import { A11yOptions, AxeResults } from "./types.js";
import { useEffect, useState } from "react";
import {
  appChrome,
  space,
  text,
  success,
  error,
} from "@fwoosh/ui/theme/tokens.stylex";
import axe from "axe-core";
import { mergeProps, useFocusRing } from "react-aria";

const styles = stylex.create({
  loader: {
    height: "100%",
  },
  row: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    position: "relative",
    textDecoration: "none",

    color: {
      default: appChrome.subtleText,
      ":hover": appChrome.text,
    },
    outline: {
      ":focus-visible": "none",
      ":focus": "none",
    },
  },
  errorIcon: {
    color: error.solid,
  },
  successIcon: {
    color: success.solid,
  },
  label: {
    cursor: "pointer",
    fontSize: text.sm,
    paddingLeft: space[2],
    paddingRight: space[2],
  },
});

function ResultLink({ result, pass }: { result: axe.Result; pass: boolean }) {
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <a
      href={result.helpUrl}
      target="_blank"
      key={result.id}
      {...mergeProps(focusProps, stylex.props(styles.row))}
    >
      {isFocusVisible && <FocusRing />}
      {pass ? (
        <IconWrapper style={styles.successIcon}>
          <CheckCircledIcon />
        </IconWrapper>
      ) : (
        <IconWrapper style={styles.errorIcon}>
          <CrossCircledIcon />
        </IconWrapper>
      )}
      <span {...stylex.props(styles.label)}>{result.help}</span>
    </a>
  );
}

function Results({ slug }: { slug: string }) {
  const [results, setResults] = useState<AxeResults | undefined>();

  useEffect(() => {
    const iframe = document.getElementById(storyPreviewId);

    async function runAxe() {
      if (!iframe || !(iframe instanceof HTMLIFrameElement)) {
        return;
      }

      const frame = iframe as HTMLIFrameElement;

      await new Promise<void>((resolve) => {
        function testReady() {
          if (!frame.contentWindow?.runAxe) {
            return;
          }

          if (!frame.contentWindow.checkSlug(slug)) {
            return;
          }

          resolve();
          clearInterval(interval);
        }

        const interval = setInterval(testReady, 100);
      });

      const results = await frame.contentWindow?.runAxe();
      setResults(results);
    }

    runAxe();
  }, [slug]);

  if (!results) {
    return (
      <TabPanelContent style={styles.loader}>
        <Spinner />
      </TabPanelContent>
    );
  }

  return (
    <TabPanelContent>
      {results.violations.map((violation) => (
        <ResultLink key={violation.id} result={violation} pass={false} />
      ))}
      {results.passes.map((pass) => (
        <ResultLink key={pass.id} result={pass} pass={true} />
      ))}
    </TabPanelContent>
  );
}

export default function A11y({ page, story }: FwooshPluginProps<A11yOptions>) {
  const slug = getStorySlug(page, story);
  return <Results key={slug} slug={slug} />;
}

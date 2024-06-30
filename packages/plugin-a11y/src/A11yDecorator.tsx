"use client";

import { FwooshPluginProps } from "@fwoosh/types";
import axe from "axe-core";

import { A11yOptions, AxeResults } from "./types.js";
import { useEffect } from "react";

const ignoredRules = [
  "html-has-lang",
  "document-title",
  "landmark-one-main",
  "page-has-heading-one",
  "region",
];

declare global {
  interface Window {
    runAxe: () => Promise<AxeResults>;
    checkSlug: (testSlug: string) => boolean;
  }
}

export default function A11yDecorator({
  children,
}: FwooshPluginProps<A11yOptions> & {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let currentRun: Promise<AxeResults> | undefined;

    window.runAxe = async () => {
      if (currentRun) {
        await currentRun;
      }

      currentRun = axe.run();

      const results = await currentRun;

      return {
        passes: results.passes,
        violations: results.violations.filter(
          (violation) => !ignoredRules.includes(violation.id)
        ),
      };
    };

    window.checkSlug = (testSlug: string) => {
      return window.location.pathname.endsWith(testSlug);
    };
  }, [children]);

  return <>{children}</>;
}

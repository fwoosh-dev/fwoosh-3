"use client";

import { PageMeta } from "fwoosh";

import { InlineCode } from "@fwoosh/ui/components/InlineCode";

export const meta: PageMeta = {
  title: "Components/InlineCode",
  component: [InlineCode],
  description: "A piece of code that is displayed inline with other content.",
};

/**
 * Use this to wrap bits of code or to emphasize a piece of text.
 */
export const Basic = () => {
  return <InlineCode>{'const foo = "bar";'}</InlineCode>;
};

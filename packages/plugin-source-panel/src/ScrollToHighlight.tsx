"use client";

import { useLayoutEffect } from "react";

export function ScrollToHighlight({ target }: { target: string }) {
  useLayoutEffect(() => {
    const element = document.querySelector(`.${target}`);

    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [target]);

  return null;
}

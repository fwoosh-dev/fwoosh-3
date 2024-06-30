"use client";

import { useLayoutEffect } from "yet-another-react-lightbox";

export function ScrollToHighlight({ target }: { target: string }) {
  useLayoutEffect(() => {
    const element = document.querySelector(`.${target}`);

    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [target]);

  return null;
}

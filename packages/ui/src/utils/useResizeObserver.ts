import React, { useLayoutEffect, useRef } from "react";

export function useResizeObserver<T extends HTMLElement>({
  ref,
  onResize,
}: {
  ref: React.RefObject<T>;
  onResize: (entry: ResizeObserverEntry) => void;
}) {
  const onResizeRef = useRef(onResize);

  onResizeRef.current = onResize;

  useLayoutEffect(() => {
    const target = ref?.current;

    if (!target) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        onResizeRef.current(entries[0]);
      }
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [ref, onResize]);
}

"use client";

import { useEffect } from "react";
import { useRouter_UNSTABLE as useRouter } from "waku";
import { useRefetch } from "waku/client";

declare global {
  interface ImportMeta {
    hot: {
      on: Function;
    };
  }
}

export function StoryHMRDetector() {
  const refetch = useRefetch();
  const router = useRouter();

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on(
        "vite:beforeUpdate",
        (e: { updates: Array<{ path: string }> }) => {
          const shouldUpdate = e.updates.some((u) =>
            u.path.includes(".stories.")
          );

          if (shouldUpdate) {
            refetch(router.path.slice(1));
          }
        }
      );
    }
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { useRouter_UNSTABLE as useRouter } from "waku";
import { useRefetch } from "waku/client";

declare global {
  interface ImportMeta {
    hot: {
      on: (
        event: "vite:beforeUpdate",
        cb: (e: { updates: Array<{ path: string }> }) => void
      ) => void;
      off: (
        event: "vite:beforeUpdate",
        cb: (e: { updates: Array<{ path: string }> }) => void
      ) => void;
    };
  }
}

export function StoryHMRDetector() {
  const refetch = useRefetch();
  const router = useRouter();

  useEffect(() => {
    if (import.meta.hot) {
      function onBeforeUpdate(e: { updates: Array<{ path: string }> }) {
        const shouldUpdate = e.updates.some((u) =>
          u.path.includes(".stories.")
        );

        if (shouldUpdate) {
          refetch(router.path.slice(1));
        }
      }

      import.meta.hot.on("vite:beforeUpdate", onBeforeUpdate);

      return () => {
        import.meta.hot.off("vite:beforeUpdate", onBeforeUpdate);
      };
    }
  }, [refetch, router.path]);

  return null;
}

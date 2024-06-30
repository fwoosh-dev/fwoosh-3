"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { getStorySlug } from "@fwoosh/types";
import { useStoryContext } from "@fwoosh/ui";

import { setItem } from "./store.js";
import { Control } from "./types.js";

function useStoryUpdate<T>({
  label,
  value,
  storyId,
  onUpdate,
}: {
  label: string;
  value: T;
  storyId: string;
  onUpdate: (value: T) => void;
}) {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data === "update-controls") {
        const current = JSON.parse(localStorage.getItem(storyId) || "{}")[
          label
        ];

        if (current.value !== value) {
          onUpdate(current.value);
        }
      }
    }

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [storyId, label, onUpdate, value]);
}

export function useControl<const T>(props: Control<T>) {
  const [value, setValue] = useState(props.value);
  const storyContext = useStoryContext(`controls_${props.label}`);
  const storyId = `controls_${getStorySlug(
    storyContext.page,
    storyContext.story
  )}`;

  useStoryUpdate({ label: props.label, value, storyId, onUpdate: setValue });

  // set the initial value
  useLayoutEffect(() => {
    setItem({
      scope: "iframe",
      id: storyId,
      value: props,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value] as const;
}

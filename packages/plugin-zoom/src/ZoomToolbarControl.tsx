"use client";

import { useCallback, useEffect, useState } from "react";
import { storyPreviewId } from "@fwoosh/types";
import { HStack } from "@fwoosh/ui/components/HStack";
import { IconButton } from "@fwoosh/ui/components/IconButton";
import { Tooltip, TooltipTrigger } from "@fwoosh/ui/components/Tooltip";
import { PlusIcon, MinusIcon, ResetIcon } from "@radix-ui/react-icons";

function browserSupportsCssZoom(): boolean {
  try {
    return (
      // @ts-expect-error (we're testing for browser support)
      global.document.implementation.createHTMLDocument("").body.style.zoom !==
      undefined
    );
  } catch {
    return false;
  }
}

const hasBrowserSupportForCssZoom = browserSupportsCssZoom();

export default function ZoomToolbarControl() {
  const [zoom, zoomSet] = useState(100);
  // const zoomInLabel = "Zoom in";
  // const zoomOutLabel = "Zoom out";
  // const zoomResetLabel = "Reset zoom";

  const increaseZoom = useCallback(() => {
    zoomSet((z) => z * 1.2);
  }, []);

  const decreaseZoom = useCallback(() => {
    zoomSet((z) => z * 0.8);
  }, []);

  const resetZoom = useCallback(() => {
    zoomSet(100);
  }, []);

  useEffect(() => {
    const storyPreview = document.getElementById(storyPreviewId);

    if (storyPreview) {
      if (hasBrowserSupportForCssZoom) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (storyPreview.style as any).zoom = `${zoom / 100}`;
      } else {
        storyPreview.style.transformOrigin = "top left";

        if (zoom === 100) {
          storyPreview.style.transform = "none";
        } else {
          storyPreview.style.transform = `scale(${zoom / 100})`;
        }
      }
    }
  }, [zoom]);

  return (
    <HStack gap={3}>
      <TooltipTrigger>
        <IconButton variant="toolbar" onPress={increaseZoom}>
          <PlusIcon />
        </IconButton>
        <Tooltip>Zoom in</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton variant="toolbar" onPress={decreaseZoom}>
          <MinusIcon />
        </IconButton>
        <Tooltip>Zoom out</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton variant="toolbar" onPress={resetZoom}>
          <ResetIcon />
        </IconButton>
        <Tooltip>Reset zoom</Tooltip>
      </TooltipTrigger>
    </HStack>
  );
}

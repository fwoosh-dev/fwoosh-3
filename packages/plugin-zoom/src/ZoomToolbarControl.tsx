"use client";

import { useCallback, useEffect, useState } from "react";
import { storyPreviewId } from "@fwoosh/types";
import { HStack } from "@fwoosh/ui/components/HStack";
import { IconButton } from "@fwoosh/ui/components/IconButton";
import { Tooltip, TooltipTrigger } from "@fwoosh/ui/components/Tooltip";
import { PlusIcon, MinusIcon, ResetIcon } from "@radix-ui/react-icons";

export default function ZoomToolbarControl() {
  const [zoom, zoomSet] = useState(100);

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

    if (!storyPreview) {
      return;
    }

    storyPreview.style.transformOrigin = "top left";

    if (zoom === 100) {
      storyPreview.style.transform = "none";
      storyPreview.style.width = "100%";
      storyPreview.style.height = "100%";
    } else {
      const scale = zoom / 100;
      storyPreview.style.transform = `scale(${scale})`;
      storyPreview.style.width = `calc(100% * ${1 / scale})`;
      storyPreview.style.height = `calc(100% * ${1 / scale})`;
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

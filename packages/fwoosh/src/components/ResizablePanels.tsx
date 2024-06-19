"use client";

import { ResizeHandle } from "@fwoosh/ui/app";
import { useState } from "react";
import {
  Panel as PanelBase,
  PanelGroup as PanelGroupBase,
  PanelGroupProps,
  PanelProps,
  PanelResizeHandle as PanelResizeHandleBase,
  PanelResizeHandleProps,
} from "react-resizable-panels";

export const Panel = (props: PanelProps) => <PanelBase {...props} />;
export const PanelGroup = (props: PanelGroupProps) => (
  <PanelGroupBase {...props} />
);

export const PanelResizeHandle = (
  props: Omit<PanelResizeHandleProps, "children">
) => {
  const [isDragging, isDraggingSet] = useState(false);

  return (
    <PanelResizeHandleBase onDragging={isDraggingSet} {...props}>
      <ResizeHandle isDragging={isDragging} />
    </PanelResizeHandleBase>
  );
};

"use client";

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
export const PanelResizeHandle = (props: PanelResizeHandleProps) => (
  <PanelResizeHandleBase {...props} />
);

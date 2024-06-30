"use client";

import { Key, useCallback, useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import { TabPanelContent } from "@fwoosh/ui/components/Tabs";
import { Label } from "@fwoosh/ui/components/Label";
import { Input, TextField } from "@fwoosh/ui/components/TextField";
import { Select, SelectOption } from "@fwoosh/ui/components/Select";

import { setItem } from "./store.js";
import { Control, SelectControl, TextControl } from "./types.js";
import { space } from "@fwoosh/ui/theme/tokens.stylex";
import { StoryContext, getStorySlug } from "@fwoosh/types";

const styles = stylex.create({
  list: {
    alignItems: "center",
    display: "grid",
    gap: space[5],
    gridTemplateColumns: "max-content minmax(max-content, 1fr)",
  },
  row: {
    display: "contents",
  },
});

function TextControlComponent<T>({
  label,
  value: initialValue,
  storyId,
}: TextControl<T> & { storyId: string }) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (newValue: string) => {
      setValue(newValue as T);
      setItem({
        scope: "app",
        id: storyId,
        value: {
          type: "text",
          value: newValue,
          label,
        },
      });
    },
    [label, storyId]
  );

  return (
    <TextField style={styles.row}>
      <Label>{label}</Label>
      <Input
        type="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      />
    </TextField>
  );
}

function SelectControlComponent({
  label,
  value: initialValue,
  options,
  storyId,
}: SelectControl<string> & { storyId: string }) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (newValue: Key) => {
      setValue(newValue as string);
      setItem({
        scope: "app",
        id: storyId,
        value: {
          type: "select",
          value: newValue as string,
          label,
          options,
        },
      });
    },
    [label, options, storyId]
  );

  return (
    <Select
      style={styles.row}
      label={label}
      selectedKey={value}
      onSelectionChange={onChange}
      items={options.map((o) => ({ label: o, id: o }))}
    >
      {(item) => <SelectOption>{item.label}</SelectOption>}
    </Select>
  );
}

function ControlPanelRenderer({ page, story }: StoryContext) {
  const [controls, setControls] = useState<Array<[string, Control<unknown>]>>(
    []
  );
  const storyId = `controls_${getStorySlug(page, story)}`;

  useEffect(() => {
    function onUpdate() {
      const stored = localStorage.getItem(storyId);

      if (!stored) {
        return;
      }

      const value = JSON.parse(stored);

      setControls(Object.entries(value));
    }

    // Fire when mounted
    onUpdate();

    window.document.addEventListener("controls-updated", onUpdate);

    return () => {
      window.document.removeEventListener("controls-updated", onUpdate);
    };
  }, [storyId]);

  if (!controls.length) {
    return <TabPanelContent>No controls found for story</TabPanelContent>;
  }

  return (
    <TabPanelContent>
      <div {...stylex.props(styles.list)}>
        {controls.map(([, value]) =>
          value.type === "text" ? (
            <TextControlComponent
              key={value.label}
              storyId={storyId}
              {...value}
            />
          ) : value.type === "select" ? (
            <SelectControlComponent
              key={value.label}
              storyId={storyId}
              {...(value as SelectControl<string>)}
            />
          ) : null
        )}
      </div>
    </TabPanelContent>
  );
}

export default function ControlPanel({ page, story }: StoryContext) {
  const key = getStorySlug(page, story);
  return <ControlPanelRenderer key={key} page={page} story={story} />;
}

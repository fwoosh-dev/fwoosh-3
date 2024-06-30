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
}: TextControl<T>) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (newValue: string) => {
      const id = `controls_${"STORY_ID"}`;

      setValue(newValue as T);
      setItem({
        scope: "app",
        id,
        value: {
          type: "text",
          value: newValue,
          label,
        },
      });
    },
    [label]
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
}: SelectControl<string>) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (newValue: Key) => {
      const id = `controls_${"STORY_ID"}`;

      setValue(newValue as string);
      setItem({
        scope: "app",
        id,
        value: {
          type: "select",
          value: newValue as string,
          label,
          options,
        },
      });
    },
    [label, options]
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

export default function ControlPanel() {
  const [controls, setControls] = useState<Array<[string, Control<unknown>]>>(
    []
  );

  useEffect(() => {
    function onUpdate() {
      const stored = localStorage.getItem(`controls_${"STORY_ID"}`);

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
  }, []);

  return (
    <TabPanelContent>
      <div {...stylex.props(styles.list)}>
        {controls.map(([, value]) =>
          value.type === "text" ? (
            <TextControlComponent key={value.label} {...value} />
          ) : value.type === "select" ? (
            <SelectControlComponent
              key={value.label}
              {...(value as SelectControl<string>)}
            />
          ) : null
        )}
      </div>
    </TabPanelContent>
  );
}

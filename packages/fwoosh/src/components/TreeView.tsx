"use client";

// import { Link } from "waku";
// import { space } from "@fwoosh/ui/theme.stylex";

import { use, useMemo } from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { TreeItemProps } from "@mui/x-tree-view/TreeItem";
import { TreeItem2 } from "@mui/x-tree-view/TreeItem2";
import * as stylex from "@stylexjs/stylex";

import { borderRadius, space, text } from "@fwoosh/ui/theme.stylex";
import { gray } from "@fwoosh/ui/colors.stylex";
import { useRouter_UNSTABLE as useRouter } from "waku";

// import { getAllPageGroups, getStorySlug } from "../utils/stories";

const treeStyles = stylex.create({
  root: {
    padding: space[8],
  },
  item: {
    position: "relative",
    zIndex: 0,
    minHeight: space[7],
    padding: `${space[3]} ${space[4]}`,
    background: "transparent",
    userSelect: "none",
    cursor: "default",
    "::before": {
      position: "absolute",
      inset: 1,
      content: "''",
      borderRadius: borderRadius.sm,
      zIndex: -1,
      backgroundColor: gray.hover,
      opacity: {
        default: 0,
        ":hover": 1,
      },
    },
  },
  itemLabel: {
    fontSize: text.xs,
  },
  itemSelected: {
    "::before": {
      opacity: 1,
    },
  },
});

function getIds(items: TreeViewBaseItem[]): string[] {
  return items
    .map((item) => {
      if (item.children) {
        return [item.id, ...getIds(item.children)];
      }

      return [item.id];
    })
    .flat();
}

function MyTreeItem(props: TreeItemProps) {
  return (
    <TreeItem2
      {...props}
      classes={{
        content: stylex.attrs(treeStyles.item).class,
        selected: stylex.attrs(treeStyles.itemSelected).class,
        label: stylex.attrs(treeStyles.itemLabel).class,
      }}
    />
  );
}

export function TreeView({ data }: { data: TreeViewBaseItem[] }) {
  const expandedIds = useMemo(() => getIds(data), [data]);
  const router = useRouter();
  const defaultSelectedItems = router.path.split("/").slice(2).join("/");

  return (
    <RichTreeView
      slots={{ item: MyTreeItem }}
      defaultExpandedItems={expandedIds}
      items={data}
      selectedItems={defaultSelectedItems}
      onItemSelectionToggle={(_, itemId: string) => {
        if (itemId.includes("_")) {
          router.push(`/bench/${itemId}`);
        }
      }}
    />
  );
}

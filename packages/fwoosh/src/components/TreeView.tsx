"use client";

// import { Link } from "waku";
// import { space } from "@fwoosh/ui/tokens.stylex";

import { use, useMemo } from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { TreeItemProps } from "@mui/x-tree-view/TreeItem";
import { TreeItem2 } from "@mui/x-tree-view/TreeItem2";
import * as stylex from "@stylexjs/stylex";

import { borderRadius, space, text } from "@fwoosh/ui/tokens.stylex";
import { appChrome, primaryA } from "@fwoosh/ui/colors.stylex";
import { useRouter_UNSTABLE as useRouter } from "waku";

// import { getAllPageGroups, getStorySlug } from "../utils/stories";

const treeStyles = stylex.create({
  root: {
    padding: space[8],
  },
  content: {
    position: "relative",
    zIndex: 0,
    minHeight: space[7],
    padding: `${space[3]} ${space[4]}`,
    color: {
      default: appChrome.subtleText,
      ":is(.Mui-selected)": appChrome.text,
    },
    background: {
      default: "transparent",
      ":hover": appChrome.hover,
      ":is(.Mui-selected)": primaryA.active,
    },
    margin: space[1],
    userSelect: "none",
    cursor: "default",
  },
  label: {
    fontSize: text.xs,
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
        content: stylex.attrs(treeStyles.content).class,
        label: stylex.attrs(treeStyles.label).class,
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
      onSelectedItemsChange={(_, itemId) => {
        if (itemId?.includes("_")) {
          router.push(`/bench/${itemId}`);
        }
      }}
    />
  );
}

"use client";

import { startTransition, useMemo, useOptimistic } from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { TreeItemProps } from "@mui/x-tree-view/TreeItem";
import { TreeItem2 } from "@mui/x-tree-view/TreeItem2";
import * as stylex from "@stylexjs/stylex";

import { space, text } from "@fwoosh/ui/tokens.stylex";
import { appChrome, primaryA } from "@fwoosh/ui/tokens.stylex";
import { useRouter_UNSTABLE as useRouter } from "waku";

const treeStyles = stylex.create({
  root: {
    padding: space[8],
  },
  content: {
    backgroundColor: {
      default: "transparent",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":is(.Mui-selected)": {
        default: primaryA.active,
        ":hover": primaryA.hoveredBorder,
      },
      ":hover": appChrome.hover,
    },
    color: {
      default: appChrome.subtleText,
      ":is(.Mui-selected)": appChrome.text,
      ":hover": appChrome.text,
    },
    cursor: "default",
    margin: space[1],
    minHeight: space[7],
    padding: `${space[3]} ${space[4]}`,
    position: "relative",
    userSelect: "none",
    zIndex: 0,
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

export function TreeView({
  data,
  active,
}: {
  data: TreeViewBaseItem[];
  active: string;
}) {
  const expandedIds = useMemo(() => getIds(data), [data]);
  const router = useRouter();
  const [optimisticActive, setActiveOptimistic] = useOptimistic(active);

  return (
    <RichTreeView
      slots={{ item: MyTreeItem }}
      defaultExpandedItems={expandedIds}
      items={data}
      selectedItems={optimisticActive}
      onSelectedItemsChange={(_, itemId) => {
        if (itemId?.includes("_")) {
          setActiveOptimistic(itemId);
          startTransition(() => {
            router.push(`/bench/${itemId}`);
          });
        }
      }}
    />
  );
}

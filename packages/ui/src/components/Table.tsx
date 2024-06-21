"use client";

import {
  Cell as CellPrimitive,
  CellProps,
  Column as ColumnPrimitive,
  ColumnProps,
  Row as RowPrimitive,
  RowProps,
  Table as TablePrimitive,
  TableProps,
  TableBody as TableBodyPrimitive,
  TableBodyProps,
  TableHeader as TableHeaderPrimitive,
  TableHeaderProps,
} from "react-aria-components";
import { mergeProps } from "react-aria";
import * as stylex from "@stylexjs/stylex";
import {
  borderRadius,
  fontWeight,
  space,
  text,
} from "../theme/tokens.stylex.js";
import { appChrome } from "../theme/colors.stylex.js";
import { useState } from "react";
import { createContext } from "@radix-ui/react-context";

const tableStyles = stylex.create({
  root: {
    border: `1px solid ${appChrome.subtleBorder}`,
    borderRadius: borderRadius.md,
    margin: `${space[5]} 0`,
    borderSpacing: 0,
  },
  body: {},
  row: {
    position: "relative",
    zIndex: 0,
  },
  rowHover: {
    "::before": {
      display: "block",
      borderRadius: borderRadius.mdInset,
      zIndex: -1,
      content: "''",
      backgroundColor: appChrome.elementBg,
      position: "absolute",
      inset: 2,
    },
  },
  column: {
    fontSize: text.xs,
    fontWeight: fontWeight.semibold,
    textAlign: "left",
    padding: `${space[3]} ${space[4]}`,
    borderBottom: `1px solid ${appChrome.subtleBorder}`,
  },
  cell: {
    fontSize: text.sm,
    textAlign: "left",
  },
  cellInner: {
    display: "flex",
    alignItems: "center",
    minHeight: space[7],
    padding: `${space[3]} ${space[4]}`,
  },
  header: {
    height: space[7],
  },
});

export function TableColumn(props: Omit<ColumnProps, "className" | "style">) {
  return <ColumnPrimitive {...props} {...stylex.props(tableStyles.column)} />;
}

const [HoverContextProvider, useHoverContext] = createContext("TableRow", {
  hovered: false,
});

export interface TableRowProps<T extends object>
  extends Omit<RowProps<T>, "className" | "style"> {}

export function TableRow<T extends object>({ ...props }: TableRowProps<T>) {
  const [isHovered, isHoveredSet] = useState(false);

  return (
    <HoverContextProvider hovered={isHovered}>
      <RowPrimitive
        {...mergeProps(props, { onHoverChange: isHoveredSet })}
        {...stylex.props(tableStyles.row)}
      />
    </HoverContextProvider>
  );
}

interface TableCellProps
  extends Omit<CellProps, "className" | "style" | "children"> {
  children: React.ReactNode;
}

export function TableCell({ children, ...props }: TableCellProps) {
  const { hovered } = useHoverContext("TableCell");

  return (
    <CellPrimitive
      {...props}
      {...stylex.props(tableStyles.cell, hovered && tableStyles.rowHover)}
    >
      <div {...stylex.props(tableStyles.cellInner)}>{children}</div>
    </CellPrimitive>
  );
}

export function Table(props: Omit<TableProps, "className" | "style">) {
  return <TablePrimitive {...props} {...stylex.props(tableStyles.root)} />;
}

export function TableBody<T extends object>(
  props: Omit<TableBodyProps<T>, "className" | "style">
) {
  return <TableBodyPrimitive {...props} {...stylex.props(tableStyles.body)} />;
}

export function TableHeader<T extends object>(
  props: Omit<TableHeaderProps<T>, "className" | "style">
) {
  return (
    <TableHeaderPrimitive {...props} {...stylex.props(tableStyles.header)} />
  );
}

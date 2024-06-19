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

export function TableCell(props: CellProps) {
  return <CellPrimitive {...props} />;
}

export function TableColumn(props: ColumnProps) {
  return <ColumnPrimitive {...props} />;
}

export function TableRow<T extends object>(props: RowProps<T>) {
  return <RowPrimitive {...props} />;
}

export function Table(props: TableProps) {
  return <TablePrimitive {...props} />;
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return <TableBodyPrimitive {...props} />;
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  return <TableHeaderPrimitive {...props} />;
}

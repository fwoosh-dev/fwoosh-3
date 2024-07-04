"use client";

import { PageMeta } from "fwoosh";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@fwoosh/ui/components/Table";

export const meta: PageMeta = {
  title: "Components/Table",
  component: [Table, TableBody, TableCell, TableColumn, TableHeader, TableRow],
  description:
    "A table displays data in rows and columns and enables a user to navigate its contents via directional navigation keys, and optionally supports row selection and sorting.",
};

export const Basic = () => {
  return (
    <Table aria-label="Example table">
      <TableHeader>
        <TableColumn isRowHeader>Name</TableColumn>
        <TableColumn isRowHeader>Description</TableColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Apple</TableCell>
          <TableCell>A delicious fruit</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Banana</TableCell>
          <TableCell>A yellow fruit</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Orange</TableCell>
          <TableCell>A citrus fruit</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

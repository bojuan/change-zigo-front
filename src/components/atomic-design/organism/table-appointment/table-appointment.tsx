"use client";

import { FunctionComponent } from "react";
import { flexRender } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Appointment } from "@/interfaces/appointment";
import useTableAppointment from "./use-table-appointment/use-table-appointment";

export const TableAppointment: FunctionComponent<{
  data: Appointment[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}> = ({ data, onEdit, onRemove, onAdd }) => {
  const { table } = useTableAppointment(data, onEdit, onRemove);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between	 py-4">
        <Input
          placeholder="Buscar por Id"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn("id")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <div>
          <Button onClick={onAdd}>Agregar</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getRowModel().rows?.length}
                  className="h-24 text-center"
                >
                  Id no encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

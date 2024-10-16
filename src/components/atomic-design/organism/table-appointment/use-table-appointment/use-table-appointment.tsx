import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Appointment } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";
import { Button } from "@/components/ui/button";

const getColumns = (
  onEdit: (id: string) => void,
  onRemove: (id: string) => void
): ColumnDef<Appointment>[] => {
  return [
    {
      accessorKey: "id",
      header: "Id Cita",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "client",
      header: "Nombre Cliente",
      cell: ({ row }) => (
        <span>{(row.getValue("client") as Client)["name"]}</span>
      ),
    },
    {
      id: "email",
      accessorKey: "client",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">
          {(row.getValue("client") as Client).email}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },

    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("date")}</div>
      ),
    },
    {
      accessorKey: "time",
      header: "Hora",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("time")}</div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const appointment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(appointment.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRemove(appointment.id)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

function useTableAppointment(
  data: Appointment[],
  onEdit: (id: string) => void,
  onRemove: (id: string) => void
) {


  const table = useReactTable({
    data,
    columns: getColumns(onEdit, onRemove),
    getCoreRowModel: getCoreRowModel(),
  });

  return { table };
}

export default useTableAppointment;

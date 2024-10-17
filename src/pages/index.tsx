import Layout from "@/app/layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TableAppointment } from "@/components/atomic-design/organism/table-appointment/table-appointment";
import { Appointment } from "@/interfaces/appointment";
import { useManagerUI } from "@/store/app-store";
import { useRouter } from "next/router";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const data: Appointment[] = [
  {
    id: "m5gr84i9",

    status: "success",

    title: "Cita inicial",
    description: "Esta es uan cita inicial",
    date: "2024-11-16",
    time: "12:00",
    location: "Quicentro Norte",
    client: {
      name: "Juan Esteban Rodriguez",
      email: "juan_rod@gmail.com",
      phone: "0999999999",
    },
    createdAt: "YYYY-MM-DDTHH:mm:ssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
  },
  {
    id: "abc",

    status: "success",

    title: "Cita inicial",
    description: "Esta es uan cita inicial",
    date: "2024-11-16",
    time: "12:00",
    location: "Quicentro Norte",
    client: {
      name: "Juan Esteban Rodriguez",
      email: "auan_rod@gmail.com",
      phone: "0999999999",
    },
    createdAt: "YYYY-MM-DDTHH:mm:ssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
  },
];

export default function Home() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [appointmentToRemove, setAppointmentToRemove] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handlerRemove = (id: string) => {
    console.log("Remove", id);
    setOpenAlert(true);
    setAppointmentToRemove(id);
  };

  const approveRemove = () => {
    setLoading(true);
    //remove appointmentToRemove
    setLoading(false);
    setOpenAlert(false);

    setAppointmentToRemove(null);
  };

  const cancelRemove = () => {
    setOpenAlert(false);
    setAppointmentToRemove(null);
  };

  return (
    <Layout>
      <h2 className="text-4xl mb-12 font-bold">Lista de Citas</h2>

      <TableAppointment
        data={data}
        onEdit={(id) => router.push(`/edit/${id}`)}
        onRemove={handlerRemove}
        onAdd={() => router.push(`/create`)}
      />

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desear eliminar esta cita?</AlertDialogTitle>
            <AlertDialogDescription>
              Al eliminar esta cita ({appointmentToRemove}), no podrás verla en la lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRemove}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={approveRemove} disabled={loading}>
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}

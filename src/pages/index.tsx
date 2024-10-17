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
import { useRouter } from "next/router";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import { getAppointments } from "@/services/appointment";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: getAppointments,
  });

  const router = useRouter();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [appointmentToRemove, setAppointmentToRemove] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handlerRemove = (id: string) => {
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
    <>
      <h2 className="text-4xl mb-12 font-bold">Lista de Citas</h2>

      <TableAppointment
        data={data ?? []}
        onEdit={(id) => router.push(`/edit/${id}`)}
        onRemove={handlerRemove}
        onAdd={() => router.push(`/create`)}
      />

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desear eliminar esta cita?</AlertDialogTitle>
            <AlertDialogDescription>
              Al eliminar esta cita ({appointmentToRemove}), no podrás verla en
              la lista.
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
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get-appointments"],
    queryFn: getAppointments,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient), // Hydrate the query on the client
    },
  };
}

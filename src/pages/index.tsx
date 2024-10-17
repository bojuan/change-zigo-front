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
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getAppointments } from "@/services/appointment";
import { useHome } from "@/hooks/pages/use-home";

export default function Home() {
  const {
    router,
    data,
    openAlert,
    appointmentToRemove,
    loading,
    handlerRemove,
    approveRemove,
    cancelRemove,
  } = useHome();

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

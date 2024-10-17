import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormClient from "@/components/atomic-design/organism/form-client/form-client";
import FormAppointment from "@/components/atomic-design/organism/form-appointment/form-appointment";
import { Button } from "@/components/ui/button";
import { useEdit } from "@/hooks/pages/use-edit";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getAppointmentById } from "@/services/appointment";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Edit() {
  const {
    idAppointment,
    valuesClientForm,
    valuesAppointmentForm,
    isValidClientForm,
    isValidAppointmentForm,
    loading,
    validateClientForm,
    validateAppointmentForm,
    getDataClientForm,
    getDataAppointmentForm,
    onSubmitEdit,
    goBack,
  } = useEdit();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl mb-1 font-bold">Editar Cita</h2>
        <p>Id Cita: {idAppointment}</p>
      </div>

      <div className="flex flex-col	items-center gap-8">
        <Tabs defaultValue="client" className="w-[400px]">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="client" className="flex-1">
              Cliente
            </TabsTrigger>
            <TabsTrigger value="appointment" className="flex-1">
              Cita
            </TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <FormClient
              defaultValues={valuesClientForm.current}
              validateForm={validateClientForm}
              getDataForm={getDataClientForm}
            />
          </TabsContent>
          <TabsContent value="appointment">
            <FormAppointment
              defaultValues={valuesAppointmentForm.current}
              validateForm={validateAppointmentForm}
              getDataForm={getDataAppointmentForm}
            />
          </TabsContent>
        </Tabs>
        <div className="gap-4 flex flex-col items-center">
          <Button
            disabled={!isValidClientForm || !isValidAppointmentForm || loading}
            className="w-[400px]"
            onClick={onSubmitEdit}
          >
            {loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Editar
          </Button>
          <Button variant="secondary" className="w-[400px]" onClick={goBack}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["get-appointment"],
    queryFn: getAppointmentById,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient), // Hydrate the query on the client
    },
  };
}

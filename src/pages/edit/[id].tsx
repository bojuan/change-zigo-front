import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormClient from "@/components/atomic-design/organism/form-client/form-client";
import FormAppointment from "@/components/atomic-design/organism/form-appointment/form-appointment";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Client } from "@/interfaces/client";
import { Appointment, AppointmentForm } from "@/interfaces/appointment";

const data = {
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
};

export default function Edit() {
  const router = useRouter();
  const [isValidClientForm, setIsValidClientForm] = useState<boolean>(true);
  const [isValidAppointmentForm, setIsValidAppointmentForm] =
    useState<boolean>(true);

  const valuesClientForm = useRef<Client>(data.client);
  const valuesAppointmentForm = useRef<AppointmentForm>({
    title: data.title,
    description: data.description,
    date: data.date,
    time: data.time,
    location: data.location,
  });

  const validateClientForm = (isValid: boolean) => {
    setIsValidClientForm(isValid);
  };

  const validateAppointmentForm = (isValid: boolean) => {
    setIsValidAppointmentForm(isValid);
  };

  const getDataClientForm = (data: Client) => {
    valuesClientForm.current = data;
  };

  const getDataAppointmentForm = (data: AppointmentForm) => {
    valuesAppointmentForm.current = data;
  };

  const onSubmitEdit = () => {
    const dataToSendEdit: Appointment = {
      ...data,
      ...valuesAppointmentForm.current,
      client: { ...valuesClientForm.current },
    };

    console.log(dataToSendEdit);
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl mb-1 font-bold">Editar Cita</h2>
        <p>Id Cita: {router.query.id}</p>
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
            disabled={!isValidClientForm || !isValidAppointmentForm}
            className="w-[400px]"
            onClick={onSubmitEdit}
          >
            Editar
          </Button>
          <Button
            variant="secondary"
            className="w-[400px]"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
}

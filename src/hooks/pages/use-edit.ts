import { Appointment, AppointmentForm } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";
import { getAppointmentById } from "@/services/appointment";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export function useEdit() {
  const { data } = useQuery({
    queryKey: ["get-appointment"],
    queryFn: getAppointmentById,
  });

  const router = useRouter();
  const [isValidClientForm, setIsValidClientForm] = useState<boolean>(true);
  const [isValidAppointmentForm, setIsValidAppointmentForm] =
    useState<boolean>(true);

  const valuesClientForm = useRef<Client>(data!.client);
  const valuesAppointmentForm = useRef<AppointmentForm>({
    title: data!.title,
    description: data!.description,
    date: data!.date,
    time: data!.time,
    location: data!.location,
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
      ...data!,
      ...valuesAppointmentForm.current,
      client: { ...valuesClientForm.current },
    };
  };

  return {
    idAppointment: router.query.id,
    valuesClientForm,
    valuesAppointmentForm,
    isValidClientForm,
    isValidAppointmentForm,
    validateClientForm,
    validateAppointmentForm,
    getDataClientForm,
    getDataAppointmentForm,
    onSubmitEdit,
    goBack: ()=>{router.back()}
  };
}

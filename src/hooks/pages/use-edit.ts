import { Appointment, AppointmentForm } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";
import { getAppointmentById, updateAppointment } from "@/services/appointment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export function useEdit() {
  const { data } = useQuery({
    queryKey: ["get-appointment"],
    queryFn: getAppointmentById,
  });

  const mutation = useMutation({
    mutationFn: updateAppointment,
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

  const onSubmitEdit = async() => {
    const dataToSendEdit: Appointment = {
      ...data!,
      ...valuesAppointmentForm.current,
      client: { ...valuesClientForm.current },
    };

    await mutation.mutateAsync(dataToSendEdit)
    router.push(`/`);
  };

  return {
    idAppointment: router.query.id,
    valuesClientForm,
    valuesAppointmentForm,
    isValidClientForm,
    isValidAppointmentForm,
    loading: mutation.isPending,
    validateClientForm,
    validateAppointmentForm,
    getDataClientForm,
    getDataAppointmentForm,
    onSubmitEdit,
    goBack: ()=>{router.back()}
  };
}

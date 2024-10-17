import { AppointmentForm } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";
import { createAppointment } from "@/services/appointment";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useToast } from "../use-toast";

export function useCreate() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCurrentValid, setIsCurrentValid] = useState<boolean>(false);
  const valueForm = useRef<Client | AppointmentForm | null>(null);
  const [valueFormsToSend, setValueFormToSend] = useState<{
    client: Client | null;
    appointment: AppointmentForm | null;
  }>({
    client: null,
    appointment: null,
  });
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createAppointment,
  });

  const validateCurrentValid = (isValid: boolean) => {
    setIsCurrentValid(isValid);
  };

  const getDataForm = (data: Client | AppointmentForm) => {
    valueForm.current = data;
  };

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextSubmit = async () => {
    if (currentStep === 2) {
      try {
        await mutation.mutateAsync({
          client: valueFormsToSend.client!,
          ...valueFormsToSend.appointment,
        });

        router.push(`/`);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error al crear el item.",
        });
      }

      return;
    }

    if (isCurrentValid) {
      if (currentStep === 0) {
        setValueFormToSend({
          ...valueFormsToSend,
          client: valueForm.current as Client,
        });
      }
      if (currentStep === 1) {
        setValueFormToSend({
          ...valueFormsToSend,
          appointment: valueForm.current as AppointmentForm,
        });
      }

      onNext();
      setIsCurrentValid(false);
      valueForm.current = null;
    }
  };

  return {
    isCurrentValid,
    currentStep,
    valueFormsToSend,
    getDataForm,
    validateCurrentValid,
    onNextSubmit,
    onPrev,
    loading: mutation.isPending,
  };
}

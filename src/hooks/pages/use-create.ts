import { AppointmentForm } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";
import { createAppointment } from "@/services/appointment";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

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
       await mutation.mutateAsync(
        valueFormsToSend as unknown as Partial<AppointmentForm>
      );

      router.push(`/`);
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
    loading: mutation.isPending
  };
}

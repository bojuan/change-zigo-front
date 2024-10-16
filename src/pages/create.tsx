import Layout from "@/app/layout";
import Stepper from "@/components/atomic-design/molecules/stepper";
import FormAppointment from "@/components/atomic-design/organism/form-appointment/form-appointment";

import FormClient from "@/components/atomic-design/organism/form-client/form-client";
import { AppointmentForm } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const steps = ["Cliente", "Cita", "Resumen"];

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCurrentValid, setIsCurrentValid] = useState<boolean>(false);
  const valueForm = useRef<Client | AppointmentForm | null>(null);
  const router = useRouter();

  const [valueFormsToSend, setValueFormToSend] = useState<{
    client: Client | null;
    appointment: AppointmentForm | null;
  }>({
    client: null,
    appointment: null,
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

  const onNextSubmit = () => {
    console.log("Click Next")
    if(currentStep === 2){
      router.push(`/`)
      return
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

  const renderOverview = (dataToRender: Client | AppointmentForm) => (
    <>
      {Object.keys(dataToRender).map((key) => (
        <div key={key}>
          <span className="font-bold capitalize">{key}</span>: <span>{(dataToRender as any)[key]}</span>
        </div>
      ))}
    </>
  );

  return (
    <Layout>
      <h2 className="text-4xl mb-12 font-bold">Crear Cita</h2>

      <Stepper
        steps={steps}
        isCurrentValid={isCurrentValid || currentStep === steps.length - 1}
        currentStep={currentStep}
        onNext={onNextSubmit}
        onPrev={onPrev}
      >
        <div className="m-auto">
          {currentStep === 0 ? (
            <FormClient
              defaultValues={valueFormsToSend.client ?? undefined}
              validateForm={validateCurrentValid}
              getDataForm={getDataForm}
            />
          ) : null}
          {currentStep === 1 ? (
            <FormAppointment
              defaultValues={valueFormsToSend.appointment ?? undefined}
              validateForm={validateCurrentValid}
              getDataForm={getDataForm}
            />
          ) : null}
          {currentStep === 2 ? (
            <div className="w-2/3 m-auto">
              {renderOverview(valueFormsToSend.client!)}
              {renderOverview(valueFormsToSend.appointment!)}
            </div>
          ) : null}
        </div>
      </Stepper>
    </Layout>
  );
}

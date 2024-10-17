import Stepper from "@/components/atomic-design/molecules/stepper";
import FormAppointment from "@/components/atomic-design/organism/form-appointment/form-appointment";

import FormClient from "@/components/atomic-design/organism/form-client/form-client";
import { useCreate } from "@/hooks/pages/use-create";
import { AppointmentForm } from "@/interfaces/appointment";
import { Client } from "@/interfaces/client";

const steps = ["Cliente", "Cita", "Resumen"];

export default function Create() {
  const {
    isCurrentValid,
    currentStep,
    valueFormsToSend,
    loading,
    getDataForm,
    validateCurrentValid,
    onNextSubmit,
    onPrev,
  } = useCreate();

  const renderOverview = (dataToRender: Client | AppointmentForm) => (
    <>
      {Object.keys(dataToRender).map((key) => (
        <div key={key}>
          <span className="font-bold capitalize">{key}</span>:{" "}
          <span>{(dataToRender as any)[key]}</span>
        </div>
      ))}
    </>
  );

  return (
    <>
      <h2 className="text-4xl mb-12 font-bold">Crear Cita</h2>

      <Stepper
        steps={steps}
        isCurrentValid={isCurrentValid || currentStep === steps.length - 1}
        currentStep={currentStep}
        onNext={onNextSubmit}
        onPrev={onPrev}
        loading={loading}
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
    </>
  );
}

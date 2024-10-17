import { FC, useState, ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface StepperProps {
  steps: string[];
  currentStep: number;
  children: ReactNode;
  isCurrentValid: boolean;
  onNext: () => void;
  onPrev: () => void;
  loading?: boolean;
}

const Stepper: FC<StepperProps> = ({
  steps,
  children,
  isCurrentValid,
  currentStep,
  loading,
  onNext,
  onPrev,
}) => {
  const handleNext = () => {
    if (currentStep < steps.length) {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      onPrev();
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={clsx(
              "flex-1",
              index === steps.length - 1 ? "flex-none" : ""
            )}
          >
            <div className="relative flex items-center">
              <div className="flex justify-center items-center gap-1">
                <div
                  className={clsx(
                    "w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all",
                    currentStep >= index
                      ? "bg-primary text-white"
                      : "text-gray-500"
                  )}
                >
                  {index + 1}
                </div>
                <span className="mx-2">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    "flex-1 h-1 transition-all",
                    currentStep >= index + 1 ? "bg-primary" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {children}

      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}
          variant="secondary"
        >
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={!isCurrentValid || loading}>
          {loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Stepper;

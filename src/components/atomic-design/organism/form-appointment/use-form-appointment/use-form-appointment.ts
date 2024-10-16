import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FormAppointmentProps } from "../form-appointment";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Título de la cita requerido.",
  }),
  description: z.string().min(1, {
    message: "Descripción requerido.",
  }),
  date: z.string().min(1, {
    message: "Fecha requerida.",
  }),
  time: z.string().min(1, {
    message: "Hora requerida.",
  }),
  location: z.string().min(1, {
    message: "Lugar requerido.",
  }),
});

function useFormAppointment({
  validateForm,
  getDataForm,
  defaultValues = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  },
}: FormAppointmentProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues,
  });

  const watchFields = form.watch();

  useEffect(() => {
    validateForm(form.formState.isValid);
    if (form.formState.isValid) {
      getDataForm(watchFields);
    }
  }, [watchFields, form.formState.isValid]);

  return form;
}

export default useFormAppointment;

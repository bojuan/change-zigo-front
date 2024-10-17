import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormClientProps } from "../form-client";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre requerido.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email requerido.",
    })
    .email(),
  phone: z.string().min(1, {
    message: "Teléfono requerido.",
  }),
});

function useFormClient({
  validateForm,
  getDataForm,
  defaultValues,
}: FormClientProps) {
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

export default useFormClient;

import { FC } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AppointmentForm } from "@/interfaces/appointment";
import useFormAppointment from "./use-form-appointment/use-form-appointment";

export interface FormAppointmentProps {
  validateForm: (isValid: boolean) => void;
  getDataForm: (data: AppointmentForm) => void;
  defaultValues?: AppointmentForm;
}

const FormAppointment: FC<FormAppointmentProps> = ({
  validateForm,
  getDataForm,
  defaultValues = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  },
}) => {
  const form = useFormAppointment({
    validateForm,
    getDataForm,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form className="w-2/3 m-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título de la cita</FormLabel>
              <FormControl>
                <Input placeholder="Título de la cita" {...field} />
              </FormControl>
              <FormDescription>Poner el Título de la cita.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción de la cita</FormLabel>
              <FormControl>
                <Input placeholder="Descripción de la cita" {...field} />
              </FormControl>
              <FormDescription>
                Poner la descripción de la cita.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de la cita</FormLabel>
              <FormControl>
                <Input placeholder="Fecha de la cita" {...field} />
              </FormControl>
              <FormDescription>Poner la fecha de la cita.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de la cita</FormLabel>
              <FormControl>
                <Input placeholder="Hora de la cita" {...field} />
              </FormControl>
              <FormDescription>Poner la Hora de la cita.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar de la cita</FormLabel>
              <FormControl>
                <Input placeholder="Lugar de la cita" {...field} />
              </FormControl>
              <FormDescription>Poner el lugar de la cita.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormAppointment;

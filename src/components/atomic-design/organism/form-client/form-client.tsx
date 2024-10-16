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
import { Client } from "@/interfaces/client";
import useFormClient from "./use-form-client/use-form-client";

export interface FormClientProps {
  validateForm: (isValid: boolean) => void;
  getDataForm: (data: Client) => void;
  defaultValues?: Client;
}

const FormClient: FC<FormClientProps> = ({
  validateForm,
  getDataForm,
  defaultValues = {
    name: "",
    email: "",
    phone: "",
  },
}) => {
  const form = useFormClient({
    validateForm,
    getDataForm,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form className="w-2/3  m-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del Cliente" {...field} />
              </FormControl>
              <FormDescription>Poner el nombre del cliente.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email del cliente" {...field} />
              </FormControl>
              <FormDescription>Poner el email del cliente.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Teléfono del cliente" {...field} />
              </FormControl>
              <FormDescription>Poner el teléfono del cliente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormClient;

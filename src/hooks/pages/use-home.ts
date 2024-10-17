import { deleteAppointment, getAppointments } from "@/services/appointment";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useToast } from "../use-toast";

export function useHome() {
  const { data, refetch } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: getAppointments,
  });

  const mutation = useMutation({
    mutationFn: deleteAppointment,
  });

  const router = useRouter();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [appointmentToRemove, setAppointmentToRemove] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof data === "undefined") {
      toast({
        variant: "destructive",
        title: "Error al traer los datos.",
      });
    }
  }, []);

  const handlerRemove = (id: string) => {
    setOpenAlert(true);
    setAppointmentToRemove(id);
  };

  const approveRemove = async () => {
    setLoading(true);
    await mutation.mutateAsync(appointmentToRemove!);
    refetch();
    setLoading(false);
    setOpenAlert(false);

    setAppointmentToRemove(null);
  };

  const cancelRemove = () => {
    setOpenAlert(false);
    setAppointmentToRemove(null);
  };

  return {
    router,
    data,
    openAlert,
    appointmentToRemove,
    loading,
    handlerRemove,
    approveRemove,
    cancelRemove,
  };
}

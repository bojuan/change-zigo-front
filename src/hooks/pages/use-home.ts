import { getAppointments } from "@/services/appointment";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export function useHome() {
  const { data } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: getAppointments,
  });

  const router = useRouter();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [appointmentToRemove, setAppointmentToRemove] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handlerRemove = (id: string) => {
    setOpenAlert(true);
    setAppointmentToRemove(id);
  };

  const approveRemove = () => {
    setLoading(true);
    //remove appointmentToRemove
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

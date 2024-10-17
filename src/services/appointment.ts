import { Appointment } from "@/interfaces/appointment";

const URL = "http://localhost:8080/appointments";

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await fetch(URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error en la solicitud GET");
  }

  return response.json();
};

export const getAppointmentById = async (id: string): Promise<Appointment> => {
  const response = await fetch(`${URL}/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error en la solicitud GET");
  }

  return response.json();
};

export const createAppointment = async (
  dataToCreate: Partial<Appointment>
): Promise<Appointment> => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToCreate),
  });

  if (!response.ok) {
    throw new Error("Error al crear item.");
  }

  return response.json();
};

export const updateAppointment = async (
  dataToUpdate: Partial<Appointment>
): Promise<Appointment> => {
  const response = await fetch(`${URL}/${dataToUpdate.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToUpdate),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar.");
  }

  return response.json();
};

export const deleteAppointment = async (id: string): Promise<Appointment[]> => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al actualizar.");
  }

  return response.json();
};

import { Appointment } from "@/interfaces/appointment";

const data: Appointment[] = [
  {
    id: "m5gr84i9",

    status: "success",

    title: "Cita inicial",
    description: "Esta es uan cita inicial",
    date: "2024-11-16",
    time: "12:00",
    location: "Quicentro Norte",
    client: {
      name: "Juan Esteban Rodriguez",
      email: "juan_rod@gmail.com",
      phone: "0999999999",
    },
    createdAt: "YYYY-MM-DDTHH:mm:ssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
  },
  {
    id: "abc",

    status: "success",

    title: "Cita inicial",
    description: "Esta es uan cita inicial",
    date: "2024-11-16",
    time: "12:00",
    location: "Quicentro Norte",
    client: {
      name: "Juan Esteban Rodriguez",
      email: "auan_rod@gmail.com",
      phone: "0999999999",
    },
    createdAt: "YYYY-MM-DDTHH:mm:ssZ",
    updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
  },
];

export const getAppointments = async (): Promise<Appointment[]> => {
  return Promise.resolve(data);
};

const dataItem = {
  id: "m5gr84i9",
  status: "success",
  title: "Cita inicial",
  description: "Esta es uan cita inicial",
  date: "2024-11-16",
  time: "12:00",
  location: "Quicentro Norte",
  client: {
    name: "Juan Esteban Rodriguez",
    email: "juan_rod@gmail.com",
    phone: "0999999999",
  },
  createdAt: "YYYY-MM-DDTHH:mm:ssZ",
  updatedAt: "YYYY-MM-DDTHH:mm:ssZ",
};

export const getAppointmentById = async (): Promise<Appointment> => {
  return Promise.resolve(dataItem);
};

export const createAppointment = async (dataToCreate: Partial<Appointment>): Promise<Appointment> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dataItem)
    }, 4000);
  });
}

export const updateAppointment = async (dataToUpdate: Partial<Appointment>): Promise<Appointment> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dataItem)
    }, 4000);
  });
}

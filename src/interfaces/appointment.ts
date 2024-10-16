import { Client } from "./client";

export type Appointment = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  client: Client;
  status: string;
  createdAt: string;
  updatedAt: string;
};

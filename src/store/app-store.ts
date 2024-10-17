import { Appointment } from "@/interfaces/appointment";
import { create } from "zustand";

interface AppState {
  companyName: string;
  data: Appointment[];
  setData: (newData: Appointment[]) => void;
}

export const useAppStorage = create<AppState>((set) => ({
  companyName: "My Company",
  data: [],
  setData: (newData) => set((state) => ({ data: newData })),
}));

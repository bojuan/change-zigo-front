import { create } from "zustand";

interface AppState {
  ui: {
    isOpenAlert: boolean;
    openAlert: () => void;
    closeAlert: () => void;
  };
}

export const useManagerUI = create<AppState>((set) => ({
  ui: {
    isOpenAlert: false,
    openAlert: () =>
      set((state) => ({ ...state, ui: { ...state.ui, isOpenAlert: true } })),
    closeAlert: () =>
      set((state) => ({ ...state, ui: { ...state.ui, isOpenAlert: false } })),
  },
}));

import { create } from "zustand";

export const authStore = create((set) => ({
  user: null,
  setUser: () => set({ user: null }),
  clearUser: () => set({ user: null }),
}));

import { create } from "zustand";

interface AuthStoreState {
  user: User | null;
}

interface AuthStoreActions {
  setUser: (user: User | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;

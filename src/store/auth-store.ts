import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: boolean | null;
  setUser: (user: boolean | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth-store" }
  )
);

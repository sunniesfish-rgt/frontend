import { create } from "zustand";
import { authService } from "@/services/auth";

interface AuthStore {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  signOut: async () => {
    try {
      await authService.signOut();
      set({ isAuthenticated: false });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
}));

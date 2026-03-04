import { create } from "zustand";
import type { JwtMe } from "@/types/auth";

const TOKEN_KEY = "turnos_token";

type AuthState = {
  token: string | null;
  me: JwtMe | null;
  setToken: (t: string | null) => void;
  setMe: (m: JwtMe | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null,
  me: null,
  setToken: (t) => {
    if (typeof window !== "undefined") {
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    }
    set({ token: t });
  },
  setMe: (m) => set({ me: m }),
  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
    set({ token: null, me: null });
  },
}));
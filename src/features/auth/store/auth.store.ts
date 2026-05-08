import { create } from "zustand";
import type { User } from "../types/auth.types";
import { authService } from "../services/auth.service";

type AuthState = {
  user: User | null;

  loading: boolean;

  hydrated: boolean;

  fetchUser: () => Promise<void>;

  setUser: (user: User | null) => void;

  logout: () => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  loading: false,

  hydrated: false,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    const state = get();

    // 🚀 prevent multiple calls
    if (state.hydrated) return;

    set({ loading: true });

    try {
      const user = await authService.me();

      set({
        user,
        hydrated: true,
      });
    } catch {
      set({
        user: null,
        hydrated: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await authService.logout();

    set({
      user: null,
    });
  },

  login: async (email: string, password: string) => {
    await authService.login({
      email,
      password,
    });

    // AFTER login → instantly set user in store
    useAuthStore.setState({
      user: await authService.me(),
      hydrated: true,
    });

  },
}));

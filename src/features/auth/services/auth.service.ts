import { apiFetch } from "@/lib/api";

import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  User,
} from "../types/auth.types";

export const authService = {
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload,
    });
  },

  async me(): Promise<User> {
    return apiFetch<User>("/users/me", {
      method: "GET",
    });
  },

  async logout(): Promise<string> {
    return apiFetch<string>("/auth/logout", {
      method: "POST",
    });
  },
};

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

  async updateAvatar(avatar: string): Promise<User> {
    return apiFetch<User>("/users/avatar", {
      method: "PUT",
      body: {
        avatar,
      },
    });
  },

  async updateProfile(payload: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    age: number;
    gender: string;
    currentPassword?: string;
    newPassword?: string;
  }): Promise<User> {
    return apiFetch<User>("/users/profile", {
      method: "PUT",
      body: payload,
    });
  },

  async logout(): Promise<string> {
    return apiFetch<string>("/auth/logout", {
      method: "POST",
    });
  },
};

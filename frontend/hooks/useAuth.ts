// hooks/useAuth.ts
"use client";

import { create } from "zustand";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUserFromStorage: () => void;
  checkSession: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: true,

  setUser: (user) => {
    localStorage.setItem("maqtec_user", JSON.stringify(user));
    set({ user, loading: false });
  },

  setToken: (token) => {
    localStorage.setItem("maqtec_access", token);
    set({ accessToken: token });
  },

  login: async (username, password) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_AUTH}/authentication/`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Error en login");

    if (data.access) set({ accessToken: data.access });
    if (data.user) set({ user: data.user, loading: false });
  },

  logout: async () => {
    localStorage.removeItem("maqtec_user");
    localStorage.removeItem("maqtec_access");
    localStorage.removeItem("maqtec_refresh");
    set({ user: null, accessToken: null, loading: false });
  },

  loadUserFromStorage: () => {
    const storedUser = localStorage.getItem("maqtec_user");
    const storedToken = localStorage.getItem("maqtec_access");
    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      accessToken: storedToken || null,
      loading: false,
    });
  },

  checkSession: () => {
    const storedUser = localStorage.getItem("maqtec_user");
    const storedToken = localStorage.getItem("maqtec_access");
    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      accessToken: storedToken || null,
      loading: false,
    });
  },
}));
"use client";
import { create } from "zustand";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
  checkSession: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => {
    localStorage.setItem("maqtec_user", JSON.stringify(user));
    set({ user, loading: false });
  },

  logout: () => {
    localStorage.removeItem("maqtec_user");
    fetch("http://127.0.0.1:8000/api/authentication/logout/", {
      method: "POST",
      credentials: "include",
    });
    set({ user: null, loading: false });
  },

  loadUserFromStorage: () => {
    const storedUser = localStorage.getItem("maqtec_user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  checkSession: async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/authentication/me/", {
        credentials: "include", // 🔑 usa la cookie
      });
      if (!res.ok) throw new Error("No autorizado");
      const data = await res.json();
      set({ user: data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));

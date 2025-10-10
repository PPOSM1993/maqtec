"use client";

import { create } from "zustand";

interface User {
  id: number;
  email: string;
  username: string;
  token: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem("maqtec_user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("maqtec_user");
    set({ user: null });
  },
  loadUserFromStorage: () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("maqtec_user");
      if (storedUser) set({ user: JSON.parse(storedUser) });
    }
  },
}));

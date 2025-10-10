"use client";
import { create } from "zustand";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => {
    localStorage.setItem("maqtec_user", JSON.stringify(user)); // ✅ persistir
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("maqtec_user"); // ✅ limpiar
    set({ user: null });
  },

  loadUserFromStorage: () => {
    const storedUser = localStorage.getItem("maqtec_user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
}));

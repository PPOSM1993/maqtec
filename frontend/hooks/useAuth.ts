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
  loading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true, // <--- inicialmente true
  setUser: (user) => {
    localStorage.setItem("maqtec_user", JSON.stringify(user));
    set({ user, loading: false });
  },
  logout: () => {
    localStorage.removeItem("maqtec_user");
    set({ user: null, loading: false });
  },
  loadUserFromStorage: () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("maqtec_user");
      if (storedUser) {
        set({ user: JSON.parse(storedUser), loading: false });
      } else {
        set({ user: null, loading: false });
      }
    }
  },
}));

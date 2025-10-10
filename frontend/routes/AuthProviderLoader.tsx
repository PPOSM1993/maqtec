"use client";

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthProviderLoader = ({ children }: { children: React.ReactNode }) => {
  const { loadUserFromStorage } = useAuth();

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return <>{children}</>;
};

export default AuthProviderLoader;

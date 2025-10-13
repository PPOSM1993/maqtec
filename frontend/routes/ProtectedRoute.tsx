"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/authentication");
    }
  }, [user, loading, router]);

  if (loading || !user) return null; // espera a que termine de cargar
  return <>{children}</>;
};

export default ProtectedRoute;

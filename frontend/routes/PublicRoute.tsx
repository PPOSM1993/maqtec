"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // redirige al dashboard si ya está logueado
    }
  }, [user, router]);

  if (user) return null; // opcional: spinner mientras redirige

  return <>{children}</>;
};

export default PublicRoute;

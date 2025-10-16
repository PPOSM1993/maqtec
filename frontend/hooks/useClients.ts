// hooks/useClients.ts
"use client";
import { useEffect, useState } from "react";

export interface Client {
  id: number;
  nombre: string;
  email: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // 🔹 Tomamos el token de localStorage o usamos un token de prueba
        const storedToken = localStorage.getItem("access_token");
        const token = storedToken || "TU_TOKEN_DE_PRUEBA_AQUI"; // reemplaza con un JWT válido

        if (!token) {
          setError("No se encontró token. Por favor inicia sesión.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:8000/api/clients/clients/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          setError("Token inválido o expirado. Por favor inicia sesión de nuevo.");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error("Error al obtener los clientes: " + res.status);
        }

        const data = await res.json();
        console.log("Respuesta del backend:", data);

        const mappedClients = data.map((c: any) => ({
          id: c.id,
          nombre: c.nombre || c.name || "—",
          email: c.email || c.email_address || "—",
        }));

        setClients(mappedClients);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading, error };
}

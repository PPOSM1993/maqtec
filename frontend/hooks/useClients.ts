"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosInstance";

export interface Client {
  id: number;
  nombre: string;
  rut: string;
  telefono: string;
  email?: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [communes, setCommunes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axiosInstance.get("/clients/clients/");
        console.log("📦 Respuesta backend:", res.data);

        const { clients, regions, cities, communes } = res.data;

        // 🧭 Los clientes están dentro de clients.results
        setClients(clients?.results || []);
        setRegions(regions);
        setCities(cities);
        setCommunes(communes);
      } catch (err: any) {
        console.error("❌ Error al obtener clientes:", err);
        setError("No se pudieron cargar los clientes. Verifica el token o el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, regions, cities, communes, loading, error };
}

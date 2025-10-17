//import axios from "axios";

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/clients";

export const clientService = {
  getAll: async (page: number, query: string, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/?page=${page}&search=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener clientes");
    return res.json();
  },
  delete: async (id: number, token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al eliminar cliente");
  },
};

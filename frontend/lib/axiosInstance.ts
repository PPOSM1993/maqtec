import axios from "axios";

// ⚡ Asegúrate que el baseURL apunta al backend DRF
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Ajusta si tu API tiene otro prefijo
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para enviar token JWT automáticamente
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access"); // 👈 nombre correcto del token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

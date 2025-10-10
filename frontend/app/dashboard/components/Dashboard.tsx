"use client";

import React from "react";
import Navbar from "../../../components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* === Navbar === */}
      <Navbar />

      {/* === Contenido principal === */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-wide">
          Bienvenido al Dashboard de Maqtec
        </h1>

        <p className="text-gray-700 text-center max-w-xl">
          Aquí podrás ver tus métricas, datos y demás funcionalidades.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;

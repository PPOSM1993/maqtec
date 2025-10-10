"use client";
import React from "react";
import { FaShoppingCart, FaUserPlus, FaChartPie } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import StatCard from "../../../components/StatCard";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Panel de Control
        </h1>

        {/* === Contenedor de tarjetas === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            title="Clientes"
            value={150}
            icon={FaShoppingCart}
            color="info"
            link="#"
          />
          <StatCard
            title="Repuestos"
            value="53%"
            icon={IoStatsChart}
            color="success"
            link="#"
          />
          <StatCard
            title="Cotizaciones"
            value={44}
            icon={FaUserPlus}
            color="warning"
            link="#"
          />
          <StatCard
            title="Presupuestos de Trabajo"
            value={65}
            icon={FaChartPie}
            color="danger"
            link="#"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

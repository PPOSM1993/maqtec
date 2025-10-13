"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaUserPlus, FaChartPie } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import StatCard from "../../../components/StatCard";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import SalesTable from "./SalesTable";
import Footer from "../../../components/Footer";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Navbar */}
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Contenido */}
          <main className="flex-1 p-4 md:p-6 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Panel de Control
            </h1>

            {/* Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <StatCard
                title="Clientes"
                value={150}
                icon={FaShoppingCart}
                color="info"
                link="/clients/"
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

            {/* Tabla */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Últimas Ventas
              </h2>
              <div className="overflow-x-auto">
                <SalesTable />
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

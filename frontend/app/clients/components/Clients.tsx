"use client";
import React, { useState } from "react";
import { FaUserPlus, FaTimes } from "react-icons/fa"; // Íconos para los botones
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import SalesTable from "../../dashboard/components/SalesTable";
import ClientTable from "./table/ClientTable";

const Clients = () => {
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
              Clientes
            </h1>

            {/* Tabla */}
            <section className="mt-2">
                <ClientTable />
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Clients;

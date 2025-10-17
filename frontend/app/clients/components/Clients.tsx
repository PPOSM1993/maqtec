"use client";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import ClientTable from "./table/ClientTable";
import ProtectedRoute from "../../../routes/ProtectedRoute";

const Clients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />

        <div className="flex-1 flex flex-col overflow-auto">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="flex-1 p-4 md:p-6 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Clientes
            </h1>

            <section className="mt-2">
              <ProtectedRoute>
                <ClientTable />
              </ProtectedRoute>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clients;


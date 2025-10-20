"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import ProductTable from "./components/ProductTable";

export default function ProductsPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Repuestos
          </h1>
          <ProductTable />
        </main>

        {/* Footer */}
      </div>
    </div>
  );
}

"use client";

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import ClientsForm from "./components/ClientsForm";

export default function ClientsPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Contenido */}
          <main className="flex-1 p-6">
            <ClientsForm />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}

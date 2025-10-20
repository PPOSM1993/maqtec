"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onToggleSidebar?: () => void; // 🔹 opcional, para conectar con el sidebar
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/authentication");
  };

  return (
    <header className="w-full bg-yellow-400 text-black shadow-sm flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sticky top-0 z-50 transition-all duration-300">
      {/* === Izquierda: Menú + Logo === */}
      <div className="flex items-center gap-4">
        {/* Botón de colapsar sidebar (solo visible en móvil) */}
        {onToggleSidebar && (
          <Button
            onClick={onToggleSidebar}
            className="p-2 rounded-sm hover:bg-yellow-300 transition sm:hidden"
            aria-label="Abrir menú lateral"
          >
            <Menu size={22} />
          </Button>
        )}


      </div>

      {/* === Derecha: Usuario + Logout === */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="hidden sm:inline text-sm md:text-base font-medium">
            Hola,&nbsp;
            <strong className="font-semibold text-black">
              {user.username || "Usuario"}
            </strong>
          </span>
        )}

        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-black text-yellow-400 font-semibold px-3 py-2 md:px-4 md:py-2 rounded-sm hover:bg-gray-900 transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline text-sm md:text-base">Salir</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

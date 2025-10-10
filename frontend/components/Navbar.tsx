"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/authentication");
    };

    return (
        <header className="w-full bg-yellow-400 text-black shadow-md flex justify-between items-center px-4 md:px-8 py-3 sticky top-0 z-50">
            {/* === Logo / Marca === */}
            <div className="flex items-center gap-3">
                <button className="md:hidden p-2 rounded hover:bg-yellow-300 transition">
                    <Menu size={24} />
                </button>
                <div className="relative w-32 h-20">
                    <Image
                        src="/logo2.png"
                        alt="Maqtec Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* === Usuario + Logout === */}
            <div className="flex items-center gap-4">
                {user && (
                    <span className="hidden sm:inline text-sm font-medium">
                        Hola, <strong>{user.username || "Usuario"}</strong>
                    </span>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-black text-yellow-400 font-semibold px-3 py-2 rounded hover:bg-gray-900 transition"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Salir</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;

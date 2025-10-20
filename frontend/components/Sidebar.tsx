"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BarChart3, Settings, Users, LogOut, Menu } from "lucide-react";
import { FaTools } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { name: "Inicio", icon: Home, href: "/dashboard" },
        { name: "Clientes", icon: Users, href: "/clients/" },
        { name: "Repuestos", icon: FaTools, href: "/products/" },
        { name: "Cotizaciones", icon: Settings, href: "/dashboard/configuracion" },
    ];

    return (
        <motion.div
            animate={{ width: isCollapsed ? "5rem" : "16rem" }}
            className="h-screen bg-[#1E1E1E] text-white flex flex-col border-r border-gray-800"
            style={{ width: "16rem", height: "auto" }}

            transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-2 xl:px-3 text-white">
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.span
                            key="title"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-lg font-bold tracking-wide text-yellow-400"
                        >
                            <Image
                                src="/logo.png"
                                alt="Maqtec Logo"
                                className="py-3"
                                width={60}
                                height={50}
                                priority
                            />

                        </motion.span>
                    )}
                </AnimatePresence>
                <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-gray-400 hover:text-yellow-400 transition"
                >
                    <Menu size={25} />
                </Button>
            </div>

            {/* Menú */}
            <nav className="flex-1 overflow-y-auto mt-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-yellow-400 hover:text-black transition-all duration-200"
                        >
                            <Icon size={20} />
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -15 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            {/**
       *
       *
       *
       *<div className="mt-auto border-t border-gray-700">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200">
          <LogOut size={20} />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                Cerrar sesión
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
       *
       *
       *
       *
       */}

        </motion.div>
    );
}

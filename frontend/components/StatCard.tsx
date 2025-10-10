import React from "react";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  color: "info" | "success" | "warning" | "danger";
  link?: string;
}

const colorClasses = {
  info: "bg-blue-500 hover:bg-blue-600",
  success: "bg-green-500 hover:bg-green-600",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
  danger: "bg-red-500 hover:bg-red-600",
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  link = "#",
}) => {
  return (
    <div
      className={`relative overflow-hidden shadow-md p-8 text-white ${colorClasses[color]} transition-all duration-300`}
    >
      {/* Icono grande de fondo */}
      <div className="absolute right-4 top-4 text-white/30 text-5xl">
        <Icon />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-sm mt-2">{title}</p>
        <br />
      </div>

      {/* Footer */}
      <a
        href={link}
        className="absolute bottom-0 left-0 w-full text-center py-2 text-sm font-semibold bg-black/10 hover:bg-black/20 transition"
      >
        Más info →
      </a>
    </div>
  );
};

export default StatCard;

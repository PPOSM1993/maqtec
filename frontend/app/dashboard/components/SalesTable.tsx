import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const SalesTable = () => {
  // Datos temporales (puedes reemplazarlos luego por datos del backend)
  const sales = [
    {
      id: 1,
      cliente: "Juan Pérez",
      fecha: "2025-10-10",
      total: "$120.000",
      estado: "Completada",
    },
    {
      id: 2,
      cliente: "María López",
      fecha: "2025-10-11",
      total: "$80.000",
      estado: "Pendiente",
    },
    {
      id: 3,
      cliente: "Carlos Gómez",
      fecha: "2025-10-12",
      total: "$45.000",
      estado: "Cancelada",
    },
    
  ];

  return (
    <div className="bg-white shadow-md overflow-hidden border">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-yellow-400 text-gray-800 uppercase text-xs font-semibold">
          <tr>
            <th scope="col" className="px-6 py-3">Cliente</th>
            <th scope="col" className="px-6 py-3">Fecha</th>
            <th scope="col" className="px-6 py-3">Total</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((venta) => (
            <tr
              key={venta.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {venta.cliente}
              </td>
              <td className="px-6 py-4">{venta.fecha}</td>
              <td className="px-6 py-4">{venta.total}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-none text-xs font-semibold ${
                    venta.estado === "Completada"
                      ? "bg-green-100 text-green-700"
                      : venta.estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {venta.estado}
                </span>
              </td>
              <td className="px-6 py-4 flex justify-center gap-3">
                <Button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-none cursor-pointer"
                  title="Ver detalles"
                >
                  <FaEye />
                </Button>
                <Button
                  className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-full"
                  title="Editar"
                >
                  <FaEdit />
                </Button>
                <Button
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  title="Eliminar"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex items-center justify-between p-4 border-t bg-gray-50 text-sm text-gray-600">
        <span>Mostrando 1–3 de 3 resultados</span>
        <div className="flex gap-2">
          <Button className="flex px-3 py-1 bg-white border hover:bg-gray-100 rounded-none">
            <ArrowLeft className=""/>
            Anterior
          </Button>
          <Button className="flex px-3 py-1 bg-white border hover:bg-gray-100 rounded-none">
            <ArrowRight />
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;

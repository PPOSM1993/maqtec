"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaEdit, FaPlus, FaPlusCircle, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// 🔹 Datos falsos
const fakeProducts = Array.from({ length: 45 }).map((_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  code: `PRD-${1000 + i}`,
  category: i % 2 === 0 ? "Accesorios" : "Equipos",
  stock: Math.floor(Math.random() * 100),
  price: (Math.random() * 10000 + 1000).toFixed(0),
}));

export default function ProductsPage() {
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  // 🔹 Definición de columnas
  const columns = useMemo<ColumnDef<typeof fakeProducts[0]>[]>(
    () => [
      { header: "Código", accessorKey: "code" },
      { header: "Nombre", accessorKey: "name" },
      { header: "Categoría", accessorKey: "category" },
      { header: "Stock", accessorKey: "stock" },
      {
        header: "Precio",
        accessorKey: "price",
        cell: ({ getValue }) => `$${Number(getValue()).toLocaleString("es-CL")}`,
      },
      {
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex flex-items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-600 text-white font-medium rounded-none px-2 py-2"
            >
              <FaEdit className="text-xl" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-none px-2 py-2"
            >
              <FaTrash className="text-xl" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // 🔹 Filtro
  const filteredProducts = useMemo(
    () =>
      fakeProducts.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  // 🔹 Tabla
  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex ?? 0);
      setPageSize(newState.pageSize ?? 10);
    },
    manualPagination: false,
  });

  // 🔹 Calcular datos de la página actual
  const start = pageIndex * pageSize;
  const currentPageData = filteredProducts.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <div className="w-full bg-white border shadow-md rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-yellow-400 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Repuestos Registrados
        </h3>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-4">
        <Button asChild>
          <Link href="/products/new" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-none px-4 py-3">
            <FaPlus className="text-lg" />
            Agregar Producto
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Buscar producto..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-xs rounded-none"
          />

          <Select onValueChange={(v) => setPageSize(Number(v))}>
            <SelectTrigger className="h-10 w-[190px] text-sm bg-gray-50">
              <SelectValue placeholder={`${pageSize} filas`} />
            </SelectTrigger>
            <SelectContent className="w-[130px] bg-gray-100">
              {[5, 10, 15, 20].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="data-[state=checked]:bg-transparent data-[state=checked]:text-gray-900 py-2 px-3 hover:bg-gray-200"
                >
                  {size} filas
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto px-4 pb-4">
        <Table className="table-auto w-full border">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-700 font-semibold border-b py-3 px-4"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {currentPageData.length ? (
              currentPageData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.accessorKey)}
                      className="text-gray-800 py-3 px-4 border-b"
                    >
                      {col.accessorKey
                        ? (row as any)[col.accessorKey]
                        : col.cell?.({ row } as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No se encontro Repuesto.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 px-6 py-3 border-t bg-gray-50">
          <Button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-lg"
          >
            ◀
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              onClick={() => setPageIndex(i)}
              className={`px-3 py-1 border rounded ${pageIndex === i
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            onClick={() =>
              setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={pageIndex >= totalPages - 1}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-lg"
          >
            ▶
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { clientService } from "../../../../hooks/clientService";
import { useAuth } from "../../../../hooks/useAuth";

type Client = {
  id: number;
  nombre: string;
  rut: string;
  telefono: string;
  email?: string;
};

export default function ClientTable() {
  const { user, accessToken, loading } = useAuth();
  const [clients, setClients] = React.useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);

  // ✅ Fetch clientes
  const fetchClients = async (query = "") => {
    if (!accessToken) return;

    setLoadingClients(true);
    try {
      const data = await clientService.getAll(1, query, accessToken);
      console.log("Clientes desde API:", data);
      setClients(data.results || data.clients?.results || []);
    } catch (err: any) {
      console.error(err);
      Swal.fire(
        "Error",
        err.message || "No se pudieron cargar los clientes.",
        "error"
      );
    } finally {
      setLoadingClients(false);
    }
  };

  // ✅ Eliminar cliente
  const handleDelete = async (id: number) => {
    if (!accessToken) return;
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await clientService.delete(id, accessToken);
        Swal.fire("Eliminado", "Cliente eliminado correctamente.", "success");
        setClients((prev) => prev.filter((c) => c.id !== id));
      } catch (err: any) {
        console.error(err);
        Swal.fire("Error", "No se pudo eliminar el cliente.", "error");
      }
    }
  };

  // ✅ Columnas de la tabla
  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-800 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-1 h-4 w-4 text-gray-500" />
        </Button>
      ),
    },
    { accessorKey: "rut", header: "RUT" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "telefono", header: "Teléfono" },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            href={`/clients/edit/${row.original.id}`}
            className="text-blue-600 hover:underline"
          >
            Editar
          </Link>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  // ✅ Cargar clientes cuando hay user y token
  React.useEffect(() => {
    if (!loading && user && accessToken) {
      fetchClients(filter);
    }
  }, [loading, user, accessToken]);

  // ✅ Buscar clientes con delay
  React.useEffect(() => {
    if (!loading && user && accessToken) {
      const delay = setTimeout(() => fetchClients(filter), 500);
      return () => clearTimeout(delay);
    }
  }, [filter, loading, user, accessToken]);


  // ✅ Luego, en tu ClientTable.tsx agrega:
  React.useEffect(() => {
    useAuth.getState().loadUserFromStorage(); // fuerza cargar user/token desde localStorage
  }, []);


  // ✅ React Table
  const table = useReactTable({
    data: clients,
    columns,
    state: { globalFilter: filter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
  });

  return (
    <div className="w-full bg-white border shadow-md rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-yellow-400 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Clientes Registrados
        </h3>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-4">
        <Link
          href="/clients/create"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-none px-4 py-2"
        >
          <FaUserPlus /> Agregar Cliente
        </Link>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Buscar Cliente..."
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
                <SelectItem key={size} value={String(size)}>
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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            {loadingClients ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  ⏳ Cargando clientes...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original.id} // ✅ aseguramos key correcta
                  className="hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-gray-800 py-3 px-4 border-b"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                  No se encontraron Clientes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 px-6 py-3 border-t bg-gray-50 cursor-pointer">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-lg"
          >
            ◀
          </Button>

          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <Button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`px-3 py-1 border rounded ${table.getState().pagination.pageIndex === i
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-lg"
          >
            ▶
          </Button>
        </div>
      </div>
    </div>
  );
}

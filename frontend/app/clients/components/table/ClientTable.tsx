import { Input } from "@/components/ui/input"
import Link from "next/link"
import React from "react";
import { FaUserPlus } from "react-icons/fa"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

type Client = {
  id: number;
  nombre: string;
  rut: string;
  telefono: string;
  email?: string;
};

// === COLUMNAS ===
export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-gray-800 font-semibold"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Nombre
        <ArrowUpDown className="ml-1 h-4 w-4 text-gray-500" />
      </Button>
    ),
  },
  { accessorKey: "rut", header: "RUT" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "telefono", header: "Teléfono" },
  { accessorKey: "acciones", header: "Acciones" },
];



export default function ClientTable() {

  const [clients, setClients] = React.useState<Client[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [filter, setFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);

  const fetchClients = async (query = "") => {
    setLoading(true);
    try {
      // Simulación de datos
      const data: Client[] = [
        { id: 1, nombre: "Pedro", rut: "12345678-9", telefono: "987654321", email: "pedro@test.com" },
        { id: 2, nombre: "Ana", rut: "98765432-1", telefono: "912345678", email: "ana@test.com" },
      ];

      // Si hay búsqueda, filtrar
      const filtered = query
        ? data.filter((c) =>
          c.nombre.toLowerCase().includes(query.toLowerCase())
        )
        : data;

      setClients(filtered);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los clientes.", "error");
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    const delay = setTimeout(() => fetchClients(filter), 500);
    return () => clearTimeout(delay);
  }, [filter]);

  const table = useReactTable({
    data: clients,
    columns,
    state: { globalFilter: filter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="w-full bg-white border shadow-md rounded-md">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-yellow-400 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Clientes registrados
          </h3>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-4">
          <Link
            href="/clients/create"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-none px-4 py-2"
          >
            <FaUserPlus /> Agregar Cliente
          </Link>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Buscar cliente..."
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
                    <TableHead key={header.id} className="text-gray-700 font-semibold border-b py-3 px-4">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500">
                  ⏳ Cargando clientes...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

    </>
  )
}
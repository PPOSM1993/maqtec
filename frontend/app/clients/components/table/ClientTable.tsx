"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type Client = {
    id: number;
    nombre: string;
    email: string;
};

// Datos de ejemplo
const data: Client[] = [
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 2, nombre: "María López", email: "maria@mail.com" },
    { id: 3, nombre: "Carlos García", email: "carlos@mail.com" },
    { id: 4, nombre: "Ana Torres", email: "ana@mail.com" },
    { id: 5, nombre: "Luis Ramos", email: "luis@mail.com" },
    { id: 6, nombre: "Pedro Silva", email: "pedro@mail.com" },
    { id: 7, nombre: "Elena Soto", email: "elena@mail.com" },
    { id: 8, nombre: "Ricardo Díaz", email: "ricardo@mail.com" },
    { id: 9, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 10, nombre: "María López", email: "maria@mail.com" },
    { id: 11, nombre: "Carlos García", email: "carlos@mail.com" },
    { id: 12, nombre: "Ana Torres", email: "ana@mail.com" },
    { id: 13, nombre: "Luis Ramos", email: "luis@mail.com" },
    { id: 14, nombre: "Pedro Silva", email: "pedro@mail.com" },
    { id: 15, nombre: "Elena Soto", email: "elena@mail.com" },
    { id: 16, nombre: "Ricardo Díaz", email: "ricardo@mail.com" },
    { id: 17, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 18, nombre: "María López", email: "maria@mail.com" },
    { id: 19, nombre: "Carlos García", email: "carlos@mail.com" },
    { id: 20, nombre: "Ana Torres", email: "ana@mail.com" },
    { id: 21, nombre: "Luis Ramos", email: "luis@mail.com" },
    { id: 22, nombre: "Pedro Silva", email: "pedro@mail.com" },
    { id: 23, nombre: "Elena Soto", email: "elena@mail.com" },
    { id: 24, nombre: "Ricardo Díaz", email: "ricardo@mail.com" },
    { id: 25, nombre: "Juan Pérez", email: "juan@mail.com" },
    { id: 26, nombre: "María López", email: "maria@mail.com" },
];

// Columnas
export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="text-gray-800 font-semibold"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
                <ArrowUpDown className="ml-1 h-4 w-4 text-gray-500" />
            </Button>
        ),
    },
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
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="text-gray-800 font-semibold"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-1 h-4 w-4 text-gray-500" />
            </Button>
        ),
    },
];

export default function ClientTable() {
    const [sorting, setSorting] = React.useState([]);
    const [filter, setFilter] = React.useState("");
    const [pageSize, setPageSize] = React.useState(10);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter: filter },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    React.useEffect(() => {
        table.setPageSize(pageSize);
    }, [pageSize]);

    return (
        <div className="w-full bg-white border shadow-md">
            {/* Encabezado */}
            <div className="px-6 py-4 border-b bg-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    Clientes registrados
                </h3>
            </div>

            {/* Controles superiores */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-4">
                <div className="flex gap-2">
                    <Link
                        href="/clients/create"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-none px-4 py-2"
                    >
                        <FaUserPlus /> Agregar Cliente
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Buscar cliente..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="max-w-xs rounded-none"
                    />
                    <Select onValueChange={(v) => setPageSize(Number(v))}>
                        <SelectTrigger
                            className="h-10 w-[190px] text-sm bg-gray-50"
                        >
                            <SelectValue placeholder={`${pageSize} filas`} />
                        </SelectTrigger>
                        <SelectContent className="w-[130px] bg-gray-100">
                            {[5, 10, 15, 20].map((size) => (
                                <SelectItem key={size} value={String(size)} className="h-8 w-[190px]">
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
                    <TableHeader className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-gray-700 font-semibold border-b py-3 px-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
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
                                    className="h-24 text-center text-gray-500"
                                >
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer con paginación tipo DataTable */}
            <div
                className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t bg-gray-50 rounded-none">
                <div className="text-sm text-gray-600">
                    Mostrando{" "}
                    <span className="font-semibold">
                        {table.getRowModel().rows.length}
                    </span>{" "}
                    de {data.length} clientes
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0 rounded-none">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                    >
                        Anterior
                    </Button>

                    {Array.from({ length: table.getPageCount() }).map((_, i) => (
                        <Button
                            key={i}
                            variant={
                                table.getState().pagination.pageIndex === i
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => table.setPageIndex(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}

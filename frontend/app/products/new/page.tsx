"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { FaPlus } from "react-icons/fa";
import { Form } from "@/components/ui/form"; // <-- tu componente Form
// Layout
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

// Constantes para selects
const categorias = ["Herramienta", "Maquinaria", "Insumo", "Repuesto", "Servicio", "Otro"];
const unidades = ["unidad", "kg", "lt", "m2", "m3"];
const monedas = ["CLP", "USD", "EUR"];
const condiciones = ["nuevo", "usado", "Refabricado"];

// Tipo de formulario
type ProductFormData = {
    codigo: string;
    descripcion: string;
    categoria: string;
    p_compra: number;
    valor_neto: number;
    valor_con_iva: number;
    precio_minimo: number;
    articulo_activo: boolean;
    control_stock: boolean;

    cuenta_compra: string;
    cuenta_venta: string;
    unidad_medida: string;
    peso: number;
    comision: number;
    tipo_moneda: string;

    codigo_hora: string;
    precio_hora: number;
    precio_dia: number;
    precio_mes: number;

    condicion: string;
    garantia: string;
    proveedor_garantia?: string;

    costo_unitario: number;
    margen: number;
    precio_venta: number;
    vigencia_dias: number;
};

const NewProductPage = () => {
    const [tab, setTab] = useState<"principal" | "contabilidad" | "arriendo" | "ecommerce" | "fabricacion">("principal");

    const { register, handleSubmit, control, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: {
            articulo_activo: true,
            control_stock: true,
            tipo_moneda: "CLP",
            condicion: "nuevo",
            categoria: "Repuesto",
            unidad_medida: "unidad",
        },
    });

    const onSubmit = (data: ProductFormData) => {
        console.log("Datos completos del producto:", data);
        // Aquí iría la llamada POST a tu backend
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="flex-1 flex flex-col p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Crear Nuevo Producto</h1>
                        <Link href="/products">
                            <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                                Volver a Repuestos
                            </Button>
                        </Link>
                    </div>

                    {/* Form usando el componente Form */}
                    <Form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between bg-white p-6 rounded-md shadow-md">

                        {/* Tabs */}
                        <div className="flex gap-2 mb-4">
                            {["principal", "contabilidad", "arriendo", "ecommerce", "fabricacion"].map((t) => (
                                <Button
                                    key={t}
                                    variant={tab === t ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setTab(t as any)}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </Button>
                            ))}
                        </div>

                        {/* Secciones del formulario */}
                        <div className="flex-1 overflow-y-auto space-y-9 p-9">
                            {/* === Sección Principal === */}
                            {tab === "principal" && (
                                <>
                                    <div>
                                        <Label htmlFor="codigo">Código</Label>
                                        <Input id="codigo" {...register("codigo", { required: true })} />
                                        {errors.codigo && <p className="text-red-500 text-sm">Código obligatorio</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="descripcion">Descripción</Label>
                                        <Input id="descripcion" {...register("descripcion", { required: true })} />
                                    </div>
                                    <div>
                                        <Label htmlFor="categoria">Categoría</Label>
                                        <Controller
                                            name="categoria"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione categoría" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categorias.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="p_compra">Precio Compra</Label>
                                            <Input type="number" step="0.01" {...register("p_compra")} />
                                        </div>
                                        <div>
                                            <Label htmlFor="valor_neto">Valor Neto</Label>
                                            <Input type="number" step="0.01" {...register("valor_neto")} />
                                        </div>
                                        <div>
                                            <Label htmlFor="valor_con_iva">Valor con IVA</Label>
                                            <Input type="number" step="0.01" {...register("valor_con_iva")} />
                                        </div>
                                        <div>
                                            <Label htmlFor="precio_minimo">Precio Mínimo</Label>
                                            <Input type="number" step="0.01" {...register("precio_minimo")} />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox {...register("articulo_activo")} defaultChecked />
                                            <Label>Artículo Activo</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox {...register("control_stock")} defaultChecked />
                                            <Label>Control Stock</Label>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* === Sección Contabilidad === */}
                            {tab === "contabilidad" && (
                                <>
                                    <div>
                                        <Label htmlFor="cuenta_compra">Cuenta Compra</Label>
                                        <Input id="cuenta_compra" {...register("cuenta_compra")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="cuenta_venta">Cuenta Venta</Label>
                                        <Input id="cuenta_venta" {...register("cuenta_venta")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="unidad_medida">Unidad de Medida</Label>
                                        <Controller
                                            name="unidad_medida"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione unidad" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {unidades.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="peso">Peso</Label>
                                        <Input type="number" step="0.01" {...register("peso")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="comision">Comisión</Label>
                                        <Input type="number" step="0.01" {...register("comision")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="tipo_moneda">Tipo Moneda</Label>
                                        <Controller
                                            name="tipo_moneda"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione moneda" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {monedas.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            {/* === Sección Arriendo === */}
                            {tab === "arriendo" && (
                                <>
                                    <div>
                                        <Label htmlFor="codigo_hora">Código Hora</Label>
                                        <Input id="codigo_hora" {...register("codigo_hora")} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="precio_hora">Precio Hora</Label>
                                            <Input type="number" step="0.01" {...register("precio_hora")} />
                                        </div>
                                        <div>
                                            <Label htmlFor="precio_dia">Precio Día</Label>
                                            <Input type="number" step="0.01" {...register("precio_dia")} />
                                        </div>
                                        <div>
                                            <Label htmlFor="precio_mes">Precio Mes</Label>
                                            <Input type="number" step="0.01" {...register("precio_mes")} />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* === Sección Ecommerce === */}
                            {tab === "ecommerce" && (
                                <>
                                    <div>
                                        <Label htmlFor="condicion">Condición</Label>
                                        <Controller
                                            name="condicion"
                                            control={control}
                                            render={({ field }) => (
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione condición" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {condiciones.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="garantia">Garantía</Label>
                                        <Input {...register("garantia")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="proveedor_garantia">Proveedor Garantía</Label>
                                        <Input {...register("proveedor_garantia")} />
                                    </div>
                                </>
                            )}

                            {/* === Sección Fabricación === */}
                            {tab === "fabricacion" && (
                                <>
                                    <div>
                                        <Label htmlFor="costo_unitario">Costo Unitario</Label>
                                        <Input type="number" step="0.01" {...register("costo_unitario")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="margen">Margen %</Label>
                                        <Input type="number" step="0.01" {...register("margen")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="precio_venta">Precio Venta</Label>
                                        <Input type="number" step="0.01" {...register("precio_venta")} />
                                    </div>
                                    <div>
                                        <Label htmlFor="vigencia_dias">Vigencia (días)</Label>
                                        <Input type="number" {...register("vigencia_dias")} />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Botón de Submit */}
                        <Button
                            type="submit"
                            className="self-end flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded px-3 py-2 rounded-none"
                        >
                            <FaPlus className="text-xl" />
                            Crear Repuesto
                        </Button>
                    </Form>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default NewProductPage;

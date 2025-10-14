"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Region {
  id: number;
  nombre: string;
}

interface Commune {
  id: number;
  nombre: string;
  city: number;
}

export default function ClientsForm() {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [giro, setGiro] = useState("");
  const [direccion, setDireccion] = useState("");
  const [region, setRegion] = useState<number | null>(null);
  const [comuna, setComuna] = useState<number | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [descuento, setDescuento] = useState(0);
  const [activo, setActivo] = useState(true);
  const [telefono, setTelefono] = useState("");

  // 🚀 Cargar regiones al montar el componente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        rut,
        nombre,
        fantasia,
        giro,
        direccion,
        region,
        comuna,
        descuento,
        activo,
        telefono,
      };
      await axios.post("/api/clients/", payload);
      alert("Cliente creado correctamente");
      // Reset form
      setRut("");
      setNombre("");
      setFantasia("");
      setGiro("");
      setDireccion("");
      setRegion(null);
      setComuna(null);
      setDescuento(0);
      setActivo(true);
      setTelefono("");
    } catch (err) {
      console.error(err);
      alert("Error al crear cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* RUT */}
        <div>
          <Label htmlFor="rut">RUT</Label>
          <Input
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="12345678-5"
          />
        </div>

        {/* Nombre */}
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Fantasia */}
        <div>
          <Label htmlFor="fantasia">Fantasia</Label>
          <Input
            id="fantasia"
            value={fantasia}
            onChange={(e) => setFantasia(e.target.value)}
          />
        </div>

        {/* Giro */}
        <div>
          <Label htmlFor="giro">Giro</Label>
          <Input
            id="giro"
            value={giro}
            onChange={(e) => setGiro(e.target.value)}
          />
        </div>

        {/* Dirección */}
        <div className="md:col-span-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        {/* Región */}
        <div>
          <Label>Región</Label>
          <Select
            onValueChange={(val) => setRegion(Number(val))}
            value={region?.toString() || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Región" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r.id} value={r.id.toString()}>
                  {r.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Comuna */}
        <div>
          <Label>Comuna</Label>
          <Select
            onValueChange={(val) => setComuna(Number(val))}
            value={comuna?.toString() || ""}
            disabled={!region}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Comuna" />
            </SelectTrigger>
            <SelectContent>
              {communes.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Descuento */}
        <div>
          <Label htmlFor="descuento">Descuento (%)</Label>
          <Input
            id="descuento"
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>

        {/* Activo */}
        <div className="flex items-center gap-2">
          <Input
            type="checkbox"
            id="activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
            className="w-5 h-5 accent-green-500"
          />
          <Label htmlFor="activo">Activo</Label>
        </div>

        {/* Teléfono */}
        <div className="md:col-span-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </div>

      {/* Botón enviar */}
      <Button
        type="submit"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-none px-4 py-2"
      >
        Guardar Cliente
      </Button>
    </form>
  );
}

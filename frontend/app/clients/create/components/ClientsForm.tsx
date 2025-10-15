"use client";

import { useState } from "react";
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
import { Form } from "@/components/ui/form";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, PlusCircleIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Region {
  id: number;
  nombre: string;
}

interface Commune {
  id: number;
  nombre: string;
  city: number;
}

interface ClientsFormProps {
  initialRegions?: Region[];
  initialCommunes?: Commune[];
}

export default function ClientsForm({
  initialRegions = [],
  initialCommunes = [],
}: ClientsFormProps) {
  const router = useRouter();

  const [step, setStep] = useState(1); // Wizard step

  // ===== Cliente =====
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [giro, setGiro] = useState("");
  const [direccion, setDireccion] = useState("");
  const [region, setRegion] = useState<number | null>(null);
  const [comuna, setComuna] = useState<number | null>(null);
  const [descuento, setDescuento] = useState(0);
  const [activo, setActivo] = useState(true);
  const [telefono, setTelefono] = useState("");

  // ===== ClienteFinanza =====
  const [credito, setCredito] = useState(0);
  const [deuda, setDeuda] = useState(0);
  const [solicitado, setSolicitado] = useState(0);
  const [diaPago, setDiaPago] = useState<number | null>(null);

  // ===== ClienteCuenta =====
  const [banco, setBanco] = useState("");
  const [cuentaCorriente, setCuentaCorriente] = useState("");
  const [titular, setTitular] = useState("");
  const [montoCheque, setMontoCheque] = useState(0);
  const [mandato, setMandato] = useState("");

  // Filtrar comunas según región
  const communes = initialCommunes.filter((c) =>
    region ? c.city === region : true
  );

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
        finanzas: {
          credito,
          deuda,
          solicitado,
          dia_pago: diaPago,
        },
        cuenta: {
          banco,
          cuenta_corriente: cuentaCorriente,
          titular,
          monto_cheque: montoCheque,
          mandato,
        },
      };

      await axios.post("/api/clients/", payload);
      alert("Cliente creado correctamente");
      router.push("/clients");
    } catch (err) {
      console.error(err);
      alert("Error al crear cliente");
    }
  };

  const handleCancelar = () => {
    router.push("/clients");
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6 max-w-xl p-4">
      {/* ===== STEP 1: Datos Cliente ===== */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rut">RUT</Label>
              <Input
                id="rut"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="12345678-5"
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="fantasia">Fantasia</Label>
              <Input
                id="fantasia"
                value={fantasia}
                onChange={(e) => setFantasia(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="giro">Giro</Label>
              <Input
                id="giro"
                value={giro}
                onChange={(e) => setGiro(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div>
              <Label>Región</Label>
              <Select
                onValueChange={(val) => setRegion(Number(val))}
                value={region?.toString() || ""}
              >
                <SelectTrigger className="rounded-none">
                  <SelectValue placeholder="Seleccionar Región" />
                </SelectTrigger>
                <SelectContent>
                  {initialRegions.map((r) => (
                    <SelectItem key={r.id} value={r.id.toString()}>
                      {r.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Comuna</Label>
              <Select
                onValueChange={(val) => setComuna(Number(val))}
                value={comuna?.toString() || ""}
                disabled={!region}
              >
                <SelectTrigger className="rounded-none">
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
            <div>
              <Label htmlFor="descuento">Descuento (%)</Label>
              <Input
                id="descuento"
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(Number(e.target.value))}
                min={0}
                max={100}
                className="rounded-none"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6 md:mt-0 bg">
              <Checkbox
                id="activo"
                checked={activo}
                onCheckedChange={setActivo}
                className="w-6 h-6 accent-yellow-500 cursor-pointer bg-yellow-500 rounded-none"
              />
              <label htmlFor="activo" className="text-sm font-medium leading-none">
                Activo
              </label>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="rounded-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP 2: Finanzas ===== */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Finanzas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="credito">Crédito</Label>
              <Input
                id="credito"
                type="number"
                value={credito}
                onChange={(e) => setCredito(Number(e.target.value))}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="deuda">Deuda</Label>
              <Input
                id="deuda"
                type="number"
                value={deuda}
                onChange={(e) => setDeuda(Number(e.target.value))}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="solicitado">Solicitado</Label>
              <Input
                id="solicitado"
                type="number"
                value={solicitado}
                onChange={(e) => setSolicitado(Number(e.target.value))}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="diaPago">Día de pago</Label>
              <Input
                id="diaPago"
                type="number"
                value={diaPago || ""}
                onChange={(e) => setDiaPago(Number(e.target.value))}
                min={1}
                max={31}
                className="rounded-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP 3: Cuenta Bancaria ===== */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Cuenta Bancaria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco">Banco</Label>
              <Input
                id="banco"
                value={banco}
                onChange={(e) => setBanco(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="cuentaCorriente">Cuenta Corriente</Label>
              <Input
                id="cuentaCorriente"
                value={cuentaCorriente}
                onChange={(e) => setCuentaCorriente(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="titular">Titular</Label>
              <Input
                id="titular"
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="montoCheque">Monto Cheque</Label>
              <Input
                id="montoCheque"
                type="number"
                value={montoCheque}
                onChange={(e) => setMontoCheque(Number(e.target.value))}
                className="rounded-none"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mandato">Mandato</Label>
              <Input
                id="mandato"
                value={mandato}
                onChange={(e) => setMandato(e.target.value)}
                className="rounded-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== Botones de navegación ===== */}
      <div className="flex justify-end mt-4 flex-wrap gap-2 cursor-pointer">
        <div className="flex gap-2">
          {step > 1 && (
            <Button type="button" onClick={prevStep} className="flex bg-yellow-400 hover:bg-yellow-500 rounded-none text-black">
              <ArrowLeftIcon />
              Anterior
            </Button>
          )}

          {step < 3 && (
            <Button type="button" onClick={nextStep} className="flex bg-gray-800 hover:bg-gray-800 rounded-none text-white">
              <ArrowRightIcon />
              Siguiente
            </Button>
          )}

          {step === 3 && (
            <Button type="submit" className="bg-green-500 hover:bg-green-600 flex items-center gap-2 rounded-none">
              <PlusCircleIcon /> Guardar Cliente
            </Button>
          )}

          <Button type="button" onClick={handleCancelar} className="bg-red-500 hover:bg-red-600 flex items-center gap-2 rounded-none text-white">
            <MdCancel className="w-6 h-6" /> Cancelar
          </Button>
        </div>
      </div>
    </Form>
  );
}

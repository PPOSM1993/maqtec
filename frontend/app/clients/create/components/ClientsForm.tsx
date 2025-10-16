"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
import { getCookie } from "../../../../lib/api";
import { User } from "../../../../types/user";
import { useAuth } from "../../../../hooks/useAuth";

interface Region {
  id: number;
  nombre: string;
}

interface City {
  id: number;
  nombre: string;
  region: number;
}

interface Commune {
  id: number;
  nombre: string;
  city: number;
}

interface AuthUser {
  id: number;
  email: string;
  username: string;
}


export default function ClientsForm() {
  const router = useRouter();

  // provide react-hook-form methods for the FormProvider alias exported as `Form`
  const methods = useForm();

  const [step, setStep] = useState(1); // Wizard step

  // ===== Cliente =====
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [giro, setGiro] = useState("");
  const [direccion, setDireccion] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const { user } = useAuth(); // tu usuario logueado
  const [vendedor, setVendedor] = useState<AuthUser | null>(null);

  //const { user } = useAuth(); // tu hook de Zustand



  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedCommune, setSelectedCommune] = useState<number | null>(null);

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

  // ===== Datos de referencia (regiones, ciudades, comunas) =====
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const selectClasses = "h-10 px-3 bg-white rounded-none text-gray-800 shadow-sm flex items-center justify-between";

  // Filtrado de ciudades según región seleccionada
  const filteredCities = selectedRegion
    ? cities.filter((c) => c.region.id === selectedRegion)
    : [];

  // Filtrado de comunas según ciudad seleccionada
  const filteredCommunes = selectedCity
    ? communes.filter((c) => c.city.id === selectedCity)
    : [];


  useEffect(() => {
    async function fetchReferenceData() {
      try {
        const storedUser = JSON.parse(localStorage.getItem("maqtec_user") || "null");
        const token = storedUser?.token;

        if (!token) {
          alert("Debes iniciar sesión");
          router.push("/login");
          return;
        }

        const res = await fetch(
          "http://localhost:8000/api/clients/clients/?page_size=1000",
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          alert("Tu sesión expiró, inicia sesión nuevamente");
          router.push("/login");
          return;
        }

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();

        // Asegurarnos que siempre sean arrays válidos
        const regionsData = Array.isArray(data.regions) ? data.regions : [];
        const citiesData = Array.isArray(data.cities) ? data.cities : [];
        const communesData = Array.isArray(data.communes) ? data.communes : [];

        setRegions(regionsData);
        setCities(citiesData);
        setCommunes(communesData);

      } catch (error: any) {
        console.error("Error cargando datos:", error);
        alert("Error cargando regiones, ciudades y comunas");
        // Siempre inicializamos arrays vacíos para evitar errores de .filter
        setRegions([]);
        setCities([]);
        setCommunes([]);
      }
    }

    fetchReferenceData();
  }, []);


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🟦 handleSubmit iniciado");

    // === Validaciones básicas ===
    if (!rut || !nombre || !giro || !direccion || !selectedRegion || !selectedCity || !selectedCommune || !telefono) {
      console.log("⚠️ Falta un campo obligatorio");
      alert("Por favor completa todos los campos obligatorios antes de continuar.");
      return;
    }

    try {
      console.log("🟨 Buscando token en localStorage...");
      const storedUser = JSON.parse(localStorage.getItem("maqtec_user") || "null");
      const token = storedUser?.token;

      if (!token) {
        console.log("🚫 No hay token, redirigiendo a login...");
        alert("Debes iniciar sesión.");
        router.push("/login");
        return;
      }

      // ===== Asignar vendedor automáticamente desde el usuario logueado =====
      let vendedorId: number | null = null;
      if (user) {
        vendedorId = user.id;
      }

      const finanzasPayload = (credito || deuda || solicitado || diaPago !== null)
        ? [{
          credito: credito || 0,
          deuda: deuda || 0,
          solicitado: solicitado || 0,
          dia_pago: diaPago || null,
        }]
        : []; // si no hay datos, enviar array vacío

      const cuentaPayload = (banco || cuentaCorriente || titular || montoCheque || mandato)
        ? [{
          banco: banco || "",
          cuenta_corriente: cuentaCorriente || "",
          titular: titular || "",
          monto_cheque: montoCheque || 0,
          mandato: mandato || "",
        }]
        : []; // array vacío si no hay datos

      const payload = {
        rut,
        nombre,
        fantasia: fantasia || null,
        giro,
        direccion,
        region: selectedRegion,
        city: selectedCity,
        comuna: selectedCommune,
        descuento: descuento || 0,
        activo,
        telefono,
        vendedor: vendedorId,
        finanzas: finanzasPayload, // siempre array
        cuenta: cuentaPayload,     // siempre array
      };


      console.log("📦 Payload preparado:", payload);

      console.log("🚀 Enviando request a backend...");
      const response = await fetch("http://localhost:8000/api/clients/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("📥 Respuesta recibida:", response.status);

      if (!response.ok) {
        // 👉 Mejor captura de error, para ver exactamente lo que devuelve Django
        const text = await response.text();
        console.error("❌ Error en backend:", text);
        alert(`❌ Error al crear cliente. Revisa la consola (Status ${response.status})`);
        return;
      }

      alert("✅ Cliente creado correctamente.");
      router.push("/clients");
    } catch (err: any) {
      console.error("💥 Error general:", err);
      alert(`❌ Error al conectar con el servidor: ${err.message || err}`);
    }

  };


  const handleCancelar = () => {
    router.push("/clients");
  };

  return (
    <Form {...methods} >
      <form onSubmit={handleSubmit}>
        {/* ===== STEP 1: Datos Cliente ===== */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Datos del Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RUT, Nombre, Fantasia, Giro, Dirección */}
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
                <Label htmlFor="fantasia">Nombre Fantasia</Label>
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
              {/* Región */}

              <div>
                <Label>Región</Label>
                <Select
                  onValueChange={(val) => {
                    setSelectedRegion(Number(val));
                    setSelectedCity(null);
                    setSelectedCommune(null);
                  }}
                  value={selectedRegion?.toString() || ""}
                >
                  <SelectTrigger className="bg-white border border-gray-300 rounded-none h-10 px-3 flex items-center justify-between shadow-sm">
                    <SelectValue placeholder="Seleccionar Región" className="text-gray-700" />
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


              {/* Ciudad */}

              <div>
                <Label>Ciudad</Label>
                <Select
                  onValueChange={(val) => {
                    setSelectedCity(Number(val));
                    setSelectedCommune(null);
                  }}
                  value={selectedCity?.toString() || ""}
                  disabled={filteredCities.length === 0}
                >
                  <SelectTrigger className="bg-white border border-gray-300 rounded-none h-10 px-3 flex items-center justify-between shadow-sm">
                    <SelectValue placeholder="Seleccionar Ciudad" className="text-gray-700" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCities.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              {/* Comuna */}
              <div>
                <Label>Comuna</Label>
                <Select
                  onValueChange={(val) => setSelectedCommune(Number(val))}
                  value={selectedCommune?.toString() || ""}
                  disabled={filteredCommunes.length === 0}
                >
                  <SelectTrigger className="bg-white border border-gray-300 rounded-none h-10 px-3 flex items-center justify-between shadow-sm">
                    <SelectValue placeholder="Seleccionar Comuna" className="text-gray-700" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCommunes.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>



              {/* Descuento, Activo, Teléfono */}
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

              {/* Vendedor */}
              <div>
                <Label>Vendedor</Label>
                <Select value={user?.id?.toString() || ""} disabled>
                  <SelectTrigger className="bg-white border border-gray-300 rounded-none h-10 px-3 flex items-center justify-between shadow-sm">
                    <SelectValue placeholder="Vendedor asignado automáticamente" className="text-gray-700" />
                  </SelectTrigger>
                  <SelectContent>
                    {user && (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.first_name} {user.last_name}

                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
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

        {/* STEP 2 y STEP 3: Finanzas y Cuenta Bancaria */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Datos Financieros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="credito">Crédito (CLP)</Label>
                <Input
                  id="credito"
                  type="number"
                  value={credito}
                  onChange={(e) => setCredito(Number(e.target.value))}
                  className="rounded-none"
                />
              </div>

              <div>
                <Label htmlFor="deuda">Deuda (CLP)</Label>
                <Input
                  id="deuda"
                  type="number"
                  value={deuda}
                  onChange={(e) => setDeuda(Number(e.target.value))}
                  className="rounded-none"
                />
              </div>

              <div>
                <Label htmlFor="solicitado">Solicitado (CLP)</Label>
                <Input
                  id="solicitado"
                  type="number"
                  value={solicitado}
                  onChange={(e) => setSolicitado(Number(e.target.value))}
                  className="rounded-none"
                />
              </div>

              <div>
                <Label htmlFor="diaPago">Día de Pago</Label>
                <Input
                  id="diaPago"
                  type="number"
                  value={diaPago ?? ""}
                  min={1}
                  max={31}
                  onChange={(e) => setDiaPago(Number(e.target.value))}
                  className="rounded-none"
                />
              </div>
            </div>
          </div>
        )}

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
                <Label htmlFor="montoCheque">Monto Cheque (CLP)</Label>
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
                  placeholder="Ej: Mandato firmado por el titular"
                />
              </div>
            </div>
          </div>
        )}


        {/* Mantén tus divs de finanzas y cuenta bancaria tal como los tenías */}

        <div className="flex justify-end mt-4 flex-wrap gap-2 cursor-pointer">
          <div className="flex gap-2">
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                className="flex bg-yellow-400 hover:bg-yellow-500 rounded-none text-black"
              >
                <ArrowLeftIcon /> Anterior
              </Button>
            )}

            {step < 3 && (
              <Button
                type="button"
                onClick={nextStep}
                className="flex bg-gray-800 hover:bg-gray-800 rounded-none text-white"
              >
                <ArrowRightIcon /> Siguiente
              </Button>
            )}

            {step === 3 && (
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 flex items-center gap-2 rounded-none"
              >
                <PlusCircleIcon /> Guardar Cliente
              </Button>
            )}

            <Button
              type="button"
              onClick={handleCancelar}
              className="bg-red-500 hover:bg-red-600 flex items-center gap-2 rounded-none text-white"
            >
              <MdCancel className="w-6 h-6" /> Cancelar
            </Button>
          </div>
        </div>

      </form>
    </Form>
  );
}

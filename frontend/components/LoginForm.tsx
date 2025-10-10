"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../lib/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const auth = useAuth();
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await loginUser({ email: data.email, password: data.password });
      console.log("Respuesta backend:", response);

      // Guardar usuario y token en Zustand
      auth.setUser({ ...response.user, token: response.access });

      // Redirigir al dashboard SPA
      router.push("/dashboard");
    } catch (err) {
      alert("❌ Error de conexión o credenciales inválidas");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden px-4">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-80 via-yellow-20 to-gray-20 animate-gradient-move"></div>

      {/* Card principal */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-md p-8 bg-white rounded-sm shadow-xl transform transition-transform duration-300 hover:shadow-xl">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
            <Image
              src="/logo.png"
              alt="Maqtec Logo"
              fill
              className="object-contain animate-bounce-slow"
              priority
            />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 tracking-wide">
          Iniciar Sesión
        </h1>

        {/* Formulario react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
          <div>
            <Label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Nombre de Usuario"
              {...register("email", { required: true })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm sm:text-base py-2.5 px-4 transition-all duration-200"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm sm:text-base font-medium text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register("password", { required: true })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm sm:text-base py-2.5 px-4 transition-all duration-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 sm:py-2 rounded-sm shadow-md hover:shadow-md hover:scale-105 focus:ring-4 focus:ring-yellow-300 transition-transform duration-200 text-base sm:text-md"
          >
            Ingresar
          </Button>
        </form>

        {/* Pie de página */}
        <p className="mt-6 text-center text-sm sm:text-base text-gray-500 relative z-10">
          &copy; {new Date().getFullYear()} Maqtec. Todos los derechos reservados.
        </p>
      </div>

      {/* Animación de fondo */}
      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 15s ease infinite;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;

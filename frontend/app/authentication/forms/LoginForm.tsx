"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { loginUser } from "../../../lib/api";
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Swal from "sweetalert2";

type LoginFormInputs = {
  email: string;
  password: string;
};

// Componente reutilizable para inputs
const FormInput = ({ id, label, type, placeholder }: { id: string; label: string; type: string; placeholder: string }) => {
  const { register } = useFormContext<LoginFormInputs>();
  return (
    <div>
      <Label htmlFor={id} className="text-sm sm:text-base font-medium text-gray-700">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id as keyof LoginFormInputs, { required: true })}
        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm text-sm sm:text-base py-2.5 px-4 transition-all duration-200"
      />
    </div>
  );
};

const LoginForm = () => {
  const router = useRouter();
  const auth = useAuth();
  const methods = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await loginUser({ email: data.email, password: data.password });
      console.log("Respuesta backend:", response);

      auth.setUser({ ...response.user, token: response.access });
      router.push("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "❌ Usuario o contraseña incorrectos",
        confirmButtonColor: "#facc15", // amarillo Maqtec
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden px-4">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-80 via-yellow-20 to-gray-20 animate-gradient-move"></div>

      {/* Card principal */}
      <Card className="relative w-full max-w-md sm:max-w-lg md:max-w-md p-6 shadow-xl transform transition-transform duration-300 hover:shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
            <Image
              src="/logo2.png"
              alt="Maqtec Logo"
              fill
              className="object-contain animate-bounce-slow"
              priority
            />
          </div>
        </div>

        {/* Título */}
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-6 tracking-wide">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>

        {/* Formulario */}
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              <FormInput id="email" label="Email" type="text" placeholder="tu@email.com" />
              <FormInput id="password" label="Contraseña" type="password" placeholder="********" />

              <Button
                type="submit"
                className="w-full bg-yellow-400 text-black font-bold py-3 sm:py-2 rounded-sm shadow-md hover:shadow-md hover:scale-105 focus:ring-4 focus:ring-yellow-300 transition-transform duration-200 text-base sm:text-md"
              >
                Ingresar
              </Button>
            </form>
          </FormProvider>
        </CardContent>

        {/* Pie de página */}
        <p className="mt-6 text-center text-sm sm:text-base text-gray-500 relative z-10">
          &copy; {new Date().getFullYear()} Maqtec. Todos los derechos reservados.
        </p>
      </Card>

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

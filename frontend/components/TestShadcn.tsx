"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const TestShadcn: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Formulario de Prueba</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" placeholder="Tu nombre" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="tu@email.com" />
          </div>
          <Button className="w-full">Enviar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

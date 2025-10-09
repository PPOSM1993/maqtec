import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">MAQTEC ERP</h1>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg text-gray-700">
          Bienvenido a MAQTEC ERP, tu solución integral para la gestión empresarial.
        </p>
      </div>
    </div>
  );
}

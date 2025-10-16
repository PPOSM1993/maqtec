"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-yellow-400 backdrop-blur-md text-black-200 py-12 -2xl shadow-xl">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-10 text-sm">
        {/* Logo y descripción */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <Image
            src="/logo2.png"
            alt="Logo de Maqtec"
            width={90}
            height={90}
            priority
            className="rounded-xl"
          />
          <p className="mt-4 text-gray-800 leading-relaxed">
            Plataforma moderna para gestionar tus proyectos, cotizaciones y tareas con eficiencia.
          </p>
        </motion.div>

        {/* Links rápidos */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Links rápidos</h2>
          <ul className="space-y-2">
            {["Inicio", "Servicios", "Sobre Nosotros", "Contacto"].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5, color: "#111" }}
                className="cursor-pointer hover:text-gray-950 transition-colors"
              >
                {link}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Recursos */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Recursos</h2>
          <ul className="space-y-2">
            {["Blog", "FAQ", "Soporte", "Términos"].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5, color: "#111" }}
                className="cursor-pointer hover:text-gray-950 transition-colors"
              >
                {link}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Redes sociales */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Síguenos</h2>
          <div className="flex items-center gap-4 mt-3">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2, y: -3 }}
                className="bg-white/30 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white/60 transition"
              >
                <Icon size={18} className="text-gray-900" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Línea inferior */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="border-yellow-500/50 mt-10 pt-6 text-center text-xs text-gray-800"
      >
        © {new Date().getFullYear()} Maqtec. Todos los derechos reservados.
      </motion.div>
    </footer>
  );
}

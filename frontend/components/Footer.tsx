"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
};

export default function Footer() {
    return (
        <footer className="bg-yellow-400 backdrop-blur-md text-black-200 py-12 -2xl shadow-xl">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">

                {/* Logo y descripción */}
                <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
                    <Image
                        src="/logo2.png"
                        alt="Logo de Maqtec"
                        width={100}
                        height={100}
                        priority
                    />
                    <p className="text-black-400 text-sm mt-4">
                        Plataforma avanzada para gestionar tus proyectos y tareas con estilo y eficiencia.
                    </p>
                </motion.div>

                {/* Links rápidos */}
                <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
                    <h2 className="font-semibold mb-3">Links rápidos</h2>
                    <ul className="space-y-2">
                        {["Inicio", "Servicios", "Sobre Nosotros", "Contacto"].map((link, idx) => (
                            <motion.li
                                key={idx}
                                whileHover={{ x: 5, color: "#fff" }}
                                className="cursor-pointer transition-colors"
                            >
                                {link}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Recursos */}
                <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
                    <h2 className="font-semibold mb-3">Recursos</h2>
                    <ul className="space-y-2">
                        {["Blog", "FAQ", "Soporte", "Términos"].map((link, idx) => (
                            <motion.li
                                key={idx}
                                whileHover={{ x: 5, color: "#fff" }}
                                className="cursor-pointer transition-colors"
                            >
                                {link}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Redes sociales */}
                <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
                    <h2 className="font-semibold mb-3">Síguenos</h2>
                    <div className="flex space-x-4 mt-2">
                        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                            <motion.a
                                key={idx}
                                href="#"
                                whileHover={{ scale: 1.2, color: "#fff" }}
                                className="text-gray-400 transition-colors"
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Derechos de autor */}
            <motion.div
                className="text-center text-white-100 mt-10 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                © {new Date().getFullYear()} Maqtec. Todos los derechos reservados.
            </motion.div>
        </footer>
    );
}

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

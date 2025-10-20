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
    <footer className="bg-yellow-400 backdrop-blur-md text-black-200 py-5 -2xl shadow-xl px-6 md:px-12 text-center">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-1">


      </div>

    </footer>
  );
}

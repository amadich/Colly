"use client";

import { ChevronRight } from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";

const navLinks = [
  { name: "Features", href: "#" },
  { name: "Communities", href: "#" },
  { name: "Events", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Login", href: "/Login" },
];

// 1. Define Container Variants (handles the stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each item
      delayChildren: 0.3,   // Delay before starting the sequence
    },
  },
};

// 2. Define Item Variants (individual movement)
const itemVariants : Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Navbar() {
  return (
    <header className="flex items-center justify-around p-4">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center justify-center gap-4"
      >
        <Image
          src={"/CollyLogo.png"}
          width={64}
          height={64}
          alt="Logo Colly"
          className="scale-x-[-1]"
        />
        <div>
          <h2 className="text-lg font-bold">Colly</h2>
          <i>Dub Edition</i>
        </div>
      </motion.div>

      {/* Animated List Container */}
      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center space-x-4"
      >
        {navLinks.map((link, index) => (
          <motion.li key={index} variants={itemVariants}>
            <Link href={link.href} className="hover:text-neutral-500 duration-200">
              {link.name}
            </Link>
          </motion.li>
        ))}

        <motion.li variants={itemVariants}>
          <Link href={"/Signup"}>
            <button className="flex items-center justify-center rounded-full bg-black text-white p-1 w-35 text-sm cursor-pointer duration-150 hover:pl-4 group">
              Join for Free 
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.li>
      </motion.ul>
    </header>
  );
}
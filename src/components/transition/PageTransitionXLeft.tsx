"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageTransitionXLeft() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 flex items-center justify-center bg-white"
        initial={{ x: 0 }}
        animate={{
          x: "-100%",
          transition: { delay: 1.8, duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        {/* Animated Background Panels for a "Shutter" effect */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />

        <div className="relative flex flex-col items-center gap-6">
          {/* Logo Animation: Scale and Fade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/CollyLogo.png"
              alt="Colly logo"
              width={60}
              height={60}
              className="drop-shadow-2xl"
            />

            {/* Elegant Ring around logo */}
            <motion.div
              className="absolute -inset-4 border border-[#B4E380]/30 rounded-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </motion.div>

          {/* Minimal Text Loader */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-black font-bold tracking-[0.3em] uppercase text-sm"
            >
              Colly
            </motion.p>
          </div>

          {/* Slim Premium Progress Bar */}
          <div className="w-40 h-0.5 bg-gray-100 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
"use client";
import { motion } from "framer-motion";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="
            w-14 h-14
            bg-[#ffeb3b]
            border-4 border-black
            rounded-full
            flex items-center justify-center
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            cursor-pointer
          "
        onClick={() => {
          router.push("/");
        }}
      >
        <House size={28} strokeWidth={3} />
      </motion.button>
    </div>
  );
}

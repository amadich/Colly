"use client"; // Required for Framer Motion animations

import { ChevronRight } from "@mynaui/icons-react";
import Image from "next/image";
import { motion } from "motion/react"; // Use "framer-motion" if you prefer standard imports

export default function Hero6() {
  return (
    <>
      <section className="w-full mx-auto flex min-h-screen flex-col items-start justify-start gap-x-8 gap-y-14 ">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-foreground text-6xl font-bold tracking-tight text-balance">
            Find Your Tribe, Build Your Network.
          </h1>
          <p className="text-muted-foreground mx-auto max-w-sm text-base">
            Connect with like-minded students for fun, friendships, and future
            opportunities.
          </p>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-full bg-black text-white p-2 w-35 text-sm duration-150 hover:bg-white hover:text-black cursor-pointer hover:border">
              Join for Free <ChevronRight className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center rounded-full border border-black bg-transparent text-black p-2 text-sm duration-150 hover:bg-black hover:text-white cursor-pointer">
              Explore Communinties
            </button>
          </div>
        </div>

        {/* Animated Image Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2, 
            ease: [0, 0.71, 0.2, 1.01] 
          }}
          className="w-full"
        >
          <Image
            src={"/assets/home/Hero_Home.svg"}
            width={2752}
            height={1536}
            alt="Hero 1"
            priority // Added priority for LCP optimization
            className="relative w-full h-auto -mt-32 -z-1"
          />
        </motion.div>
      </section>
    </>
  );
}
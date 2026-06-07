"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PageTransitionProps {
  onCenter?: () => void;     // Fires when panels lock in the center
  onComplete?: () => void;   // Fires when exit animation is fully finished
  bgCharSrc?: string;        // Path to the background watermark image
  fgCharSrc?: string;        // Path to the front foreground character image
}

export default function PageTransition2({ 
  onCenter, 
  onComplete,
  bgCharSrc = "/assets/images/anime_char_1.webp", // fallback default
  fgCharSrc = "/assets/images/anime_char_2.webp"  // fallback default
}: PageTransitionProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const centerTimer = setTimeout(() => {
      if (onCenter) onCenter();
    }, 800);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2300);

    return () => {
      clearTimeout(centerTimer);
      clearTimeout(exitTimer);
    };
  }, [onCenter]);

  // Slanted Panel Variant Configurations
  const leftPanelVariants: Variants = {
    initial: { y: "-100%" },
    animate: { y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
    exit: { y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const middlePanelVariants: Variants = {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
    exit: { y: "100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const rightPanelVariants: Variants = {
    initial: { y: "-100%" },
    animate: { y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
    exit: { y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const characterVariants: Variants = {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -60, 
      transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div className="fixed inset-0 z-9999 overflow-hidden bg-transparent pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            
            {/* PART 1: Left Panel */}
            <motion.div
              variants={leftPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-[#63b3ed]"
              style={{ clipPath: "polygon(0 0, 35% 0, 18% 100%, 0 100%)" }}
            >
              <div className="absolute top-8 left-8 grid grid-cols-4 gap-2 opacity-60">
                {[...Array(12)].map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-full" />)}
              </div>
              <div className="absolute bottom-8 left-8 grid grid-cols-4 gap-2 opacity-60">
                {[...Array(12)].map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-full" />)}
              </div>
            </motion.div>

            {/* PART 2: Middle Panel */}
            <motion.div
              variants={middlePanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-[#e2e8f0] flex items-center justify-center overflow-hidden"
              style={{ clipPath: "polygon(35% 0, 75% 0, 52% 100%, 18% 100%)" }}
            >
              {/* Dynamic Watermark Image */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 scale-110 mix-blend-multiply">
                <Image
                  src={bgCharSrc}
                  alt="Character Background Watermark"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center grayscale brightness-125"
                  draggable={false}
                />
              </div>

              <div 
                className="absolute top-0 left-0 right-0 h-6 opacity-80" 
                style={{
                  backgroundImage: "linear-gradient(135deg,#1e3a8a_25%,transparent_25%,transparent_50%,#1e3a8a_50%,#1e3a8a_75%,transparent_75%,transparent)",
                  backgroundSize: "20px 20px"
                }}
              />
              <div 
                className="absolute bottom-0 left-0 right-0 h-6 opacity-80" 
                style={{
                  backgroundImage: "linear-gradient(135deg,#1e3a8a_25%,transparent_25%,transparent_50%,#1e3a8a_50%,#1e3a8a_75%,transparent_75%,transparent)",
                  backgroundSize: "20px 20px"
                }}
              />
            </motion.div>

            {/* PART 3: Right Panel */}
            <motion.div
              variants={rightPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-[#1e3a8a]"
              style={{ clipPath: "polygon(75% 0, 100% 0, 100% 100%, 52% 100%)" }}
            >
              <div className="absolute top-8 right-8 grid grid-cols-1 gap-3 opacity-60">
                {[...Array(4)].map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-full" />)}
              </div>
              <div className="absolute bottom-8 left-[55%] grid grid-cols-4 gap-2 opacity-60">
                {[...Array(12)].map((_, i) => <div key={i} className="w-2 h-2 bg-white rounded-full" />)}
              </div>
              <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/40" />
            </motion.div>

            {/* FOREGROUND MAIN LAYER: Dynamic Character Breakout */}
            <div className="absolute inset-0 z-50 flex items-end justify-center pointer-events-none select-none">
              <motion.div
                variants={characterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative w-[90vw] max-w-137.5 h-[85vh] md:h-[90vh] origin-bottom mb-[-2vh]"
              >
                <Image
                  src={fgCharSrc}
                  alt="Primary Foreground Character"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 550px"
                  className="object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
                  draggable={false}
                />
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
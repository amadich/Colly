"use client";;
import Image from "next/image";
import { motion, Variants } from "framer-motion";

import { Pacifico } from "next/font/google";
import HomeButton from "@/components/customs/HomeButton";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

// interface Petal {
//   id: number;
//   top: string;
//   left: string;
//   duration: number;
//   delay: number;
// }

export default function NotFound() {
  // Generate petals once during initial render
//   const [petals, setPetals] = useState<Petal[]>([]);

//   useEffect(() => {
//     const generatedPetals = Array.from({ length: 15 }).map((_, i) => ({
//       id: i,
//       top: `${Math.random() * 100}%`,
//       left: `${Math.random() * 100}%`,
//       duration: 6 + Math.random() * 6,
//       delay: Math.random() * -10,
//     }));

//     setPetals(generatedPetals);
//   }, []);

  // Soft upward slide entry for the centered character anchored to the bottom edge
  const characterVariants: Variants = {
    initial: { opacity: 0, y: 120, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Entry animation for the standalone cat character
  const catVariants: Variants = {
    initial: { opacity: 0, scale: 0.9, y: 60 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Smooth pop entrance for typography
  const textEntranceVariants: Variants = {
    initial: { opacity: 0, scale: 0.85, y: 30 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 1,
        ease: [0.34, 1.3, 0.64, 1], // Playful subtle bounce
      },
    },
  };

  // Rhythmic breathing loop animation matching the source style
  const breathingAnimation: Variants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Gentle floating animation loop specifically for the cat companion
  const catIdleAnimation: Variants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      },
    },
  };

  // Continuous subtle floating loop for typography strings
  const textFloatAnimation: Variants = {
    animate: {
      y: [0, -6, 0],
      rotate: [-1, 1, -1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <main className={`${pacifico.className} text-6xl relative min-h-screen w-full flex flex-col justify-end items-center overflow-hidden bg-[#1c2e1c] select-none`}>
        <HomeButton />
        {/* Dynamic injection of a beautiful thick-script display font to replicate the stream banner look */}

        {/* 1. BACKGROUND LAYER - Full-bleed spring meadow backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/bg_spring.webp"
            alt="Spring Background Meadow"
            fill
            priority
            className="object-cover object-center brightness-95"
          />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/10" />
        </div>

        {/* 2. AMBIENT PARTICLES - Floating falling light petals */}
        {/* <div className="absolute inset-0 z-10 pointer-events-none">
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute w-2.5 h-2.5 bg-white/40 backdrop-blur-[0.5px] rounded-tl-full rounded-br-full"
              style={{
                top: petal.top,
                left: petal.left,
              }}
              animate={{
                y: [0, 100, 200],
                x: [0, -30, -15],
                rotate: [0, 180, 360],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: petal.duration,
                repeat: Infinity,
                ease: "linear",
                delay: petal.delay,
              }}
            />
          ))}
        </div> */}

        {/* 3. CENTERED BOTTOM COMPOSITION LAYER */}
        <div className="relative w-full max-w-7xl h-[85vh] flex items-end justify-center z-20 px-4 pointer-events-none">
          {/* Main Composition Wrapper Layout Framework hosting characters and custom layered text */}
          <div className="relative w-full max-w-240 h-[90%] flex items-end justify-center origin-bottom -mb-2.5">
            {/* ================= TEXT LAYER 1: "Off Line" Split Behind/Around the character ================= */}
            <motion.div
              variants={textEntranceVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-x-0 top-[15%] z-10 flex justify-between px-2 md:px-6 pointer-events-none select-none font-['Pacifico',cursive]"
            >
              <motion.span
                variants={textFloatAnimation}
                animate="animate"
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl ml-[18%] text-white drop-shadow-[0_8px_0_rgba(110,165,110,0.4)] tracking-wide"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
              >
                Off
              </motion.span>
              <motion.span
                variants={textFloatAnimation}
                animate="animate"
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_8px_0_rgba(110,165,110,0.4)] tracking-wide mr-4 md:mr-12"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
              >
                line
              </motion.span>
            </motion.div>

            {/* Main Sleeping Character Container */}
            <motion.div
              variants={characterVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 z-20 flex items-end justify-center"
            >
              <motion.div
                variants={breathingAnimation}
                animate="animate"
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/images/anime_char_5.webp"
                  alt="Sleeping Anime Character"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 960px"
                  className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* ================= TEXT LAYER 2: "see you soon" Foreground Overlay ================= */}
            <motion.div
              variants={textEntranceVariants}
              initial="initial"
              animate="animate"
              className="absolute bottom-[18%] left-[30%] sm:left-[35%] z-25 pointer-events-none select-none text-center font-['Pacifico',cursive]"
            >
              <motion.div
                variants={textFloatAnimation}
                animate="animate"
                className="relative flex flex-col items-center rotate-[-4deg]"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] tracking-wide whitespace-nowrap">
                  See you Soon
                </h2>
                {/* Optional tiny paw print effect matching the overlay design */}
                <span className="text-lg sm:text-xl text-white/90 mt-1">
                  🐾
                </span>
              </motion.div>
            </motion.div>

            {/* Connected Companion Cat */}
            <motion.div
              variants={catVariants}
              initial="initial"
              animate="animate"
              className="absolute bottom-0 right-0 w-[32%] h-[45%] z-30 flex items-end justify-center"
            >
              <motion.div
                variants={catIdleAnimation}
                animate="animate"
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/images/cat_char_1.webp"
                  alt="Cozy Cat Companion"
                  fill
                  priority
                  sizes="(max-width: 768px) 35vw, 300px"
                  className="object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ActiveRooms, {
  ActiveRoom,
} from "@/features/chat/components/ActiveRooms";
import { motion } from "framer-motion";
import { Music, VolumeX, House } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAudioStore } from "@/shared/audio/audio.store";

export default function RoomsPage() {
  const router = useRouter();

  const toggleMusic = useAudioStore((s) => s.toggle);
  const isPlaying = useAudioStore((s) => s.isPlaying);

  const [rooms, setRooms] = useState<ActiveRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms`,
          { credentials: "include" },
        );

        const text = await response.text();
        if (!text) {
          setRooms([]);
          setLoading(false);
          return;
        }

        let data: ActiveRoom[];
        try {
          data = JSON.parse(text);
        } catch {
          console.error(text);
          throw new Error("Server did not return JSON");
        }
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // LOADING STATE
  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center bg-[#f3f4f6]">
        <h1 className="text-5xl font-black italic animate-bounce">
          LOADING ROOMS...
        </h1>
      </main>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <main className="h-screen w-screen flex items-center justify-center bg-red-50 p-10">
        <div className="border-4 border-black bg-red-100 rounded-4xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full">
          <h1 className="text-4xl font-black mb-4 uppercase">Error occurred</h1>
          <p className="text-xl font-medium">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-white">
      {/* LEFT SIDE: SCROLLABLE ACTIVE ROOMS (White Notebook Side) */}
      <section className="w-full md:w-[42%] h-full flex flex-col border-r-4 border-black bg-white relative z-10">
        {/* Subtle notebook/grid background lines matching the reference screenshot */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[16px_16px]" />

        {/* Scrollable Container Wrapper */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative z-10">
          <ActiveRooms rooms={rooms} />
        </div>
      </section>

      {/* RIGHT SIDE: ANIME CHARACTER & HERO BACKGROUND */}
      <section className="hidden md:block flex-1 h-full relative bg-[#5da9ff]">
        {/* Background Graphic Image */}
        <Image
          src="/assets/images/bg_room.webp"
          alt="Room Background"
          fill
          priority
          sizes="58vw"
          className="object-cover mix-blend-multiply opacity-80"
        />

        {/* Floating Accent Design Elements to mimic the UI screenshot */}
        <div className="absolute top-8 right-8 flex gap-4 z-20">
          {/* HOME BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#ffeb3b] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <House size={28} strokeWidth={3} />
          </motion.button>

          {/* MUSIC TOGGLE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-colors
      ${isPlaying ? "bg-green-300" : "bg-red-300"}
    `}
            onClick={() =>
              toggleMusic("https://s3.amadich.tn/colly/throwdown!.mp3")
            }
          >
            {isPlaying ? (
              <Music size={26} strokeWidth={2.5} />
            ) : (
              <VolumeX size={26} strokeWidth={2.5} />
            )}
          </motion.button>
        </div>

        {/* Anime Character - Absolute positioned sticking to the bottom layout */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[85%] z-10 select-none pointer-events-none">
          {/* <Image
            src="/assets/images/anime_character.webp"
            alt="Anime Character"
            fill
            priority
            sizes="52vw"
            className="object-contain object-bottom"
          /> */}
        </div>
      </section>
    </main>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Users, Sparkles, ArrowRight } from "lucide-react";
import UserSelector from "@/features/user/components/UserSelector";
import { User } from "@/features/user/types/user.types";

import { motion } from "framer-motion";
import { House } from "lucide-react";

export default function CreateRoomPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("New Chat Room");
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState(100);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: roomName,
            description,
            isPrivate,
            maxMembers,
            memberIds: selectedUsers.map((user) => user.id),
          }),
        },
      );

      const room = await response.json();
      router.push(`/chat/${room.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-white">
      {/* LEFT SIDE: CREATION FORM (Scrollable White Notebook Panel) */}
      <section className="w-full md:w-[42%] h-full flex flex-col border-r-4 border-black bg-white relative z-10">
        {/* Subtle notebook backdrop dots */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[16px_16px]" />

        {/* Scrollable Container Form Wrapper */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative z-10 flex flex-col justify-between">
          <div>
            {/* HEADER SECTION */}
            <div className="mb-8 border-b-4 border-dashed border-black pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#d9ffd6] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  <Sparkles className="w-7 h-7 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-black uppercase tracking-tight italic">
                    Create Room
                  </h1>
                  <p className="text-neutral-500 font-bold text-xs mt-0.5">
                    Configure a new terminal conversation hub
                  </p>
                </div>
              </div>
            </div>

            {/* CREATION FORM BODY */}
            <div className="flex flex-col gap-5">
              {/* INPUT FIELD: ROOM NAME */}
              <div>
                <label className="block mb-2 text-lg font-black text-black">
                  Room Name
                </label>
                <input
                  type="text"
                  placeholder="My Room Masters..."
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full h-14 rounded-2xl border-4 border-black px-5 text-lg font-bold bg-[#f7f7f7] text-black placeholder-neutral-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
              </div>

              {/* INPUT FIELD: DESCRIPTION */}
              <div>
                <label className="block mb-2 text-lg font-black text-black">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Discuss projects, code, exams..."
                  className="w-full min-h-25 rounded-2xl border-4 border-black px-5 py-3 text-base font-bold resize-none bg-[#f7f7f7] text-black placeholder-neutral-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-white focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
              </div>

              {/* INTEGRATED USER SELECTOR INJECT COMPONENT */}
              <div className="border-4 border-black rounded-3xl p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <UserSelector
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                />
              </div>

              {/* METADATA TOGGLES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* TOGGLE: VISIBILITY PRIVACY LOCK STATUS */}
                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`border-4 border-black rounded-3xl p-4 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${isPrivate ? "bg-yellow-300" : "bg-white"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-5 h-5 stroke-[2.5] text-black" />
                    <span className="text-xl font-black text-black">
                      Private
                    </span>
                  </div>
                  <p className="text-neutral-600 font-bold text-xs leading-tight">
                    Only explicitly invited users will discover this room.
                  </p>
                </button>

                {/* TOGGLE COUNTER: MAX USER CAPACITY */}
                <div className="border-4 border-black rounded-3xl p-4 bg-[#d9ffd6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 stroke-[2.5] text-black" />
                    <span className="text-xl font-black text-black">
                      Members
                    </span>
                  </div>
                  <input
                    type="number"
                    min="2"
                    max="500"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(Number(e.target.value))}
                    className="w-full h-10 rounded-xl border-4 border-black px-3 text-md font-black bg-white text-black focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ACTION SUBMIT BUTTON BAR */}
          <button
            onClick={handleCreateRoom}
            disabled={loading || !roomName.trim()}
            className="mt-6 w-full h-14 rounded-2xl border-4 border-black bg-black text-white text-lg font-black flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#4ade80] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <span>{loading ? "Creating Terminal..." : "Initialize Room"}</span>
            <ArrowRight className="w-5 h-5 stroke-3" />
          </button>
        </div>
      </section>

      {/* RIGHT SIDE: ANIME CHARACTER & HERO BACKGROUND ARTWORK */}
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

        {/* Decorative Tag mimicking screenshot aesthetics */}
        <div className="absolute top-8 right-8 flex gap-4 z-20">
          <div className=" z-50">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-[#ffeb3b] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <House size={28} strokeWidth={3} />
            </motion.button>
          </div>
        </div>

        {/* Anime Character - Locked tightly to the bottom layout */}
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Lock, Users, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type SwitchRoom = {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  onlineCount: number;
  users: {
    username: string;
    avatar: string;
  }[];
};

interface Props {
  rooms: SwitchRoom[];
  currentRoomId: string;
}

export default function RoomSwitcher({ rooms, currentRoomId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-96 flex flex-col items-center">
      {/* TOGGLE BUTTON - Neobrutalist Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-3 px-6 py-2
          bg-white border-4 border-black rounded-full
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          font-black text-sm z-60 mb-2
        "
      >
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        SWITCH ROOM
      </motion.button>

      {/* DROPDOWN PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
              w-full
              bg-white
              border-4
              border-black
              rounded-[28px]
              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              p-4
              overflow-hidden
            "
          >
            {/* HEADER */}
            <div className="mb-4">
              <h2 className="text-2xl font-black">Active Rooms</h2>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-tighter">
                Jump into another conversation
              </p>
            </div>

            {/* ROOMS LIST */}
            <motion.div
              className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1"
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {rooms.map((room) => {
                const isActive = room.id === currentRoomId;

                return (
                  <motion.div
                    key={room.id}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={`/chat/${room.id}`}
                      className={`
                        block
                        border-[3px]
                        border-black
                        rounded-2xl
                        p-3
                        transition-all
                        hover:translate-x-1
                        hover:translate-y-1
                        hover:shadow-none
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                        ${isActive ? "bg-[#d9ffd6]" : "bg-white"}
                      `}
                    >
                      {/* TOP */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {room.isPrivate ? (
                            <Lock className="w-4 h-4 text-orange-500" />
                          ) : (
                            <Globe className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="font-black text-sm uppercase">
                            {room.name}
                          </span>
                          <span>{room.description}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold bg-black text-white px-2 py-0.5 rounded-full">
                          <Users className="w-3 h-3" />
                          <span>{room.onlineCount}</span>
                        </div>
                      </div>

                      {/* AVATARS STACK */}
                      <div className="flex items-center">
                        {room.users.slice(0, 5).map((user, index) => (
                          <motion.img
                            whileHover={{ y: -5, zIndex: 10 }}
                            key={user.username}
                            src={user.avatar}
                            alt={user.username}
                            className="
                              w-9
                              h-9
                              rounded-full
                              border-2
                              border-black
                              object-cover
                              bg-[#5da9ff]
                            "
                            style={{
                              marginLeft: index === 0 ? 0 : -12,
                            }}
                          />
                        ))}

                        {room.users.length > 5 && (
                          <div className="ml-2 text-[10px] font-black text-gray-400">
                            +{room.users.length - 5} MORE
                          </div>
                        )}

                        {room.users.length === 0 && (
                          <span className="text-xs italic text-gray-400 font-bold">
                            Empty room
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

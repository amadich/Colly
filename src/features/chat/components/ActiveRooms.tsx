"use client";
import Link from "next/link";
import Image from "next/image";
import { Users, Lock, Globe, ArrowRight, MessageCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import UpdateRoomModal from "./UpdateRoomModal";

type RoomUser = {
  id: string;

  username: string;

  firstName: string;

  lastName: string;

  avatar: string;
};

export type ActiveRoom = {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  maxMembers: number;
  users: RoomUser[];
  onlineCount: number;
  isOwner: boolean;
};

type ActiveRoomsProps = {
  rooms: ActiveRoom[];
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cards appear one after another
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function ActiveRooms({ rooms }: ActiveRoomsProps) {
  const [editingRoom, setEditingRoom] = useState<ActiveRoom | null>(null);
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="w-full"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-5xl font-black italic">Active Rooms</h2>
          <p className="text-gray-600 text-lg mt-2 font-medium">
            Students currently chatting
          </p>
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-16 min-w-16 px-5 rounded-full border-4 border-black bg-[#d9ffd6] flex items-center justify-center text-2xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          {rooms.length}
        </motion.div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
            className="bg-white border-4 border-black rounded-[38px] p-7 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
          >
            <div>
              {/* TOP */}
              <div className="flex items-start justify-between gap-5 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-2xl border-4 border-black flex items-center justify-center ${room.isPrivate ? "bg-yellow-300" : "bg-[#d9ffd6]"}`}
                    >
                      {room.isPrivate ? (
                        <Lock className="w-7 h-7" />
                      ) : (
                        <Globe className="w-7 h-7" />
                      )}
                    </motion.div>

                    <div>
                      <h3 className="text-3xl font-black">{room.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 font-bold">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span>{room.onlineCount} online</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {room.description}
                  </p>
                </div>
              </div>

              {/* USERS */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black uppercase text-sm tracking-widest">
                    Students Inside
                  </h4>
                  <div className="px-4 py-1 rounded-full border-[3px] border-black bg-[#f7f7f7] text-sm font-black">
                    {room.users.length}/{room.maxMembers}
                  </div>
                </div>

                {/* AVATARS */}
                <div className="flex items-center flex-wrap gap-4">
                  {room.users.map((user) => (
                    <motion.div
                      key={user.username}
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="relative w-16 h-16 rounded-[20px] overflow-hidden border-4 border-black bg-[#5da9ff] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                          src={user.avatar}
                          alt={user.username}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                      </div>
                      <span className="mt-2 text-xs font-black truncate w-16 text-center">
                        {user.username}
                      </span>
                    </motion.div>
                  ))}

                  {room.users.length === 0 && (
                    <div className="w-full border-[3px] border-dashed border-black rounded-2xl py-4 text-center text-gray-400 font-bold italic">
                      Room is currently empty...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="w-5 h-5" />
                <span className="font-bold text-sm">
                  Capacity: {room.maxMembers}
                </span>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {room.isOwner && (
                  <button
                    onClick={() => setEditingRoom(room)}
                    className=" h-14 px-6 rounded-2xl border-4 border-black bg-yellow-300 font-black">
                    Edit
                  </button>
                )}
                <Link
                  href={`/chat/${room.id}`}
                  className="h-14 px-8 rounded-2xl border-4 border-black bg-black text-white flex items-center justify-center gap-3 font-black text-lg shadow-[6px_6px_0px_0px_#4ade80] hover:shadow-none transition-shadow"
                >
                  Join Room
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      {editingRoom && (
        <UpdateRoomModal
          room={editingRoom}
          onClose={() => setEditingRoom(null)}
          onUpdated={() => window.location.reload()}
        />
      )}
    </motion.section>
  );
}

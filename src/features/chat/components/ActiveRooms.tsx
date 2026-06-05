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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export default function ActiveRooms({ rooms }: ActiveRoomsProps) {
  const [editingRoom, setEditingRoom] = useState<ActiveRoom | null>(null);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-full"
    >
      {/* STYLISH HEADER */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/90 backdrop-blur-sm pb-4 border-b-4 border-dashed border-black z-20">
        <div>
          <h2 className="text-4xl font-black italic tracking-tight uppercase">Active Rooms</h2>
          <p className="text-gray-500 text-sm mt-1 font-bold">
            Select an academy terminal to join
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-14 w-14 rounded-2xl border-4 border-black bg-[#d9ffd6] flex items-center justify-center text-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {rooms.length}
        </motion.div>
      </div>

      {/* COMPACT VERTICAL LIST LAYOUT */}
      <div className="flex flex-col gap-6 pb-6">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            variants={cardVariants}
            whileHover={{ x: 4, y: -2 }}
            className="bg-white border-4 border-black rounded-[28px] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 relative transition-shadow"
          >
            {/* TOP HEADER BLOCK */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 min-w-12 rounded-xl border-4 border-black flex items-center justify-center ${room.isPrivate ? "bg-yellow-300" : "bg-[#d9ffd6]"}`}>
                {room.isPrivate ? <Lock className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-black truncate leading-tight">{room.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-0.5">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>{room.onlineCount} chatting right now</span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-sm font-medium line-clamp-2">
              {room.description}
            </p>

            {/* MINIFIED STUDENT AVATARS */}
            <div className="bg-[#fcfcfc] border-2 border-black rounded-2xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-[11px] uppercase tracking-wider text-gray-400">Students Inside</span>
                <span className="px-2 py-0.5 rounded-full border-2 border-black bg-white text-xs font-black">
                  {room.users.length}/{room.maxMembers}
                </span>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                {room.users.map((user) => (
                  <div key={user.username} className="relative group">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-black bg-[#5da9ff]">
                      <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                    </div>
                    {/* Tiny Status Dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                  </div>
                ))}

                {room.users.length === 0 && (
                  <div className="w-full text-xs text-gray-400 font-bold italic py-1">
                    Empty room... Be the first to join!
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-between pt-1 border-t-2 border-dashed border-gray-200">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Users className="w-4 h-4" />
                <span className="font-bold text-xs">Cap: {room.maxMembers}</span>
              </div>

              <div className="flex items-center gap-2">
                {room.isOwner && (
                  <button
                    onClick={() => setEditingRoom(room)}
                    className="h-10 px-4 rounded-xl border-2 border-black bg-yellow-300 font-black text-xs hover:bg-yellow-400 active:scale-95 transition-transform"
                  >
                    Edit
                  </button>
                )}
                <Link
                  href={`/chat/${room.id}`}
                  className="h-10 px-5 rounded-xl border-2 border-black bg-black text-white flex items-center justify-center gap-2 font-black text-xs shadow-[3px_3px_0px_0px_#4ade80] hover:shadow-none transition-all"
                >
                  Join
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
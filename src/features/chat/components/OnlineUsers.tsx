"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronLeft } from "lucide-react";

type OnlineUser = {
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

type OnlineUsersProps = {
  users: OnlineUser[];
};

export default function OnlineUsers({ users }: OnlineUsersProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Remove duplicates based on username
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.username, user])).values()
  );

  return (
    <div className="absolute top-6 left-6 z-50 flex items-start gap-3">
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="
              w-72
              bg-white
              border-4
              border-black
              rounded-[28px]
              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              p-4
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black italic decoration-blue-400">
                Online
              </h2>

              <motion.div
                key={users.length}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="
                  min-w-10 h-10 px-3
                  rounded-full border-[3px] border-black
                  flex items-center justify-center
                  font-black text-lg bg-[#d9ffd6]
                  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                "
              >
                {users.length}
              </motion.div>
            </div>

            {/* USERS LIST */}
            <motion.div 
              className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08 }
                }
              }}
            >
              {uniqueUsers.map((user) => (
                <motion.div
                  key={user.username}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                  whileHover={{ x: 5, backgroundColor: "#e0f2fe" }}
                  className="
                    flex items-center gap-3
                    border-[3px] border-black
                    rounded-2xl px-3 py-2
                    bg-[#f7f7f7] transition-colors
                  "
                >
                  {/* AVATAR */}
                  <div className="relative w-12 h-12 rounded-xl border-[3px] border-black bg-[#5da9ff] shrink-0 overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.username}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                    
                    {/* HEARTBEAT ONLINE DOT */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-black"
                    />
                  </div>

                  <div className="flex flex-col overflow-hidden">
                    <span className="font-black text-sm lowercase truncate">
                      {user.firstName}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-gray-400">
                      active now
                    </span>
                  </div>
                </motion.div>
              ))}

              {uniqueUsers.length === 0 && (
                <div className="border-[3px] border-dashed border-black rounded-2xl py-6 text-center text-gray-400 font-black text-xs uppercase">
                  Lonely in here...
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COLLAPSE/EXPAND TRIGGER */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: isExpanded ? 0 : 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          mt-2 p-3
          bg-white border-4 border-black rounded-2xl
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          hover:bg-yellow-300 transition-colors
        "
      >
        {isExpanded ? <ChevronLeft size={24} strokeWidth={3} /> : <Users size={24} strokeWidth={3} />}
      </motion.button>
    </div>
  );
}
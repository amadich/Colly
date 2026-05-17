"use client";

import { useState } from "react";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import SuccessDialog from "@/components/feedback/SuccessDialog";

import {
  Users,
  ChevronLeft,
  UserPlus,
  MessageCircle,
  User,
  Ban,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { sendFriendRequest } from "@/features/friends/lib/friends.api";

type OnlineUser = {
  id: string;
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
  const [successOpen, setSuccessOpen] = useState(false);

  // REMOVE DUPLICATES
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.username, user])).values(),
  );

  const handleAddFriend = async (userId: string) => {
    try {
      await sendFriendRequest(userId);

      setSuccessOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

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
                key={uniqueUsers.length}
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
                {uniqueUsers.length}
              </motion.div>
            </div>

            {/* USERS LIST */}
            <motion.div
              className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {uniqueUsers.map((user) => (
                <DropdownMenu key={user.username}>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      variants={{
                        hidden: { x: -20, opacity: 0 },
                        visible: { x: 0, opacity: 1 },
                      }}
                      whileHover={{
                        x: 5,
                        backgroundColor: "#e0f2fe",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        w-full
                        flex items-center gap-3
                        border-[3px] border-black
                        rounded-2xl
                        px-3 py-2
                        bg-[#f7f7f7]
                        transition-colors
                        cursor-pointer
                      "
                    >
                      {/* AVATAR */}
                      <div
                        className="
                          relative
                          w-12 h-12
                          rounded-xl
                          border-[3px]
                          border-black
                          bg-[#5da9ff]
                          shrink-0
                          overflow-hidden
                        "
                      >
                        <Image
                          src={user.avatar}
                          alt={user.username}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />

                        {/* ONLINE DOT */}
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                          }}
                          className="
                            absolute
                            bottom-0.5
                            right-0.5
                            w-3 h-3
                            rounded-full
                            bg-green-500
                            border-2
                            border-black
                          "
                        />
                      </div>

                      {/* USER INFO */}
                      <div className="flex flex-col overflow-hidden text-left">
                        <span className="font-black text-sm lowercase truncate">
                          {user.firstName}
                        </span>

                        <span
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            text-gray-400
                          "
                        >
                          active now
                        </span>
                      </div>
                    </motion.button>
                  </DropdownMenuTrigger>

                  {/* DROPDOWN */}
                  <DropdownMenuContent
                    side="right"
                    align="start"
                    className="
                      border-4
                      border-black
                      rounded-2xl
                      bg-white
                      p-2
                      min-w-56
                      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                    "
                  >
                    {/* ADD FRIEND */}
                    <DropdownMenuItem
                      onClick={() => handleAddFriend(user.id)}
                      className="
                        rounded-xl
                        cursor-pointer
                        font-bold
                        flex
                        items-center
                        gap-2
                        py-3
                      "
                    >
                      <UserPlus size={16} />

                      <span>Add Friend</span>
                    </DropdownMenuItem>

                    {/* MESSAGE */}
                    <DropdownMenuItem
                      className="
                        rounded-xl
                        cursor-pointer
                        font-bold
                        flex
                        items-center
                        gap-2
                        py-3
                      "
                    >
                      <MessageCircle size={16} />

                      <span>Send Message</span>
                    </DropdownMenuItem>

                    {/* PROFILE */}
                    <DropdownMenuItem
                      className="
                        rounded-xl
                        cursor-pointer
                        font-bold
                        flex
                        items-center
                        gap-2
                        py-3
                      "
                    >
                      <User size={16} />

                      <span>View Profile</span>
                    </DropdownMenuItem>

                    {/* BLOCK */}
                    <DropdownMenuItem
                      className="
                        rounded-xl
                        cursor-pointer
                        font-bold
                        text-red-500
                        flex
                        items-center
                        gap-2
                        py-3
                      "
                    >
                      <Ban size={16} />

                      <span>Block User</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              {/* EMPTY */}
              {uniqueUsers.length === 0 && (
                <div
                  className="
                    border-[3px]
                    border-dashed
                    border-black
                    rounded-2xl
                    py-6
                    text-center
                    text-gray-400
                    font-black
                    text-xs
                    uppercase
                  "
                >
                  Lonely in here...
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <motion.button
        whileHover={{
          scale: 1.1,
          rotate: isExpanded ? 0 : 360,
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          mt-2
          p-3
          bg-white
          border-4
          border-black
          rounded-2xl
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          hover:bg-yellow-300
          transition-colors
        "
      >
        {isExpanded ? (
          <ChevronLeft size={24} strokeWidth={3} />
        ) : (
          <Users size={24} strokeWidth={3} />
        )}
      </motion.button>
      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="Friend Request Sent!"
        description="Your friend request has been sent successfully. The student will receive a notification instantly."
      />
    </div>
  );
}

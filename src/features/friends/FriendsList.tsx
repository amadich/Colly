"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { Users } from "lucide-react";

import { apiFetch } from "@/lib/api";

type Friend = {
  id: string;

  firstName: string;

  lastName: string;

  username: string;

  avatar: string;
};

export default function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([]);

  const [loading, setLoading] = useState(true);

  const loadFriends = async () => {
    try {
      const data = await apiFetch<Friend[]>("/friends");

      setFriends(data);
    } catch (error) {
      console.error("FAILED TO LOAD FRIENDS", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      await loadFriends();
    };

    fetchFriends();
  }, []);

  if (loading) {
    return (
      <div
        className="
          border-4
          border-black
          rounded-[28px]
          p-6
          bg-white
          shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        "
      >
        <p className="font-black text-lg">Loading friends...</p>
      </div>
    );
  }

  return (
    <div
      className="
        border-4
        border-black
        rounded-4xl
        bg-[#f7f7f7]
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          border-b-4
          border-black
          bg-[#d9ffd6]
          px-6
          py-5
          flex
          items-center
          gap-3
        "
      >
        <Users size={30} />

        <div>
          <h2 className="text-2xl font-black italic">My Friends</h2>

          <p className="text-sm font-bold text-gray-600">
            {friends.length} friends
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {friends.length === 0 && (
        <div className="p-10 text-center bg-white">
          <p className="text-2xl font-black">No friends yet 👀</p>

          <p className="mt-2 text-sm font-bold text-gray-500">
            Start adding people to see them here.
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="p-5 flex flex-col gap-4">
        {friends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{
              opacity: 0,
              y: 20,
              rotate: -1,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.02,
              rotate: 1,
            }}
            className="
              border-4
              border-black
              rounded-[28px]
              bg-white
              p-4
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
            "
          >
            <div className="flex items-center gap-4">
              {/* AVATAR */}
              <div
                className="
                  relative
                  w-16
                  h-16
                  rounded-2xl
                  border-4
                  border-black
                  overflow-hidden
                  bg-blue-300
                  shrink-0
                "
              >
                <Image
                  src={friend.avatar}
                  alt={friend.username}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 overflow-hidden">
                <h3 className="font-black text-lg truncate">
                  {friend.firstName} {friend.lastName}
                </h3>

                <p className="text-xs font-bold uppercase text-gray-400">
                  @{friend.username}
                </p>

                <div
                  className="
                    mt-2
                    inline-flex
                    px-3
                    py-1
                    rounded-full
                    border-2
                    border-black
                    bg-[#8fff8f]
                    text-[10px]
                    font-black
                    uppercase
                  "
                >
                  Friend
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

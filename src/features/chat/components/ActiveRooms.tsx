"use client";

import Link from "next/link";

import Image from "next/image";

import { Users, Lock, Globe, ArrowRight, MessageCircle } from "lucide-react";

type RoomUser = {
  username: string;
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
};

type ActiveRoomsProps = {
  rooms: ActiveRoom[];
};

export default function ActiveRooms({ rooms }: ActiveRoomsProps) {
  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-5xl font-black">Active Rooms</h2>

          <p className="text-gray-600 text-lg mt-2">
            Students currently chatting
          </p>
        </div>

        <div
          className="
            h-16
            min-w-16
            px-5
            rounded-full
            border-4
            border-black
            bg-[#d9ffd6]
            flex
            items-center
            justify-center
            text-2xl
            font-black
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
          "
        >
          {rooms.length}
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="
              bg-white
              border-4
              border-black
              rounded-[38px]
              p-7
              shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
              hover:-translate-y-1
              duration-200
            "
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-5 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`
                      w-14
                      h-14
                      rounded-2xl
                      border-4
                      border-black
                      flex
                      items-center
                      justify-center
                      ${room.isPrivate ? "bg-yellow-300" : "bg-[#d9ffd6]"}
                    `}
                  >
                    {room.isPrivate ? (
                      <Lock className="w-7 h-7" />
                    ) : (
                      <Globe className="w-7 h-7" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-3xl font-black">{room.name}</h3>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-4 h-4" />

                      <span>{room.onlineCount} online</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {room.description}
                </p>
              </div>
            </div>

            {/* USERS */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-black">Students Inside</h4>

                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    border-[3px]
                    border-black
                    bg-[#f7f7f7]
                    text-sm
                    font-bold
                  "
                >
                  {room.users.length}/{room.maxMembers}
                </div>
              </div>

              {/* AVATARS */}
              <div className="flex items-center flex-wrap gap-4">
                {room.users.map((user) => (
                  <div
                    key={user.username}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="
                        relative
                        w-18
                        h-18
                        rounded-[22px]
                        overflow-hidden
                        border-4
                        border-black
                        bg-[#5da9ff]
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      "
                    >
                      <Image
                        src={user.avatar}
                        alt={user.username}
                        fill
                        className="object-cover"
                      />

                      {/* ONLINE DOT */}
                      <div
                        className="
                          absolute
                          bottom-1
                          right-1
                          w-4
                          h-4
                          rounded-full
                          bg-green-500
                          border-2
                          border-white
                        "
                      />
                    </div>

                    <span className="mt-2 text-sm font-bold">
                      {user.username}
                    </span>
                  </div>
                ))}

                {room.users.length === 0 && (
                  <div
                    className="
                      border-[3px]
                      border-dashed
                      border-black
                      rounded-2xl
                      px-5
                      py-4
                      text-gray-500
                      font-medium
                    "
                  >
                    No one inside yet
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />

                <span className="font-bold">Max {room.maxMembers} members</span>
              </div>

              <Link
                href={`/chat/${room.id}`}
                className="
                  h-14
                  px-6
                  rounded-2xl
                  border-4
                  border-black
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-black
                  text-lg
                  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-x-1
                  hover:translate-y-1
                  hover:shadow-none
                  duration-200
                "
              >
                Join Room
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

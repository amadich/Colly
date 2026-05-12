"use client";

import Link from "next/link";

import { Globe, Lock, Users } from "lucide-react";

export type SwitchRoom = {
  id: string;

  name: string;

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
  return (
    <div
      className="
        absolute
        top-6
        left-1/2
        -translate-x-1/2
        z-50
        w-96
        bg-white
        border-4
        border-black
        rounded-[28px]
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        p-4
      "
    >
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-2xl font-black">Active Rooms</h2>

        <p className="text-gray-500">Switch between rooms</p>
      </div>

      {/* ROOMS */}
      <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
        {rooms.map((room) => {
          const isActive = room.id === currentRoomId;

          return (
            <Link
              key={room.id}
              href={`/chat/${room.id}`}
              className={`
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
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}

                  <span className="font-black">{room.name}</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4" />

                  <span>{room.onlineCount}</span>
                </div>
              </div>

              {/* AVATARS */}
              <div className="flex items-center">
                {room.users.slice(0, 5).map((user, index) => (
                  <img
                    key={user.username}
                    src={user.avatar}
                    alt={user.username}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-2
                        border-black
                        object-cover
                      "
                    style={{
                      marginLeft: index === 0 ? 0 : -10,
                    }}
                  />
                ))}

                {room.users.length === 0 && (
                  <span className="text-sm text-gray-500">Empty room</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

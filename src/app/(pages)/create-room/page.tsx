"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Lock, Users, Sparkles, ArrowRight } from "lucide-react";
import ActiveRooms, {
  ActiveRoom,
} from "@/features/chat/components/ActiveRooms";

export default function CreateRoomPage() {
  const router = useRouter();

  const [roomName, setRoomName] = useState("");

  const [description, setDescription] = useState("New Chat Room");

  const [isPrivate, setIsPrivate] = useState(false);

  const [maxMembers, setMaxMembers] = useState(100);

  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/rooms", {
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
        }),
      });

      const room = await response.json();

      router.push(`/chat/${room.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const rooms: ActiveRoom[] = [
    {
      id: "1",

      name: "Frontend Masters",

      description: "Discuss React, NextJS and UI/UX projects.",

      isPrivate: true,

      maxMembers: 100,

      onlineCount: 4,

      users: [
        {
          username: "amadich",
          avatar: "https://s3.amadich.tn/avatars/avatar-homme.jpg",
        },

        {
          username: "jean",
          avatar: "https://s3.amadich.tn/avatars/avatar-femme.jpg",
        },
      ],
    },
  ];

  return (
    <>
      <ActiveRooms rooms={rooms} />;
      <main
        className="
        min-h-[calc(100vh-80px)]
        bg-[#f7f7f7]
        relative
        overflow-hidden
        flex
        items-center
        justify-center
        px-6
      "
      >
        {/* DECORATION */}
        <div
          className="
          absolute
          top-16
          left-16
          w-32
          h-32
          rounded-full
          bg-yellow-300
          border-4
          border-black
          rotate-12
        "
        />

        <div
          className="
          absolute
          bottom-16
          right-16
          w-44
          h-44
          rounded-[40px]
          bg-pink-300
          border-4
          border-black
          -rotate-12
        "
        />

        {/* CARD */}
        <div
          className="
          relative
          z-10
          w-full
          max-w-2xl
          bg-white
          border-4
          border-black
          rounded-[40px]
          shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
          p-10
        "
        >
          {/* HEADER */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-[#d9ffd6]
                border-4
                border-black
                flex
                items-center
                justify-center
              "
              >
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h1 className="text-5xl font-black">Create Room</h1>

                <p className="text-gray-600 text-lg">
                  Start a new student conversation
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-6">
            {/* ROOM NAME */}
            <div>
              <label className="block mb-3 text-xl font-black">Room Name</label>

              <input
                type="text"
                placeholder="Frontend Masters..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="
                w-full
                h-16
                rounded-2xl
                border-4
                border-black
                px-6
                text-xl
                bg-[#f7f7f7]
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                focus:outline-none
              "
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-3 text-xl font-black">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Discuss projects, code, exams..."
                className="
                w-full
                min-h-35
                rounded-2xl
                border-4
                border-black
                px-6
                py-5
                text-lg
                resize-none
                bg-[#f7f7f7]
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                focus:outline-none
              "
              />
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* PRIVATE */}
              <button
                type="button"
                onClick={() => setIsPrivate(!isPrivate)}
                className={`
                border-4
                border-black
                rounded-3xl
                p-5
                text-left
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                duration-200
                ${isPrivate ? "bg-yellow-300" : "bg-white"}
              `}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-7 h-7" />

                  <span className="text-2xl font-black">Private</span>
                </div>

                <p className="text-gray-700">Only invited students can join</p>
              </button>

              {/* MEMBERS */}
              <div
                className="
                border-4
                border-black
                rounded-3xl
                p-5
                bg-[#d9ffd6]
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              "
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-7 h-7" />

                  <span className="text-2xl font-black">Members</span>
                </div>

                <input
                  type="number"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border-4
                  border-black
                  px-4
                  text-xl
                  bg-white
                  focus:outline-none
                "
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCreateRoom}
              disabled={loading}
              className="
              mt-4
              w-full
              h-18
              rounded-3xl
              border-4
              border-black
              bg-black
              text-white
              text-2xl
              font-black
              flex
              items-center
              justify-center
              gap-3
              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-1
              hover:translate-y-1
              hover:shadow-none
              duration-200
              disabled:opacity-50
            "
            >
              {loading ? "Creating..." : "Create Room"}

              <ArrowRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Users, Sparkles, ArrowRight } from "lucide-react";
import UserSelector from "@/features/user/components/UserSelector";
import { User } from "@/features/user/types/user.types";

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
    <>
      <main
        className="
          min-h-[calc(100vh-80px)]
          bg-[#f7f7f7]
          relative
          overflow-x-hidden
          overflow-y-auto
          flex
          items-center
          justify-center
          px-4
          py-12
          sm:px-6
        "
      >
        {/* BACKGROUND GEO DECORATIONS */}
        <div
          className="
            hidden sm:block
            absolute
            top-12
            left-12
            w-28 h-28
            md:w-36 md:h-36
            rounded-full
            bg-yellow-300
            border-[4px]
            border-black
            rotate-12
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          "
        />

        <div
          className="
            hidden sm:block
            absolute
            bottom-12
            right-12
            w-36 h-36
            md:w-44 md:h-44
            rounded-[40px]
            bg-pink-300
            border-[4px]
            border-black
            -rotate-12
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          "
        />

        {/* CORE CONTAINER CARD */}
        <div
          className="
            relative
            z-10
            w-full
            max-w-2xl
            bg-white
            border-[4px]
            border-black
            rounded-[32px]
            sm:rounded-[40px]
            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            sm:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]
            p-6
            sm:p-10
          "
        >
          {/* HEADER SECTION */}
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <div
                className="
                  w-14 h-14
                  sm:w-16 sm:h-16
                  rounded-2xl
                  bg-[#d9ffd6]
                  border-[4px]
                  border-black
                  flex
                  items-center
                  justify-center
                  shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                  shrink-0
                "
              >
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-black stroke-[2.5]" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-none">
                  Create Room
                </h1>
                <p className="text-neutral-600 font-bold text-sm sm:text-lg mt-1">
                  Start a new student conversation hub
                </p>
              </div>
            </div>
          </div>

          {/* CREATION FORM GRID */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* INPUT FIELD: ROOM NAME */}
            <div>
              <label className="block mb-2 text-lg sm:text-xl font-black text-black">
                Room Name
              </label>
              <input
                type="text"
                placeholder="My Room Masters..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="
                  w-full
                  h-14 sm:h-16
                  rounded-2xl
                  border-[4px]
                  border-black
                  px-5
                  text-base sm:text-xl
                  font-bold
                  bg-[#f7f7f7]
                  text-black
                  placeholder-neutral-400
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  focus:outline-none
                  focus:bg-white
                  focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  transition-all
                "
              />
            </div>

            {/* INPUT FIELD: DESCRIPTION */}
            <div>
              <label className="block mb-2 text-lg sm:text-xl font-black text-black">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Discuss projects, code, exams..."
                className="
                  w-full
                  min-h-[120px]
                  rounded-2xl
                  border-[4px]
                  border-black
                  px-5
                  py-4
                  text-base sm:text-lg
                  font-bold
                  resize-none
                  bg-[#f7f7f7]
                  text-black
                  placeholder-neutral-400
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  focus:outline-none
                  focus:bg-white
                  focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                  transition-all
                "
              />
            </div>

            {/* INTEGRATED USER SELECTOR INJECT COMPONENT */}
            <div className="border-[4px] border-black rounded-3xl p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <UserSelector
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
            </div>

            {/* METADATA CONFIGURATION PANEL TOGGLES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* TOGGLE: VISIBILITY PRIVACY LOCK STATUS */}
              <button
                type="button"
                onClick={() => setIsPrivate(!isPrivate)}
                className={`
                  border-[4px]
                  border-black
                  rounded-3xl
                  p-5
                  text-left
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  transition-all
                  cursor-pointer
                  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
                  ${isPrivate ? "bg-yellow-300" : "bg-white"}
                `}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Lock className="w-6 h-6 stroke-[2.5] text-black" />
                  <span className="text-xl sm:text-2xl font-black text-black">
                    Private
                  </span>
                </div>
                <p className="text-neutral-700 font-bold text-xs sm:text-sm leading-snug">
                  Only explicitly invited students will be able to discover and
                  join.
                </p>
              </button>

              {/* TOGGLE COUNTER: MAX USER CAPACITY */}
              <div
                className="
                  border-[4px]
                  border-black
                  rounded-3xl
                  p-5
                  bg-[#d9ffd6]
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  flex
                  flex-col
                  justify-between
                "
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Users className="w-6 h-6 stroke-[2.5] text-black" />
                  <span className="text-xl sm:text-2xl font-black text-black">
                    Members
                  </span>
                </div>

                <input
                  type="number"
                  min="2"
                  max="500"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border-[4px]
                    border-black
                    px-4
                    text-lg
                    font-black
                    bg-white
                    text-black
                    focus:outline-none
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  "
                />
              </div>
            </div>

            {/* ACTION SUBMIT BUTTON BAR */}
            <button
              onClick={handleCreateRoom}
              disabled={loading || !roomName.trim()}
              className="
                mt-4
                w-full
                h-16 sm:h-18
                rounded-2xl sm:rounded-3xl
                border-[4px]
                border-black
                bg-black
                text-white
                text-xl sm:text-2xl
                font-black
                flex
                items-center
                justify-center
                gap-3
                shadow-[4px_4px_0px_0px_rgba(255,255,255,1),8px_8px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-1
                hover:translate-y-1
                hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1),4px_4px_0px_0px_rgba(0,0,0,1)]
                active:translate-x-2
                active:translate-y-2
                active:shadow-none
                transition-all
                disabled:opacity-40
                disabled:pointer-events-none
                cursor-pointer
              "
            >
              <span>{loading ? "Creating..." : "Create Room"}</span>
              <ArrowRight className="w-6 h-6 sm:w-7 h-7 stroke-[3]" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

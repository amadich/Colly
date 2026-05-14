"use client";

import { useState } from "react";

import { ActiveRoom } from "./ActiveRooms";

import UserSelector from "@/features/user/components/UserSelector";

import { User } from "@/features/user/types/user.types";

import { Trash2 } from "lucide-react";

type Props = {
  room: ActiveRoom;

  onClose: () => void;

  onUpdated: () => void;
};

export default function UpdateRoomModal({ room, onClose, onUpdated }: Props) {
  const [name, setName] = useState(room.name);

  const [description, setDescription] = useState(room.description);

  const [isPrivate, setIsPrivate] = useState(room.isPrivate);

  const [maxMembers, setMaxMembers] = useState(room.maxMembers);

  const [loading, setLoading] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    room.users.map((user) => ({
      id: user.id,

      username: user.username,

      firstName: user.firstName,

      lastName: user.lastName,

      avatar: user.avatar,

      email: "",
    })),
  );

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${room.id}`,
        {
          method: "PUT",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            description,
            isPrivate,
            maxMembers,
            memberIds: selectedUsers.map((user) => user.id),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update room");
      }

      onUpdated();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Delete this room?");

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${room.id}`,
        {
          method: "DELETE",

          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      window.location.href = "/rooms";
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-3xl
          border-4
          border-black
          p-8
        "
      >
        <h2 className="text-4xl font-black mb-6">Update Room</h2>

        <div className="flex flex-col gap-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Room name"
            className="
              h-14
              rounded-2xl
              border-4
              border-black
              px-4
            "
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              min-h-32
              rounded-2xl
              border-4
              border-black
              p-4
            "
          />

          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(Number(e.target.value))}
            className="
              h-14
              rounded-2xl
              border-4
              border-black
              px-4
            "
          />

          <UserSelector
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />

          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className="
              h-14
              rounded-2xl
              border-4
              border-black
              font-black
            "
          >
            {isPrivate ? "PRIVATE ROOM" : "PUBLIC ROOM"}
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              disabled={loading}
              className=" h-14 w-14 rounded-2xl border-4 border-black bg-red-500 text-white flex items-center justify-center"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="
                flex-1
                h-14
                rounded-2xl
                border-4
                border-black
              "
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="
                flex-1
                h-14
                rounded-2xl
                border-4
                border-black
                bg-black
                text-white
                font-black
              "
            >
              {loading ? "Updating..." : "Update Room"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

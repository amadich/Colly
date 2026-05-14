"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { User } from "../types/user.types";

import { searchUsers } from "../api/search-users";

type Props = {
  selectedUsers: User[];

  setSelectedUsers: (users: User[]) => void;
};

export default function UserSelector({
  selectedUsers,
  setSelectedUsers,
}: Props) {

  const [query, setQuery] = useState("");

  const [results, setResults] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const timeout = setTimeout(async () => {

      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {

        setLoading(true);

        const users = await searchUsers(query);

        setResults(users);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }

    }, 400);

    return () => clearTimeout(timeout);

  }, [query]);

  const addUser = (user: User) => {

    const exists = selectedUsers.some(
      (u) => u.id === user.id,
    );

    if (exists) {
      return;
    }

    setSelectedUsers([
      ...selectedUsers,
      user,
    ]);

    setQuery("");

    setResults([]);
  };

  const removeUser = (id: string) => {

    setSelectedUsers(
      selectedUsers.filter(
        (user) => user.id !== id,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-4">

      <div>
        <label className="block mb-3 text-xl font-black">
          Invite Users
        </label>

        <input
          type="text"
          placeholder="Search username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            h-16
            rounded-2xl
            border-4
            border-black
            px-6
            text-lg
            bg-[#f7f7f7]
            focus:outline-none
          "
        />
      </div>

      {/* SEARCH RESULTS */}
      {query && (
        <div
          className="
            border-4
            border-black
            rounded-2xl
            bg-white
            overflow-hidden
          "
        >

          {loading && (
            <div className="p-4 font-bold">
              Searching...
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-4 text-gray-500">
              No users found
            </div>
          )}

          {results.map((user) => (

            <button
              key={user.id}
              type="button"
              onClick={() => addUser(user)}
              className="
                w-full
                flex
                items-center
                gap-4
                p-4
                hover:bg-gray-100
                border-b
              "
            >

              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black">

                <Image
                  src={user.avatar}
                  alt={user.username}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="text-left">
                <p className="font-black">
                  {user.username}
                </p>

                <p className="text-sm text-gray-500">
                  {user.firstName} {user.lastName}
                </p>
              </div>

            </button>
          ))}
        </div>
      )}

      {/* SELECTED USERS */}
      {selectedUsers.length > 0 && (

        <div className="flex flex-wrap gap-3">

          {selectedUsers.map((user) => (

            <div
              key={user.id}
              className="
                px-4
                py-2
                rounded-full
                border-4
                border-black
                bg-[#d9ffd6]
                flex
                items-center
                gap-3
              "
            >

              <span className="font-black">
                {user.username}
              </span>

              <button
                type="button"
                onClick={() => removeUser(user.id)}
                className="font-black"
              >
                ✕
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
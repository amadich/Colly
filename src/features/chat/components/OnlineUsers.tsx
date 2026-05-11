"use client";

import Image from "next/image";

type OnlineUser = {
  username: string;
  firstName: string,
  lastName: string,
  avatar: string;
};

type OnlineUsersProps = {
  users: OnlineUser[];
};

export default function OnlineUsers({ users }: OnlineUsersProps) {
  return (
    <div
      className="
        absolute
        top-6
        left-6
        z-50
        w-70
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
        <h2 className="text-xl font-black">Online Users</h2>

        <div
          className="
            min-w-10.5
            h-10.5
            px-3
            rounded-full
            border-[3px]
            border-black
            flex
            items-center
            justify-center
            font-black
            text-lg
            bg-[#d9ffd6]
          "
        >
          {users.length}
        </div>
      </div>

      {/* USERS */}
      <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
        {Array.from(
          new Map(users.map((user) => [user.username, user])).values(),
        ).map((user) => (
          <div
            key={user.username}
            className="
              flex
              items-center
              gap-3
              border-[3px]
              border-black
              rounded-2xl
              px-3
              py-2
              bg-[#f7f7f7]
            "
          >
            {/* AVATAR */}
            <div
              className="
                relative
                w-14
                h-14
                rounded-xl
                overflow-hidden
                border-[3px]
                border-black
                bg-[#5da9ff]
                shrink-0
              "
            >
              <Image
                src={user.avatar}
                alt={user.username}
                fill
                sizes="56px"
                className="object-cover"
              />

              {/* ONLINE DOT */}
              <div
                className="
                  absolute
                  bottom-1
                  right-1
                  w-3
                  h-3
                  rounded-full
                  bg-green-500
                  border-2
                  border-white
                "
              />
            </div>

            {/* USERNAME */}
            <div className="flex flex-col">
              <span className="font-black text-lg lowercase">
                {user.firstName}
              </span>

              <span className="text-sm text-gray-600">online</span>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div
            className="
              border-[3px]
              border-dashed
              border-black
              rounded-2xl
              py-6
              text-center
              text-gray-500
              font-medium
            "
          >
            No users online
          </div>
        )}
      </div>
    </div>
  );
}

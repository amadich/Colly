"use client";

import Image from "next/image";
import ChatBubble from "./ChatBubble";
import { BubbleMessage } from "../types/chat.types";

interface Props {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  activeBubble?: BubbleMessage;
  style: string;
}

export default function UserAvatar({
  id,
  username,
  firstName,
  lastName,
  avatar,
  activeBubble,
  style,
}: Props) {
  return (
    <div
      className={`
    absolute
    z-10
    opacity-90
    scale-95
    ${style}
    flex
    flex-col
    items-center
  `}
    >
      <div className="relative">
        {activeBubble && (
          <ChatBubble
            className=""
            content={activeBubble.content}
          />
        )}

        <div
          className="
            w-32
            h-32
            rounded-[30px]
            overflow-hidden
            border-3
            border-black
            bg-white
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          "
        >
          <Image
            src={avatar}
            alt={username}
            width={128}
            height={128}
            title={id}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <span className="mt-2 font-bold text-lg">
        {firstName} {lastName}
      </span>
    </div>
  );
}

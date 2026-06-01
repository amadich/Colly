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
  isFullscreenMode?: boolean;
  alpha?: number; // Dynamic transparency parameter
  bubbleColor?: string; // New customization variable pass-through
}

export default function UserAvatar({
  id,
  username,
  firstName,
  lastName,
  avatar,
  activeBubble,
  style,
  isFullscreenMode = false,
  alpha = 100,
  bubbleColor = "white",
}: Props) {
  // If alpha slider is explicitly zero, hide it entirely from screen readers and pointer flows
  const isHidden = isFullscreenMode && alpha === 0;

  return (
    <div
      style={{
        opacity: isFullscreenMode ? alpha / 100 : 0.95,
      }}
      className={`
        absolute
        scale-90
        sm:scale-95
        ${style}
        flex
        flex-col
        items-center
        transition-opacity
        duration-200
        ease-out
        ${isFullscreenMode ? "z-50" : "z-10"}
        ${isHidden ? "pointer-events-none select-none invisible opacity-0!" : "visible"}
      `}
    >
      <div className="relative">
        {activeBubble && (
          <ChatBubble
            className=""
            content={activeBubble.content}
            color={bubbleColor}
          />
        )}

        <div
          className="
            w-20
            h-20
            sm:w-28
            sm:h-28
            md:w-32
            md:h-32
            rounded-[24px]
            sm:rounded-[30px]
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

      <span className="mt-1 sm:mt-2 font-bold text-sm sm:text-base md:text-lg whitespace-nowrap bg-white border-2 border-black px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {firstName || username} {lastName}
      </span>
    </div>
  );
}

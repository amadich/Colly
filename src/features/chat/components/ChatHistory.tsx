"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "../types/chat.types";

interface Props {
  messages: ChatMessage[];

  currentFrame?: (message: ChatMessage) => void;
}

export default function ChatHistory({ messages, currentFrame }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className="
        absolute
        top-6
        right-6
        z-50
        w-96
        h-[85vh]
        overflow-y-auto
        bg-white
        border-4
        border-black
        rounded-[28px]
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        p-4
      "
      ref={bottomRef}
    >
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-2xl font-black">Chat History</h2>

        <p className="text-gray-500">Previous room messages</p>
      </div>

      {/* MESSAGES */}
      <div className="flex flex-col gap-4">
        {messages.map((message) => {
          const isMedia = message.messageType !== "TEXT";

          return (
            <div
              key={message.id}
              onClick={() => currentFrame?.(message)}
              className={`
                border-[3px]
                border-black
                rounded-2xl
                p-4
                cursor-pointer
                transition-all
                hover:translate-x-1
                hover:translate-y-1
                hover:shadow-none
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                ${isMedia ? "bg-[#d9ffd6]" : "bg-[#f7f7f7]"}
              `}
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black">
                  {message.firstName} {message.lastName}
                </h3>

                <span className="text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>

              {/* CONTENT */}
              {message.messageType === "TEXT" && (
                <p className="text-gray-800 break-words">{message.content}</p>
              )}

              {message.messageType === "IMAGE" && (
                <div>
                  <img
                    src={message.mediaUrl}
                    alt="shared"
                    className="
                      rounded-xl
                      border-2
                      border-black
                      mb-2
                    "
                  />

                  <p className="font-bold">{message.content}</p>
                </div>
              )}

              {message.messageType === "VIDEO" && (
                <div>
                  <video
                    src={message.mediaUrl}
                    className="
                      rounded-xl
                      border-2
                      border-black
                      mb-2
                    "
                  />

                  <p className="font-bold">Video Shared</p>
                </div>
              )}

              {message.messageType === "LINK" && (
                <div className="space-y-2">
                  {message.content && (
                    <p className="font-medium">{message.content}</p>
                  )}

                  <p className="font-bold text-blue-600 underline break-all">
                    {message.mediaUrl}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {messages.length === 0 && (
          <div
            className="
              border-[3px]
              border-dashed
              border-black
              rounded-2xl
              py-10
              text-center
              text-gray-500
              font-medium
            "
          >
            No messages yet
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { ChatMessage } from "../types/chat.types";

interface Props {
  message?: ChatMessage | null;
  isFullscreen?: boolean;
}

export default function FrameContent({ message, isFullscreen = false }: Props) {
  if (!message) {
    return (
      <h1 className="text-5xl font-serif italic text-neutral-800">Frame</h1>
    );
  }

  // Choose display fit dynamically based on layout settings
  const objectFitClass = isFullscreen
    ? "object-contain w-screen h-screen bg-black rounded-0"
    : "w-full h-full object-cover rounded-[30px]";

  switch (message.messageType) {
    case "IMAGE":
      return (
        <img
          src={message.mediaUrl}
          alt="shared"
          className={objectFitClass}
          draggable="false"
        />
      );

    case "VIDEO":
      return (
        <video
          src={message.mediaUrl}
          controls
          className={
            isFullscreen
              ? "w-screen h-screen bg-black"
              : "w-full h-full rounded-[30px]"
          }
        />
      );

    case "LINK":
      return (
        <iframe
          src={message.mediaUrl}
          className={
            isFullscreen
              ? "w-screen h-screen border-0"
              : "w-full h-full rounded-[30px]"
          }
          allowFullScreen
        />
      );

    default:
      return (
        <div className="text-center p-4">
          <p className="text-2xl font-bold">{message.content}</p>
        </div>
      );
  }
}

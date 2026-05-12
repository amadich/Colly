"use client";

import { ChatMessage } from "../types/chat.types";

interface Props {
  message?: ChatMessage | null;
}

export default function FrameContent({ message }: Props) {
  if (!message) {
    return (
      <h1 className="text-5xl font-serif italic text-neutral-800">Frame</h1>
    );
  }

  switch (message.messageType) {
    case "IMAGE":
      return (
        <img
          src={message.mediaUrl}
          alt="shared"
          className="w-full h-full object-cover rounded-[30px]"
          draggable="false"
        />
      );

    case "VIDEO":
      return (
        <video
          src={message.mediaUrl}
          controls
          className="w-full h-full rounded-[30px]"
        />
      );

    case "LINK":
      return (
        <iframe
          src={message.mediaUrl}
          className=" w-full h-full rounded-[30px] "
          allowFullScreen
        />
      );

    default:
      return (
        <div className="text-center">
          <p className="text-2xl font-bold">{message.content}</p>
        </div>
      );
  }
}

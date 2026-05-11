"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { v4 as uuid } from "uuid";

import { createChatSocket } from "@/features/chat/lib/chat.socket";

import { BubbleMessage, ChatMessage } from "@/features/chat/types/chat.types";

import UserAvatar from "@/features/chat/components/UserAvatar";
import FrameContent from "@/features/chat/components/FrameContent";

import { ControlButton } from "@/features/chat/components/ChatBubble";

import OnlineUsers from "@/features/chat/components/OnlineUsers";

type OnlineUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

type ChatSocket = {
  activate: () => void;

  deactivate: () => void;

  publish: (params: { destination: string; body: string }) => void;

  subscribe: (
    destination: string,
    callback: (message: { body: string }) => void,
  ) => {
    unsubscribe: () => void;
  };

  onConnect: (() => void) | null;
};

const POSITIONS = [
  "top-[18%] left-[24%]",
  "top-[18%] right-[24%]",
  "bottom-[22%] left-[24%]",
  "bottom-[22%] right-[24%]",
  "top-1/2 left-[18%] -translate-y-1/2",
  "top-1/2 right-[18%] -translate-y-1/2",
];

export default function ChatRoomPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const socketRef = useRef<ChatSocket | null>(null);

  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [activeBubbles, setActiveBubbles] = useState<BubbleMessage[]>([]);

  const [frameContent, setFrameContent] = useState<ChatMessage | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    const socket = createChatSocket() as unknown as ChatSocket;

    let usersSubscription: {
      unsubscribe: () => void;
    } | null = null;

    let historySubscription: {
      unsubscribe: () => void;
    } | null = null;

    let messagesSubscription: {
      unsubscribe: () => void;
    } | null = null;

    socket.onConnect = () => {
      console.log("CHAT CONNECTED");

      // =========================
      // ONLINE USERS
      // =========================
      usersSubscription = socket.subscribe(
        `/topic/room/${roomId}/users`,
        (message) => {
          const users: OnlineUser[] = JSON.parse(message.body);

          // REMOVE DUPLICATES
          const uniqueUsers = Array.from(
            new Map(users.map((user) => [user.username, user])).values(),
          );

          setOnlineUsers(uniqueUsers);
        },
      );

      // =========================
      // HISTORY
      // =========================
      historySubscription = socket.subscribe(
        `/topic/room/${roomId}/history`,
        (message) => {
          const oldMessages: ChatMessage[] = JSON.parse(message.body);

          // REMOVE DUPLICATE MESSAGES
          const uniqueMessages = Array.from(
            new Map(oldMessages.map((msg) => [msg.id, msg])).values(),
          );

          setMessages(uniqueMessages);

          const latestFrameMessage = [...uniqueMessages]
            .reverse()
            .find((msg) => msg.messageType !== "TEXT");

          if (latestFrameMessage) {
            setFrameContent(latestFrameMessage);
          }
        },
      );

      // =========================
      // LIVE MESSAGES
      // =========================
      messagesSubscription = socket.subscribe(
        `/topic/room/${roomId}`,
        (message) => {
          const data: ChatMessage = JSON.parse(message.body);

          // PREVENT DUPLICATE MESSAGES
          setMessages((prev) => {
            const exists = prev.some((msg) => msg.id === data.id);

            if (exists) return prev;

            return [...prev, data];
          });

          // ADD ONLINE USER
          setOnlineUsers((prev) => {
            const exists = prev.some((u) => u.username === data.username);

            if (exists) return prev;

            return [
              ...prev,
              {
                id: data.id,
                username: data.username,
                firstName: "",
                lastName: "",
                avatar: data.avatar,
              },
            ];
          });

          // TEXT MESSAGE => BUBBLE
          if (data.messageType === "TEXT") {
            const bubble: BubbleMessage = {
              ...data,
              bubbleId: uuid(),
            };

            setActiveBubbles((prev) => [...prev, bubble]);

            setTimeout(() => {
              setActiveBubbles((prev) =>
                prev.filter((b) => b.bubbleId !== bubble.bubbleId),
              );
            }, 4000);
          } else {
            // IMAGE / VIDEO / LINK
            setFrameContent(data);
          }
        },
      );

      // =========================
      // JOIN ROOM
      // =========================
      socket.publish({
        destination: "/app/chat.join",

        body: JSON.stringify({
          roomId,
        }),
      });

      // =========================
      // LOAD HISTORY
      // =========================
      socket.publish({
        destination: "/app/chat.history",

        body: JSON.stringify({
          roomId,
        }),
      });
    };

    socket.activate();

    socketRef.current = socket;

    return () => {
      usersSubscription?.unsubscribe();

      historySubscription?.unsubscribe();

      messagesSubscription?.unsubscribe();

      socket.deactivate();

      socketRef.current = null;

      setMessages([]);

      setOnlineUsers([]);

      setActiveBubbles([]);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    if (!socketRef.current) return;

    socketRef.current.publish({
      destination: "/app/chat.send",

      body: JSON.stringify({
        roomId,
        content: inputValue,
        messageType: "TEXT",
      }),
    });

    setInputValue("");
  };

  // UNIQUE USERS FROM MESSAGES
  const users = Array.from(
    new Map(
      messages.map((message) => [
        message.username,
        {
          id: message.id,
          username: message.username,
          firstName: message.firstName,
          lastName: message.lastName,
          avatar: message.avatar,
        },
      ]),
    ).values(),
  );

  return (
    <>
      <OnlineUsers users={onlineUsers} />

      <main
        className="
          relative
          h-[calc(100vh-80px)]
          overflow-hidden
          bg-[#f7f7f7]
        "
      >
        {/* FRAME */}
        <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-112.5
            h-100
            border-4
            border-black
            rounded-[40px]
            flex
            items-center
            justify-center
            bg-white
            shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
            overflow-hidden
            z-10
          "
        >
          <FrameContent message={frameContent} />
        </div>

        {/* USERS */}
        <AnimatePresence>
          {users.map((user, index) => (
            <UserAvatar
              key={`${user.username}-${index}`}
              id={user.id}
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar}
              style={
                index === 2
                  ? "bottom-[22%] left-[24%]"
                  : POSITIONS[index % POSITIONS.length]
              }
              activeBubble={activeBubbles.find(
                (bubble) => bubble.username === user.username,
              )}
            />
          ))}
        </AnimatePresence>

        {/* INPUT */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            w-full
            max-w-3xl
            flex
            flex-col
            items-center
            gap-4
            z-20
          "
        >
          {/* BUTTONS */}
          <div className="flex gap-3">
            <ControlButton label="Upload Image" />

            <ControlButton label="Share Video" />

            <ControlButton label="Stickers 😊" />
          </div>

          {/* INPUT */}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type ..."
            className="
              w-full
              border-4
              border-black
              rounded-2xl
              py-4
              px-6
              text-xl
              bg-white
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              focus:outline-none
            "
          />
        </div>
      </main>
    </>
  );
}

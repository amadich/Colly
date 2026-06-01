"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { v4 as uuid } from "uuid";
import { Maximize2, Minimize2, Square, Eye, Palette } from "lucide-react";

import { createChatSocket } from "@/features/chat/lib/chat.socket";
import { BubbleMessage, ChatMessage } from "@/features/chat/types/chat.types";
import UserAvatar from "@/features/chat/components/UserAvatar";
import FrameContent from "@/features/chat/components/FrameContent";
import { ControlButton } from "@/features/chat/components/ChatBubble";
import OnlineUsers from "@/features/chat/components/OnlineUsers";
import ChatHistory from "@/features/chat/components/ChatHistory";
import RoomSwitcher from "@/features/chat/components/RoomSwitcher";
import { uploadFile } from "@/features/chat/lib/upload";
import { Send } from "@mynaui/icons-react";

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
  ) => { unsubscribe: () => void };
  onConnect: (() => void) | null;
};

const POSITIONS = [
  "top-[10%] left-[5%] md:top-[18%] md:left-[12%]",
  "top-[10%] right-[5%] md:top-[18%] md:right-[12%]",
  "bottom-[28%] left-[5%] md:bottom-[25%] md:left-[12%]",
  "bottom-[28%] right-[5%] md:bottom-[25%] md:right-[12%]",
  "top-1/2 left-[2%] -translate-y-1/2 md:left-[8%]",
  "top-1/2 right-[2%] -translate-y-1/2 md:right-[8%]",
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
  const [rooms, setRooms] = useState([]);
  const [frameScale, setFrameScale] = useState<
    "normal" | "large" | "fullscreen"
  >("normal");

  // --- CONFIGURATION STATE HOOKS ---
  const [avatarAlpha, setAvatarAlpha] = useState<number>(100);
  const [chatBubbleColor, setChatBubbleColor] = useState<string>("white"); // Options: "white" | "green" | "yellow" | "blue"

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const loadRooms = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms`,
        { credentials: "include" },
      );
      const text = await response.text();
      if (!text) return;
      const data = JSON.parse(text);
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialRooms = async () => {
      if (isMounted) {
        await loadRooms();
      }
    };

    fetchInitialRooms();

    const interval = setInterval(() => {
      loadRooms();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [loadRooms]);

  useEffect(() => {
    const socket = createChatSocket() as unknown as ChatSocket;
    let usersSubscription: { unsubscribe: () => void } | null = null;
    let historySubscription: { unsubscribe: () => void } | null = null;
    let messagesSubscription: { unsubscribe: () => void } | null = null;

    socket.onConnect = () => {
      console.log("CHAT CONNECTED");

      usersSubscription = socket.subscribe(
        `/topic/room/${roomId}/users`,
        (message) => {
          const users: OnlineUser[] = JSON.parse(message.body);
          const uniqueUsers = Array.from(
            new Map(users.map((user) => [user.username, user])).values(),
          );
          setOnlineUsers(uniqueUsers);
          loadRooms();
        },
      );

      historySubscription = socket.subscribe(
        `/topic/room/${roomId}/history`,
        (message) => {
          const oldMessages: ChatMessage[] = JSON.parse(message.body);
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

      messagesSubscription = socket.subscribe(
        `/topic/room/${roomId}`,
        (message) => {
          const data: ChatMessage = JSON.parse(message.body);
          loadRooms();

          setMessages((prev) => {
            if (prev.some((msg) => msg.id === data.id)) return prev;
            return [...prev, data];
          });

          setOnlineUsers((prev) => {
            if (prev.some((u) => u.username === data.username)) return prev;
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

          if (data.messageType === "TEXT") {
            const bubble: BubbleMessage = { ...data, bubbleId: uuid() };
            setActiveBubbles((prev) => [...prev, bubble]);
            setTimeout(() => {
              setActiveBubbles((prev) =>
                prev.filter((b) => b.bubbleId !== bubble.bubbleId),
              );
            }, 4000);
          } else {
            setFrameContent(data);
          }
        },
      );

      socket.publish({
        destination: "/app/chat.join",
        body: JSON.stringify({ roomId }),
      });

      loadRooms();

      socket.publish({
        destination: "/app/chat.history",
        body: JSON.stringify({ roomId }),
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
  }, [roomId, loadRooms]);

  const sendMessage = () => {
    if (!inputValue.trim() || !socketRef.current) return;
    const url = extractUrl(inputValue);
    const cleanedMessage = inputValue.replace(url || "", "").trim();

    socketRef.current.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        roomId,
        content: cleanedMessage || inputValue,
        messageType: url ? "LINK" : "TEXT",
        mediaUrl: url || null,
      }),
    });
    setInputValue("");
  };

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !socketRef.current) return;
    try {
      const uploaded = await uploadFile(file, "chat");
      socketRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({
          roomId,
          content: inputValue,
          messageType: "IMAGE",
          mediaUrl: uploaded.url,
        }),
      });
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !socketRef.current) return;
    try {
      const uploaded = await uploadFile(file, "chat");
      socketRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({
          roomId,
          content: "Video shared",
          messageType: "VIDEO",
          mediaUrl: uploaded.url,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const extractUrl = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  };

  const getFrameClasses = () => {
    switch (frameScale) {
      case "fullscreen":
        return "fixed inset-0 w-screen h-screen top-0 left-0 translate-x-0 translate-y-0 rounded-0 border-0 z-40 bg-black shadow-none";
      case "large":
        return "absolute w-[90vw] h-[65vh] md:w-[75vw] md:h-[60vh] max-w-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[40px] border-4 z-30 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]";
      case "normal":
      default:
        return "absolute w-[90vw] sm:w-[450px] h-[350px] sm:h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[40px] border-4 z-10 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]";
    }
  };

  return (
    <>
      {frameScale !== "fullscreen" && (
        <div>
          <OnlineUsers users={onlineUsers} />
          <ChatHistory
            messages={messages}
            currentFrame={(msg) =>
              msg.messageType !== "TEXT" && setFrameContent(msg)
            }
          />
          <RoomSwitcher rooms={rooms} currentRoomId={roomId} />
        </div>
      )}

      <main className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#f7f7f7]">
        <div
          className={`
            border-black
            flex
            items-center
            justify-center
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${getFrameClasses()}
          `}
        >
          {/* CONTROL OVERLAY PANEL */}
          <div className="absolute top-4 right-4 flex items-center gap-3 z-[60] bg-white border-2 border-black rounded-xl p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-wrap justify-end">
            {/* NEW CHAT BUBBLE COLOR THEME CONFIGURATION SELECT PILLS */}
            <div className="flex items-center gap-1.5 px-2 border-r-2 border-neutral-200">
              <Palette size={15} className="text-neutral-700" />
              <div className="flex gap-1">
                {["white", "green", "yellow", "blue"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setChatBubbleColor(color)}
                    className={`
                      w-4 h-4 rounded-full border border-black cursor-pointer transition-transform
                      ${color === "white" ? "bg-white" : color === "green" ? "bg-[#d9ffd6]" : color === "yellow" ? "bg-yellow-300" : "bg-[#5da9ff]"}
                      ${chatBubbleColor === color ? "scale-125 ring-2 ring-black ring-offset-1" : "hover:scale-110"}
                    `}
                    title={`Bubble Color: ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* ALPHA SLIDER: Appears only during full-screen mode */}
            {frameScale === "fullscreen" && (
              <div className="flex items-center gap-1.5 px-1 border-r-2 border-neutral-200 mr-1">
                <Eye size={16} className="text-neutral-600" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={avatarAlpha}
                  onChange={(e) => setAvatarAlpha(Number(e.target.value))}
                  className="w-16 sm:w-24 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                  title={`Avatar Visibility: ${avatarAlpha}%`}
                />
                <span className="text-xs font-mono font-bold w-7 text-right">
                  {avatarAlpha}%
                </span>
              </div>
            )}

            {frameScale !== "normal" && (
              <button
                onClick={() => setFrameScale("normal")}
                className="p-1 hover:bg-neutral-200 rounded-md transition-colors text-black cursor-pointer"
                title="Normal"
              >
                <Minimize2 size={18} />
              </button>
            )}
            {frameScale !== "large" && frameScale !== "fullscreen" && (
              <button
                onClick={() => setFrameScale("large")}
                className="p-1 hover:bg-neutral-200 rounded-md transition-colors text-black cursor-pointer"
                title="Large"
              >
                <Square size={18} />
              </button>
            )}
            {frameScale !== "fullscreen" && (
              <button
                onClick={() => setFrameScale("fullscreen")}
                className="p-1 hover:bg-neutral-200 rounded-md transition-colors text-black cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            )}
          </div>

          <FrameContent
            message={frameContent}
            isFullscreen={frameScale === "fullscreen"}
          />
        </div>

        {/* FLOATING USER AVATARS WITH ADJUSTABLE ALPHA LEVEL AND CUSTOM SELECTED BUBBLE TINT */}
        <AnimatePresence>
          {users.map((user, index) => (
            <UserAvatar
              key={`${user.username}-${index}`}
              id={user.id}
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar}
              style={POSITIONS[index % POSITIONS.length]}
              isFullscreenMode={frameScale === "fullscreen"}
              alpha={avatarAlpha}
              bubbleColor={chatBubbleColor} // Pass bubble color theme dynamically
              activeBubble={activeBubbles.find(
                (bubble) => bubble.username === user.username,
              )}
            />
          ))}
        </AnimatePresence>

        {/* INPUT PANEL CONTROLS */}
        <div
          className={`
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            w-[92%]
            max-w-3xl
            flex
            flex-col
            items-center
            gap-4
            transition-all
            ${frameScale === "fullscreen" ? "z-[60] max-w-xl opacity-40 hover:opacity-100" : "z-20"}
          `}
        >
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            <ControlButton
              label="Upload Image"
              onClick={() => imageInputRef.current?.click()}
            />
            <ControlButton
              label="Share Video"
              onClick={() => videoInputRef.current?.click()}
            />
            <ControlButton label="Stickers 😊" />
          </div>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            hidden
            onChange={handleVideoUpload}
          />

          <div className="relative w-full flex items-center bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type ..."
              className="
                w-full
                py-4
                pl-6
                pr-20
                text-lg
                sm:text-xl
                font-bold
                bg-transparent
                focus:outline-none
                text-black
              "
            />

            {/* INTEGRATED SEND CLICK HANDLE ICON ICON */}
            <button
              onClick={sendMessage}
              className="
                absolute
                right-3
                p-2.5
                bg-black
                text-white
                rounded-xl
                border-2
                border-black
                hover:bg-neutral-800
                transition-colors
                cursor-pointer
                flex
                items-center
                justify-center
              "
              title="Send Message"
            >
              <Send size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

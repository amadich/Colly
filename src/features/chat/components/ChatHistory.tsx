"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../types/chat.types";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

interface Props {
  messages: ChatMessage[];
  currentFrame?: (message: ChatMessage) => void;
}

export default function ChatHistory({ messages, currentFrame }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollTo({
        top: bottomRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end">
      {/* TOGGLE BUTTON (The Trigger) */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          mb-4
          w-14 h-14 
          bg-[#ffeb3b] 
          border-4 border-black 
          rounded-full 
          flex items-center justify-center 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          z-[60]
        "
      >
        {isOpen ? (
          <X size={28} strokeWidth={3} />
        ) : (
          <MessageSquare size={28} strokeWidth={3} />
        )}
      </motion.button>

      {/* ANIMATED HISTORY PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Water-like entry: Pops from the button and expands
            initial={{ opacity: 0, scale: 0.5, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(10px)" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="
              w-96
              max-h-[75vh]
              overflow-y-auto
              bg-white
              border-4
              border-black
              rounded-[28px]
              shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              p-6
              origin-top-right
            "
            ref={bottomRef}
          >
            {/* HEADER */}
            <div className="mb-5 sticky top-0 bg-white pb-2 z-10">
              <h2 className="text-2xl font-black italic underline decoration-yellow-400">
                Chat History
              </h2>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                {messages.length} Room Messages
              </p>
            </div>

            {/* MESSAGES LIST */}
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => {
                const isMedia = message.messageType !== "TEXT";

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    // transition={{ delay: index * 0.05 }} // Staggered entrance
                    onClick={() => currentFrame?.(message)}
                    className={`
                      border-[3px]
                      border-black
                      rounded-2xl
                      p-4
                      cursor-pointer
                      transition-all
                      hover:-translate-y-1
                      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      active:shadow-none
                      active:translate-x-1
                      active:translate-y-1
                      ${isMedia ? "bg-[#d9ffd6]" : "bg-[#f7f7f7]"}
                    `}
                  >
                    {/* MESSAGE TOP */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-sm">
                        {message.firstName} {message.lastName}
                      </h3>
                      <span className="text-[10px] font-bold text-gray-400 bg-black/5 px-2 py-1 rounded-full">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* DYNAMIC CONTENT */}
                    <div className="text-sm">
                      {message.messageType === "TEXT" && (
                        <p className="text-gray-800 break-words font-medium">
                          {message.content}
                        </p>
                      )}

                      {message.messageType === "IMAGE" && (
                        <div>
                          <img
                            src={message.mediaUrl}
                            alt="shared"
                            className="rounded-xl border-2 border-black mb-2 w-full object-cover h-32"
                          />
                          <p className="font-bold italic">{message.content}</p>
                        </div>
                      )}

                      {message.messageType === "VIDEO" && (
                        <div>
                          <video
                            src={message.mediaUrl}
                            className="rounded-xl border-2 border-black mb-2 w-full"
                          />
                          <p className="font-bold">🎬 Video Shared</p>
                        </div>
                      )}

                      {message.messageType === "LINK" && (
                        <div className="space-y-1">
                          {message.content && (
                            <p className="font-medium">{message.content}</p>
                          )}
                          <p className="font-black text-blue-600 underline break-all text-xs">
                            {message.mediaUrl}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {messages.length === 0 && (
                <div className="border-[3px] border-dashed border-black rounded-2xl py-10 text-center text-gray-400 font-black uppercase text-sm">
                  Empty Waves...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

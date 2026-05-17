"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Bell, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type FriendRequest = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
};

type FriendRequestsSheetProps = {
  requests: FriendRequest[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

export default function FriendRequestsSheet({
  requests,
  onAccept,
  onReject,
}: FriendRequestsSheetProps) {
  return (
    <Sheet>
      {/* TRIGGER */}
      <SheetTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05, rotate: -3 }}
          whileTap={{ scale: 0.95 }}
          className="
      relative
      w-11
      h-11
      rounded-2xl
      border-[3px]
      border-black
      bg-yellow-300
      flex
      items-center
      justify-center
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      hover:bg-pink-300
      transition-colors
      shrink-0
    "
        >
          <Bell size={18} strokeWidth={3} />

          {/* COUNTER */}
          {requests.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="
          absolute
          -top-1
          -right-1
          min-w-6
          h-6
          px-1
          rounded-full
          border-2
          border-black
          bg-red-500
          text-white
          font-black
          text-[10px]
          flex
          items-center
          justify-center
        "
            >
              {requests.length}
            </motion.div>
          )}
        </motion.button>
      </SheetTrigger>

      {/* SHEET */}
      <SheetContent
        side="right"
        className="
          w-105
          border-l-4
          border-black
          bg-[#f7f7f7]
          p-0
        "
      >
        {/* HEADER */}
        <SheetHeader
          className="
            border-b-4
            border-black
            px-6
            py-5
            bg-[#d9ffd6]
          "
        >
          <SheetTitle
            className="
              text-3xl
              font-black
              italic
              flex
              items-center
              gap-3
            "
          >
            <Bell size={30} />
            Friend Requests
          </SheetTitle>

          {/* Accessibility Description */}
          <SheetDescription className="sr-only">
            View and manage your pending friend requests.
          </SheetDescription>
        </SheetHeader>

        {/* CONTENT */}
        <div className="flex flex-col gap-4 p-5 overflow-y-auto h-full">
          {requests.length === 0 && (
            <div
              className="
                mt-10
                border-4
                border-dashed
                border-black
                rounded-[28px]
                p-8
                text-center
                bg-white
              "
            >
              <p className="font-black text-xl">No requests yet 👀</p>

              <p className="text-sm font-bold text-gray-500 mt-2">
                Students will appear here when they add you.
              </p>
            </div>
          )}

          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                scale: 1.02,
                rotate: 1,
              }}
              className="
                border-4
                border-black
                rounded-[28px]
                bg-white
                p-4
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              "
            >
              <div className="flex items-center gap-4">
                {/* AVATAR */}
                <div
                  className="
                    relative
                    w-16
                    h-16
                    rounded-2xl
                    border-4
                    border-black
                    overflow-hidden
                    bg-blue-300
                    shrink-0
                  "
                >
                  <Image
                    src={request.avatar}
                    alt={request.username}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-black text-lg truncate">
                    {request.firstName} {request.lastName}
                  </h3>

                  <p className="text-xs font-bold uppercase text-gray-400">
                    @{request.username}
                  </p>

                  <div
                    className="
                      mt-2
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      border-2
                      border-black
                      bg-yellow-200
                      text-[10px]
                      font-black
                      uppercase
                    "
                  >
                    Wants to be your friend
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-5">
                {/* ACCEPT */}
                <Button
                  onClick={() => onAccept(request.id)}
                  className="
                    flex-1
                    h-12
                    border-4
                    border-black
                    rounded-2xl
                    bg-[#8fff8f]
                    hover:bg-[#74ff74]
                    text-black
                    font-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  "
                >
                  <Check className="mr-2" />
                  Accept
                </Button>

                {/* REJECT */}
                <Button
                  onClick={() => onReject(request.id)}
                  className="
                    flex-1
                    h-12
                    border-4
                    border-black
                    rounded-2xl
                    bg-[#ffb3b3]
                    hover:bg-[#ff9c9c]
                    text-black
                    font-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  "
                >
                  <X className="mr-2" />
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

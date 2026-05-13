"use client";

import { ChevronRight } from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Hero6() {
  const user = useAuthStore((state) => state.user);

  return (
    <section className="w-full mx-auto flex min-h-screen flex-col items-start justify-start gap-x-8 gap-y-14 ">
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-foreground text-6xl font-bold tracking-tight text-balance">
          Find Your Tribe, Build Your Network.
        </h1>

        <p className="text-muted-foreground mx-auto max-w-sm text-base">
          Connect with like-minded students for fun, friendships, and future
          opportunities.
        </p>

        <div className="flex gap-2">
          {!user ? (
            <>
              {/* NOT LOGGED IN */}
              <Link href="/Signup">
                <button className="flex items-center justify-center rounded-full bg-black text-white p-2 w-35 text-sm duration-150 hover:bg-white hover:text-black cursor-pointer hover:border">
                  Join for Free
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>

              <button className="flex items-center justify-center rounded-full border border-black bg-transparent text-black p-2 text-sm duration-150 hover:bg-black hover:text-white cursor-pointer">
                Explore Communities
              </button>
            </>
          ) : (
            <>
              {/* BROWSE ROOMS */}
              <Link href="/rooms">
                <button className="flex h-12 w-48 items-center justify-center rounded-full bg-black text-white text-sm duration-150 hover:bg-white hover:text-black hover:border cursor-pointer">
                  Browse Rooms
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </Link>

              {/* CREATE ROOM */}
              <Link href="/create-room">
                <button className="flex h-12 w-48 items-center justify-center gap-3 rounded-full border border-black bg-transparent text-black text-sm duration-150 hover:bg-black hover:text-white cursor-pointer">
                  {/* Avatars */}
                  <div className="flex flex-row-reverse justify-end -space-x-3 space-x-reverse *:ring-2 *:ring-background">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src="/assets/icons/avatar-femme.jpg" />
                    </Avatar>

                    <Avatar className="w-7 h-7">
                      <AvatarImage src="/assets/icons/avatar-homme.jpg" />
                    </Avatar>
                  </div>

                  <span>Create Room</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Animated Image Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-full select-none"
      >
        <Image
          src={"/assets/home/Hero_Home.webp"}
          width={2752}
          height={1536}
          alt="Hero 1"
          draggable={false}
          priority
          className="relative w-full h-auto -mt-32 -z-1"
        />
      </motion.div>
    </section>
  );
}

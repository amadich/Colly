"use client";
import { useEffect, useState } from "react";
import { socketClient } from "@/lib/socket";

import { ChevronRight, Bell, MobileSignalFour } from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SettingUser from "@/components/modals/SettingUser";

const navLinks = [
  { name: "Rooms", href: "/rooms" },
  { name: "Communities", href: "#" },
  { name: "Events", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Login", href: "/Login" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function Navbar() {
  const router = useRouter();

  const [onlineCount, setOnlineCount] = useState(0);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socketClient.onConnect = () => {
      console.log("CONNECTED");

      socketClient.subscribe("/topic/online-users", (message) => {
        console.log("ONLINE:", message.body);

        setOnlineCount(Number(message.body));
      });

      // 🚀 REQUEST CURRENT COUNT IMMEDIATELY
      socketClient.publish({
        destination: "/app/online",
      });
    };

    socketClient.activate();

    return () => {
      socketClient.deactivate();
    };
  }, []);

  return (
    <header className="flex items-center justify-around p-4">
      {/* LOGO */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center justify-center gap-4"
      >
        <Image
          src={"/logo.svg"}
          width={64}
          height={64}
          alt="Logo Colly"
          draggable={false}
          className="scale-x-[-1] w-16 h-16"
        />

        <div>
          <h2 className="text-lg font-bold">Colly</h2>
          <i>Dub Edition</i>
        </div>
      </motion.div>

      {/* NAVIGATION */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center space-x-4"
      >
        {navLinks
          .filter((link) => {
            if (user && link.name === "Login") {
              return false;
            }
            return true;
          })
          .map((link, index) => (
            <motion.li key={index} variants={itemVariants}>
              <Link
                href={link.href}
                className="hover:text-neutral-500 duration-200"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}

        {/* JOIN BUTTON (only when NOT logged in) */}
        {!user && (
          <motion.li variants={itemVariants}>
            <Link href={"/Signup"}>
              <button className="flex items-center justify-center rounded-full bg-black text-white p-1 w-35 text-sm cursor-pointer duration-150 hover:pl-4 group">
                Join for Free
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.li>
        )}

        {/* USER SECTION */}
        {user && (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="size-5" />
              <span className="sr-only">View notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-8 cursor-pointer">
                  <AvatarImage src={user.avatar || ""} />

                  <AvatarFallback>
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.username}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>My Account</DropdownMenuItem>
                <SettingUser />

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Users Online */}
            <div className="flex items-center gap-3  text-sm text-green-700">
              <span className="flex items-center justify-center "> <MobileSignalFour /> {onlineCount}</span> Online
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
            </div>
          </div>
        )}
      </motion.ul>
    </header>
  );
}

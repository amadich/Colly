"use client";

import { useEffect, useState } from "react";
import { socketClient } from "@/lib/socket";

import { MobileSignalFour, Bell } from "@mynaui/icons-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import SettingUser from "@/components/modals/SettingUser";

type Props = {
  showNotification?: boolean;
};

export default function UserStatus({ showNotification = true }: Props) {
  const [onlineCount, setOnlineCount] = useState(0);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    socketClient.onConnect = () => {
      socketClient.subscribe("/topic/online-users", (message) => {
        setOnlineCount(Number(message.body));
      });

      socketClient.publish({
        destination: "/app/online",
      });
    };

    socketClient.activate();

    return () => {
      socketClient.deactivate();
    };
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 justify-end p-6  bg-[#f7f7f7]">
      {/* Notification */}
      {showNotification && (
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="size-5" />
        </Button>
      )}

      {/* Avatar */}
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
            onClick={logout}
            className="cursor-pointer text-red-500"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Online Users */}
      <div className="flex items-center gap-3 text-sm text-green-700">
        <span className="flex items-center gap-1">
          <MobileSignalFour />
          {onlineCount}
        </span>
        Online
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>

          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
      </div>
    </div>
  );
}

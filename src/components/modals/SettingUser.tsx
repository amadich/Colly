// src/components/modals/SettingUser.tsx

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Camera, User, Mail, Lock } from "@mynaui/icons-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function SettingUser() {
  const user = useAuthStore((state) => state.user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal">
          Settings
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-muted max-w-2xl p-6">
        <DialogTitle className="text-xl font-semibold">
          Account Settings
        </DialogTitle>

        <DialogDescription className="text-muted-foreground text-sm">
          Manage your account information, profile picture, and password.
        </DialogDescription>

        <div className="space-y-6">
          {/* PROFILE */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage src={user?.avatar || ""} />

                <AvatarFallback className="text-lg">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <label
                htmlFor="avatar"
                className="bg-primary text-primary-foreground absolute -right-1 -bottom-1 flex size-8 cursor-pointer items-center justify-center rounded-full"
              >
                <Camera className="size-4" />

                <Input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>

            <div>
              <h3 className="text-lg font-medium">
                {user?.firstName} {user?.lastName}
              </h3>

              <p className="text-muted-foreground text-sm">@{user?.username}</p>
            </div>
          </div>

          {/* FORM */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* FIRST NAME */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>

              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                <Input
                  id="firstName"
                  className="pl-9"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
            </div>

            {/* LAST NAME */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>

              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                <Input
                  id="lastName"
                  className="pl-9"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* USERNAME */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>

              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                <Input
                  type="email"
                  id="email"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* AGE */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>

              <Input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Your age"
              />
            </div>

            {/* GENDER */}
            <div className="space-y-2">
              <Label>Gender</Label>

              <Select defaultValue={gender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="H">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-4 rounded-xl border p-4">
            <div className="flex items-center gap-2">
              <Lock className="size-4" />

              <h4 className="font-medium">Change Password</h4>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input type="password" placeholder="Current password" />

              <Input type="password" placeholder="New password" />

              <Input type="password" placeholder="Confirm password" />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>

            <Button>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

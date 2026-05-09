"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { authService } from "@/features/auth/services/auth.service";

import Image from "next/image";
import Link from "next/link";

import { motion, Variants } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 15,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        age: Number(formData.age),
        email: formData.email,
        password: formData.password,

        role: "STUDENT",

        avatar: "http://localhost:3000/assets/icons/avatar.png",
      });

      alert("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full md:grid md:min-h-screen md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="hidden md:block"
      >
        <Image
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
          alt="Pattern background"
          src="/assets/images/3.jpeg"
          className="size-full border-none bg-muted object-cover object-bottom-right"
        />
      </motion.div>

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid w-full max-w-sm gap-6"
        >
          <motion.div variants={itemVariants}>
            <Link href={"/"}>
              <div className="flex items-center justify-center gap-4">
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
              </div>
            </Link>
          </motion.div>

          <motion.hr variants={itemVariants} className="border-muted" />

          <motion.div variants={itemVariants}>
            <h1 className="text-xl font-bold tracking-tight">
              Create an Account
            </h1>

            <p className="text-sm text-muted-foreground">
              Join the tribe and start building your network.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>

                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>

                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  onChange={handleChange}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <motion.div
                variants={itemVariants}
                className="grid col-span-3 gap-2"
              >
                <Label htmlFor="username">Username</Label>

                <Input
                  id="username"
                  placeholder="johndoe123"
                  required
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid col-span-1 gap-2"
              >
                <Label htmlFor="age">Age</Label>

                <Input
                  id="age"
                  type="number"
                  placeholder="20"
                  required
                  onChange={handleChange}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="team@amadich.tn"
                required
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                required
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 py-2"
            >
              <Checkbox id="terms" required />

              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I accept the{" "}
                <Link href="/privacy" className="underline hover:text-black">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-black text-white p-2 text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create New Account"}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";

// 1. Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Elements will pop in one after another
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function LoginPage() {
  return (
    <section className="w-full md:grid md:min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid w-full max-w-sm gap-6"
        >
          {/* Logo Section */}
          <motion.div variants={itemVariants}>
            <Link href={"/"}>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={"/CollyLogo.png"}
                  width={64}
                  height={64}
                  alt="Logo Colly"
                  className="scale-x-[-1]"
                />
                <div>
                  <h2 className="text-lg font-bold">Colly</h2>
                  <i>Dub Edition</i>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.hr variants={itemVariants} className="border-muted" />

          {/* Header Text */}
          <motion.div variants={itemVariants}>
            <h1 className="text-xl font-bold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to login
            </p>
          </motion.div>

          {/* Form Fields */}
          <form className="grid gap-4">
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="email-3">Email</Label>
              <Input
                required
                id="email-3"
                type="email"
                autoComplete="username"
                placeholder="team@amadich.tn"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="password-3">Password</Label>
              <Input
                required
                id="password-3"
                type="password"
                placeholder="••••••••••"
                autoComplete="current-password"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <button className="flex w-full items-center justify-center rounded-full bg-black text-white p-1 text-sm hover:opacity-80 transition-opacity">
                Login
              </button>
            </motion.div>
          </form>

          {/* Footer Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-sm text-center"
          >
            <p>
              Don&apos;t have an account?{" "}
              <Link href={"/Signup"} className="underline">
                Sign up
              </Link>
            </p>
            <a href="#" className="underline">
              Forgot your password?
            </a>
          </motion.div>

          <motion.hr variants={itemVariants} className="border-muted" />
          
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground text-center">
            © 2026 Colly
          </motion.p>
        </motion.div>
      </div>

      {/* Side Image with Slide-in animation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:block"
      >
        <Image
          loading="lazy"
          decoding="async"
          width="1920"
          height="1080"
          alt="Pattern background"
          src="/assets/images/SignUpSide.jpeg"
          className="size-full border-none bg-muted object-cover object-center"
        />
      </motion.div>
    </section>
  );
}
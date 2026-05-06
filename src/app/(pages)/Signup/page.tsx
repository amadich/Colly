"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have this in shadcn
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function SignUpPage() {
  return (
    <section className="w-full md:grid md:min-h-screen md:grid-cols-2">
      {/* Side Image - Animates in from the left */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
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
          src="/assets/images/LoginSide_1.jpeg"
          className="size-full border-none bg-muted object-cover object-center scale-x-[-1]"
        />
      </motion.div>

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid w-full max-w-sm gap-6"
        >
          {/* Logo */}
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

          <motion.div variants={itemVariants}>
            <h1 className="text-xl font-bold tracking-tight">Create an Account</h1>
            <p className="text-sm text-muted-foreground">
              Join the tribe and start building your network.
            </p>
          </motion.div>

          <form className="grid gap-4">
            {/* First & Last Name Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" required />
              </motion.div>
              <motion.div variants={itemVariants} className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <motion.div variants={itemVariants} className="grid col-span-3 gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe123" required />
              </motion.div>
              <motion.div variants={itemVariants} className="grid col-span-1 gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="20" required />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="team@amadich.tn" required />
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••••" required />
            </motion.div>

            {/* Privacy Policy Checkbox */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 py-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the{" "}
                <Link href="/privacy" className="underline hover:text-black">
                  Privacy Policy
                </Link>{" "}
                and Terms of Service.
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button className="flex w-full items-center justify-center rounded-full bg-black text-white p-2 text-sm font-medium hover:bg-neutral-800 transition-colors">
                Create New Account
              </button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 text-sm text-center">
            <p>
              Already have an account?{" "}
              <Link href={"/Login"} className="underline font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>

          <motion.hr variants={itemVariants} className="border-muted" />
          
          <motion.p variants={itemVariants} className="text-xs text-muted-foreground text-center">
            © 2026 Colly — Built for the community.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
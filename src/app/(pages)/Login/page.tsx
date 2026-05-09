"use client";

import { useState } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import Link from "next/link";

import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
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

export default function LoginPage() {
  
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
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

      await login(
        formData.email,
        formData.password
      );

      router.push("/");
      router.refresh();

      // Later:
      // router.push("/dashboard");
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
            <h1 className="text-xl font-bold tracking-tight">Login</h1>

            <p className="text-sm text-muted-foreground">
              Enter your details below to login
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="email">Email</Label>

              <Input
                required
                id="email"
                type="email"
                autoComplete="username"
                placeholder="team@amadich.tn"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                required
                id="password"
                type="password"
                placeholder="••••••••••"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-full bg-black text-white p-2 text-sm hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </motion.div>
          </form>

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

          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground text-center"
          >
            © 2026 Colly
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
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
          src="/assets/images/SignUpSide.jpeg"
          className="size-full border-none bg-muted object-cover object-center"
        />
      </motion.div>
    </section>
  );
}

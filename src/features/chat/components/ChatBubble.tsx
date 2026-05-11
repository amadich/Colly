"use client";

import { motion } from "motion/react";

interface Props {
  content: string;
  className?: string;
}

export default function ChatBubble({ content, className }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        absolute
-bottom-8
left-1/2
-translate-x-1/2
        z-40
        bg-white
        border-[3px]
        border-black
        rounded-3xl
        px-5
        py-3
        min-w-30
        max-w-55
        text-center
        shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
        ${className}
      `}
    >
      <p className="font-semibold wrap-break-word">{content}</p>
    </motion.div>
  );
}

export function ControlButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        border-[3px]
        border-black
        bg-white
        rounded-2xl
        px-5
        py-2
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:translate-y-0.5
        duration-150
      "
    >
      {label}
    </button>
  );
}

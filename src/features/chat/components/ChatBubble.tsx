"use client";

import { motion } from "motion/react";

interface Props {
  content: string;
  className?: string;
  color?: string; // Color option pass-through prop
}

export default function ChatBubble({ content, className, color = "white" }: Props) {
  // Map clean neo-brutalist theme color combinations
  const colorMap: Record<string, string> = {
    white: "bg-white text-black",
    green: "bg-[#d9ffd6] text-black",
    yellow: "bg-yellow-300 text-black",
    blue: "bg-[#5da9ff] text-black",
  };

  const selectedColorClass = colorMap[color] || colorMap.white;

  // Dynamically assign pointer interior tint matches
  const pointerColors: Record<string, string> = {
    white: "#ffffff",
    green: "#d9ffd6",
    yellow: "#fde047", // yellow-300
    blue: "#5da9ff",
  };
  const currentPointerTint = pointerColors[color] || pointerColors.white;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.85, x: "-50%" }}
      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
      exit={{ opacity: 0, scale: 0.85, x: "-50%" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        absolute
        bottom-full
        left-1/2
        -translate-x-1/2
        mb-4
        z-40
        border-[3px]
        border-black
        rounded-[20px]
        px-4
        py-2.5
        w-max
        max-w-[240px]
        text-center
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        font-bold 
        text-sm 
        sm:text-base 
        break-words 
        leading-tight
        ${selectedColorClass}
        ${className || ""}
      `}
    >
      <p>{content}</p>

      {/* SPEECH BUBBLE TRIANGLE POINTER */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-black" />
      <div 
        className="absolute top-[100%] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] -mt-[3px]" 
        style={{ borderTopColor: currentPointerTint }}
      />
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
        border-4
        border-black
        bg-white
        rounded-2xl
        px-5
        py-1.5
        font-black
        text-sm
        text-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:bg-neutral-100
        transition-colors
        cursor-pointer
      "
    >
      {label}
    </button>
  );
}
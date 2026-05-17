"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { motion } from "framer-motion";

import { CheckCircle2 } from "lucide-react";

type SuccessDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  title: string;

  description: string;
};

export default function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
}: SuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          border-4
          border-black
          rounded-4xl
          bg-[#fff8dc]
          shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
          max-w-md
          p-0
          overflow-hidden
        "
      >
        {/* TOP BAR */}
        <div
          className="
            bg-[#8fff8f]
            border-b-4
            border-black
            px-6
            py-5
          "
        >
          <motion.div
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
            className="
              mx-auto
              flex
              size-20
              items-center
              justify-center
              rounded-full
              border-4
              border-black
              bg-white
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            "
          >
            <CheckCircle2 className="size-10 text-green-500" strokeWidth={3} />
          </motion.div>
        </div>

        {/* CONTENT */}
        <AlertDialogHeader className="px-6 pt-6 text-center">
          <AlertDialogTitle
            className="
              text-3xl
              font-black
              italic
              text-black
            "
          >
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription
            className="
              text-base
              font-bold
              text-gray-600
              mt-2
              leading-relaxed
            "
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* FOOTER */}
        <AlertDialogFooter
          className="
            px-6
            pb-6
            pt-2
          "
        >
          <AlertDialogAction
            className="
              w-full
              h-14
              rounded-2xl
              border-4
              border-black
              bg-yellow-300
              hover:bg-pink-300
              text-black
              font-black
              text-lg
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              transition-all
            "
          >
            AWESOME
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

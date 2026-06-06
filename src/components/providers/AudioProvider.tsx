"use client";

import { useEffect } from "react";
import { useAudioStore } from "@/shared/audio/audio.store";

export default function AudioProvider({children,}: {children: React.ReactNode;}) {
  const init = useAudioStore((s) => s.init);

  useEffect(() => {init();}, [init]);

  return children;
}

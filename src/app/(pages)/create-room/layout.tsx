"use client";

import PageTransition2 from "@/components/transition/PageTransition_2";
import { useState } from "react";

export default function CreateRoomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showTransitionComponent, setShowTransitionComponent] = useState(true);
  const [isContentHidden, setIsContentHidden] = useState(true);

  return (
    <>
      <main className="select-none relative min-h-screen">
        {showTransitionComponent && (
          <PageTransition2
            onCenter={() => setIsContentHidden(false)}
            onComplete={() => setShowTransitionComponent(false)}
            // Pass your specific custom character files here!
            bgCharSrc="/assets/images/anime_char_1.webp" 
            fgCharSrc="/assets/images/anime_char_3.webp" 
          />
        )}

        <div className={isContentHidden ? "invisible opacity-0" : "visible opacity-100"}>
          {children}
        </div>
      </main>
    </>
  );
}
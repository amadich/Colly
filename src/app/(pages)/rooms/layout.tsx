"use client";

import { useState } from "react";
import PageTransition2 from "@/components/transition/PageTransition_2";

export default function RoomsPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showTransitionComponent, setShowTransitionComponent] = useState(true);
  const [isContentHidden, setIsContentHidden] = useState(true);

  return (
    <>
      <main className="select-none relative min-h-screen">
        {/* The overlay panels */}
        {showTransitionComponent && (
          <PageTransition2 
            onCenter={() => setIsContentHidden(false)} // Reveals room content right when panels lock in the center
            onComplete={() => setShowTransitionComponent(false)} // Cleans up the DOM when exit animation finishes
          />
        )}
        
        {/* The actual room contents */}
        <div className={isContentHidden ? "invisible opacity-0" : "visible opacity-100"}>
          {children}
        </div>
      </main>
    </>
  );
}
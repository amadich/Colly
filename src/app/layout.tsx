"use client";

import { useState } from "react";
import "./globals.css";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import DevToolsBlocker from "@/components/security/DevToolsBlocker";
import AudioProvider from "@/components/providers/AudioProvider";
import PageTransition2 from "@/components/transition/PageTransition_2";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showTransitionComponent, setShowTransitionComponent] = useState(true);
  const [isContentHidden, setIsContentHidden] = useState(true);

  return (
    <html lang="en" className="font-geist-sans antialiased">
      <body className="min-h-full flex flex-col bg-white"> 
        <DevToolsBlocker>
          
          {showTransitionComponent && (
            <PageTransition2 
              onCenter={() => setIsContentHidden(false)} // Reveals content behind while panels are still locked in center!
              onComplete={() => setShowTransitionComponent(false)} // Completely safely unmounts after exit finishes
            />
          )}
          
          {/* The content stays invisible during the 0.8s entry slide.
            Once they hit the center, it becomes visible instantly under the panels!
          */}
          <div className={isContentHidden ? "invisible opacity-0" : "visible opacity-100"}>
            <AuthProvider>
              <AudioProvider>{children}</AudioProvider>
            </AuthProvider>
          </div>

        </DevToolsBlocker>
      </body>
    </html>
  );
}
"use client";

import { useState } from "react";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import DevToolsBlocker from "@/components/security/DevToolsBlocker";
import AudioProvider from "@/components/providers/AudioProvider";
import PageTransition2 from "@/components/transition/PageTransition_2";

export default function RootLayoutClient({children,}: {children: React.ReactNode;}) {
    
  const [showTransitionComponent, setShowTransitionComponent] = useState(true);
  const [isContentHidden, setIsContentHidden] = useState(true);

  return (
    <html lang="en" className="font-geist-sans antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <DevToolsBlocker>
          {showTransitionComponent && (
            <PageTransition2
              onCenter={() => setIsContentHidden(false)}
              onComplete={() => setShowTransitionComponent(false)}
            />
          )}

          <div
            className={
              isContentHidden
                ? "invisible opacity-0"
                : "visible opacity-100"
            }
          >
            <AuthProvider>
              <AudioProvider>{children}</AudioProvider>
            </AuthProvider>
          </div>
        </DevToolsBlocker>
      </body>
    </html>
  );
}
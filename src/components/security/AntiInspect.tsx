"use client";

import { useEffect, useState } from "react";

export default function AntiInspect({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Disable right click
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable shortcuts
    const disableShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl+Shift+I/J/C
      if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
      }

      // Ctrl+U
      if (e.ctrlKey && key === "u") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableShortcuts);

    // Detect DevTools
    const threshold = 160;

    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;

      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        setBlocked(true);

        // Optional:
        document.body.innerHTML = "";
      } else {
        setBlocked(false);
      }
    };

    const interval = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);

      document.removeEventListener("keydown", disableShortcuts);

      clearInterval(interval);
    };
  }, []);

  if (blocked) {
    return (
      <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Access Blocked</h1>

          <p className="mt-4 text-neutral-300">Developer tools detected.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

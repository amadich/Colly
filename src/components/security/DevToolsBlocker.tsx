"use client";

import { useEffect, useRef } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function DevToolsBlocker({
  children,
}: {
  children: React.ReactNode;
}) {
  const triggered = useRef(false);

  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const REDIRECT_URL = "https://demo.colly.amadich.tn";

    const destroyApp = async () => {
      if (triggered.current) return;

      triggered.current = true;

      try {
        /**
         * USE YOUR ZUSTAND LOGOUT
         * THIS CALLS YOUR BACKEND
         * AND REMOVES HTTPONLY COOKIE
         */
        try {
          await logout();
        } catch (error) {
          console.error("Logout Error:", error);
        }

        /**
         * CLEAR LOCAL STORAGE
         */
        localStorage.clear();

        /**
         * CLEAR SESSION STORAGE
         */
        sessionStorage.clear();

        /**
         * CLEAR NON HTTPONLY COOKIES
         */
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");

          const name =
            eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

          document.cookie = `
            ${name}=;
            expires=Thu, 01 Jan 1970 00:00:00 GMT;
            path=/;
          `;
        });

        /**
         * CLEAR INDEXED DB
         */
        if ("indexedDB" in window) {
          const databases = await indexedDB.databases?.();

          databases?.forEach((db) => {
            if (db.name) {
              indexedDB.deleteDatabase(db.name);
            }
          });
        }

        /**
         * CLEAR CACHE STORAGE
         */
        if ("caches" in window) {
          const keys = await caches.keys();

          await Promise.all(keys.map((key) => caches.delete(key)));
        }

        /**
         * REMOVE SERVICE WORKERS
         */
        if ("serviceWorker" in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();

          for (const registration of registrations) {
            await registration.unregister();
          }
        }
      } catch (e) {
        console.error(e);
      }

      /**
       * REMOVE PAGE CONTENT
       */
      document.documentElement.innerHTML = `
        <head>
          <title>Blocked</title>

          <style>
            html,
            body {
              margin: 0;
              width: 100%;
              height: 100%;
              background: white;
              overflow: hidden;
            }
          </style>
        </head>

        <body></body>
      `;

      /**
       * REDIRECT
       */
      window.location.replace(REDIRECT_URL);
    };

    /**
     * DEVTOOLS DETECTION
     */
    const threshold = 160;

    const detectDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;

      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        destroyApp();
      }
    };

    const interval = setInterval(detectDevTools, 500);

    /**
     * DISABLE RIGHT CLICK MENU
     * (do NOT destroy app)
     */
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    /**
     * DISABLE SHORTCUTS
     */
    document.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      const blocked =
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.metaKey && e.altKey && key === "i") || // Safari
        (e.ctrlKey && key === "u");

      if (blocked) {
        e.preventDefault();
        destroyApp();
      }
    });

    /**
     * CONSOLE DETECTION
     */
    const devtoolsDetector = new Image();

    Object.defineProperty(devtoolsDetector, "id", {
      get() {
        destroyApp();
        return "";
      },
    });

    const consoleInterval = setInterval(() => {
      console.log(devtoolsDetector);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(consoleInterval);
    };
  }, [logout]);

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export default function AuthProvider({children,}: {children: React.ReactNode;}) {

  const fetchUser = useAuthStore((state) => state.fetchUser);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) {
      fetchUser();
    }
  }, [hydrated, fetchUser]);

  return children;
}

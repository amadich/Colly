"use client";

import { useEffect, useState } from "react";

import ActiveRooms, {
  ActiveRoom,
} from "@/features/chat/components/ActiveRooms";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<ActiveRoom[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // LOAD ROOMS
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms`,
          {
            credentials: "include",
          },
        );

        // PREVENT JSON CRASH
        const text = await response.text();

        if (!text) {
          setRooms([]);
          setLoading(false);
          return;
        }

        let data: ActiveRoom[];

        try {
          data = JSON.parse(text);
        } catch {
          console.error(text);

          throw new Error("Server did not return JSON");
        }

        setRooms(data);
      } catch (err) {
        console.error(err);

        setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // LOADING
  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-5xl font-black">Loading Rooms...</h1>
      </main>
    );
  }

  // ERROR
  if (error) {
    return (
      <main className="p-10">
        <div
          className="
            border-4
            border-red-500
            bg-red-100
            rounded-3xl
            p-8
          "
        >
          <h1 className="text-4xl font-black mb-4">Error</h1>

          <p className="text-xl">{error}</p>
        </div>
      </main>
    );
  }

  // PAGE
  return (
    <main className="p-10">
      <ActiveRooms rooms={rooms} />
    </main>
  );
}

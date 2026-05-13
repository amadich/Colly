import HomeButton from "@/components/customs/HomeButton";

export default function ChatRoomLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="select-none">
        <HomeButton />
        {children}
      </main>
    </>
  );
}

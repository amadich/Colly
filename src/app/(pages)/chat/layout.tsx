import UserStatus from "@/components/modals/UserStatus";

export default function ChatRoomLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserStatus />
      <main className="select-none">

      {children}

      </main>
    </>
  );
}

import UserStatus from "@/components/modals/UserStatus";

export default function ChatRoomLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserStatus />
      {children}
    </>
  );
}

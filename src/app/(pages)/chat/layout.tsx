export default function ChatRoomLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="select-none">{children}</main>
    </>
  );
}

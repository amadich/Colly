export default function CreateRoomLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <main className="select-none">
            {children}
        </main>
    </>
  );
}

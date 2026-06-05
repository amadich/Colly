export default function RoomsPageLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <main className="select-none">
            {children}
        </main>
    </>
  );
}

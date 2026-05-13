import HomeButton from "@/components/customs/HomeButton";

export default function RoomsPageLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <main className="select-none">
            <HomeButton />
            {children}
        </main>
    </>
  );
}

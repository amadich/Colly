import Navbar from "@/features/home/components/Navbar";

export default function CreateRoomLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
       
        <main className="select-none">
            <Navbar />
            {children}
        </main>
    </>
  );
}

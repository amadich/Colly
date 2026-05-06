import Hero from "@/features/home/components/Hero";
import Navbar from "@/features/home/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-6">
        <Hero />
      </div>
    </>
  )
}

import HomeButton from "@/components/customs/HomeButton";
import FriendsList from "@/features/friends/FriendsList";
import Navbar from "@/features/home/components/Navbar";


export default function FriendsPage() {
  return (
    <main className="max-w-3xl mx-auto py-10">
      <Navbar />
      <FriendsList />
      <HomeButton />
    </main>
  );
}
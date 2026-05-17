import { apiFetch } from "@/lib/api";

export async function sendFriendRequest(receiverId: string) {
  return apiFetch<void>(`/friends/request/${receiverId}`, {
    method: "POST",
  });
}
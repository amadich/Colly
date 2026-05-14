import { User } from "../types/user.types";

export async function searchUsers(
  query: string,
): Promise<User[]> {

  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/search?q=${query}`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search users");
  }

  return response.json();
}
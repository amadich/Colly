export async function uploadFile(file: File) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}
export async function uploadFile(file: File, bucket = "colly",) {

  const formData = new FormData();

  formData.append("file", file);

  formData.append("bucket", bucket);

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
"use server";

export async function getChatGbtResponse(prevState: any, formData: FormData) {
  const response = await fetch(
    "https://resume-backend-git-main-cheangmings-projects-44b3fb7a.vercel.app/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openaiPrompt: formData.get("openaiPrompt") as string,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch response from ChatGPT");
  }

  const data = await response.json();
  return data.message;
}

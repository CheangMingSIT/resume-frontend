"use server";

export async function getChatGbtResponse(userMsg: string): Promise<string> {
  const response = await fetch("http://localhost:8888/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ openaiPrompt: userMsg }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from ChatGPT");
  }

  const data = await response.json();
  return data.message;
}

"use client";
import { useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";

export default function Home() {
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "bot" }[]
  >([]);
  const [textarea, setTextArea] = useState("");
  const [nextId, setNextId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to simulate bot response
  const getBotReply = (userMessage: string) => {
    return `You said: "${userMessage}". I am a bot! 🤖`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textarea.trim()) return;
    setMessages([
      ...messages,
      { id: nextId, text: textarea.trim(), sender: "user" as const },
    ]);
    setNextId((prev) => prev + 1);
    setTextArea("");

    setTimeout(() => {
      const botMessage = {
        id: nextId + 1,
        text: getBotReply(textarea),
        sender: "bot" as const,
      };
      setMessages((prev) => [...prev, botMessage]);
      setNextId((prev) => prev + 1);
    }, 1000); // Simulated response delay
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="grid grid-cols-8 min-h-screen">
      <div className="col-span-4 col-start-3 flex flex-col h-screen">
        <h1 className="bg-grey-900 text-white text-center py-4 font-bold text-lg md:text-2xl">
          Chat
        </h1>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl w-fit ${
                  msg.sender === "user"
                    ? "p-4 max-w-[75%] bg-indigo-800 text-white"
                    : "p-4 max-w-[100%] bg-stone-900 text-white"
                }`}
              >
                <p className="text-xl">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 dark:bg-grey-900 shadow-md">
          <form className="relative" onSubmit={handleSendMessage}>
            <textarea
              className="w-full h-30 p-3 border border-stone-700 rounded-3xl dark:bg-stone-900 dark:text-white resize-none focus:outline-none focus:ring-0 text-xl"
              placeholder="Type a message..."
              value={textarea}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              onChange={(e) => setTextArea(e.target.value)}
            />
            <button
              className="absolute bottom-3 right-3 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
              type="submit"
            >
              <VscSend className="text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

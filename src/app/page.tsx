"use client";
import { getChatGbtResponse } from "@/services/chatgbt.api";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { VscSend } from "react-icons/vsc";
import { MessageBubble } from "./component/message-bubble";

export default function Home() {
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "bot" }[]
  >([]);
  const [textarea, setTextArea] = useState("");
  const [nextId, setNextId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use `useActionState` with the correct function format
  const [response, formAction, isPending] = useActionState<string, FormData>(
    getChatGbtResponse,
    ""
  );

  useEffect(() => {
    if (response) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: nextId, text: response, sender: "bot" },
      ]);
      setNextId((prev) => prev + 1);
    }
  }, [response]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textarea.trim()) return;

    // Add user message to state
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: nextId, text: textarea.trim(), sender: "user" },
    ]);
    setNextId((prev) => prev + 1);

    // Create formData
    const formData = new FormData();
    formData.append("openaiPrompt", textarea);

    // Ensure formAction is called inside startTransition
    startTransition(() => {
      formAction(formData);
    });

    setTextArea(""); // Clear input
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="grid grid-cols-8 min-h-screen">
      <div className="col-span-4 col-start-3 flex flex-col h-screen">
        <h1 className="bg-grey-900 text-white text-center py-4 font-bold text-lg md:text-xl">
          Chat
        </h1>
        {/* Display messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))}

          {/* Show "Thinking..." when waiting for a response */}
          {isPending && <p className="text-gray-500 italic">Thinking...</p>}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 dark:bg-grey-900 shadow-md">
          <form className="relative" onSubmit={handleSendMessage}>
            <textarea
              className="w-full h-30 p-3 border border-stone-700 rounded-3xl dark:bg-stone-900 dark:text-white resize-none focus:outline-none focus:ring-0 text-md"
              placeholder="Type a message..."
              value={textarea}
              name="openaiPrompt"
              onChange={(e) => setTextArea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <button
              className="absolute bottom-3 right-3 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
              type="submit"
              disabled={isPending} // Disable button while API is processing
            >
              <VscSend className="text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

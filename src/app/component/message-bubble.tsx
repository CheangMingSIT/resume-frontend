export function MessageBubble({
  text,
  sender,
}: Readonly<{
  text: string;
  sender: "user" | "bot";
}>) {
  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-2xl w-fit ${
          sender === "user"
            ? "p-4 max-w-[75%] bg-indigo-800 text-white"
            : "p-4 max-w-[100%] bg-stone-900 text-white"
        }`}
      >
        <p className="text-xl">{text}</p>
      </div>
    </div>
  );
}

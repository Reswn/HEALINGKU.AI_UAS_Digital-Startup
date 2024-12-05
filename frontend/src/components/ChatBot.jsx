import { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      text: "Hai, saya ingin merencanakan liburan, ada rekomendasi destinasi menarik?",
    },
    {
      id: 2,
      sender: "bot",
      text: "Tentu! Untuk liburan kali ini, apakah Anda lebih tertarik dengan destinasi pantai, pegunungan, atau kota dengan banyak atraksi wisata?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "user", text: input },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 mb-2 rounded-lg ${
              message.sender === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <span
              className={
                message.sender === "user" ? "text-blue-700" : "text-gray-700"
              }
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

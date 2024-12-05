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
    <div className="flex h-full">
      <div className="flex flex-col flex-grow p-4 bg-white rounded-lg shadow-md">
        <div className="flex-1 overflow-y-auto mb-4 bg-gray-100 p-4 rounded-lg">
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
      <div className="w-1/4 p-4 bg-gray-200 rounded-lg shadow-md ml-4">
        <h2 className="text-center font-bold mb-4">Chat History</h2>
        <div className="bg-white p-2 rounded-lg shadow">
          <h3 className="font-bold">Destinasi Ke Kota Bandung</h3>
          <p className="text-sm text-gray-600">
            Rekomendasi destinasi menarik di Bandung...
          </p>
        </div>
        {/* Tambahkan lebih banyak riwayat chat di sini */}
      </div>
    </div>
  );
};

export default ChatBot;

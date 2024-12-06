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

  // Function to call API
  const fetchBotResponse = async (userInput) => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC3ZoyHsuDXtI3ztQSdKG43TqgNDrhyzTs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text: userInput, // Replace 'message' with the correct field 'text' inside 'prompt'
            },
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Log the full response
      return data.generations[0].text; // Adjust this based on actual response structure
    } catch (error) {
      console.error("Error fetching API:", error);
      return "Maaf, terjadi kesalahan saat memproses permintaan Anda.";
    }
  };

  // Function to send message
  const handleSend = async () => {
    if (input.trim() !== "") {
      // Add user message to list
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "user", text: input },
      ]);

      // Reset input
      const userInput = input;
      setInput("");

      // Get response from API
      const botReply = await fetchBotResponse(userInput);

      // Add bot response to message list
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: "bot", text: botReply },
      ]);
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

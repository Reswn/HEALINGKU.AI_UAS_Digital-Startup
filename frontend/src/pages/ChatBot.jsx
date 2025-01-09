import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { AiOutlineArrowUp } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

const genAI = new GoogleGenerativeAI("AIzaSyCT_WZZS2lK4oJTSszeVxRk_cMiRmn_b5Q");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State untuk animasi mengetik

  // Function to call API
  const fetchBotResponse = async (userInput) => {
    try {
      const result = await model.generateContent(userInput);
      return result.response.text(); // Ensure proper access to the response
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

      // Show typing animation
      setIsTyping(true);

      // Get response from API
      const botReply = await fetchBotResponse(userInput);

      // Add bot response to message list
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: "bot", text: botReply },
      ]);

      // Hide typing animation
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Bagian Tanya AI */}
      <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md w-3/4 ml-2">
        <div className="text-center font-bold text-2xl text-blue-500">
          HEALINGKU.AI <img src={logo} className="inline-block h-8 w-8 ml-2" />
        </div>
        <div className="text-center text-lg mb-6 text-gray-600">
          Bagaimana rencana liburan kamu?
        </div>
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 mb-2 flex ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Lingkaran Profil */}
              {/* Lingkaran Profil */}
              <div
                className={`w-8 h-8 rounded-full overflow-hidden bg-gray-300 ${
                  message.sender === "user" ? "ml-2" : "mr-2"
                }`}
              >
                {message.sender === "user" ? (
                  <FaUserCircle className="text-blue-500 text-6xl w-full h-full" />
                ) : (
                  <FaRobot className="text-blue-500 text-5xl w-full h-full" />
                )}
              </div>

              {/* Pesan Chat */}
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-300 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {message.sender === "bot" ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}

          {/* Animasi "Bot sedang mengetik" */}
          {isTyping && (
            <div className="flex items-center p-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-2">
                <FaRobot className="text-blue-600 text-5xl w-full h-full" />
              </div>
              <div className="flex items-center rounded-lg bg-gray-200 p-2">
                <span className="text-gray-700 italic">sedang mengetik...</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          {/* Ganti tombol Send dengan ikon panah ke atas */}
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            <AiOutlineArrowUp className="text-xl" />
          </button>
        </div>
      </div>
      {/* Sidebar untuk riwayat chat */}
      <div className="w-1/4 bg-blue-200 p-4 h-fullrounded-lg shadow-md border-r-2 ml-3">
        <h2 className="text-center font-bold text-xl text-gray-700 mb-4">
          Riwayat Chat
        </h2>
        <div className="overflow-y-auto">
          {messages
            .filter((message) => message.sender === "user") // Filter hanya pesan dari pengguna
            .map((message) => (
              <div
                key={message.id}
                className="p-2 rounded-lg bg-blue-400 self-end mb-2" // Tampilan pesan pengguna
              >
                <span className="text-blue-900 ">{message.text}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

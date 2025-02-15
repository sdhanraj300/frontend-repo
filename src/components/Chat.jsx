"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// const socket = io("http://localhost:1337", {
//   transports: ["websocket"], // Ensures WebSocket is used
// });
const socket = io("https://backend-repo-production-8597.up.railway.app", {
  transports: ["websocket"], // Ensures WebSocket is used
});

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Receive message from server
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, `Server: ${msg}`]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, `You: ${input}`]); // Show user message
      socket.emit("send-message", input); // Send message to server
      setInput(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-center mb-4">
          Chat with Server
        </h2>

        <div className="flex-1 h-80 overflow-y-auto border border-gray-300 rounded-lg p-2 mb-4 bg-gray-50 flex flex-col">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`p-2 my-1 rounded-md max-w-[75%] break-words ${
                msg.startsWith("You:")
                  ? "bg-blue-100 text-blue-700 self-end"
                  : "bg-green-100 text-green-700 self-start"
              }`}
            >
              {msg}
            </p>
          ))}
        </div>

        <div className="flex items-center space-x-2 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

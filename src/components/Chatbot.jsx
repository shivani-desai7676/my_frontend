import { useState } from "react";
import "./chatbot.css";

export default function Chatbot() {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 Welcome to SnapShare! Ask me anything." }
  ]);

  const [input, setInput] = useState("");

  const getBotReply = (msg) => {

    const message = msg.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello 😊 How are you? How can I help you?";
    }

    if (message.includes("upload")) {
      return "To upload a file, login and click the Upload button in your dashboard.";
    }

    if (message.includes("share") || message.includes("generate link")) {
      return "After uploading a file you can click Generate Link to share it.";
    }

    if (message.includes("download")) {
      return "Open the shared link and click download to get the file.";
    }

    if (message.includes("snapshare")) {
      return "SnapShare is a fast and secure file sharing platform.";
    }

    return "Sorry, I didn't understand. Please ask something related to SnapShare.";
  };

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    const botReply = {
      sender: "bot",
      text: getBotReply(input)
    };

    setMessages([...messages, userMessage, botReply]);

    setInput("");
  };

  return (
    <>

      {/* CHAT ICON */}
      {!isOpen && (
        <div className="chat-icon" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="chatbot-box">

          <div className="chat-header">
            SnapShare Assistant
            <span
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </span>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>
      )}

    </>
  );
}

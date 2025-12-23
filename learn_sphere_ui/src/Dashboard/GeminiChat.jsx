import { useState } from "react";
import "./GeminiChat.css";

const GeminiChat = ({ onClose }) => {

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    if (!prompt.trim()) 
      return;
    const userMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setPrompt("");

    try {
      const res = await fetch("http://localhost:8080/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: prompt,
      });
      const aiText = await res.text();
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } 
    catch {
      setMessages((prev) => [ ...prev,{ role: "ai", text: "⚠️ Gemini service unavailable" },]);
    }
    setLoading(false);
  };

  return (
    <div className="gemini-box">
      <div className="chat-header">
        <h4>🤖 LearnSphere AI Assistant</h4>
        <span className="close-btn" onClick={onClose}>✖</span>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-msg ai">Typing...</div>}
      </div>

      <div className="chat-input">
        <textarea
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={askGemini}>Send</button>
      </div>
    </div>
  );
};

export default GeminiChat;

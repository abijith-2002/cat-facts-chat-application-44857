import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// PUBLIC_INTERFACE
/**
 * App Component: A single-page chat interface using the Nord color palette.
 * Features:
 * - Message input and history display
 * - Auto-response with random cat facts
 * - Responsive and minimalistic
 * - Auto-scroll to latest message
 * - Uses Inter font and environment variable for API URL
 */
function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I will send you a fun cat fact every time you send a message 😺",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Insert Inter font into head
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css?family=Inter:400,500,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Fetch the catfact API URL from the environment (.env) or use default
  const CATFACT_API =
    (typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_CATFACT_API) ||
    "https://catfact.ninja/fact";

  // PUBLIC_INTERFACE
  /** Sends user's message and automatically gets a cat fact response. */
  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      sender: "user",
      text: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Fetch a cat fact
      const resp = await fetch(CATFACT_API);
      if (!resp.ok) throw new Error("Failed to fetch cat fact");
      const data = await resp.json();
      const fact = data.fact || "Here's a cat fact!";
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: fact,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't fetch a cat fact right now.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle 'Enter' key (without shift) for sending message.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <div
      className="chat-root"
      style={{
        maxWidth: "100vw",
        minWidth: 0,
        width: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <header className="chat-header" style={{ maxWidth: "100vw", boxSizing: "border-box", overflowX: "auto" }}>
        <span role="img" aria-label="cat" className="logo">
          🐾
        </span>
        Cat Facts Chat
      </header>
      {/* Chat layout now splits: chat-window is above, chat-input-row is always fixed at bottom */}
      <div className="chat-content" style={{ maxWidth: "100vw", width: "100%", minWidth: 0 }}>
        <main
          className="chat-window"
          tabIndex={0}
          aria-label="chat history"
          style={{
            maxWidth: "100vw",
            minWidth: 0,
            width: "100%",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === "user"
                  ? "msg-bubble user-bubble"
                  : "msg-bubble bot-bubble"
              }
              aria-label={msg.sender === "user" ? "User message" : "Bot message"}
              style={{
                maxWidth: "96vw",
                minWidth: 0,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                boxSizing: "border-box",
              }}
            >
              <span className="msg-text">{msg.text}</span>
              <span className="msg-time">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </main>
      </div>
      <form
        className="chat-input-row"
        style={{
          maxWidth: "100vw",
          minWidth: 0,
          width: "100vw",
          boxSizing: "border-box",
        }}
        autoComplete="off"
        onSubmit={handleSend}
      >
        <textarea
          className="chat-input"
          name="chat"
          required
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={loading}
          style={{
            maxWidth: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        />
        <button
          className="chat-send"
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
        >
          {loading ? (
            <span className="loader" />
          ) : (
            <span aria-hidden="true">➤</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default App;

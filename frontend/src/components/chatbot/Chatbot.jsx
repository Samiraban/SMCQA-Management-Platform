import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  ChevronDown,
  Send,
  Phone,
  Mail,
} from "lucide-react";
import { createChatMessage } from "../../lib/api.js";
import { useCollection } from "../../lib/useRealtime.js";
import "./Chatbot.css";

const QUICK_REPLIES = [
  "I want to apply for a job",
  "I need staffing for my business",
  "What services do you offer?",
  "Talk to a human agent",
];

function botReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("job") || lower.includes("apply") || lower.includes("career")) {
    return "You can view and apply to open roles on our Careers page. Want me to take you there?";
  }
  if (lower.includes("staff") || lower.includes("hire") || lower.includes("business")) {
    return "We provide manpower across hospitality, construction, healthcare, office management, security and agriculture. Tell me your industry and I'll connect you with the right consultant.";
  }
  if (lower.includes("service")) {
    return "Our core services: Hospitality, Construction, Healthcare, Office Management, Security & Guarding, and Agriculture & Farming staffing.";
  }
  if (lower.includes("human") || lower.includes("agent") || lower.includes("call")) {
    return "Sure — call us at +974 6631 0125 or email info@smcqa.com and our team will pick this up right away.";
  }
  return "Thanks for reaching out! A member of our team will follow up shortly. In the meantime, feel free to browse our Services or Careers pages.";
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("menu"); // menu | chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  // live-syncs with the admin panel's chat log in real time
  useCollection("chats");

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text) {
    if (!text.trim()) return;
    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    createChatMessage(userMsg); // persisted + visible live in admin

    setTimeout(() => {
      const reply = { from: "bot", text: botReply(text) };
      setMessages((prev) => [...prev, reply]);
      createChatMessage(reply);
    }, 500);

    setInput("");
    setStage("chat");
  }

  function emailUs(e) {
    // Let the mailto: link still try to open the user's default mail app —
    // we don't preventDefault. But since that silently does nothing on
    // machines with no mail client configured, we also copy the address
    // to the clipboard and confirm it right in the chat, so there's always
    // a way to get in touch either way.
    const address = "info@smcqa.com";

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(address).catch(() => {});
    }

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: `Opening your email app now — if nothing happens, our email is ${address}. I've copied it to your clipboard so you can paste it anywhere.`,
      },
    ]);
    setStage("chat");
  }

  return (
    <div className="chatbot-widget">
      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-avatar">S</div>
            <div className="chatbot-header-text">
              <strong>Have a question?</strong>
            </div>
            <button
              className="chatbot-collapse"
              onClick={() => setOpen(false)}
              aria-label="Minimize chat"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="chatbot-body">
            {stage === "menu" && messages.length === 0 && (
              <>
                <div className="chatbot-intro">
                  <div className="chatbot-avatar small">S</div>
                  <p>Choose a chat option to get started.</p>
                </div>

                <div className="chatbot-options">
                  {QUICK_REPLIES.map((option) => (
                    <button key={option} onClick={() => send(option)}>
                      {option}
                    </button>
                  ))}
                </div>

                <div className="chatbot-direct">
                  <a href="tel:+97466310125">
                    <Phone size={14} /> Call us
                  </a>
                  <a href="mailto:info@smcqa.com" onClick={emailUs}>
                    <Mail size={14} /> Email us
                  </a>
                </div>
              </>
            )}

            {messages.length > 0 && (
              <div className="chatbot-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`chatbot-bubble ${m.from}`}>
                    {m.text}
                  </div>
                ))}
                <div ref={endRef} />
              </div>
            )}
          </div>

          <form
            className="chatbot-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        className="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

export default Chatbot;
import React, { useState, useEffect, useRef } from "react";
import chatbotData from "../lib/dummyReq.json";

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const BotIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path d="M12 11V7M9 7h6M7 15h.01M17 15h.01" />
  </svg>
);

const GREETING = {
  question: null,
  answer: "Hey, I'm Zenith — Elevate's assistant. Ask me anything about coaches, ranks, sessions, or how the platform works. I got you. 🎯",
  isGreeting: true,
};

const ChatBot = ({ onClose }) => {
  const [question,    setQuestion]    = useState("");
  const [loading,     setLoading]     = useState(false);
  const [chatHistory, setChatHistory] = useState([GREETING]);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const findAnswer = (userQuestion) => {
    const lowerCaseQuestion = userQuestion.toLowerCase();
    const matchedEntries = chatbotData.filter((entry) =>
      entry.tokens.some((token) => lowerCaseQuestion.includes(token.toLowerCase()))
    );
    if (matchedEntries.length === 0) {
      return "I don't have a specific answer for that — try asking about coaches, ranks, sessions, or pricing.";
    }
    const bestMatch = matchedEntries.reduce((best, current) => {
      const bestScore    = best.tokens.filter((t) => lowerCaseQuestion.includes(t.toLowerCase())).length;
      const currentScore = current.tokens.filter((t) => lowerCaseQuestion.includes(t.toLowerCase())).length;
      return currentScore > bestScore ? current : best;
    });
    return bestMatch.response;
  };

  const askAI = async () => {
    if (!question.trim() || loading) return;
    const userQ = question.trim();
    setLoading(true);
    setQuestion("");

    // Optimistically add user bubble with loading state
    setChatHistory((prev) => [...prev, { question: userQ, answer: null }]);

    await new Promise((resolve) => setTimeout(resolve, 900));
    const answerText = findAnswer(userQ);

    setChatHistory((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { question: userQ, answer: answerText };
      return updated;
    });
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  return (
    <div
      className="elv-chat-shell fixed bottom-6 right-6 z-[9999] flex max-h-[calc(100vh-48px)] w-[360px] flex-col overflow-hidden rounded-[14px] border border-white/[0.06] bg-[#0B1017] font-sans antialiased"
    >
      {/* Grain overlay */}
      <div
        className="elv-grain-bg pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
      />

      {/* ── Header ── */}
      <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/[0.05] shrink-0">
        {/* Top accent */}
        <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/50 to-transparent" />

        <div className="flex items-center gap-2.5">
          {/* Bot icon badge */}
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#A01E2E]/15 text-[#A01E2E] border border-[#A01E2E]/20">
            <BotIcon />
          </div>
          <div>
            <p className="font-['Syne',sans-serif] font-extrabold text-[13px] text-white tracking-tight leading-none">
              Zenith
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.14em] text-white/30 font-semibold">Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/40 hover:text-white/70 transition-all duration-200 border border-white/[0.06]"
        >
          <CloseIcon />
        </button>
      </div>

      {/* ── Chat history ── */}
      <div
        ref={chatContainerRef}
        className="elv-hide-scrollbar max-h-[calc(100vh-168px)] flex-1 space-y-4 overflow-y-auto p-4"
      >
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col gap-2.5">

            {/* User bubble */}
            {chat.question && (
              <div className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-xl rounded-br text-[12.5px] leading-relaxed text-white/85 border border-[#A01E2E]/25 bg-[#A01E2E]/20 px-3.5 py-2.5"
                >
                  {chat.question}
                </div>
              </div>
            )}

            {/* Bot bubble */}
            {chat.answer !== null ? (
              <div className="flex justify-start items-end gap-2">
                <div
                  className="mb-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#A01E2E]/20 bg-[#A01E2E]/[0.12]"
                >
                  <BotIcon />
                </div>
                <div
                  className="max-w-[80%] rounded-xl rounded-bl border border-white/[0.06] bg-white/[0.025] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-white/65"
                >
                  {chat.answer}
                </div>
              </div>
            ) : (
              /* Typing indicator */
              <div className="flex justify-start items-end gap-2">
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#A01E2E]/20 bg-[#A01E2E]/[0.12]"
                >
                  <BotIcon />
                </div>
                <div
                  className="flex items-center gap-1.5 rounded-xl rounded-bl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full bg-white/30 animate-bounce"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* ── Input row ── */}
      <div
        className="flex shrink-0 items-center gap-2 border-t border-white/[0.05] bg-[#0B1017] px-3 py-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything…"
          className="flex-1 bg-white/[0.035] border border-white/[0.07] rounded-lg px-3.5 py-2.5 text-[12.5px] text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-all duration-200"
        />
        <button
          onClick={askAI}
          disabled={loading || !question.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#A01E2E] transition-all duration-200 hover:bg-[#8E1C2A] disabled:opacity-30"
        >
          <SendIcon />
        </button>
      </div>

    </div>
  );
};

export default ChatBot;

import React, { useState, useEffect, useRef } from "react";
import chatbotData from "../lib/dummyReq.json";

const ChatBot = ({ onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom when chatHistory updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const findAnswer = (userQuestion) => {
    const lowerCaseQuestion = userQuestion.toLowerCase();

    // Find the best matching question in the chatbot data
    const matchedEntries = chatbotData.filter((entry) =>
      entry.tokens.some((token) => lowerCaseQuestion.includes(token.toLowerCase()))
    );

    // If no match is found, return a default response
    if (matchedEntries.length === 0) {
      return "Sorry, I don't have an answer for that. Please try asking something else.";
    }

    // Find the entry with the most matching tokens
    const bestMatch = matchedEntries.reduce((best, current) => {
      const bestScore = best.tokens.filter((token) =>
        lowerCaseQuestion.includes(token.toLowerCase())
      ).length;
      const currentScore = current.tokens.filter((token) =>
        lowerCaseQuestion.includes(token.toLowerCase())
      ).length;
      return currentScore > bestScore ? current : best;
    });

    return bestMatch.response;
  };

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    // Simulate a delay for "typing" effect
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find the answer from the JSON data
    const answerText = findAnswer(question);

    // Update chat history
    setChatHistory([...chatHistory, { question, answer: answerText }]);
    setAnswer(answerText);

    setLoading(false);
    setQuestion("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line (optional if using textarea)
      askAI(); // Send the message
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-zinc-900 text-white rounded-lg shadow-xl p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">🤖 Zenith</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition cursor-pointer">✖</button>
      </div>

      <div
        ref={chatContainerRef}
        className="h-[60vh] overflow-y-auto border-b border-gray-600 pb-2 mb-2 space-y-2 p-2"
      >
        {chatHistory.map((chat, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-end">
              <p className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
                <b>You:</b> {chat.question}
              </p>
            </div>
            <div className="mt-2 flex justify-start">
              <p className="bg-gray-800 text-green-300 rounded-lg px-3 py-2 max-w-xs">
                <b>Zenith:</b> {chat.answer}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <p className="bg-gray-800 text-gray-400 rounded-lg px-3 py-2 max-w-xs animate-pulse">
              AI is typing...
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 p-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={askAI}
          className="px-4 py-2 rounded-md transition font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
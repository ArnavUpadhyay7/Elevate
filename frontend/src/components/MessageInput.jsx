import { useState } from "react";
import { Send } from "lucide-react";
import { createSocketConnection } from "../lib/socket";

const socket = createSocketConnection();

const MessageInput = ({ role, senderId, receiverId }) => {
  const [text, setText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!socket.connected) {
      console.log("Socket not connected");
      return;
    }

    const senderType = role === "player" ? "player" : "coach";
    const receiverType = role === "coach" ? "coach" : "player";

    socket.emit("sendMessage", {
      senderType,
      senderId,
      receiverType,
      receiverId,
      text,
    });

    setText("");
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
import { useState } from "react";
import { Send } from "lucide-react";
import { createSocketConnection } from "../lib/socket";

const MessageInput = ({role, senderId, receiverId}) => {
  const [text, setText] = useState("");
  const socket = createSocketConnection();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const senderType = (role==="player") ? "player" : "coach"; 
    const receiverType = (role==="coach") ? "coach" : "player"; 

    const message = {
      senderType,
      senderId,
      receiverType,
      receiverId,
      text,
      roomId: [senderId, receiverId].sort().join("_"), 
    };
    socket.emit("sendMessage", message);
    setText("");
  };

  return (
    <div className="p-4 w-full">

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
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
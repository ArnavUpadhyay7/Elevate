import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { coachStore } from "../store/authStore";
import { formatTime } from "../lib/formatTime";
import { createSocketConnection } from "../lib/socket";

const CoachChatContainer = () => {
  const { selectedUser } = useChatStore();
  const [roomMessages, setRoomMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const coach = coachStore((state) => state.coach);

  const socketRef = useRef(null); // Store the socket instance

  useEffect(() => {
    if (!coach || !selectedUser) return;

    // Initialize the socket connection once
    if (!socketRef.current) {
      socketRef.current = createSocketConnection();

      // Handle incoming messages
      socketRef.current.on("messageRecieved", ({ text, senderId, createdAt }) => {
        const roomId = [coach?._id, selectedUser?._id].sort().join("_");
        setRoomMessages((prev) => {
          const updatedMessages = {
            ...prev,
            [roomId]: [...(prev[roomId] || []), { text, senderId, createdAt }],
          };

          // Update messages for the currently visible room
          setMessages(updatedMessages[roomId]);
          return updatedMessages;
        });
      });
    }

    // Join the specific chat room
    const roomId = [coach?._id, selectedUser?._id].sort().join("_");
    socketRef.current.emit("joinChat", {
      username: coach?.fullname,
      senderId: coach?._id,
      recieverId: selectedUser?._id,
    });

    return () => {
      // Disconnect socket on component unmount
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [coach, selectedUser]);

  // Update messages when the selectedUser changes
  useEffect(() => {
    if (!coach || !selectedUser) return;

    const roomId = [coach?._id, selectedUser?._id].sort().join("_");
    setMessages(roomMessages[roomId] || []);
  }, [selectedUser, coach, roomMessages]);
  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* Messages Container */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`chat ${
                message.senderId === coach?._id ? "chat-end" : "chat-start"
              }`}
            >
              {/* Profile Picture */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === coach?._id
                        ? coach.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                        : selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="chat-bubble flex flex-col">
                {<p>{message.text}</p>}
              </div>

              {/* Message Footer - Time */}
              <div className="chat-footer mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatTime(message.createdAt)}
                </time>
              </div>

            </div>
          ))}
        </div>

      <MessageInput senderId={coach?._id} recieverId={selectedUser?._id}/>
    </div>
  );
};

export default CoachChatContainer;

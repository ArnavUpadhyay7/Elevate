import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { coachStore } from "../store/authStore";
import { formatTime } from "../lib/formatTime";
import { createSocketConnection } from "../lib/socket";
import { axiosInstance } from "../lib/axios";

const CoachChatContainer = () => {
  const { selectedUser } = useChatStore();
  const [roomMessages, setRoomMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const coach = coachStore((state) => state.coach);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!coach || !selectedUser) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();

      socketRef.current.on(
        "messageReceived",
        ({ text, senderId, createdAt }) => {
          const roomId = [coach?._id, selectedUser?._id].sort().join("_");
          setRoomMessages((prev) => {
            const updatedMessages = {
              ...prev,
              [roomId]: [...(prev[roomId] || []), { text, senderId, createdAt }],
            };

            setMessages((prevMessages) => {
              const newMessage = { text, senderId, createdAt };
              if (!prevMessages.some((msg) => msg.createdAt === createdAt && msg.senderId === senderId)) {
                return [...prevMessages, newMessage];
              }
              return prevMessages;
            });
            
            return updatedMessages;
          });
        }
      );
    }

    socketRef.current.emit("joinChat", {
      senderId: coach?._id,
      receiverId: selectedUser?._id,
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [coach, selectedUser]);

  useEffect(() => {
    if (!coach || !selectedUser) return;

    const roomId = [coach?._id, selectedUser?._id].sort().join("_");

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/message/${roomId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, coach]);

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
                      ? coach.profilePic ||
                        "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                      : selectedUser.profilePic ||
                        "https://cdn-icons-png.flaticon.com/128/149/149071.png"
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

        <div ref={bottomRef} />
      </div>

      <MessageInput
        role={"coach"}
        senderId={coach?._id}
        receiverId={selectedUser?._id}
      />
    </div>
  );
};

export default CoachChatContainer;

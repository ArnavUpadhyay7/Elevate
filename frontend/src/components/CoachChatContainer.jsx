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

  const socket = createSocketConnection(); // ✅ singleton socket
  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // SOCKET LOGIC
  useEffect(() => {
    if (!coach || !selectedUser) return;

    const roomId = [coach._id, selectedUser._id].sort().join("_");

    const handleJoin = () => {
      socket.emit("joinChat", {
        senderId: coach._id,
        receiverId: selectedUser._id,
      });
    };

    const handleMessage = ({ text, senderId, createdAt }) => {
      setRoomMessages((prev) => {
        const updatedMessages = {
          ...prev,
          [roomId]: [
            ...(prev[roomId] || []),
            { text, senderId, createdAt },
          ],
        };

        setMessages((prevMessages) => {
          const newMessage = { text, senderId, createdAt };

          if (
            !prevMessages.some(
              (msg) =>
                msg.createdAt === createdAt &&
                msg.senderId === senderId
            )
          ) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });

        return updatedMessages;
      });
    };

    socket.on("connect", handleJoin);
    socket.on("messageReceived", handleMessage);

    // already connected case
    if (socket.connected) handleJoin();

    return () => {
      socket.off("connect", handleJoin);
      socket.off("messageReceived", handleMessage);
    };
  }, [coach, selectedUser, socket]);

  // FETCH OLD MESSAGES
  useEffect(() => {
    if (!coach || !selectedUser) return;

    const roomId = [coach._id, selectedUser._id].sort().join("_");

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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`chat ${
              message.senderId === coach?._id
                ? "chat-end"
                : "chat-start"
            }`}
          >
            {/* Avatar */}
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

            {/* Message */}
            <div className="chat-bubble flex flex-col">
              <p>{message.text}</p>
            </div>

            {/* Time */}
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
        role="coach"
        senderId={coach?._id}
        receiverId={selectedUser?._id}
      />
    </div>
  );
};

export default CoachChatContainer;
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { coachStore, playerStore } from "../store/authStore";
import { formatTime } from "../lib/formatTime";

const ChatContainer = () => {
  const { selectedUser } = useChatStore();
  const coach = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);

  // Sample message data
  const messages = [
    {
      _id: "1",
      senderId: player ? player._id : coach._id,
      text: "Hey, how are you?",
      createdAt: new Date(),
      image: null,
    },
    {
      _id: "2",
      senderId: selectedUser._id,
      text: "I'm good, thank you! How can I help?",
      createdAt: new Date(),
      image: null,
    },
    {
      _id: "3",
      senderId: player ? player._id : coach._id,
      text: "I need some guidance on improving my aim.",
      createdAt: new Date(),
      image: null,
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages Container */}
      {player &&
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === player._id ? "chat-end" : "chat-start"
              }`}
            >
              {/* Profile Picture */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === player._id
                        ? player.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                        : selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* Message Header */}
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatTime(message.createdAt)}
                </time>
              </div>

              {/* Message Content */}
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))}
        </div>
      }

      {coach && 
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === coach._id ? "chat-end" : "chat-start"
            }`}
          >
            {/* Profile Picture */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === coach._id
                      ? coach.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                      : selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            {/* Message Header */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatTime(message.createdAt)}
              </time>
            </div>

            {/* Message Content */}
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        </div>
      }

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;

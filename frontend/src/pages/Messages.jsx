import React from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatSidebar from "../components/ChatSidebar";
import ChatContainer from "../components/ChatContainer";

const Messages = () => {

  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen w-full">

      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <ChatSidebar />
              {/* Add the ChatContainer component instead of messageSkeleton */}
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Messages;

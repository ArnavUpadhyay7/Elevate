import React from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatSidebar from "../components/ChatSidebar";
import { coachStore, playerStore } from "../store/authStore";
import PlayerChatContainer from "../components/PlayerChatContainer";
import CoachChatContainer from "../components/CoachChatContainer";

const Messages = () => {
  const { selectedUser } = useChatStore();
  const coach = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);

  return (
    <div className="min-h-screen w-full">
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center md:pt-20 pt-10 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <ChatSidebar />

              {player ? (
                selectedUser ? (
                  <PlayerChatContainer />
                ) : (
                  <NoChatSelected />
                )
              ) : coach ? (
                selectedUser ? (
                  <CoachChatContainer />
                ) : (
                  <NoChatSelected />
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

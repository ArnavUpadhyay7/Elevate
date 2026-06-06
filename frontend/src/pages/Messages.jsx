import React from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatSidebar from "../components/ChatSidebar";
import { coachStore, playerStore } from "../store/authStore";
import PlayerChatContainer from "../components/PlayerChatContainer";
import CoachChatContainer from "../components/CoachChatContainer";

const Messages = () => {
  const { selectedUser } = useChatStore();
  const coach  = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);

  return (
    <div className="w-full h-screen bg-[var(--elv-bg)] font-['DM_Sans',system-ui,sans-serif] flex items-center justify-center p-4 sm:p-6">

      {/* Grain overlay */}
      <div className="elv-grain-bg pointer-events-none fixed inset-0 z-[9997] opacity-[0.024]" />

      {/* Chat panel */}
      <div className="relative z-10 w-full max-w-6xl h-full max-h-[calc(100vh-3rem)] rounded-xl border border-white/[0.05] overflow-hidden flex">
        <ChatSidebar />

        {player ? (
          selectedUser ? <PlayerChatContainer /> : <NoChatSelected />
        ) : coach ? (
          selectedUser ? <CoachChatContainer /> : <NoChatSelected />
        ) : null}
      </div>
    </div>
  );
};

export default Messages;

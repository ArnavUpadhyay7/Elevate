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
    <div className="w-full h-screen bg-[#07090D] font-['DM_Sans',system-ui,sans-serif] flex items-center justify-center p-4 sm:p-6">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.024]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      />

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
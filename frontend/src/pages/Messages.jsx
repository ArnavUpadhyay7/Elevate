import React, { useEffect, useState } from "react";
import { coachStore, playerStore } from "../store/authStore";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import NoChatSelected from "../components/NoChatSelected";
import ChatSidebar from "../components/ChatSidebar";

const Messages = () => {
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen w-full flex items-center justify-center">
  //       <Loader className="h-8 w-8 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen w-full">

      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <ChatSidebar />

              {/* {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
              <NoChatSelected />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Messages;

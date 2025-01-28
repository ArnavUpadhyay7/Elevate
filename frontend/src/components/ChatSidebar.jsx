import { useEffect, useState } from "react";
import { coachStore, playerStore } from "../store/authStore";
import { axiosInstance } from "../lib/axios";
import { useChatStore } from "../store/useChatStore";
import { Loader, Users } from "lucide-react";

const ChatSidebar = () => {

  const { selectedUser, setSelectedUser } = useChatStore();

  const [myCoaches, setMyCoaches] = useState([]);
  const [myPlayers, setMyPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const coachX = coachStore((state) => state.coach);
  const playerX = playerStore((state) => state.player);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (playerX) {
          const coachesRes = await axiosInstance.get("/player/my-coaches");
          setMyCoaches(coachesRes.data);
        }
        if (coachX) {
          const playersRes = await axiosInstance.get("/coach/my-players");
          setMyPlayers(playersRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
          setLoading(false);
        }
    };
    fetchData();
  }, []);

  if(loading) {
    return (
      <div className="flex items-center justify-center h-full w-[25%]">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <aside className="px-2 h-full w-20 lg:w-72 border-r border-base-300 flex flex-col">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">
            {playerX ? "Coaches" : "Players"}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {playerX
          ? myCoaches.map((coach) => (
              <button
                key={coach._id}
                onClick={() => setSelectedUser(coach)}
                className={`
                w-full p-3 flex items-center gap-4
                ${selectedUser?._id === coach._id ? "bg-base-300" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={coach.profilePic}
                    alt={coach.fullname}
                    className="size-12 object-cover rounded-full"
                  />
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{coach.fullname}</div>
                </div>
              </button>
            ))
          : myPlayers.map((player) => (
              <button
                key={player._id}
                onClick={() => setSelectedUser(player)}
                className={`
                w-full p-3 flex items-center gap-4
                ${selectedUser?._id === player._id ? "bg-base-300" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={player.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
                    alt={player.fullname}
                    className="size-12 object-cover rounded-full"
                  />
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{player.fullname}</div>
                </div>
              </button>
            ))}
      </div>
    </aside>
  );
};
export default ChatSidebar;

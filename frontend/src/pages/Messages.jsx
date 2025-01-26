import React, {useEffect, useState} from "react";
import { coachStore, playerStore } from "../store/authStore";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";

const Messages = () => {
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
          console.log(playersRes.data);
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

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-8 px-14">
      
      {coachX && (
        <div>
          <h1 className="text-center text-4xl font-bold mb-8">My Players</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {myPlayers.map((player) => (
              <div key={player._id} className="bg-neutral-800 p-6 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={player.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"} className="w-12 h-12 rounded-full"/>
                  <div>
                    <h3 className="text-xl font-semibold">{player.fullname}</h3>
                    <p className="text-sm text-gray-400">{player.rank} • {player.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {playerX && (
        <div>
          <h1 className="text-center text-4xl font-bold mb-8">My Coaches</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {myCoaches.map((coach) => (
              <div key={coach._id} className="bg-neutral-800 p-6 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={coach.profilePic} className="w-12 h-12 rounded-full"/>
                  <div>
                    <h3 className="text-xl font-semibold">{coach.fullname}</h3>
                    <p className="text-sm text-gray-400">{coach.rank} • {coach.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Messages;

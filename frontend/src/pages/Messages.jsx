import React, {useEffect, useState} from "react";
import { coachStore, playerStore } from "../store/authStore";
import { axiosInstance } from "../lib/axios";

const Messages = () => {
  const [myCoaches, setMyCoaches] = useState([]);
  const [myPlayers, setMyPlayers] = useState([]);
  const coach = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (player) {
          const coachesRes = await axiosInstance.get("/player/my-coaches");
          setMyCoaches(coachesRes.data);
        }
        if (coach) {
          const playersRes = await axiosInstance.get("/coach/my-players");
          setMyPlayers(playersRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [coach, player]);

  return (
    <div className="min-h-screen w-full pt-8">
      
      {coach && (
        <div>
          <h1 className="text-center text-4xl font-bold mb-8">My Players</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {myPlayers.map((player) => (
              <div key={player._id} className="bg-neutral-800 p-6 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={player.profilePic} className="w-12 h-12 rounded-full"/>
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

      {player && (
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

import React from "react";
import { coachStore, playerStore } from "../store/authStore";

const Messages = () => {
  const coach = coachStore((state) => state.coach);
  const player = playerStore((state) => state.player);
  return (
    <div className="min-h-screen w-full pt-8">
      
      {coach && (
        <div>
          <h1 className="text-center"> My Players </h1>
          {coach.payed_player.map((player, index) => (
            <div key={index}>
              <h3 className="text-center text-3xl">{player.fullname}</h3>
            </div>
          ))}
        </div>
      )}


      {player && (
        <div>
          <h1 className="text-center"> My Coaches </h1>
          {player.payed_coach.map((coach, index) => (
            <div key={index}>
              <h3 className="text-center text-3xl">{coach.fullname}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;

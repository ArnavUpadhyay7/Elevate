import React from 'react'
import { coachStore, playerStore } from '../store/authStore';

const Messages = () => {
    const coach = coachStore((state)=>state.coach);
    const player = playerStore((state)=>state.player);
  return (
    <div>
      {coach && 
      <p>This is coach messages section</p>
      }
      {player && 
      <p>This is player messages section</p>
      }
    </div>
  )
}

export default Messages

import React from 'react'
import { coachStore, playerStore } from '../store/authStore';

const Messages = () => {
  const coach = coachStore((state)=>state.coach);
  const player = playerStore((state)=>state.player);
  return (
    <div className='bg-[#13131A] text-white min-h-screen w-full pt-8'>
      {coach && 
        <div>
          <h1 className='text-center font-semibold text-5xl'>Feature incoming</h1>
        </div>
      }
      {player && 
        <h1 className='text-center font-semibold text-5xl'>Feature incoming</h1>
      }
    </div>
  )
}

export default Messages

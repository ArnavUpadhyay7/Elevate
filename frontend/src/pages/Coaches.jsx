import React from 'react'
import CoachCard from '../components/CoachCard'

const Coaches = () => {
  return (
    <div className='bg-[#13131A] w-full'>
      
      <div className='flex flex-wrap justify-center gap-10 py-10 md:px-20'>
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      <CoachCard />
      </div>
    </div>
  )
}

export default Coaches

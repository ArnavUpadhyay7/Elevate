import React from 'react'
import { cn } from '../lib/utils'

const CoachProfileCard = () => {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-[60vh] md:h-[55vh] rounded-xl mx-auto flex flex-col justify-between p-4",
          "bg-[url(https://i.pinimg.com/736x/ac/97/d6/ac97d665a24495a6e2451bf985fa99ae.jpg)] bg-center bg-cover"
        )}>
        <div
          className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <img
            height="100"
            width="100"
            alt="Avatar"
            src="https://assets.aceternity.com/manu.png"
            className="h-10 w-10 rounded-full border-2 object-cover" />
          <div className="flex flex-col">
            <p className="font-bold text-xl text-gray-50 relative z-10">
              Radiant
            </p>
            <p className="text-sm text-gray-400">Duelists</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            Anna
          </h1>
          <p className="tracking-tight text-sm text-gray-50 relative z-10 my-4">
            Radiant player since a decade and I'll guide you till there in no time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoachProfileCard

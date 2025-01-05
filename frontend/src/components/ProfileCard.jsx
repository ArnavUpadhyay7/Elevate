import React from 'react'
import { cn } from '../lib/utils'

const ProfileCard = () => {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-[60vh] md:h-[70vh] rounded-xl shadow-xl  max-w-sm mx-auto flex flex-col justify-between p-4",
          "bg-[url(https://i.pinimg.com/1200x/6c/e2/7d/6ce27d023f1a1572298a50049fe7bbb6.jpg)] bg-center bg-cover"
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
            Arnav Upadhyay
          </h1>
          <p className="tracking-tight text-sm text-gray-50 relative z-10 my-4">
            Over 4 years of experience, with a winning streak of 12 games.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard

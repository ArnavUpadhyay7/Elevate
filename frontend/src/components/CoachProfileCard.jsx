import React from 'react'
import { cn } from '../lib/utils'

const CoachProfileCard = ({rank, role, fullname, about, profilePic}) => {
  return (
    <div className="max-w-xs w-full group/card text-zinc-300">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-[60vh] md:h-[55vh] md:w-[20vw] rounded-xl mx-auto flex flex-col justify-between p-4",
          "bg-[url(https://i.pinimg.com/736x/ac/97/d6/ac97d665a24495a6e2451bf985fa99ae.jpg)] bg-center bg-cover"
        )}>
        <div
          className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <img
            height="100"
            width="100"
            alt="Avatar"
            src={profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
            className="h-10 w-10 rounded-full border-2 object-cover" />
          <div className="flex flex-col">
            <p className="font-bold text-xl relative z-10">
              {rank}
            </p>
            <p className="text-sm">{role}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl relative z-10">
            {fullname}
          </h1>
          <p className="tracking-tight text-sm relative z-10 my-4">
            {about}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoachProfileCard

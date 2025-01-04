import React from "react";
import CoachCard from "../components/CoachCard";

const Coaches = () => {
  const id = 1;
  const id2 = 2;
  const id3 = 3;
  const id4 = 4;
  const id5 = 5;
  const id6 = 6;
  return (
    <div className="bg-[#13131A] w-full">
      <div className="relative">
        <div className="absolute h-[50vh] w-full bg-cover inset-0 bg-[url('https://i.pinimg.com/1200x/e9/a4/45/e9a445b8d2393b33f5c37e97df6b62a4.jpg')] blur-[15px] md:blur-[10px] bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-white text-center p-10">
          <h1 className="text-4xl tracking-tighter font-bold drop-shadow-2xl">
            Elevate Your Game with Expert Coaching
          </h1>
          <p className="text-gray-400 leading-tight tracking-tighter mt-5 text-lg drop-shadow-lg mx-auto md:w-[50%]">
            Unlock your full potential with personalized guidance from top Valorant coaches.
            Tailored sessions that refine your skills and boost your gameplay to the next level.  
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-10 py-20 md:px-20">
        <CoachCard link={`/coach-profile/${id}`} />
        <CoachCard link={`/coach-profile/${id2}`}/>
        <CoachCard link={`/coach-profile/${id3}`}/>
        <CoachCard link={`/coach-profile/${id4}`}/>
        <CoachCard link={`/coach-profile/${id5}`}/>
        <CoachCard link={`/coach-profile/${id6}`}/>
      </div>
    </div>
  );
};

export default Coaches;

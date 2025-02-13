import React from "react";
import {Link} from "react-router-dom";

const CoachCard = ({link, fullname, coachBanner, about, rate, rank, role}) => {

  return (
    <div className="hover:cursor-pointer relative bg-[#1D1D27] text-zinc-300 min-h-[60vh] md:min-h-[55vh] pb-2 w-[80vw] md:w-[22vw] rounded-2xl">
      <div className="absolute mx-2 my-1 px-4 py-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-md">{rank}</div>
      <div className="absolute right-2 top-2 px-5 bg-white text-black rounded-full">{role}</div>

      <Link to={link}>
        <div className="h-[26vh]">
          <img
            className="h-full w-full rounded-2xl"
            src={coachBanner || "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"}
            alt="Coach-image"
          />
        </div>
        <div className="py-3 flex justify-between px-5">
          <div className="flex items-center gap-2">
            <p className="-mt-[5px] font-bold text-2xl">{fullname}</p>
            <div className="bg-cyan-500 flex justify-center items-center rounded-full w-5 h-5 shadow-[0_0_12px_rgba(89,235,255,1)]">
              <svg
                stroke="black"
                fill="none"
                strokeWidth="20"
                viewBox="0 0 512 512"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M416 128 192 384l-96-96"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <img
              className="size-8"
              src="https://cdn-icons-png.flaticon.com/128/15534/15534859.png"
              alt="Coach-ProfilePic"
            />
          </div>
        </div>
        <div className="px-5 tracking-tighter">
          <p>{about}</p>
        </div>
        <div className="px-5 pt-5">
          <p className="font-semibold text-xl">{rate}/game</p>
        </div>
      </Link>
    </div>
  );
};

export default CoachCard;


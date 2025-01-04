import React from "react";

const CoachCard = () => {
  return (
    <div className="bg-[#1D1D27] h-[60vh] md:h-[55vh] w-[80vw] md:w-[22vw] rounded-2xl">
      <div className="h-[26vh]">
        <img
          className="h-full w-full rounded-2xl"
          src="https://vodify-gg.vercel.app/_next/image?url=%2Fegirl1.png&w=640&q=75"
          alt="Coach-image"
        />
      </div>
      <div className="py-3 flex justify-between px-5">
        <div className="flex items-center gap-2">
          <p className="font-bold text-2xl text-white">Anna</p>
          <div class="bg-cyan-500 flex justify-center items-center rounded-full w-5 h-5 shadow-[0_0_12px_rgba(89,235,255,1)]">
            <svg
              stroke="black"
              fill="none"
              stroke-width="20"
              viewBox="0 0 512 512"
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M416 128 192 384l-96-96"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div>
          <img
            className="size-8"
            src="https://cdn-icons-png.flaticon.com/128/15534/15534859.png"
            alt=""
          />
        </div>
      </div>
      <div className="px-5 tracking-tighter">
        <p>As a former Radiant Duelist main, I'll teach you how to frag out and clutch every round.</p>
        <p>With 5 years of pro-level coaching, I'll fine-tune your comms, aim, and team play.</p>
      </div>
      <div className="px-5 pt-5">
        <p className="font-semibold text-xl text-gray-400">$12.99/game</p>
      </div>
    </div>
  );
};

export default CoachCard;

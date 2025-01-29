import React, { useState } from "react";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { testimonials } from "../lib/testimonials";
import { ThreeDCardDemo } from "../components/ThreeDCardDemo";
import { GlobeDemo } from "../components/GlobeDemo";
import { TimelineDemo } from "../components/TimelineDemo";
import { IconQuestionMark } from "@tabler/icons-react";
import HowToUse from "../components/HowToUse";

const Home = () => {
  const [gender, setGender] = useState(true);
  const [showHowToUse, setShowHowToUse] = useState(false);
  
  const toggle = () => {
    setGender(!gender);
  };

  return (
    <div>
      <div className="relative min-h-screen w-screen md:p-10 p-5 overflow-auto">

        {/* Floating Question Icon */}
        <div
          onClick={() => setShowHowToUse(true)}
          className="cursor-pointer z-50 fixed right-4 md:top-10 md:right-32 border-white border-[1px] rounded-full p-1 hover:bg-white hover:text-black transition"
        >
          <IconQuestionMark className="size-8 font-bold" />
        </div>

        {showHowToUse && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="w-[60%] h-[80%] p-8 rounded-lg shadow-lg relative">
                <HowToUse onClose={() => setShowHowToUse(false)}/>
            </div>
          </div>
        )}

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[5px] md:blur-[15px]"
          style={{
            backgroundImage: gender
              ? 'url("https://i.pinimg.com/1200x/01/02/ea/0102ea2768a9c06ce53710dcb7064a27.jpg")'
              : 'url("https://i.pinimg.com/1200x/e9/3a/cc/e93accfca67cb616635147f584c2bff9.jpg")',
          }}
        ></div>
        <div className="flex items-center gap-2 absolute top-[80%] md:top-[90%] left-1/2 transform -translate-x-1/2">
          <button onClick={toggle} className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 rounded-lg" />
            <div className="text-white px-8 py-2 bg-gradient-to-r from-red-800 to-red-500 rounded-[6px] font-semibold relative group transition duration-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-800">
              {gender ? "Become a coach" : "Find a coach"}
            </div>
          </button>
        </div>
        <div className="relative z-10 mx-auto flex flex-col items-center md:w-[60%]">
          <h1 className="md:text-6xl text-white md:p-0 pl-10 text-3xl text-center font-semibold tracking-tighter">
            {gender ? "Find the perfect " : "Become a"}
            {gender ? (
              <span className="text-[#fa4773] font-bold">VALORANT</span>
            ) : (
              <span className="text-[#fa4773] font-bold"> Coach 🚀</span>
            )}
            {gender ? " coach" : ""}
          </h1>
          <p className="text-zinc-300 md:flex hidden pt-4 text-2xl tracking-tighter">
            {gender
              ? "Elevate is a platform to get reviewed by top coaches."
              : "Transform players into top-tier competitors."}
          </p>
        </div>

        <div className="justify-center relative z-20 w-full mt-20 md:mt-20">
          <ThreeDCardDemo gender={gender} />
        </div>
      </div>

      <div>
        <TimelineDemo />
      </div>

      <div className="relative min-h-screen">
        {/* <div className="absolute bg-[url('https://i.pinimg.com/1200x/0b/18/64/0b1864e5cc7dc94694f38b4062b16fd8.jpg')] inset-0 bg-cover bg-center bg-no-repeat blur-[20px] md:blur-[25px]"></div> */}
        <div className="pt-8 md:pt-12 relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold">Testimonials</h1>
          <p className="pt-2 text-md">
            See what our users have to say about us
          </p>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>

      <div className="relative">
        <div className="bg-black">
          <GlobeDemo />
        </div>
      </div>
    </div>
  );
};

export default Home;

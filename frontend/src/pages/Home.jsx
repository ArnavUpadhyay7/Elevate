import React, { useState } from "react";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { testimonials } from "../lib/testimonials";
import { ThreeDCardDemo } from "../components/ThreeDCardDemo";
import { GlobeDemo } from "../components/GlobeDemo";

const Home = () => {
  const [gender, setGender] = useState(true);
  const toggle = () => {
    setGender(!gender);
  };

  return (
    <div>
      <div className="relative min-h-screen w-screen md:p-10 p-5 overflow-auto">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[5px] md:blur-[15px]"
          style={{
            backgroundImage: gender
              ? 'url("https://i.pinimg.com/1200x/01/02/ea/0102ea2768a9c06ce53710dcb7064a27.jpg")'
              : 'url("https://i.pinimg.com/1200x/e9/3a/cc/e93accfca67cb616635147f584c2bff9.jpg")',
          }}
        ></div>
        <div className="flex items-center gap-2 absolute top-[85%] md:top-[90%] left-1/2 transform -translate-x-1/2">
          <input
            onClick={toggle}
            type="checkbox"
            className="toggle"
            defaultChecked
          />
        </div>
        <div className="relative z-10 mx-auto flex flex-col items-center text-white md:w-[60%]">
          <h1 className="md:text-6xl md:p-0 pl-10 text-3xl text-white font-semibold tracking-tighter">
            {gender ? "Find the perfect " : ""}
            {gender ? (
              ""
            ) : (
              <span className="text-[#fa4773] font-bold">Elevate</span>
            )}
            {gender ? "" : " your rank 🚀"}
            {gender ? (
              <span className="text-[#fa4773] font-bold">VALORANT</span>
            ) : (
              ""
            )}
            {gender ? " coach" : ""}
          </h1>
          <p className="md:flex hidden text-gray pt-4 text-2xl tracking-tighter">
            {gender
              ? "Elevate is a platform to get reviewed by top coaches."
              : "Get expert advice from the world's best coaches and elevate your rank."}
          </p>
        </div>

        <div className="justify-center relative z-20 w-full mt-20 md:mt-20">
          <ThreeDCardDemo gender={gender}/>
        </div>
      </div>

      <div className="relative mt-2 min-h-[100vh]">
        <div className="absolute bg-[url('https://i.pinimg.com/1200x/0b/18/64/0b1864e5cc7dc94694f38b4062b16fd8.jpg')] inset-0 bg-cover bg-center bg-no-repeat blur-[20px] md:blur-[25px]"></div>
        <div className="pt-8 md:pt-12 relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-semibold">Testimonials</h1>
          <p className="pt-2 text-md">
            See what our users have to say about us
          </p>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>

      <div className="h-screen relative">
        <div className="bg-black">
          <GlobeDemo />
        </div>
      </div>
    </div>
  );
};

export default Home;

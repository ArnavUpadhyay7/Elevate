import React from "react";
import { IconUser, IconMouse, IconSettings, IconCheck } from "@tabler/icons-react";
import { IoMdChatboxes } from "react-icons/io";

const steps = [
  { title: "Create an Account", desc: "Sign up & set up your profile.", icon: <IconUser size={40} /> },
  { title: "Browse Coaches", desc: "Find your perfect coach.", icon: <IconMouse size={40} /> },
  { title: "Book a Session", desc: "Schedule a personalized session.", icon: <IconSettings size={40} /> },
  { title: "Start communicating", desc: "Learn from your coach.", icon: <IoMdChatboxes size={40} /> },
  { title: "Elevate your skills", desc: "Apply strategies and rank up.", icon: <IconCheck size={40} /> },
];

const HowToUse = ({ onClose }) => {
  return (
    <div className="md:px-0 px- fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
      <div className="bg-[#121212] text-white rounded-lg p-8 w-[500px] shadow-lg relative border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          ✖
        </button>

        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-transparent bg-clip-text">
          How to Use Elevate
        </h1>
        <p className="text-gray-400 text-center mt-2">Follow these simple steps to get started.</p>

        <div className="mt-8 relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff416c] to-[#ff4b2b]"></div>
          {steps.map((step, i) => (
            <div key={i} className="flex items-start space-x-6 mb-6 group">
              <div className="p-3 rounded-full bg-[#ff416c] text-white shadow-lg transition scale-100 group-hover:scale-110">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={onClose} className="px-6 py-3 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-semibold rounded-lg shadow-lg transition hover:from-[#ff4b2b] hover:to-[#ff416c]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;

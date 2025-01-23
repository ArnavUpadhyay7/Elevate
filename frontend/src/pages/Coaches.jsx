import React, { useEffect, useState } from "react";
import CoachCard from "../components/CoachCard";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await axiosInstance.get("/coach/coaches");
        setCoaches(res.data);
      } catch (error) {
        console.error("Error fetching coaches: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute h-[60vh] w-full bg-cover inset-0 bg-[url('https://i.pinimg.com/1200x/5c/77/b4/5c77b498d943184c08da0b6d9dc174aa.jpg')] bg-center">
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center p-10">
          <h1 className="text-white text-4xl tracking-tighter font-bold drop-shadow-2xl">
            Elevate Your Game with Expert Coaching
          </h1>
          <p className="text-zinc-300 leading-tight tracking-tighter mt-5 text-lg drop-shadow-lg mx-auto md:w-[50%]">
            Unlock your full potential with personalized guidance from top Valorant coaches.
            Tailored sessions that refine your skills and boost your gameplay to the next level.  
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-10 py-20 md:px-20">
        {coaches.map((coach) => (
          <CoachCard
            key={coach._id}
            link={`/coach-profile/${coach._id}`}
            about={coach.about}
            fullname={coach.fullname} 
            coachBanner={coach.coachBanner}
            rate={coach.rate}
            rank={coach.rank}
            role={coach.role}
          />
        ))}
      </div>
    </div>
  );
};

export default Coaches;

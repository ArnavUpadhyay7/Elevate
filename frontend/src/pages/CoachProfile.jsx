import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatedModalDemo } from "../components/AnimatedModalDemo";
import CoachProfileCard from "../components/CoachProfileCard";
import { IconPointFilled } from "@tabler/icons-react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { playerStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";

const CoachProfile = () => {

  const { setSelectedUser } = useChatStore();

  const player = playerStore((state) => state.player);
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCoachHired, setIsCoachHired] = useState(false);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axiosInstance.get(`/coach/${id}`);
        setCoach(res.data);

        // Check if coach is already hired
        if (player?.payed_coach?.includes(id)) {
          setIsCoachHired(true);
        }
      } catch (error) {
        console.error("Error fetching coach: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
  }, [id, player]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-10">
      <img
        className="md:h-[30vh] h-full w-full rounded-xl"
        src={
          coach?.coachBanner ||
          "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"
        }
        alt="Coach Profile Banner"
      />
      <div className="md:px-24 px-6 -mt-[30px] flex items-center gap-5">
        <img
          className="md:size-28 size-20 rounded-full"
          src={
            coach?.profilePic ||
            "https://cdn-icons-png.flaticon.com/128/149/149071.png"
          }
          alt="Coach Profile"
        />
        <div className="flex flex-col pt-10 md:pt-5">
          <div className="flex items-center gap-2">
            <p className="md:-mt-[5px] -mt-[8px] font-bold text-3xl md:text-4xl">
              {coach?.fullname}
            </p>
            <div className="bg-cyan-500 flex justify-center items-center rounded-full w-5 h-5 shadow-[0_0_12px_rgba(89,235,255,1)]">
              <svg
                stroke="black"
                fill="none"
                stroke-width="20"
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
            <p className="font-semibold text-lg">{coach?.role}</p>
          </div>
        </div>
      </div>
      <div className="md:px-28 px-10 pt-2 md:flex md:gap-32">
        <div>
          <h1 className="mt-2 text-3xl font-bold">About {coach?.fullname}</h1>
          <div className="mt-5 rounded-2xl md:w-[40vw]">
            <p className="mt-5 tracking-tighter md:tracking-normal leading-tight md:leading-6 md:text-xl px-10 py-5">
              {coach?.about}
            </p>
          </div>
          <div>
            <h1 className="pt-5 text-3xl font-bold">Services Provided -</h1>
            <div className="px-10 py-5 mt-5 md:mb-0 mb-10 rounded-2xl md:w-[40vw]">
              <div className="flex items-center gap-2">
                <IconPointFilled />
                <p className="md:text-xl tracking-tighter">
                  45-minute personalized coaching session.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IconPointFilled />
                <p className="md:text-xl tracking-tighter">
                  Detailed VOD review to identify your weaknesses.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IconPointFilled />
                <p className="md:text-xl tracking-tighter">
                  Comprehensive training plan tailored to your goals.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <IconPointFilled />
                <p className="md:text-xl tracking-tighter">
                  Actionable insights to improve decision-making under pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:-mt-[5%] mt-10">
          <CoachProfileCard
            rank={coach?.rank}
            role={coach?.role}
            fullname={coach?.fullname}
            about={coach?.about}
            profilePic={coach?.profilePic}
          />
          {player && (
            <>
              {!isCoachHired ? (
                <div className="md:block hidden mt-6">
                  <AnimatedModalDemo coach={coach} player={player} />
                </div>
              ) : (
                <div className="md:flex justify-center mt-6 hidden">
                  <Link onClick={() => setSelectedUser(coach)} to="/messages" className="px-10 py-2 bg-white text-black font-semibold rounded-lg">
                    Chat Now
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* For Mobile devices */}
        {player && (
          <>
            {!isCoachHired ? (
              <div className="block md:hidden mt-10">
                <AnimatedModalDemo coach={coach} player={player} />
              </div>
            ) : (
              <div className="flex justify-center mt-6 md:hidden">
                <Link onClick={() => setSelectedUser(coach)} to="/messages" className="px-10 py-2 bg-white text-black font-semibold rounded-lg">
                  Chat Now
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoachProfile;

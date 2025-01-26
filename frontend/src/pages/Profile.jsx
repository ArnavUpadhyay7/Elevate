import React, { useEffect, useState } from 'react'
import CoachProfileCard from '../components/CoachProfileCard';
import { playerStore } from '../store/authStore';
import {Link} from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Loader } from 'lucide-react';

const Profile = () => {
  const player = playerStore((state) => state.player);
  const [isLoading, setIsLoading] = useState(true);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/coach/coaches");
        const topCoaches = res.data.filter((coach) => coach.rank === "Radiant");
        setCoaches(topCoaches);
      } catch (error) {
        console.error("Error fetching coaches: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  const topCoaches = coaches.slice(0,3);

  return (
    <div className='min-h-screen w-full pb-10'>
      <img className='md:h-[30vh] h-full w-full rounded-xl' src={player?.playerBanner || "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"} alt="Player Profile Banner" />
      <div className='md:px-24 px-6 -mt-[30px] flex items-center gap-5'>
        <img className='md:size-28 size-20 rounded-full' src={player?.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"} alt="Player Profile" />
        <div className='flex flex-col pt-10 md:pt-5'>
          <div className="flex items-center gap-2">
              <p className="md:-mt-[5px] -mt-[8px] font-bold text-3xl md:text-4xl">{player?.fullname}</p>
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
            <p className='font-semibold text-lg'>{player?.rank}</p>
          </div>
        </div>
        </div>
        <div className='md:px-28 px-10 pt-2 md:flex md:gap-32'> 
          <div>
            <h1 className='text-3xl font-bold'>About me</h1>
            <div className='mt-5 rounded-2xl md:w-[40vw]'>
              <p className="mt-5 tracking-tighter md:tracking-normal leading-tight md:leading-6 md:text-xl px-10 py-5">
                {player?.about} 
              </p>
            </div>
            <h1 className='pt-4 text-3xl font-bold'>Top Coaches</h1>
            {!isLoading ? 
            <div className='text-white'>
              {topCoaches.map((coach) => {
                  return (
                    <Link to={`/coach-profile/${coach._id}`} className='flex justify-between items-center mt-4 rounded-2xl px-8 py-2 bg-[#1D1D27] md:w-[40vw] hover:bg-red-900'>
                      <div className='flex gap-4 items-center'>
                        <img className='size-12 rounded-full' src={coach.profilePic} alt="" />
                        <p className='text-xl font-semibold'>{coach.fullname}</p>
                      </div>
                      <div>
                        <p className='text-xl font-semibold'>{coach.rank}</p>
                      </div>
                    </Link>
                  )
                })
              }
            </div> 
            : 
            <div className='flex justify-center items-center mt-10'>
              <Loader className="h-8 w-8 animate-spin" />
            </div>
            }
          </div>
          <div className='md:-mt-[5%] mt-10'>
            <CoachProfileCard rank={player?.rank} role={player?.role} fullname={player?.fullname} about={player?.about} profilePic={player?.profilePic}/>
          </div>
        </div>

    </div>
  )
}

export default Profile
import React from 'react'
import CoachProfileCard from '../components/CoachProfileCard';
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import { coachStore, playerStore } from '../store/authStore';

const CoachProfile = () => {
    const coach = coachStore((state) => state.coach);
    const player = playerStore((state) => state.player);

    const requests = [
      { id: 1, name: "Arnav Upadhyay", img: "https://vodify-gg.vercel.app/_next/image?url=%2Fegirl1.png&w=640&q=75" },
      { id: 2, name: "John Doe", img: "https://vodify-gg.vercel.app/_next/image?url=%2Fegirl1.png&w=640&q=75" },
      // { id: 3, name: "Jane Smith", img: "https://vodify-gg.vercel.app/_next/image?url=%2Fegirl1.png&w=640&q=75" },
      // { id: 4, name: "Emily Davis", img: "https://vodify-gg.vercel.app/_next/image?url=%2Fegirl1.png&w=640&q=75" },
    ];
  return (
    <div className='bg-[#13131A] min-h-screen w-full pb-10'>
      <img className='md:h-[30vh] h-full w-full rounded-xl' src={coach?.coachBanner || "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"} alt="Coach Profile Banner" />
      <div className='md:px-24 px-6 -mt-[30px] flex items-center gap-5'>
        <img className='md:size-28 size-20 rounded-full' src={coach?.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"} alt="Coach Profile" />
        <div className='flex flex-col pt-10 md:pt-5'>
          <div className="flex items-center gap-2">
              <p className="md:-mt-[5px] -mt-[8px] font-bold text-3xl md:text-4xl text-white">{coach?.fullname}</p>
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
            <p className='font-semibold text-lg'>{coach?.role}</p>
          </div>
        </div>
        </div>
        <div className='md:px-28 px-10 pt-2 md:flex md:gap-32'> 
          <div>
            <h1 className='text-3xl font-bold'>About me -</h1>
            <div className='mt-5 rounded-2xl bg-[#1D1D27] md:w-[40vw]'>
            <p className="text-gray-400 mt-5 tracking-tighter md:tracking-normal leading-tight md:leading-6 md:text-xl px-10 py-5">
              {coach?.about}
            </p>
            </div>
              <div className='leading-tight'>
                <h1 className='pt-5 text-3xl font-bold'>Services Provided -</h1>
                <div className='px-10 py-5 mt-5 md:mb-0 mb-10 rounded-2xl bg-[#1D1D27] md:w-[40vw]'>
                  <div className='flex items-center gap-2'>
                    <IconPointFilled />
                    <p className='md:text-xl tracking-tighter'>45-minute personalized coaching session.</p>    
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconPointFilled />
                    <p className='md:text-xl tracking-tighter'>Detailed VOD review to identify your weaknesses.</p>    
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconPointFilled />
                    <p className='md:text-xl tracking-tighter'>Comprehensive training plan tailored to your goals.</p>    
                  </div>
                  <div className='flex items-center gap-2'>
                    <IconPointFilled />
                    <p className='md:text-xl tracking-tighter'>Actionable insights to improve decision-making under pressure.</p>    
                  </div>
                </div>
              </div>
              <>
                <h1 className="py-5 text-3xl font-bold">Requests 🎯</h1>
                {requests.length > 0 ? (
                  requests.map((profile) => (
                    <div
                      key={profile.id}
                      className="px-8 py-3 mt-2 md:mb-0 mb-2 rounded-2xl bg-[#1D1D27] md:w-[40vw]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            className="md:size-14 size-10 rounded-full"
                            src={profile.img}
                            alt={`${profile.name} profile pic`}
                          />
                          <p className="md:text-xl tracking-tighter">{profile.name}</p>
                        </div>
                        <div className="flex gap-4">
                          <IconCheck className="md:size-8 text-green-500" />
                          <IconX className="md:size-8 text-red-500" />
                        </div>
                      </div>
                    </div>
                  ))
                )  : (
                  <div className="px-8 py-4 mt-6 md:mb-0 mb-2 rounded-2xl md:text-xl bg-[#1D1D27] md:w-[40vw]">
                    <p>No request available at the moment.</p>
                  </div>
                )
              }
              </>
          </div>
          <div className='md:-mt-[5%] mt-10'>
            <CoachProfileCard rank={coach?.rank} role={coach?.role} fullname={coach?.fullname} about={coach?.about} profilePic={coach?.profilePic}/>
          </div>
        </div>

    </div>
  )
}

export default CoachProfile
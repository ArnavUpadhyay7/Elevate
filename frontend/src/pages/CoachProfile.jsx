import React from 'react'
import { useParams } from 'react-router-dom';

const CoachProfile = () => {
    const {id} = useParams();
  return (
    <div className='bg-[#13131A] min-h-screen w-full'>
      <div className='md:h-[30vh]'>
        <img className='h-full w-full rounded-xl' src="https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg" alt="Coach Profile Banner" />
        <div className='md:px-24 px-10 -mt-[30px] flex items-center gap-5'>
          <img className='md:size-32 size-24 rounded-full' src="https://vodify-gg.vercel.app/_next/image?url=%2Fegirl1.png&w=640&q=75" alt="Coach Profile" />
          <div className='flex flex-col pt-10 md:pt-5'>
            <div className="flex items-center gap-2">
                <p className="md:-mt-[5px] -mt-[8px] font-bold text-3xl md:text-4xl text-white">Anna</p>
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
                <p className='font-semibold text-lg'>Radiant</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CoachProfile

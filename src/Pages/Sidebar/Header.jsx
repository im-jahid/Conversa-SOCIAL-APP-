import React from 'react'

import logo from '../../assets/jj.png';
import reg from '../../assets/registration.png';

import { HiMiniHome } from "react-icons/hi2";
import { AiFillMessage } from "react-icons/ai";
import { PiFilmReelFill } from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { PiCirclesFourFill } from "react-icons/pi";



const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-[5px]">

        {/* LOGO & SEARCH PART START */}
        <div className="flex place-items-center">
          <img className='w-[80px] h-[80px]' src={logo} alt="" />
            <input
            id='omit'
              placeholder='# Exploer'
              className='py-1 w-[200px] bg-[#1B2730] px-2 outline-none rounded-lg '
              type="search" />
        </div>
        {/* LOGO & SEARCH PART END */}

        {/* NAV ITEMS START */}
        <div className="">
          <div className="flex gap-2" >
            <div className="font-poppins font-bold text-primary text-[35px] px-3 py-2 rounded-full ">
              <button className='flex items-center gap-2'>
                <HiMiniHome />
                {/* <p className=''>home</p> */}
              </button>
            </div>
            <div className="font-poppins font-bold text-[#C7D6E5] text-[35px] px-3 py-2 rounded-full ">
              <button className='flex items-center gap-2'>
                <AiFillMessage />
                {/* <p className=''>Message</p> */}
              </button>
            </div>
            <div className="font-poppins font-bold text-[#C7D6E5] text-[35px] px-3 py-2 rounded-full ">
              <button className='flex items-center gap-2'>
                <PiFilmReelFill />
                {/* <p className=''>Reel</p> */}
              </button>
            </div>
            <div className="font-poppins font-bold text-[#C7D6E5] text-[35px] px-3 py-2 rounded-full ">
              <button className='flex items-center gap-2'>
                <IoNotifications />
                {/* <p className=''>Notifications</p> */}
              </button>
            </div>
          </div>
        </div>
        {/* NAV ITEMS END */}

        {/* NAV PROFILE START */}
        <div className="flex items-center gap-3 ">
          <div className="flex items-center text-white bg-[#2A3843] py-2 pl-2 pr-3 rounded-full gap-4">
            <img className='w-[35px] h-[35px] object-cover rounded-full' src={reg} alt="" />
            <p className='font-poppins font-bold'>jahid</p>
            <TbTriangleInvertedFilled />
          </div>
          <div className="text-[35px] text-[#C7D6E5]">
            <PiCirclesFourFill />
          </div>
        </div>
        {/* NAV PROFILE END */}


      </div>
    </>
  )
}

export default Header
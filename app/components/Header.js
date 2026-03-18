import React, { useState } from 'react'
import { FaHouseMedicalCircleCheck } from "react-icons/fa6";


const Header = () => {
// I want to create a dropdown in the header for the home about etc for mobile view using useState
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <header className='max-w-7xl mx-auto mt-8 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex items-center justify-between relative z-50'>
          <div className='flex items-center gap-5'>
            <FaHouseMedicalCircleCheck className='text-white text-2xl' />
            <h1 className='hidden md:block bg-linear-to-r from-gray-200 via-gray-400 to-gray-300 bg-clip-text text-transparent text-2xl font-bold'>Bio Sort AI</h1>
          </div>
          <div className='md:hidden'>
            <button className='text-white border border-white/10 rounded-xl px-4 py-1 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Close' : 'Menu'}
            </button>
            {isOpen && (
              <div className='absolute top-20 right-8 bg-black backdrop-blur-xl border border-white/10 rounded-xl px-4 py-4 shadow-[0_20px_45px_rgba(0,0,0,0.6)] z-50 flex flex-col gap-3'>
                <button className='text-white border border-white/10 rounded-xl px-4 py-2 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer w-full'>Home</button>
                <button className='text-white border border-white/10 rounded-xl px-4 py-2 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer w-full'>About</button>
                <button className='text-white border border-white/10 rounded-xl px-4 py-2 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer w-full'>Services</button>
                <button className='text-black border border-white/10 bg-white rounded-xl px-4 py-2 text-lg font-medium hover:text-white hover:bg-black/80 duration-200 transition-all cursor-pointer w-full'>Login/Create Account</button>
              </div>
            )}
          </div>
          <div className='hidden md:flex items-center gap-2'>
            <button className='text-white border border-white/10 rounded-xl px-4 py-1 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer'>Home</button>
            <button className='text-white border border-white/10 rounded-xl px-4 py-1 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer'>About</button>
            <button className='text-white border border-white/10 rounded-xl px-4 py-1 text-lg font-medium hover:text-gray-400 transition-colors cursor-pointer'>Services</button>
            <button className='text-black border border-white/10 bg-white  rounded-xl px-4 py-1 text-lg font-medium hover:text-white hover:bg-black/80 duration-200 transition-all cursor-pointer'>Login/Create Account</button>
          </div>
        </header>
    </>
  )
}

export default Header
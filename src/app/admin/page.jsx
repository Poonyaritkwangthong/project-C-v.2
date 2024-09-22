import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdCarCrash, MdBrightness7, MdOutlineAssignment, MdOutlineArrowForwardIos } from "react-icons/md";

export default function page() {
  return (
    <div>
      <div className='border-white border-2 w-[15rem] h-[25rem]'>
        <h1 className='mt-6 ml-2 font-bold text-2xl'>Admin Menu</h1>
        <div className='mt-[1rem] border-2 border-white p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-violet-500'>
          <a className='text-center flex items-center gap-2' href="/car_table/index">
            <MdCarCrash className='text-xl' />
            car table
            <MdOutlineArrowForwardIos className='text-right' />
          </a>
        </div>
        <div className='border-2 border-white p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-violet-600'>
          <a className='text-center flex items-center gap-2' href="/brand_table/index">
            <MdOutlineAssignment className='text-xl' />
            brand table
            <MdOutlineArrowForwardIos className='text-right' />
          </a>
        </div>
        <div className=' border-2 border-white p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-purple-700'>
          <a className='text-center flex items-center gap-2' href="/engine_table/index">
            <MdBrightness7 className='text-xl' />
            engine table
            <MdOutlineArrowForwardIos className='text-right' />
          </a>
        </div>

        <div className='mt-[2rem] border-2 border-white w-[6rem] p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-yellow-500'>
          <a className='flex items-center' href="/"><GoArrowLeft />home</a>
        </div>
      </div>
    </div>
  )
}

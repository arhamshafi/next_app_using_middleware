import Link from 'next/link'
import React from 'react'

export default function layout({children}) {
  return (
    <div className='w-full min-h-screen bg-white flex justify-between '>
        <div className='w-[20%] bg-black text-white min-h-screen '>
            <Link href={"/"}><button className='mt-10 text-xl ml-5 underline cursor-pointer '>Home</button>
            
            </Link>
        </div>
        <div className='w-[80%] min-h-screen '> {children} </div>
    </div>
  )
}

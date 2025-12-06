import Link from 'next/link'
import React from 'react'

function notfound() {
    return (
        <div className='w-full min-h-screen flex justify-center items-center text-black animate-pulse text-4xl font-bold gap-5 flex-col'>
            Masti Kreyan A Shoreya
            <p>😒</p>
            <button className='py-2 px-5 rounded-lg bg-black text-white text-sm ' > <Link href={"/"}>Home Page</Link> </button>
        </div>
    )
}

export default notfound

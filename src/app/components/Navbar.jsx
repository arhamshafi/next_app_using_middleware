"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function Navbar() {

    const [active, setactive] = useState("home")

    return (
        <nav className='w-full h-[60px] bg-white fixed top-0 left-0 flex justify-between items-center px-10'>
            <div className='w-[100px] h-max '> <img src="/next.svg" className='w-full' alt="" /> </div>
            <ul className='flex justify-center items-center gap-3'>
                {
                    ["home", "services", "todos", "cookies"].map((ele, idx) => (
                        <li onClick={() => setactive(ele)} key={idx} className={`text-black cursor-pointer capitalize text-sm transition-all duration-100 ease-linear hover:text-red-500 ${active === ele && "text-red-500"} `}> <Link href={ele == "home" ? "/" : `/${ele}`}>{ele}</Link>  </li>

                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar

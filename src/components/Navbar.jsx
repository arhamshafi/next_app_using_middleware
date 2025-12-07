"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaCrown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useTodo } from '../context/Context'
import { usePathname } from 'next/navigation';

function Navbar() {

    const active = usePathname()

    return (
        <nav className='w-full h-[60px] bg-white fixed top-0 left-0 flex justify-between items-center px-10'>
            <Link href={"/"}><div className='w-[100px] h-max '>  <img src="/next.svg" className='w-full' alt="" /> </div></Link>

            <div className='w-max h-max flex justify-center items-center gap-15 '>
                <ul className='flex justify-center items-center gap-3'>
                    {["home", "services", "todos", "cookies"].map((ele, idx) => {
                        const href = ele === "home" ? "/" : `/${ele}`;
                        const isActive = active === href;

                        return (
                            <Link key={idx} href={href}>
                                <li className={`text-black cursor-pointer capitalize text-md transition-all duration-100 ease-linear hover:text-red-500 ${isActive && "text-red-500"}`}>
                                    {ele}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
                <div className='flex justify-center items-center gap-5'>
                    <FaCrown className='text-yellow-500 text-xl cursor-pointer' />
                    <CgProfile className='text-blue-500 text-xl cursor-pointer' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar

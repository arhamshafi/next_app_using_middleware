"use client"
import Link from 'next/link'
import React from 'react'
import { FaCrown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

function Navbar() {

    const active = usePathname() || "/"
    const { data: session, status } = useSession()
    console.log(session, status)


    return (
        <nav className='w-full h-[60px] bg-white fixed top-0 left-0 flex justify-between items-center px-10'>
            <Link href={"/"}><div className='w-[100px] h-max '>  <img src="/next.svg" className='w-full' alt="" /></div></Link>

            {
                status === "unauthenticated" ? (
                    <div className='flex justify-center items-center w-max h-max gap-2 '>
                        <Link href={"/login"}><button className='py-1 px-3 rounded-lg uppercase bg-red-600 shadow-2xs text-white transition-all duration-150 ease-linear active:scale-95 cursor-pointer '>Login</button></Link>
                        <Link href={"/signup"}><button className='py-1 px-3 rounded-lg uppercase bg-red-600 shadow-2xs text-white transition-all duration-150 ease-linear active:scale-95 cursor-pointer '>Sign up</button></Link>
                    </div>
                ) : (<div className='w-max h-max flex justify-center items-center gap-15 '>

                    <ul className='flex justify-center items-center gap-3'>
                        {["home", "services", "todos", "cookies"].map((ele, idx) => {
                            const href = ele === "home" ? "/" : `/${ele}`;
                            const isActive = active === href;

                            return (
                                <Link key={idx} href={href || "/"}>
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
                        <button onClick={()=> signOut({callbackUrl : "/"}) } className='bg-red-500 text-white'>Log Out</button>
                    </div>
                </div>)
            }


        </nav>
    )
}

export default Navbar

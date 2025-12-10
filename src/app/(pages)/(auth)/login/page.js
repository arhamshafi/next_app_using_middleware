"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

export const dynamic = "force-dynamic";
export default function page() {

    const [formdata, setformdata] = useState({ email: "", password: "" })
    const [shakeEmail, setShakeEmail] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);
    const [loader, setloader] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const router = useRouter()

    const formHandler = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault()
        const { email, password } = formdata

        if (!email) {
            emailRef.current.focus()
            toast.error("Email Field is Empty !")
            setShakeEmail(true)
            setTimeout(() => setShakeEmail(false), 1000)
            return
        }
        if (!password) {
            passwordRef.current.focus()
            toast.error("Password Field is Empty !")
            setShakePassword(true)
            setTimeout(() => setShakePassword(false), 1000)
            return
        }

        try {
            setloader(true)
            const res = await signIn("credentials", {
                email: formdata.email,
                password: formdata.password,
                redirect: false
            })

            if (res.error) throw new Error(res.error)

            toast.success("Successfully Logged")
            setTimeout(() => router.push("/"), 1000)
            setformdata({ email: "", password: "" })

        } catch (err) {
            toast.error(err.message || "Error While Register Account");

        } finally {
            setloader(false)
        }

    }
    return (
        <div className='w-full min-h-screen py-2 flex flex-col items-center bg-black'>
            <h1 className='font-bold text-3xl text-white mt-10 '>Login Your Account</h1>

            <form onSubmit={submit} className='w-[700px] h-max py-10 rounded-2xl bg-white mt-24 flex flex-col items-center'>
                <p className='font-bold text-2xl' >LOGIN </p>
                <input autoComplete='off' type='email' ref={emailRef} name='email' value={formdata.email} onChange={formHandler} className={`w-[80%] h-[50px] mt-5 rounded-2xl px-5 outline-none text-lg bg-gray-200 ${shakeEmail && "shake ring-2 ring-red-400"} `} placeholder='Write Your Email Address Here' />
                <input autoComplete='off' type='password' ref={passwordRef} name='password' value={formdata.password} onChange={formHandler} className={`w-[80%] h-[50px] mt-5 rounded-2xl px-5 outline-none text-lg bg-gray-200 ${shakePassword && "shake ring-2 ring-red-400"} `} placeholder='Create Password' />
                <Link href={"/signup"} className='mt-5 text-sm opacity-70 hover:opacity-100 ' >Create New Account</Link>
                <button type='submit' disabled={loader} className='mt-5 py-3 w-[200px] shadow-xl transition-all ease-in-out duration-200 active:scale-96 cursor-pointer rounded-2xl bg-black text-white font-bold tracking-[2px] hover:tracking-[5px] '> {loader ? (<div className='w-[30px] h-[30px] rounded-full border-b-2 border-l-2 animate-spin mx-auto opacity-50 '></div>) : "Login"} </button>
            </form>

        </div>
    )
}

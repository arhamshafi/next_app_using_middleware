"use client"

import { addTodo } from '@/app/(pages)/(public)/todos/action'
import React, { useReducer, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function TodoInput() {

    const [todo, settodo] = useState("")
    const [loader, setloader] = useState(false)
    const inpRef = useRef(null)

    const Submit = async (e) => {
        e.preventDefault()
        try {
            setloader(true)
            const res = await addTodo(todo)
            const data = JSON.parse(res)
            console.log(data);

            if (!data.success) throw new Error(data.message)
            if (data.success) {
                toast.success(data.message)
                settodo("")
            }

        } catch (err) {
            toast.error(err.message || "Error In Todos")
        } finally {
            setloader(false)
        }
    }

    return (

        <form onSubmit={Submit} className='flex justify-between items-center w-[800px] mt-10  ' >
            <input ref={inpRef} type="text" name='title' className='w-[80%] bg-white h-12 rounded-xl outline-none px-5 text-black text-lg ' onChange={(e) => settodo(e.target.value)} value={todo} />
            <button type='submit' disabled={loader} className='w-[130px] py-2 cursor-pointer active:opacity-80 rounded-xl bg-black '> {loader ? <div className='w-[30px] h-[30px] border-b-2 border-l-2 rounded-full mx-auto animate-spin ' ></div> : "Create"} </button>
        </form>
    )
}

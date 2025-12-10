"use client"

import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function TodoInput() {

    const [todo, settodo] = useState("")
    const [loader, setloader] = useState(false)

    const AddTodo = async (e) => {
        e.preventDefault()

        if (!todo) return toast.info("Fill it to Create Todo")
        console.log(todo);

        try {
            setloader(true)
            const res = await fetch("/api/todos", { headers: { "Content-Type": " application/json" }, method: "POST", body: JSON.stringify(todo) })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message)
            console.log(data);


        } catch (err) {
            toast.error(err.message || "server Error")
        } finally {
            setloader(true)
        }
    }

    return (
        <form onSubmit={AddTodo} className='flex justify-between items-center w-[800px] mt-10  ' >
            <input type="text" className='w-[80%] bg-white h-12 rounded-xl outline-none px-5 text-black text-lg' onChange={(e) => settodo(e.target.value)} value={todo} />
            <button type='submit' className='w-[130px] py-2 cursor-pointer active:opacity-80 rounded-xl bg-black '>Create</button>
        </form>
    )
}

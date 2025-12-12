"use client"

import { addTodo } from '@/app/(pages)/(public)/todos/action'
import React, { useActionState, useEffect, useReducer, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export default function TodoInput() {

    const [loader, setloader] = useState(false)
    const inpRef = useRef(null)
    const [state, formAction] = useActionState(addTodo, { success: null, message: null })

    useEffect(() => {
        if (state.success !== null) {
            setloader(false)
            if (state.success) {
                toast.success(state.message)
                inpRef.current.value = ""
            } else {
                toast.error(state.message)
                inpRef.current.focus()
            }
        }

    }, [state])

    return (

        <form action={(obj) => {
            setloader(true)
            return formAction(obj)
        }} className='flex justify-between items-center w-[800px] mt-10  ' >
            <input ref={inpRef} type="text" name='title' className='w-[80%] bg-white h-12 rounded-xl outline-none px-5 text-black text-lg' />
            <button type='submit' disabled={loader} className='w-[130px] py-2 cursor-pointer active:opacity-80 rounded-xl bg-black '> {loader ? <div className='w-[30px] h-[30px] border-b-2 border-l-2 rounded-full mx-auto animate-spin ' ></div> : "Create"} </button>
        </form>
    )
}

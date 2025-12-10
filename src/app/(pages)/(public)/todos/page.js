"use client"
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

function page() {



  const fetchtodo = async () => {
    try {

      const res = await fetch("/api/todos", { methood: "GET", cache: "no-store" })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.message)
        return 
      }
      const data = await res.json()

      console.log(data);
    } catch (err) {
      console.log(err);
      
      toast.error(err.message)
    }

  }

  useEffect(() => {
    fetchtodo()
  }, [])

  return (
    <div className='w-full min-h-screen bg-green-600 flex justify-center items-center text-white font-bold text-2xl '>
      todos Page
    </div>
  )
}

export default page

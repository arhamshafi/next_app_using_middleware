"use server"

import ConnectDB from "@/lib/mongo"
import TODO from "@/model/todo"
import { getServerSession } from "next-auth"



export const addTodo = async (obj) => {


    try {
        const session = await getServerSession()
        console.log(session);
        if(!session) throw new Error("Authentication Required")
        if(obj == "") throw new Error("not Filled")
        await ConnectDB()
        const newTodo = await TODO.create({ title: obj })
        return JSON.stringify({ success: true, message: "Successfully Created" })
    } catch (err) {
        return JSON.stringify({ success: false, message: err.message || "Invalid Error" })
    }
}
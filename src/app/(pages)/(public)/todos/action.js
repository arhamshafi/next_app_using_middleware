"use server"

import ConnectDB from "@/lib/mongo"
import TODO from "@/model/todo"
import { getServerSession } from "next-auth"


const session = getServerSession()
console.log(session);

export const addTodo = async (obj) => {
    console.log(obj);
    
    try {
        const title = await obj.get("title")
        if (!title) throw new Error("Field Must Be Required !")
        await ConnectDB()
        

        const newTodo = await TODO.create({ title: title })
        return { success: true, message: "Successfully Created" }
    } catch (err) {
        return { success: false, message: err.message || "Invalid Error" }
    }
}
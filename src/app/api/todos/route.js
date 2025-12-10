import ConnectDB from "@/lib/mongo"
import { NextResponse } from "next/server"
import { toast } from "react-toastify"

export const GET = async (req) => {
    try {
        return NextResponse.json({ success: true, todo: ["todo", "route function ", "working"] })
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message })
    }
}

export const POST = async (req) => {
    try {
        await ConnectDB()
        const body = await req.json()
        // const


    } catch (err) {
        return NextResponse.json({ success: false, error: err || "Invalid Error" }, { status: 500 })
    }
}
import { NextResponse } from "next/server"
import { toast } from "react-toastify"

export const GET = async (req) => {
    try {
        return NextResponse.json({ success: true, todo: ["todo", "route function ", "working"] })
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message })
    }
}
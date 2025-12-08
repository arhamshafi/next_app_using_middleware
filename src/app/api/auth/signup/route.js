import ConnectDB from "@/lib/mongo"
import userSchema from "@/app/model/user"
import { NextResponse } from "next/server"


export const POST = async (req) => {
    try {
        await ConnectDB()
        const body = await req.json()
        const existUser = await userSchema.findOne({ email: body.email })
        if (existUser) return NextResponse.json({ success: true, message: "This Email is Already Exists" }, { status: 400 })
        const new_user = await userSchema.create({
            name: body.name,
            email: body.email,
            password: body.password
        })
        // console.log(new_user);
        return NextResponse.json({ success: true, message: "Successfully Registerd" }, { status: 200 })

    } catch (err) {
        console.log(err);

        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);
            return NextResponse.json(
                { success: false, message: messages.join(", ") },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        );
    }
}
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server';

export async function middleware(req) {

    // console.log(req);

    const { pathname } = req.nextUrl
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (pathname.startsWith("/api/todos")) {
        if (req.method === "GET") return NextResponse.next()
        if (!token) return NextResponse.json({ success: false, message: "Not Allowed Without Authentication" })
        return NextResponse.next()
    }

}

export const config = {
    matcher: ["/api/todos/:path*"]
}

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server';

export async function middleware(req) {
    // const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
    // admin ki alag bnai jo role check kry .....
}

export const config = {
    matcher: ['/admin/:path*']
}

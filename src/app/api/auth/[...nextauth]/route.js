import ConnectDB from "@/lib/mongo"
import userSchema from "@/model/user"
import mongoose from "mongoose";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";

const authOption = {
    providers: [
        Credentials({
            name: "credentials",
            async authorize(credentials) {

                try {
                    await ConnectDB()
                    console.log("DB STATE:", mongoose.connection.readyState);
                    const newUser = await userSchema.findOne({ email: credentials.email.toLowerCase().trim() }).select("+password")
                    console.log( "User Here !" , newUser);
                    
                    if (!newUser) throw new Error("Invalid E-mail or Password")
                    const isPassValid = await newUser.ComparePass(credentials.password)
                    if (!isPassValid) throw new Error("Invalid E-mail or Password")

                    return { id: newUser._id.toString(), email: newUser.email, name: newUser.name }

                } catch (err) {
                    throw new Error(err.message || "Server Error")
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    jwt: {
        maxAge: 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
            }
            return session
        }

    },
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
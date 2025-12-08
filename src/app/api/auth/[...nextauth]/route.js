import ConnectDB from "@/lib/mongo"
import userSchema from "@/model/user"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";

const authOption = {
    providers: [
        Credentials({
            name: "credentials",
            async authorize(credentials) {
                console.log("Credential Object ", credentials);

                try {
                    await ConnectDB()
                    const User = await userSchema.findOne({ email: credentials.email }).select("+password")
                    if (!User) throw new Error("Invalid E-mail or Password")
                    const isPassValid = await User.ComparePass(credentials.password)
                    if (!isPassValid) throw new Error("Invalid E-mail or Password")

                    return { id: User._id.toString(), email: User.email, name: User.name }

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
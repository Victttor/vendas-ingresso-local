import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkUserPassword, getUserByEmail } from "@/repositorio/user.repo.mjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (credentials?.email && credentials?.password) { 
                    let ok = await checkUserPassword(credentials?.email, credentials?.password);
                    if (ok) {
                        let { password, ...user} = await getUserByEmail(credentials.email);
                        return user;
                    } 
                }
                return null;
            }
        })
    ],
    jwt: {
        secret: process.env.JWT_SECRET
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
        signOut: '/auth/signout',
    },
    events: {
        async signIn(message) {
            console.log('signIn', message)
        },
        async signOut(message) {
            console.log('signOut', message)
        },
        async session(message) {
            console.log('session', message)
        },
        async error(message) {
            console.log('error', message)
        }
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.is_admin = user.is_admin;
            }
            return token
        },
        async session({session, token }) {
            session.user = {};
            session.user.id = token?.id;
            session.user.email = token?.email;
            session.user.first_name = token?.first_name;
            session.user.last_name = token?.last_name;
            session.user.is_admin = token?.is_admin;
            return session;
        }
    }
}

export default NextAuth(authOptions)

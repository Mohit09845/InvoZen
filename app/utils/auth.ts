import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import { prisma } from "./db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
  ],
  pages: {
    verifyRequest: '/verify'  // authjs by default sends it own verify page in magic link(our authentication method) but now we told auth js that go to /verify page after we put email
  }
})
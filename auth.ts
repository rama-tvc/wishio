
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/users"; 


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub, Google, Credentials({
      
    })],
  })
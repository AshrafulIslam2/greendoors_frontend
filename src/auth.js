import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./utils/getUserFromDb";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("🚀 ~ authorize ~ credentials:", credentials);
          const user = await getUserFromDb(
            credentials.email,
            credentials.password
          );
          console.log("user", user);
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          console.error("Error in authorize:", error);
          if (error) {
            throw new Error(error);
          }
          throw new Error("An unexpected error occurred");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        console.log("🚀 ~ jwt ~ user:", user);
        // User is available during sign-in
        token.id = user.user.id;
        token.role = user.user.role;
        token.email = user.user.email;
        token.name = user.user.name;
        token.memberId = user.user.memberId;
        token.nomineeId = user.user.nomineeId;
        token.userPersonalInfo = user.user.userPersonalInfo;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.memberId = token.memberId;
      session.user.nomineeId = token.nomineeId;
      session.user.userPersonalInfo = token.userPersonalInfo;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

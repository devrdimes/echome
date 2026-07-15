import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: "jwt" },
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnApp = nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/personality") ||
        nextUrl.pathname.startsWith("/reflection") ||
        nextUrl.pathname.startsWith("/habits") ||
        nextUrl.pathname.startsWith("/achievements") ||
        nextUrl.pathname.startsWith("/future") ||
        nextUrl.pathname.startsWith("/settings") ||
        nextUrl.pathname.startsWith("/billing");

      if (isOnApp) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        (session.user as any).role = (user as any).role ?? "USER";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthConfig;

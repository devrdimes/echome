import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * Edge-compatible auth config (no Prisma / DB).
 * Used ONLY by middleware. The full config (with adapter) is in config.ts.
 */
export const authConfigEdge = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnApp =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/personality") ||
        nextUrl.pathname.startsWith("/reflection") ||
        nextUrl.pathname.startsWith("/habits") ||
        nextUrl.pathname.startsWith("/achievements") ||
        nextUrl.pathname.startsWith("/future") ||
        nextUrl.pathname.startsWith("/settings") ||
        nextUrl.pathname.startsWith("/billing");

      if (isOnApp) {
        if (isLoggedIn) return true;
        return false; // Redirect to /login
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthConfig;

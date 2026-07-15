import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Edge-compatible auth config (no Prisma / DB).
 * Used ONLY by middleware. The full config (with adapter) is in config.ts.
 */
export const authConfigEdge = {
  trustHost: true,
  session: { strategy: "jwt" },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async () => null, // Never called in edge runtime
    })
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

import NextAuth from "next-auth";
import { authConfigEdge } from "./config.edge";

/**
 * Edge-safe NextAuth instance used by middleware.
 * Does NOT include the Prisma adapter.
 */
export const { auth: authMiddleware } = NextAuth(authConfigEdge);

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    AUTH_SECRET_EXISTS: !!process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID_EXISTS: !!process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET_EXISTS: !!process.env.AUTH_GOOGLE_SECRET,
    DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
    DIRECT_URL_EXISTS: !!process.env.DIRECT_URL,
    NEXTAUTH_URL_EXISTS: !!process.env.NEXTAUTH_URL,
    AUTH_URL_EXISTS: !!process.env.AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  });
}

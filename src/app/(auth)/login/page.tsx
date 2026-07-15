"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Crown, Sparkles, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,33,168,0.08) 0%, transparent 70%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[380px] space-y-7 relative z-10"
        >
          {/* Logo */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7A5B1A] to-[#C9922A] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(201,146,42,0.35)]">
              <Sparkles size={24} className="text-[#FFD878]" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              <span className="hero-gradient-text">Return to Your Kingdom</span>
            </h1>
            <p className="text-[13px] text-white/40">
              Your empire awaits, Ruler.
            </p>
          </div>

          {/* Error Message Display */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-3"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
              <div>
                <p className="font-semibold mb-1 text-red-300">Authentication Failed</p>
                <p className="opacity-80">
                  {error === 'OAuthCallback' ? 'Database connection failed. Please check server logs.' : 
                   error === 'AccessDenied' ? 'Access was denied to your account.' : 
                   `Error code: ${error}`}
                </p>
              </div>
            </motion.div>
          )}

          {/* Divider */}
          <div className="divider-gold" />

          {/* Google Sign In */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white/80 text-[14px] font-medium hover:bg-white/[0.07] hover:border-white/[0.2] transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          <div className="divider-gold" />

          <p className="text-[12px] text-white/30 text-center">
            Don&apos;t have a kingdom?{" "}
            <Link href="/register" className="text-[#F0B429] hover:text-[#FFD878] font-semibold transition-colors">
              Claim yours free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#0F0E13] to-[#1A1825] border-l border-white/[0.05] items-center justify-center p-12"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(107,33,168,0.12) 0%, rgba(15,14,19,1) 70%)" }}
      >
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl mb-8"
          >
            👑
          </motion.div>
          <h2 className="text-3xl font-bold text-white/80 mb-4" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            Welcome Back, Ruler
          </h2>
          <p className="text-white/35 max-w-sm leading-relaxed text-sm">
            Your kingdom has been watching over your progress. Return to discover insights, complete quests, and forge your destiny.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F0E13] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9922A] border-t-transparent animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

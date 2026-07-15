"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Sparkles, Check } from "lucide-react";

const perks = [
  "Free Soul Report every month",
  "Daily quests & habit tracking",
  "Personality trait analysis",
  "AI-powered reflections",
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left perks panel */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#0F0E13] to-[#1A1825] border-r border-white/[0.05] items-center justify-center p-12"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(240,180,41,0.08) 0%, rgba(15,14,19,1) 70%)" }}
      >
        <div>
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl mb-8"
          >
            🏰
          </motion.div>
          <h2 className="text-3xl font-bold text-white/80 mb-3" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            Your Kingdom Awaits
          </h2>
          <p className="text-white/35 max-w-sm leading-relaxed text-sm mb-8">
            Join thousands of Rulers who use Echo AI to understand themselves deeply and build better habits.
          </p>
          <div className="space-y-3">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[rgba(240,180,41,0.15)] border border-[rgba(240,180,41,0.4)] flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-[#F0B429]" />
                </div>
                <span className="text-[13px] text-white/55">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,33,168,0.06) 0%, transparent 70%)" }} />
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
              <span className="hero-gradient-text">Found Your Kingdom</span>
            </h1>
            <p className="text-[13px] text-white/40">
              Begin your reign. Free forever.
            </p>
          </div>

          <div className="divider-gold" />

          {/* Google Sign Up */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white/80 text-[14px] font-medium hover:bg-white/[0.07] hover:border-white/[0.2] transition-all"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </motion.button>

          <p className="text-[11px] text-white/25 text-center leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="divider-gold" />

          <p className="text-[12px] text-white/30 text-center">
            Already a Ruler?{" "}
            <Link href="/login" className="text-[#F0B429] hover:text-[#FFD878] font-semibold transition-colors">
              Return to your kingdom
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

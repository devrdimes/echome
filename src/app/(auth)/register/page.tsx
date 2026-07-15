"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Sparkles, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const perks = [
  "Free Soul Report every month",
  "Daily quests & habit tracking",
  "Personality trait analysis",
  "AI-powered reflections",
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Automatically sign in after successful registration
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/dashboard",
        });

        if (!signInRes?.error) {
          router.push("/dashboard");
        } else {
          setError("Account created but failed to sign in automatically.");
        }
      } else {
        const data = await res.json();
        setError(data.message || "Failed to create account");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-y-auto">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,33,168,0.06) 0%, transparent 70%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[380px] space-y-7 relative z-10 py-10"
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

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-3"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
              <div>
                <p className="font-semibold mb-1 text-red-300">Registration Failed</p>
                <p className="opacity-80">{error}</p>
              </div>
            </motion.div>
          )}

          <div className="divider-gold" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9922A] transition-colors"
                placeholder="King Arthur"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9922A] transition-colors"
                placeholder="ruler@kingdom.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9922A] transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-gradient-to-br from-[#7A5B1A] to-[#C9922A] text-white font-medium shadow-[0_0_20px_rgba(201,146,42,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Forging Crown..." : "Create Account"}
            </motion.button>
          </form>

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

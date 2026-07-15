"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Sparkles, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorParam);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (!res?.error) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
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
                   error}
                </p>
              </div>
            </motion.div>
          )}

          <div className="divider-gold" />

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? "Entering Kingdom..." : "Sign In"}
            </motion.button>
          </form>

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

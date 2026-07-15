"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Target, Zap, BookOpen, Trophy, ArrowRight, Star, Sparkles, Shield, Crown } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } } };

const features = [
  {
    icon: Brain,
    color: "#A855F7",
    glow: "rgba(168,85,247,0.3)",
    title: "Soul Forge",
    desc: "AI-powered personality analysis that transforms your reflections into crystallized self-knowledge.",
  },
  {
    icon: BookOpen,
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.3)",
    title: "Oracle Scrolls",
    desc: "Daily reflections analyzed by ancient AI wisdom. See patterns you never knew existed.",
  },
  {
    icon: Target,
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    title: "Daily Quests",
    desc: "Gamified habit tracking that turns discipline into an addictive daily ritual.",
  },
  {
    icon: Zap,
    color: "#F0B429",
    glow: "rgba(240,180,41,0.3)",
    title: "Fate's Vision",
    desc: "Simulate possible futures based on your personality. Choose your destiny path.",
  },
];

const stats = [
  { value: "∞", label: "Insights Generated" },
  { value: "AAA", label: "Quality UI/UX" },
  { value: "60fps", label: "Buttery Smooth" },
  { value: "AI", label: "Powered Analysis" },
];

export default function LandingPage() {
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div style={{
          background: "radial-gradient(ellipse 120% 60% at 50% -20%, rgba(107,33,168,0.3) 0%, transparent 70%), radial-gradient(ellipse 80% 40% at 80% 100%, rgba(29,78,216,0.15) 0%, transparent 60%), linear-gradient(180deg, #0A080F 0%, #09090B 100%)"
        }} className="absolute inset-0" />
        {/* Stars */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 80% 8%, rgba(255,255,255,0.5), transparent), radial-gradient(1.5px 1.5px at 65% 12%, rgba(255,220,120,0.7), transparent), radial-gradient(1px 1px at 40% 30%, rgba(255,255,255,0.4), transparent)"
        }} />
        {/* Fog */}
        <div className="kingdom-bg__fog absolute inset-0" />
        {/* Castle bottom */}
        <div className="kingdom-bg__silhouette absolute bottom-0 left-0 right-0" style={{ height: "40%", opacity: 0.7 }} />
        {/* Particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 9}%`,
              width: `${1.5 + (i % 3) * 1}px`,
              height: `${1.5 + (i % 3) * 1}px`,
              background: i % 3 === 0 ? "rgba(240,180,41,0.5)" : i % 3 === 1 ? "rgba(168,85,247,0.4)" : "rgba(96,165,250,0.4)",
              animationDuration: `${18 + i * 3}s`,
              animationDelay: `${-i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="container min-h-[90vh] flex flex-col items-center justify-center text-center py-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(240,180,41,0.08)] border border-[rgba(240,180,41,0.2)] mb-8">
              <Sparkles size={12} className="text-[#F0B429] animate-breathe" />
              <span className="text-[11px] text-[#F0B429] tracking-[0.15em] uppercase font-semibold">
                Kingdom Control Center
              </span>
              <Sparkles size={12} className="text-[#F0B429] animate-breathe" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-kingdom), serif" }}
          >
            <span className="hero-gradient-text">Know Thyself.</span>
            <br />
            <span className="text-white/85">Build Your Empire.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Echo AI is the world&apos;s first Kingdom-grade personality dashboard.
            Forge your soul, master your habits, and simulate your destiny.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register" className="btn-gold text-sm px-8 py-3">
              <Crown size={15} />
              Claim Your Kingdom — Free
            </Link>
            <Link href="/login" className="btn-stone text-sm px-8 py-3">
              Sign In to Your Realm
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-4 gap-8 mt-20 max-w-2xl mx-auto"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-black text-[#F0B429] mb-1"
                  style={{ fontFamily: "var(--font-kingdom), serif", textShadow: "0 0 20px rgba(240,180,41,0.5)" }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] text-white/30 tracking-[0.12em] uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="container py-24">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.2)] mb-5">
                <span className="text-[10px] text-[#A855F7] tracking-[0.15em] uppercase font-semibold">Powers of the Kingdom</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-white/90"
                style={{ fontFamily: "var(--font-kingdom), serif" }}
              >
                Four Ancient Arts
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="card-stone p-6 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: `${f.color}15`,
                      border: `1px solid ${f.color}40`,
                      boxShadow: `0 0 24px ${f.glow}`,
                    }}
                  >
                    <f.icon size={24} style={{ color: f.color }} />
                  </div>
                  <h3
                    className="text-[16px] font-bold mb-2"
                    style={{ color: f.color, fontFamily: "var(--font-kingdom), serif" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-white/45 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA SECTION */}
        <section className="container py-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl p-12 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(107,33,168,0.2) 0%, rgba(20,18,30,0.98) 50%, rgba(201,146,42,0.12) 100%)",
              border: "1px solid rgba(201,146,42,0.25)",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(168,85,247,0.04) 25%, transparent 50%, rgba(240,180,41,0.04) 75%, transparent 100%)" }}
            />
            <Crown size={40} className="text-[#F0B429] mx-auto mb-5 animate-breathe" />
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 hero-gradient-text"
              style={{ fontFamily: "var(--font-kingdom), serif" }}
            >
              Your Kingdom Awaits
            </h2>
            <p className="text-white/45 text-lg mb-8 max-w-lg mx-auto">
              Join the realm. Know yourself at the deepest level. Build habits that forge an empire.
            </p>
            <Link href="/register" className="btn-gold inline-flex text-base px-10 py-4">
              <Sparkles size={16} />
              Begin Your Reign — Free
              <ArrowRight size={15} />
            </Link>
            <p className="text-[11px] text-white/25 mt-4">No credit card required. Free forever plan available.</p>
          </motion.div>
        </section>
      </div>
    </>
  );
}

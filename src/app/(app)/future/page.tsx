"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, ArrowRight, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

const scenarios = [
  {
    title: "Career Mastery",
    desc: "If I focus on my craft for 6 months straight, what could I achieve?",
    icon: "⚔️",
    color: "#F0B429",
    locked: false,
  },
  {
    title: "Relationship Depth",
    desc: "How would daily vulnerability practice transform my connections?",
    icon: "❤️",
    color: "#EF4444",
    locked: true,
  },
  {
    title: "Health Transformation",
    desc: "If I honor my body as a temple for 90 days, what changes?",
    icon: "💪",
    color: "#10B981",
    locked: true,
  },
];

export default function FuturePage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px] space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(240,180,41,0.3)]" />
          <span className="text-[10px] text-[#F0B429]/60 tracking-[0.2em] uppercase">Oracle&apos;s Vision Chamber</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(240,180,41,0.3)]" />
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          <span className="text-[#F0B429]">Fate&apos;s Vision</span>
        </h1>
        <p className="text-white/40 mt-2 text-sm">Simulate possible futures. Choose your destiny path.</p>
      </motion.div>

      {/* Upgrade note for free users */}
      <motion.div variants={item}>
        <div className="card-stone p-5 border-[rgba(240,180,41,0.2)] flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(240,180,41,0.1)] border border-[rgba(240,180,41,0.3)] flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-[#F0B429]" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-white/80 mb-1">Pro Feature Required</p>
            <p className="text-[12px] text-white/40 leading-relaxed">
              The Future Simulator requires an active Soul Report. Generate your personality report first, then unlock destiny paths.
            </p>
          </div>
          <Link href="/personality" className="btn-gold text-[11px] py-2 px-4 flex-shrink-0">
            Forge Report
          </Link>
        </div>
      </motion.div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scenarios.map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={!s.locked ? { scale: 1.03, y: -4 } : {}}
            className={`card-stone p-6 cursor-pointer relative overflow-hidden ${s.locked ? "opacity-50" : ""}`}
          >
            {s.locked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[12px] z-10 backdrop-blur-[2px]">
                <div className="text-center">
                  <span className="text-3xl block mb-2">🔒</span>
                  <p className="text-[11px] text-white/50">Requires Soul Report</p>
                </div>
              </div>
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}40`, boxShadow: `0 0 20px ${s.color}20` }}
            >
              {s.icon}
            </div>
            <h3 className="text-[15px] font-bold mb-2" style={{ color: s.color, fontFamily: "var(--font-kingdom), serif" }}>
              {s.title}
            </h3>
            <p className="text-[12px] text-white/45 leading-relaxed mb-4">{s.desc}</p>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: s.color }}>
              Simulate Fate <ArrowRight size={12} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <motion.div variants={item} className="card-stone p-6">
        <h2 className="text-[15px] font-bold text-white/80 mb-5" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          How Fate&apos;s Vision Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "01", icon: "🔮", title: "Choose a Path", desc: "Select a life scenario you want to simulate." },
            { step: "02", icon: "🧠", title: "AI Reads Your Soul", desc: "The oracle uses your personality traits and habits as input." },
            { step: "03", icon: "✨", title: "See Your Fate", desc: "Receive a probabilistic future vision with branches and outcomes." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4">
              <div>
                <div className="text-[10px] font-bold text-[#F0B429]/50 mb-2">{s.step}</div>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-[13px] font-bold text-white/75 mb-1" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                  {s.title}
                </div>
                <div className="text-[11px] text-white/35 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

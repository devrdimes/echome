"use client";

import { motion } from "framer-motion";
import { Brain, Upload, FileText, Sparkles, ArrowRight, Zap, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

const traits = [
  { label: "Communication", score: 0, icon: "💬", color: "#A855F7" },
  { label: "Leadership", score: 0, icon: "⚔️", color: "#F0B429" },
  { label: "Emotional IQ", score: 0, icon: "❤️", color: "#EF4444" },
  { label: "Creativity", score: 0, icon: "✨", color: "#60A5FA" },
  { label: "Resilience", score: 0, icon: "🛡️", color: "#10B981" },
  { label: "Focus", score: 0, icon: "🎯", color: "#F97316" },
];

function TraitOrb({ label, score, icon, color }: typeof traits[0]) {
  return (
    <motion.div variants={item} className="card-stone p-4 text-center group hover:scale-105 transition-transform duration-300">
      <div
        className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color}20, ${color}08)`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 20px ${color}20`,
        }}
      >
        {icon}
      </div>
      <div className="text-[11px] text-white/40 tracking-wide mb-2">{label}</div>
      {/* Ring gauge */}
      <div className="relative w-10 h-10 mx-auto">
        <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <motion.circle
            cx="18" cy="18" r="15" fill="none"
            stroke={color} strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${Math.round((score / 100) * 94.2)} 94.2`}
            initial={{ strokeDasharray: "0 94.2" }}
            animate={{ strokeDasharray: `${Math.round((score / 100) * 94.2)} 94.2` }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PersonalityPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px] space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(168,85,247,0.3)]" />
          <span className="text-[10px] text-[#A855F7]/60 tracking-[0.2em] uppercase">Soul Analysis Chamber</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(168,85,247,0.3)]" />
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          <span className="text-[#A855F7]">Soul Forge</span>
        </h1>
        <p className="text-white/40 mt-2 text-sm">Transmute your experiences into crystallized wisdom and self-knowledge.</p>
      </motion.div>

      {/* Trait Grid */}
      <motion.div variants={container} className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {traits.map((t, i) => <TraitOrb key={i} {...t} />)}
      </motion.div>

      {/* Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Generate Panel */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="card-royal p-7 h-full flex flex-col">
            {/* Empty state */}
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#4040C2] to-[#6B21A8] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(107,33,168,0.4)]"
              >
                <Brain size={40} className="text-white/90" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-3 text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                Your Soul Awaits Forging
              </h2>
              <p className="text-white/40 text-sm max-w-md leading-relaxed mb-8">
                The AI sages require your wisdom — share reflections, writings, or conversations to begin analyzing your personality traits.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/personality/sources" className="btn-gold">
                  <Upload size={14} />
                  Add Sources
                </Link>
                <button className="btn-stone">
                  <Sparkles size={14} />
                  Generate Report
                </button>
              </div>
            </div>

            {/* Process steps */}
            <div className="border-t border-white/[0.06] pt-5 mt-5">
              <p className="text-[11px] text-white/30 tracking-[0.15em] uppercase mb-4">How The Forge Works</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: "01", label: "Add Sources", desc: "Journals, chats, writings" },
                  { step: "02", label: "AI Analysis", desc: "Traits extracted by magic" },
                  { step: "03", label: "Soul Report", desc: "Your personality crystal" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="text-[11px] font-bold text-[#A855F7]/60 mb-1">{s.step}</div>
                    <div className="text-[12px] font-semibold text-white/70 mb-0.5">{s.label}</div>
                    <div className="text-[10px] text-white/30">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side panel */}
        <motion.div variants={item} className="space-y-4">
          {/* Usage */}
          <div className="card-stone p-5">
            <h3 className="text-[13px] font-bold text-white/70 mb-4" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              Forge Capacity
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[11px] text-white/40">Reports This Month</span>
                  <span className="text-[11px] text-white/60 font-semibold">0/1</span>
                </div>
                <div className="progress-magic">
                  <motion.div className="progress-magic__fill" initial={{ width: "0%" }} animate={{ width: "0%" }} />
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.2)]">
              <p className="text-[10px] text-[#A855F7]/80 leading-relaxed">
                Free plan includes 1 report/month. Upgrade to Pro for 5 reports and deeper analysis.
              </p>
              <Link href="/billing" className="text-[11px] text-[#A855F7] font-semibold flex items-center gap-1 mt-2 hover:text-[#C084FC] transition-colors">
                Upgrade Kingdom <ChevronRight size={11} />
              </Link>
            </div>
          </div>

          {/* Recent reports placeholder */}
          <div className="card-stone p-5">
            <h3 className="text-[13px] font-bold text-white/70 mb-3" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              Ancient Records
            </h3>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <FileText size={28} className="text-white/15 mb-3" />
              <p className="text-[12px] text-white/25">No reports forged yet</p>
              <p className="text-[10px] text-white/15 mt-1">Your history will appear here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

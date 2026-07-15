"use client";

import { motion } from "framer-motion";
import { BookOpen, Smile, Meh, Frown, TrendingUp, Calendar, Pen, ChevronRight } from "lucide-react";
import Link from "next/link";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

const moods = [
  { id: "VERY_HIGH", icon: "😄", label: "Legendary", color: "#10B981" },
  { id: "HIGH", icon: "😊", label: "Good", color: "#60A5FA" },
  { id: "NEUTRAL", icon: "😐", label: "Neutral", color: "#F0B429" },
  { id: "LOW", icon: "😔", label: "Weary", color: "#F97316" },
  { id: "VERY_LOW", icon: "😞", label: "Fallen", color: "#EF4444" },
];

export default function ReflectionPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px] space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(96,165,250,0.3)]" />
          <span className="text-[10px] text-[#60A5FA]/60 tracking-[0.2em] uppercase">Ancient Oracle Chamber</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(96,165,250,0.3)]" />
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          <span className="text-[#60A5FA]">Oracle Scrolls</span>
        </h1>
        <p className="text-white/40 mt-2 text-sm">Record your thoughts. The Oracle reads between the lines.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Write Panel */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="card-royal p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.3)] flex items-center justify-center">
                <Pen size={16} className="text-[#60A5FA]" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                  Today&apos;s Scroll
                </h2>
                <p className="text-[10px] text-white/30">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            {/* Mood selector */}
            <div className="mb-5">
              <p className="text-[11px] text-white/40 tracking-wide mb-3">How is your spirit today?</p>
              <div className="flex gap-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    className="flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-opacity-60 transition-all group"
                    style={{ ['--hover-color' as any]: m.color }}
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform">{m.icon}</span>
                    <span className="text-[9px] text-white/30 group-hover:text-white/60 transition-colors">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text area */}
            <div className="relative">
              <textarea
                placeholder="Let the Oracle hear your thoughts... What happened today? How do you feel? What are you grateful for?"
                className="w-full min-h-[200px] p-4 rounded-xl border bg-white/[0.02] border-white/[0.07] text-white/70 text-sm placeholder:text-white/20 focus:outline-none focus:border-[rgba(96,165,250,0.4)] focus:bg-white/[0.03] transition-all resize-none leading-relaxed"
              />
              {/* Subtle rune corner decorations */}
              <div className="absolute top-3 right-3 text-[#60A5FA]/15 text-xs font-bold select-none pointer-events-none">
                ◈
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-[11px] text-white/25">Min 10 characters for AI analysis</span>
              <button className="btn-gold">
                <BookOpen size={14} />
                Seal the Scroll
              </button>
            </div>
          </div>
        </motion.div>

        {/* Side panel */}
        <motion.div variants={item} className="space-y-4">
          {/* Stats */}
          <div className="card-stone p-5">
            <h3 className="text-[13px] font-bold text-white/70 mb-4" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              Scroll Records
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Scrolls", value: "0", icon: BookOpen, color: "#60A5FA" },
                { label: "This Month", value: "0", icon: Calendar, color: "#A855F7" },
                { label: "AI Analyzed", value: "0", icon: TrendingUp, color: "#F0B429" },
                { label: "Avg. Mood", value: "—", icon: Smile, color: "#10B981" },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center">
                  <s.icon size={16} className="mx-auto mb-1.5" style={{ color: s.color }} />
                  <div className="text-[16px] font-bold" style={{ color: s.color, fontFamily: "var(--font-kingdom), serif" }}>
                    {s.value}
                  </div>
                  <div className="text-[9px] text-white/30 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent */}
          <div className="card-stone p-5">
            <h3 className="text-[13px] font-bold text-white/70 mb-3" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              Past Scrolls
            </h3>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <BookOpen size={28} className="text-white/15 mb-3" />
              <p className="text-[12px] text-white/25">No scrolls written yet</p>
              <p className="text-[10px] text-white/15 mt-1">Begin your chronicle today</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Target, Plus, Flame, CheckCircle2, Calendar, Award, ChevronRight, Swords } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

const habitTemplates = [
  { icon: "🌅", name: "Morning Ritual", cadence: "Daily", color: "#F97316" },
  { icon: "📚", name: "Read for 30 min", cadence: "Daily", color: "#60A5FA" },
  { icon: "🧘", name: "Meditate", cadence: "Daily", color: "#A855F7" },
  { icon: "💪", name: "Exercise", cadence: "Daily", color: "#10B981" },
  { icon: "📖", name: "Evening Journal", cadence: "Daily", color: "#F0B429" },
  { icon: "💧", name: "Drink 8 glasses", cadence: "Daily", color: "#60A5FA" },
];

export default function HabitsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px] space-y-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[rgba(16,185,129,0.3)]" />
            <span className="text-[10px] text-[#10B981]/60 tracking-[0.2em] uppercase">Quest Forge</span>
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            <span className="text-[#10B981]">Daily Quests</span>
          </h1>
          <p className="text-white/40 mt-2 text-sm">Forge iron discipline. Build your empire one habit at a time.</p>
        </div>
        <button className="btn-gold mt-2">
          <Plus size={14} />
          New Quest
        </button>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={container} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Quests", value: "0", icon: Target, color: "#10B981" },
          { label: "Completed Today", value: "0", icon: CheckCircle2, color: "#F0B429" },
          { label: "Best Streak", value: "0 days", icon: Flame, color: "#F97316" },
          { label: "Total Done", value: "0", icon: Award, color: "#A855F7" },
        ].map((s, i) => (
          <motion.div key={i} variants={item} className="card-stone p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}40` }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-[18px] font-bold" style={{ color: s.color, fontFamily: "var(--font-kingdom), serif" }}>
                {s.value}
              </div>
              <div className="text-[10px] text-white/35">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Empty state / quest list */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="card-royal p-7 h-full flex flex-col items-center justify-center text-center py-12">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
            >
              <Swords size={36} className="text-white/90" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-3 text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              Your Quest Log is Empty
            </h2>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-8">
              Great kingdoms are built on daily discipline. Choose a quest below or create your own to begin your conquest.
            </p>
            <button className="btn-gold">
              <Plus size={14} />
              Create My First Quest
            </button>
          </div>
        </motion.div>

        {/* Templates */}
        <motion.div variants={item}>
          <div className="card-stone p-5 h-full">
            <h3 className="text-[13px] font-bold text-white/70 mb-4" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              ⚔️ Quest Templates
            </h3>
            <div className="space-y-2.5">
              {habitTemplates.map((h, i) => (
                <motion.button
                  key={i}
                  variants={item}
                  whileHover={{ x: 4 }}
                  className="w-full quest-scroll flex items-center gap-3 text-left group"
                >
                  <span className="text-xl flex-shrink-0">{h.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-white/75 group-hover:text-white/90 transition-colors">
                      {h.name}
                    </div>
                    <div className="text-[9px] text-white/30 mt-0.5 flex items-center gap-1">
                      <Calendar size={8} />
                      {h.cadence}
                    </div>
                  </div>
                  <Plus size={13} className="text-white/20 group-hover:text-[#10B981] transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

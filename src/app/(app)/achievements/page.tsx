"use client";

import { motion } from "framer-motion";
import { Trophy, Lock, Star, Zap, Flame, BookOpen, Target, Share2 } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } } };

const achievements = [
  {
    id: "FIRST_REPORT",
    icon: "📜",
    name: "The First Chronicle",
    desc: "Generate your first personality report",
    xp: 500,
    rarity: "Common",
    unlocked: false,
    category: "Personality",
  },
  {
    id: "STREAK_7",
    icon: "🔥",
    name: "Week of Fire",
    desc: "Maintain a 7-day reflection streak",
    xp: 750,
    rarity: "Uncommon",
    unlocked: false,
    category: "Streaks",
  },
  {
    id: "STREAK_30",
    icon: "⚡",
    name: "Month of Storms",
    desc: "Maintain a 30-day streak",
    xp: 2000,
    rarity: "Rare",
    unlocked: false,
    category: "Streaks",
  },
  {
    id: "REFLECTION_10",
    icon: "🔮",
    name: "Oracle's Apprentice",
    desc: "Write 10 reflections",
    xp: 600,
    rarity: "Common",
    unlocked: false,
    category: "Reflection",
  },
  {
    id: "HABIT_MASTER",
    icon: "⚔️",
    name: "Habit Knight",
    desc: "Complete 100 habit logs",
    xp: 1500,
    rarity: "Rare",
    unlocked: false,
    category: "Habits",
  },
  {
    id: "EARLY_ADOPTER",
    icon: "👑",
    name: "Founding Ruler",
    desc: "One of the first to join the kingdom",
    xp: 1000,
    rarity: "Legendary",
    unlocked: true,
    category: "Special",
  },
  {
    id: "GOAL_REACHED",
    icon: "🏆",
    name: "Destiny Fulfilled",
    desc: "Complete your first goal",
    xp: 800,
    rarity: "Uncommon",
    unlocked: false,
    category: "Goals",
  },
  {
    id: "SHARED_REPORT",
    icon: "🌟",
    name: "Herald of Truth",
    desc: "Share your personality report",
    xp: 400,
    rarity: "Common",
    unlocked: false,
    category: "Social",
  },
];

const rarityColors: Record<string, { color: string; glow: string; bg: string }> = {
  Common:    { color: "#9CA3AF", glow: "rgba(156,163,175,0.3)", bg: "rgba(156,163,175,0.08)" },
  Uncommon:  { color: "#60A5FA", glow: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.08)" },
  Rare:      { color: "#A855F7", glow: "rgba(168,85,247,0.4)",  bg: "rgba(168,85,247,0.1)" },
  Legendary: { color: "#F0B429", glow: "rgba(240,180,41,0.5)",  bg: "rgba(240,180,41,0.1)" },
};

export default function AchievementsPage() {
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1200px] space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(240,180,41,0.3)]" />
          <span className="text-[10px] text-[#F0B429]/60 tracking-[0.2em] uppercase">Hall of Glory</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(240,180,41,0.3)]" />
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          <span className="hero-gradient-text">Achievements</span>
        </h1>
        <p className="text-white/40 mt-2 text-sm">
          {unlocked}/{achievements.length} achievements unlocked · Prove your worth to the kingdom
        </p>
      </motion.div>

      {/* Progress overview */}
      <motion.div variants={item} className="card-stone p-6">
        <div className="flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(240,180,41,0.15), rgba(240,180,41,0.05))", border: "1px solid rgba(240,180,41,0.3)", boxShadow: "0 0 30px rgba(240,180,41,0.15)" }}
          >
            🏆
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                Total Progress
              </h2>
              <span className="level-badge">
                <Trophy size={10} />
                {unlocked} Unlocked
              </span>
            </div>
            <div className="progress-magic mb-1.5">
              <motion.div
                className="progress-magic__fill"
                initial={{ width: "0%" }}
                animate={{ width: `${(unlocked / achievements.length) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] text-white/30">
                {unlocked} of {achievements.length} achievements
              </span>
              <span className="text-[11px] text-[#F0B429]/70 font-semibold">
                {achievements.filter(a => a.unlocked).reduce((s, a) => s + a.xp, 0)} XP earned
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievement Grid */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((a) => {
          const rarity = rarityColors[a.rarity] ?? rarityColors["Common"]!;
          return (
            <motion.div
              key={a.id}
              variants={item}
              whileHover={{ scale: 1.03, y: -3 }}
              className={`achievement-card ${a.unlocked ? "unlocked" : ""} cursor-pointer group`}
              style={a.unlocked ? {
                border: `1px solid ${rarity.color}50`,
                boxShadow: `0 0 0 1px ${rarity.color}15, 0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${rarity.glow}`,
              } : {}}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-3xl mx-auto transition-all duration-300`}
                style={a.unlocked ? {
                  background: rarity.bg,
                  border: `1px solid ${rarity.color}40`,
                  boxShadow: `0 0 20px ${rarity.glow}`,
                } : {
                  background: "rgba(255,255,255,0.03)",
                  filter: "grayscale(1)",
                  opacity: 0.3,
                }}
              >
                {a.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="text-[10px] font-bold tracking-[0.1em] uppercase mb-1" style={{ color: rarity.color }}>
                  {a.rarity}
                </div>
                <h3
                  className={`text-[13px] font-bold mb-1.5 ${a.unlocked ? "text-white/90" : "text-white/25"}`}
                  style={{ fontFamily: a.unlocked ? "var(--font-kingdom), serif" : "inherit" }}
                >
                  {a.name}
                </h3>
                <p className={`text-[11px] leading-relaxed ${a.unlocked ? "text-white/45" : "text-white/20"}`}>
                  {a.desc}
                </p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {a.unlocked ? (
                    <>
                      <Zap size={11} className="text-[#F0B429]" />
                      <span className="text-[11px] font-bold text-[#F0B429]">+{a.xp} XP</span>
                    </>
                  ) : (
                    <>
                      <Lock size={11} className="text-white/20" />
                      <span className="text-[11px] text-white/20">Locked</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

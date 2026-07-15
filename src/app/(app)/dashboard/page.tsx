"use client";

import { motion } from "framer-motion";
import {
  Brain, BookOpen, Target, Trophy, Flame, Star,
  TrendingUp, Zap, Clock, CheckCircle2, Circle,
  ChevronRight, Crown, Sparkles, Shield, Swords,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({
  label,
  value,
  icon: Icon,
  color = "gold",
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color?: "gold" | "purple" | "blue" | "emerald";
  sub?: string;
}) {
  const orbClass = `stat-orb ${color !== "gold" ? color : ""}`;
  return (
    <motion.div variants={item} className="card-stone p-5 flex items-start gap-4">
      <div className={orbClass}>
        <Icon size={20} className="text-current" style={{ color: getOrbColor(color) }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-white/40 tracking-[0.12em] uppercase truncate">{label}</p>
        <motion.p
          className="text-2xl font-bold mt-0.5"
          style={{
            fontFamily: "var(--font-kingdom), serif",
            color: getOrbColor(color),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {value}
        </motion.p>
        {sub && <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

function getOrbColor(c: string) {
  switch (c) {
    case "purple": return "#A855F7";
    case "blue":   return "#60A5FA";
    case "emerald":return "#10B981";
    default:       return "#F0B429";
  }
}

/* ============================================================
   QUEST ITEM
   ============================================================ */
function QuestItem({
  title,
  reward,
  xp,
  complete,
  difficulty,
}: {
  title: string;
  reward: string;
  xp: number;
  complete: boolean;
  difficulty: "easy" | "normal" | "hard";
}) {
  const diffColor = { easy: "#10B981", normal: "#F0B429", hard: "#EF4444" };
  const diffLabel = { easy: "Novice", normal: "Adept", hard: "Legend" };

  return (
    <motion.div
      variants={item}
      className="quest-scroll flex items-center gap-4 cursor-pointer group"
      whileHover={{ x: 4 }}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
        complete
          ? "bg-[rgba(16,185,129,0.15)] border-emerald-500/40"
          : "bg-white/[0.03] border-white/10 group-hover:border-[rgba(240,180,41,0.4)]"
      }`}>
        {complete
          ? <CheckCircle2 size={16} className="text-emerald-400" />
          : <Circle size={16} className="text-white/20" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-medium ${complete ? "line-through text-white/30" : "text-white/80"}`}>
          {title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[9px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 rounded"
            style={{ color: diffColor[difficulty], background: `${diffColor[difficulty]}18` }}
          >
            {diffLabel[difficulty]}
          </span>
          <span className="text-[10px] text-white/30">+{xp} XP</span>
          <span className="text-[10px] text-white/30">· {reward}</span>
        </div>
      </div>
      <ChevronRight size={14} className="text-white/20 group-hover:text-[#F0B429] transition-colors" />
    </motion.div>
  );
}

/* ============================================================
   ACHIEVEMENT MINI
   ============================================================ */
function AchievementMini({
  icon,
  name,
  unlocked,
}: {
  icon: string;
  name: string;
  unlocked: boolean;
}) {
  return (
    <motion.div
      variants={item}
      className={`achievement-card flex items-center gap-3 cursor-pointer ${unlocked ? "unlocked" : ""}`}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
          unlocked
            ? "bg-[rgba(240,180,41,0.1)] shadow-[0_0_16px_rgba(240,180,41,0.25)]"
            : "bg-white/[0.04] opacity-40 grayscale"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className={`text-[12px] font-semibold ${unlocked ? "text-[#F0B429]" : "text-white/30"}`}
          style={{ fontFamily: unlocked ? "var(--font-kingdom), serif" : "inherit" }}
        >
          {name}
        </p>
        <p className="text-[10px] text-white/25 mt-0.5">
          {unlocked ? "✦ Unlocked" : "Locked"}
        </p>
      </div>
      {unlocked && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="ml-auto"
        >
          <Star size={14} className="text-[#F0B429] opacity-60" />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Dawn of a New Day" : hour < 18 ? "The Kingdom Awaits" : "The Night is Young";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(201,146,42,0.3)]" />
        <span className="text-[10px] text-[#F0B429]/60 tracking-[0.2em] uppercase font-medium">
          {greeting}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(201,146,42,0.3)]" />
      </div>
      <h1
        className="text-4xl md:text-5xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-kingdom), serif" }}
      >
        <span className="hero-gradient-text">Welcome, Ruler</span>
      </h1>
      <p className="text-white/40 mt-2 text-sm tracking-wide">
        Your kingdom&apos;s intelligence grows stronger with every reflection.
      </p>
    </motion.div>
  );
}

/* ============================================================
   MAGIC PROGRESS BAR COMPONENT
   ============================================================ */
function MagicBar({
  label,
  value,
  max,
  variant = "",
}: {
  label: string;
  value: number;
  max: number;
  variant?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] text-white/40 tracking-wide">{label}</span>
        <span className="text-[11px] font-semibold text-white/60">
          {value}/{max}
        </span>
      </div>
      <div className={`progress-magic ${variant}`}>
        <motion.div
          className="progress-magic__fill"
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   FEATURE CARD
   ============================================================ */
function FeatureCard({
  href,
  icon: Icon,
  title,
  desc,
  cta,
  accentColor,
  glowColor,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  cta: string;
  accentColor: string;
  glowColor: string;
}) {
  return (
    <motion.div variants={item}>
      <Link href={href} className="block group">
        <div className="card-stone p-6 h-full transition-all duration-300 group-hover:border-opacity-60"
          style={{ '--hover-glow': glowColor } as React.CSSProperties}
        >
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}40` }}
          >
            <Icon size={20} style={{ color: accentColor }} />
          </div>

          {/* Content */}
          <h3
            className="text-[15px] font-bold mb-1.5"
            style={{
              fontFamily: "var(--font-kingdom), serif",
              color: accentColor,
            }}
          >
            {title}
          </h3>
          <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold"
            style={{ color: accentColor }}
          >
            {cta}
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Bottom glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   MAIN DASHBOARD
   ============================================================ */
export default function DashboardPage() {
  const dailyQuests = [
    { title: "Write your morning reflection", reward: "🪙 50 Gold", xp: 100, complete: false, difficulty: "easy" as const },
    { title: "Complete a personality session", reward: "🔮 Soul Stone", xp: 250, complete: false, difficulty: "normal" as const },
    { title: "Log 3 habits before noon", reward: "🪙 75 Gold", xp: 150, complete: false, difficulty: "normal" as const },
    { title: "Run the Future Simulator", reward: "⚡ Power Shard", xp: 300, complete: false, difficulty: "hard" as const },
  ];

  const achievements = [
    { icon: "⚔️", name: "First Battle", unlocked: false },
    { icon: "📜", name: "Scholar", unlocked: false },
    { icon: "🔥", name: "7-Day Fire", unlocked: false },
    { icon: "👑", name: "Early Adopter", unlocked: false },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] space-y-8"
    >
      {/* HERO */}
      <HeroGreeting />

      {/* STAT CARDS */}
      <motion.div
        variants={container}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard label="Total XP" value="0" icon={Zap} color="gold" sub="Begin your journey" />
        <StatCard label="Day Streak" value="0" icon={Flame} color="purple" sub="Start today!" />
        <StatCard label="Reports" value="0" icon={Brain} color="blue" sub="Generate insight" />
        <StatCard label="Habits Active" value="0" icon={Target} color="emerald" sub="Build your kingdom" />
      </motion.div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Daily Quests */}
        <motion.div variants={item} className="lg:col-span-1">
          <div className="card-royal p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="text-[15px] font-bold text-[#F0B429]"
                  style={{ fontFamily: "var(--font-kingdom), serif" }}
                >
                  Daily Quests
                </h2>
                <p className="text-[10px] text-white/30 mt-0.5 tracking-wide">
                  0 of {dailyQuests.length} completed
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[rgba(240,180,41,0.08)] border border-[rgba(240,180,41,0.2)]">
                <Clock size={11} className="text-[#F0B429]" />
                <span className="text-[10px] text-[#F0B429] font-medium">Resets Daily</span>
              </div>
            </div>

            {/* Progress */}
            <MagicBar label="Quest Progress" value={0} max={dailyQuests.length} />

            <div className="divider-gold" />

            {/* Quests */}
            <motion.div variants={container} className="space-y-3">
              {dailyQuests.map((q, i) => (
                <QuestItem key={i} {...q} />
              ))}
            </motion.div>

            {/* Reward preview */}
            <div className="mt-5 p-3 rounded-lg bg-[rgba(240,180,41,0.06)] border border-[rgba(240,180,41,0.15)] text-center">
              <p className="text-[10px] text-white/35 mb-0.5">Complete all quests to earn</p>
              <p className="text-[13px] font-bold text-[#F0B429]" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                🏆 800 XP + Daily Chest
              </p>
            </div>
          </div>
        </motion.div>

        {/* CENTER: Kingdom Features */}
        <motion.div variants={container} className="lg:col-span-2 space-y-6">

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              href="/personality"
              icon={Brain}
              title="Soul Forge"
              desc="Unlock the hidden depths of your personality with AI-powered trait analysis."
              cta="Forge Your Soul"
              accentColor="#A855F7"
              glowColor="rgba(168,85,247,0.15)"
            />
            <FeatureCard
              href="/reflection"
              icon={BookOpen}
              title="Oracle Scrolls"
              desc="Journal your thoughts and receive ancient AI wisdom in return."
              cta="Open the Scrolls"
              accentColor="#60A5FA"
              glowColor="rgba(96,165,250,0.15)"
            />
            <FeatureCard
              href="/habits"
              icon={Target}
              title="Daily Quests"
              desc="Build life-changing habits through gamified daily challenges."
              cta="Claim Your Quest"
              accentColor="#10B981"
              glowColor="rgba(16,185,129,0.15)"
            />
            <FeatureCard
              href="/future"
              icon={Zap}
              title="Fate's Vision"
              desc="Simulate possible futures and map your path to destiny."
              cta="See Your Fate"
              accentColor="#F0B429"
              glowColor="rgba(240,180,41,0.15)"
            />
          </div>

          {/* Season / Progress panel */}
          <motion.div variants={item} className="card-stone p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="text-[15px] font-bold text-white/90"
                  style={{ fontFamily: "var(--font-kingdom), serif" }}
                >
                  Season of Awakening
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">Summer 2026 — Rank up before it ends</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={16} className="text-[#A855F7]" />
                <span className="text-[12px] text-[#A855F7] font-semibold">Bronze Tier</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <MagicBar label="Season XP" value={0} max={5000} variant="progress-xp" />
              <MagicBar label="Reports Generated" value={0} max={5} variant="progress-blue" />
              <MagicBar label="Habits Completed" value={0} max={30} variant="progress-emerald" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { tier: "Bronze", icon: "🥉", unlocked: true },
                { tier: "Silver", icon: "🥈", unlocked: false },
                { tier: "Gold", icon: "🥇", unlocked: false },
              ].map((t) => (
                <div
                  key={t.tier}
                  className={`text-center p-3 rounded-lg border transition-all ${
                    t.unlocked
                      ? "bg-[rgba(205,127,50,0.1)] border-[rgba(205,127,50,0.3)]"
                      : "bg-white/[0.02] border-white/[0.06] opacity-40"
                  }`}
                >
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <p className="text-[10px] font-semibold text-white/50">{t.tier}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ACHIEVEMENTS STRIP */}
      <motion.div variants={item} className="card-stone p-6">
        <div className="flex items-center justify-between mb-5">
          <h2
            className="text-[15px] font-bold text-white/90"
            style={{ fontFamily: "var(--font-kingdom), serif" }}
          >
            Hall of Glory
          </h2>
          <Link
            href="/achievements"
            className="text-[12px] text-[#F0B429] hover:text-[#FFD878] flex items-center gap-1 transition-colors"
          >
            View All <ArrowUpRight size={12} />
          </Link>
        </div>
        <motion.div variants={container} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map((a, i) => (
            <AchievementMini key={i} {...a} />
          ))}
        </motion.div>
      </motion.div>

      {/* BOTTOM CTA */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(107,33,168,0.2) 0%, rgba(26,24,37,0.95) 50%, rgba(201,146,42,0.1) 100%)",
          border: "1px solid rgba(201,146,42,0.2)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, rgba(168,85,247,0.04) 25%, transparent 50%, rgba(240,180,41,0.04) 75%, transparent 100%)",
          }}
        />
        <Sparkles size={32} className="text-[#F0B429] mx-auto mb-4 animate-breathe" />
        <h3
          className="text-2xl font-bold mb-2 hero-gradient-text"
          style={{ fontFamily: "var(--font-kingdom), serif" }}
        >
          Begin Your First Conquest
        </h3>
        <p className="text-white/45 text-sm mb-6 max-w-md mx-auto">
          Generate your first Soul Report and unlock your true personality traits. The AI awaits your command.
        </p>
        <Link href="/personality" className="btn-gold inline-flex">
          <Brain size={15} />
          Forge My Soul Report
        </Link>
      </motion.div>
    </motion.div>
  );
}

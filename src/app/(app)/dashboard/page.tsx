"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Brain, BookOpen, Target, Trophy, Flame, Star, Zap, Clock,
  CheckCircle2, Circle, ChevronRight, Crown, Sparkles, Shield,
  ArrowUpRight, Swords, TrendingUp,
} from "lucide-react";
import Link from "next/link";

// ─── Animation presets ─────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

// ─── 3D Tilt Card wrapper ─────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1000, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
const COLORS: Record<string, { base: string; glow: string; bg: string }> = {
  gold:    { base: "#F0B429", glow: "rgba(240,180,41,0.4)",  bg: "rgba(240,180,41,0.06)" },
  purple:  { base: "#A855F7", glow: "rgba(168,85,247,0.4)",  bg: "rgba(168,85,247,0.06)" },
  blue:    { base: "#60A5FA", glow: "rgba(96,165,250,0.4)",   bg: "rgba(96,165,250,0.06)" },
  emerald: { base: "#10B981", glow: "rgba(16,185,129,0.4)",   bg: "rgba(16,185,129,0.06)" },
};

function StatCard({ label, value, icon: Icon, color = "gold", sub }: {
  label: string; value: string | number; icon: React.ElementType; color?: string; sub?: string;
}) {
  const c = COLORS[color] ?? COLORS.gold!;
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard>
      <motion.div
        variants={item}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-2xl p-5 flex items-start gap-4 cursor-default"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${c.bg}, rgba(255,255,255,0.02))`
            : "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          border: `1px solid ${hovered ? `${c.base}35` : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered ? `0 0 32px ${c.glow}, 0 8px 32px rgba(0,0,0,0.3)` : "0 4px 20px rgba(0,0,0,0.2)",
          transition: "all 0.35s ease",
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Corner rune */}
        <div className="absolute top-3 right-3 text-[10px] opacity-20" style={{ color: c.base }}>✦</div>

        {/* Icon orb */}
        <motion.div
          animate={hovered ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `radial-gradient(circle, ${c.bg} 0%, transparent 70%)`,
            border: `1px solid ${c.base}35`,
            boxShadow: hovered ? `0 0 20px ${c.glow}` : "none",
          }}
        >
          <Icon size={22} style={{ color: c.base }} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-white/40 tracking-[0.12em] uppercase">{label}</p>
          <motion.p
            className="text-2xl font-bold mt-0.5"
            style={{ fontFamily: "var(--font-kingdom), serif", color: c.base, textShadow: hovered ? `0 0 20px ${c.glow}` : "none" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          >
            {value}
          </motion.p>
          {sub && <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>}
        </div>

        {/* Shimmer on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)", pointerEvents: "none" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </TiltCard>
  );
}

// ─── Quest rarity config ─────────────────────────────────────────────────────
const RARITY = {
  common:    { label: "Common",    color: "#94A3B8", bg: "rgba(148,163,184,0.1)", glow: "rgba(148,163,184,0.3)", border: "rgba(148,163,184,0.3)", particles: "rgba(148,163,184,0.8)" },
  rare:      { label: "Rare",      color: "#60A5FA", bg: "rgba(96,165,250,0.1)",  glow: "rgba(96,165,250,0.4)",  border: "rgba(96,165,250,0.35)", particles: "rgba(96,165,250,0.9)" },
  epic:      { label: "Epic",      color: "#A855F7", bg: "rgba(168,85,247,0.12)", glow: "rgba(168,85,247,0.5)",  border: "rgba(168,85,247,0.4)", particles: "rgba(168,85,247,0.9)" },
  legendary: { label: "Legendary", color: "#F0B429", bg: "rgba(240,180,41,0.12)", glow: "rgba(240,180,41,0.5)",  border: "rgba(240,180,41,0.4)", particles: "rgba(240,180,41,1)"   },
  mythic:    { label: "Mythic",    color: "#EC4899", bg: "rgba(236,72,153,0.12)", glow: "rgba(236,72,153,0.5)",  border: "rgba(236,72,153,0.4)", particles: "rgba(236,72,153,1)"   },
};

function QuestItem({ title, reward, xp, complete, rarity = "common" }: {
  title: string; reward: string; xp: number; complete: boolean; rarity?: keyof typeof RARITY;
}) {
  const r = RARITY[rarity] ?? RARITY.common!;
  const [done, setDone] = useState(complete);
  const [exploding, setExploding] = useState(false);

  const handleComplete = () => {
    if (!done) {
      setExploding(true);
      setTimeout(() => { setExploding(false); setDone(true); }, 800);
    }
  };

  return (
    <motion.div
      variants={item}
      onClick={handleComplete}
      className="relative flex items-center gap-3 cursor-pointer group rounded-xl px-3 py-3 transition-all"
      style={{ background: done ? "rgba(16,185,129,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${done ? "rgba(16,185,129,0.2)" : r.border}` }}
      whileHover={{ x: 3, boxShadow: done ? "none" : `0 0 16px ${r.glow}` }}
    >
      {/* Rarity glow strip */}
      <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 2, borderRadius: "0 2px 2px 0", background: done ? "#10B981" : r.color, opacity: 0.7 }} />

      {/* Check button */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: done ? "rgba(16,185,129,0.15)" : r.bg, border: `1px solid ${done ? "rgba(16,185,129,0.4)" : r.border}`, boxShadow: done ? "0 0 10px rgba(16,185,129,0.3)" : "none" }}
      >
        {done
          ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}><CheckCircle2 size={14} className="text-emerald-400" /></motion.div>
          : <Circle size={14} style={{ color: r.color, opacity: 0.5 }} />
        }
      </motion.div>

      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-medium leading-tight ${done ? "line-through text-white/30" : "text-white/85"}`}>{title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
            style={{ color: r.color, background: r.bg, border: `1px solid ${r.border}` }}
          >
            {r.label}
          </motion.span>
          <span className="text-[10px] text-white/35">+{xp} XP</span>
          <span className="text-[10px] text-white/35">· {reward}</span>
        </div>
      </div>
      <ChevronRight size={13} className="text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" style={{ color: done ? undefined : r.color }} />

      {/* XP explosion particles */}
      <AnimatePresence>
        {exploding && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: [0, 1, 0], x: (Math.cos(i * 45 * Math.PI / 180) * 40), y: (Math.sin(i * 45 * Math.PI / 180) * 40), opacity: [1, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: r.particles, boxShadow: `0 0 6px ${r.particles}`, left: "50%", top: "50%", marginLeft: -3, marginTop: -3, pointerEvents: "none" }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Feature Portal Card ─────────────────────────────────────────────────────
function FeaturePortal({ href, icon: Icon, title, desc, cta, accent, glow, emoji }: {
  href: string; icon: React.ElementType; title: string; desc: string; cta: string; accent: string; glow: string; emoji: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={item}>
      <TiltCard>
        <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="block group relative overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${hovered ? `${accent}40` : "rgba(255,255,255,0.06)"}`, transition: "all 0.3s ease", boxShadow: hovered ? `0 0 40px ${glow}, 0 16px 40px rgba(0,0,0,0.3)` : "0 4px 20px rgba(0,0,0,0.15)" }}>

          {/* Magic bg on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 80% at 30% 30%, ${glow} 0%, transparent 70%)`, pointerEvents: "none" }}
          />

          <div className="relative p-5">
            {/* Emoji + Icon */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={hovered ? { y: [0, -4, 0], rotate: [0, -8, 8, 0] } : {}}
                transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
                className="text-3xl"
              >
                {emoji}
              </motion.div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}>
                <Icon size={16} style={{ color: accent }} />
              </div>
            </div>

            <h3 className="text-[15px] font-bold mb-1.5 transition-all" style={{ fontFamily: "var(--font-kingdom), serif", color: hovered ? accent : "rgba(255,255,255,0.9)", textShadow: hovered ? `0 0 16px ${accent}60` : "none" }}>
              {title}
            </h3>
            <p className="text-[12px] text-white/40 leading-relaxed">{desc}</p>

            <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold transition-colors" style={{ color: accent }}>
              {cta}
              <motion.div animate={hovered ? { x: [0, 4, 0], y: [0, -4, 0] } : {}} transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}>
                <ArrowUpRight size={13} />
              </motion.div>
            </div>
          </div>

          {/* Bottom glow bar */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`, boxShadow: `0 0 8px ${accent}` }}
          />

          {/* Corner sparkle on hover */}
          <AnimatePresence>
            {hovered && [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [-5 + i * 4, -10 + i * 8, -15 + i * 12], y: [0, -10, -20] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatDelay: 0.5 }}
                style={{ position: "absolute", top: 12, right: 12, width: 4, height: 4, borderRadius: "50%", background: accent, pointerEvents: "none" }}
              />
            ))}
          </AnimatePresence>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

// ─── Achievement Mini ─────────────────────────────────────────────────────────
function AchievementMini({ icon, name, unlocked }: { icon: string; name: string; unlocked: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl p-3 flex items-center gap-3 cursor-pointer"
      style={{
        background: unlocked ? "rgba(240,180,41,0.06)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${unlocked ? "rgba(240,180,41,0.25)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered && unlocked ? "0 0 20px rgba(240,180,41,0.2)" : "none",
        transition: "all 0.3s",
        filter: unlocked ? "none" : "grayscale(1)",
        opacity: unlocked ? 1 : 0.4,
      }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      <motion.div
        animate={unlocked && hovered ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: unlocked ? "rgba(240,180,41,0.1)" : "rgba(255,255,255,0.04)", boxShadow: unlocked && hovered ? "0 0 16px rgba(240,180,41,0.3)" : "none" }}
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-[12px] font-semibold" style={{ color: unlocked ? "#F0B429" : "rgba(255,255,255,0.3)", fontFamily: unlocked ? "var(--font-kingdom), serif" : "inherit" }}>
          {name}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: unlocked ? "rgba(240,180,41,0.5)" : "rgba(255,255,255,0.2)" }}>
          {unlocked ? "✦ Unlocked" : "⚿ Locked"}
        </p>
      </div>
      {unlocked && (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="ml-auto flex-shrink-0">
          <Star size={12} style={{ color: "#F0B429", opacity: 0.5 }} />
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Liquid XP bar ───────────────────────────────────────────────────────────
function LiquidBar({ label, value, max, color, delay = 0 }: { label: string; value: number; max: number; color: string; delay?: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] text-white/40 tracking-wide">{label}</span>
        <span className="text-[11px] font-semibold" style={{ color }}>{value}/{max}</span>
      </div>
      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color}, ${color}DD)` }}
        >
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Hero greeting ───────────────────────────────────────────────────────────
function HeroSection() {
  const hour = new Date().getHours();
  const greeting = hour < 6 ? "The Kingdom Sleeps" : hour < 12 ? "Dawn of a New Day" : hour < 18 ? "The Kingdom Awaits" : "The Night is Young";
  const greetingEmoji = hour < 6 ? "🌙" : hour < 12 ? "🌅" : hour < 18 ? "☀️" : "🌟";

  return (
    <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="relative">
      {/* Cinematic hero card */}
      <div className="relative rounded-3xl overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, rgba(107,33,168,0.15) 0%, rgba(26,24,37,0.8) 50%, rgba(201,146,42,0.1) 100%)", border: "1px solid rgba(240,180,41,0.15)" }}>
        {/* Animated bg particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], x: [0, i % 2 === 0 ? 10 : -10, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            style={{ position: "absolute", width: 4 + i * 2, height: 4 + i * 2, borderRadius: "50%", left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%`, background: i % 2 === 0 ? "rgba(240,180,41,0.7)" : "rgba(168,85,247,0.6)", boxShadow: `0 0 ${(4 + i * 2) * 3}px currentColor` }}
          />
        ))}

        <div className="relative p-8 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="text-2xl">
                {greetingEmoji}
              </motion.span>
              <span className="text-[11px] text-[#F0B429]/70 tracking-[0.2em] uppercase font-medium">{greeting}</span>
            </div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
              style={{ fontFamily: "var(--font-kingdom), serif" }}
              animate={{ textShadow: ["0 0 20px rgba(240,180,41,0.3)", "0 0 40px rgba(240,180,41,0.5)", "0 0 20px rgba(240,180,41,0.3)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span style={{ background: "linear-gradient(135deg, #C9922A, #F0B429, #FFD878, #F0B429)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Welcome, Ruler
              </span>
            </motion.h1>
            <p className="text-white/40 text-sm tracking-wide max-w-md">
              Your kingdom's intelligence grows stronger with every reflection. The AI oracle awaits your command.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <Link href="/personality">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #7A5B1A, #C9922A, #F0B429)", color: "#000", boxShadow: "0 0 24px rgba(240,180,41,0.4)" }}
                >
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
                  <Sparkles size={14} />
                  Forge My Soul
                </motion.button>
              </Link>
              <Link href="/reflection">
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: "rgba(96,165,250,0.5)", color: "#60A5FA" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white/60 transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <BookOpen size={14} />
                  Open Scrolls
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Kingdom guardian mascot */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl flex-shrink-0 hidden sm:block"
            style={{ filter: "drop-shadow(0 0 20px rgba(240,180,41,0.4))" }}
          >
            🧙‍♂️
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(240,180,41,0.3), transparent)" }} />
      </div>
    </motion.div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const dailyQuests = [
    { title: "Write your morning reflection", reward: "🪙 50 Gold", xp: 100, complete: false, rarity: "common" as const },
    { title: "Complete a personality session", reward: "🔮 Soul Stone", xp: 250, complete: false, rarity: "rare" as const },
    { title: "Log 3 habits before noon", reward: "🪙 75 Gold", xp: 150, complete: false, rarity: "epic" as const },
    { title: "Run the Future Simulator", reward: "⚡ Power Shard", xp: 300, complete: false, rarity: "legendary" as const },
  ];

  const achievements = [
    { icon: "⚔️", name: "First Battle", unlocked: false },
    { icon: "📜", name: "Scholar", unlocked: false },
    { icon: "🔥", name: "7-Day Fire", unlocked: false },
    { icon: "👑", name: "Early Adopter", unlocked: false },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1400px] space-y-6">

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── STAT CARDS ── */}
      <motion.div variants={container} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total XP" value="0" icon={Zap} color="gold" sub="Begin your journey" />
        <StatCard label="Day Streak" value="0" icon={Flame} color="purple" sub="Start today!" />
        <StatCard label="Reports" value="0" icon={Brain} color="blue" sub="Generate insight" />
        <StatCard label="Habits Active" value="0" icon={Target} color="emerald" sub="Build your kingdom" />
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Quest Board */}
        <motion.div variants={item} className="lg:col-span-1">
          <div className="relative overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(240,180,41,0.12)" }}>
            {/* Header */}
            <div className="relative p-5 border-b border-[rgba(240,180,41,0.08)]">
              <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity }}
                style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(240,180,41,0.05), transparent)", pointerEvents: "none" }} />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[15px] font-bold text-[#F0B429]" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                    ⚔️ Daily Quests
                  </h2>
                  <p className="text-[10px] text-white/30 mt-0.5">0 of {dailyQuests.length} completed</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "rgba(240,180,41,0.06)", border: "1px solid rgba(240,180,41,0.15)" }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                    <Clock size={10} className="text-[#F0B429]" />
                  </motion.div>
                  <span className="text-[10px] text-[#F0B429] font-medium">Resets Daily</span>
                </div>
              </div>
              <div className="mt-4">
                <LiquidBar label="Quest Progress" value={0} max={dailyQuests.length} color="#F0B429" delay={0.3} />
              </div>
            </div>

            {/* Quests */}
            <div className="p-4 space-y-2">
              <motion.div variants={container}>
                {dailyQuests.map((q, i) => <QuestItem key={i} {...q} />)}
              </motion.div>
            </div>

            {/* Reward banner */}
            <div className="mx-4 mb-4 p-3 rounded-xl text-center" style={{ background: "rgba(240,180,41,0.05)", border: "1px solid rgba(240,180,41,0.12)" }}>
              <p className="text-[10px] text-white/30 mb-0.5">Complete all quests to earn</p>
              <motion.p
                className="text-[14px] font-bold text-[#F0B429]"
                style={{ fontFamily: "var(--font-kingdom), serif" }}
                animate={{ textShadow: ["0 0 8px rgba(240,180,41,0.3)", "0 0 20px rgba(240,180,41,0.6)", "0 0 8px rgba(240,180,41,0.3)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏆 800 XP + Daily Chest
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Feature Portals + Season */}
        <motion.div variants={container} className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeaturePortal href="/personality"  icon={Brain}    title="Soul Forge"     desc="Unlock hidden depths of your personality with AI-powered trait analysis." cta="Forge Your Soul" accent="#A855F7" glow="rgba(168,85,247,0.15)" emoji="🔮" />
            <FeaturePortal href="/reflection"   icon={BookOpen} title="Oracle Scrolls" desc="Journal your thoughts and receive ancient AI wisdom in return."             cta="Open the Scrolls" accent="#60A5FA" glow="rgba(96,165,250,0.15)" emoji="📜" />
            <FeaturePortal href="/habits"       icon={Target}   title="Daily Quests"   desc="Build life-changing habits through gamified daily challenges."               cta="Claim Your Quest" accent="#10B981" glow="rgba(16,185,129,0.15)" emoji="🎯" />
            <FeaturePortal href="/future"       icon={Zap}      title="Fate's Vision"  desc="Simulate possible futures and map your path to destiny."                    cta="See Your Fate"  accent="#F0B429" glow="rgba(240,180,41,0.15)" emoji="⚡" />
          </div>

          {/* Season Panel */}
          <TiltCard>
            <motion.div variants={item} className="relative overflow-hidden rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(168,85,247,0.15)" }}>
              <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
                style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(107,33,168,0.15), transparent)", pointerEvents: "none" }} />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-[15px] font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>🌿 Season of Awakening</h2>
                    <p className="text-[11px] text-white/35 mt-0.5">Summer 2026 — Rank up before it ends</p>
                  </div>
                  <motion.div animate={{ boxShadow: ["0 0 6px rgba(168,85,247,0.3)", "0 0 16px rgba(168,85,247,0.6)", "0 0 6px rgba(168,85,247,0.3)"] }} transition={{ duration: 2.5, repeat: Infinity }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
                    <Shield size={13} className="text-[#A855F7]" />
                    <span className="text-[12px] text-[#A855F7] font-semibold">Bronze Tier</span>
                  </motion.div>
                </div>
                <div className="space-y-4">
                  <LiquidBar label="Season XP" value={0} max={5000} color="#A855F7" delay={0.2} />
                  <LiquidBar label="Reports Generated" value={0} max={5} color="#60A5FA" delay={0.4} />
                  <LiquidBar label="Habits Completed" value={0} max={30} color="#10B981" delay={0.6} />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[{ tier: "Bronze", icon: "🥉", unlocked: true, color: "#CD7F32" }, { tier: "Silver", icon: "🥈", unlocked: false, color: "#C0C0C0" }, { tier: "Gold", icon: "🥇", unlocked: false, color: "#F0B429" }].map((t) => (
                    <motion.div key={t.tier} whileHover={{ scale: 1.05 }} className={`text-center p-3 rounded-xl transition-all ${t.unlocked ? "" : "opacity-40"}`}
                      style={{ background: t.unlocked ? `rgba(${t.color === "#CD7F32" ? "205,127,50" : t.color === "#C0C0C0" ? "192,192,192" : "240,180,41"},0.08)` : "rgba(255,255,255,0.02)", border: `1px solid ${t.unlocked ? `${t.color}35` : "rgba(255,255,255,0.06)"}`, boxShadow: t.unlocked ? `0 0 12px ${t.color}25` : "none" }}>
                      <motion.div animate={t.unlocked ? { rotate: [0, 5, -5, 0] } : {}} transition={{ duration: 4, repeat: Infinity }} className="text-2xl mb-1">{t.icon}</motion.div>
                      <p className="text-[10px] font-semibold" style={{ color: t.unlocked ? t.color : "rgba(255,255,255,0.3)" }}>{t.tier}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>

      {/* ── HALL OF GLORY ── */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(240,180,41,0.1)" }}>
        <motion.div animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 10, repeat: Infinity }}
          style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(240,180,41,0.06), transparent)", pointerEvents: "none" }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-bold text-white/90 flex items-center gap-2" style={{ fontFamily: "var(--font-kingdom), serif" }}>
              <Trophy size={16} className="text-[#F0B429]" />
              Hall of Glory
            </h2>
            <Link href="/achievements" className="text-[12px] text-[#F0B429] hover:text-[#FFD878] flex items-center gap-1 transition-colors">
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          <motion.div variants={container} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((a, i) => <AchievementMini key={i} {...a} />)}
          </motion.div>
        </div>
      </motion.div>

      {/* ── BOTTOM CTA ── */}
      <motion.div variants={item} className="relative overflow-hidden rounded-3xl p-10 text-center"
        style={{ background: "linear-gradient(135deg, rgba(107,33,168,0.2) 0%, rgba(15,14,19,0.95) 50%, rgba(201,146,42,0.12) 100%)", border: "1px solid rgba(201,146,42,0.2)" }}>
        {/* Rotating conic gradient */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", inset: 0, background: "conic-gradient(from 0deg, transparent 0%, rgba(168,85,247,0.05) 25%, transparent 50%, rgba(240,180,41,0.05) 75%, transparent 100%)", pointerEvents: "none" }} />

        {/* Floating sparkles */}
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: [0, -20, 0], x: [0, (i % 2 === 0 ? 10 : -10), 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
            style={{ position: "absolute", fontSize: 16, left: `${20 + i * 15}%`, top: "30%", pointerEvents: "none" }}
          >
            ✦
          </motion.div>
        ))}

        <div className="relative">
          <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="text-5xl mx-auto mb-5">
            🏰
          </motion.div>
          <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-kingdom), serif", background: "linear-gradient(135deg, #C9922A, #F0B429, #FFD878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Begin Your First Conquest
          </h3>
          <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Generate your first Soul Report and unlock your true personality traits. The AI oracle awaits your command.
          </p>
          <Link href="/personality">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(240,180,41,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[14px] font-bold text-black"
              style={{ background: "linear-gradient(135deg, #7A5B1A, #C9922A, #F0B429)", boxShadow: "0 0 24px rgba(240,180,41,0.35)" }}
            >
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }} style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
              <Brain size={16} />
              Forge My Soul Report
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

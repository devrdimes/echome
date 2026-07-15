"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Brain, BookOpen, Target, Trophy, Settings, CreditCard, Zap, Flame, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard",    label: "Throne Room",    icon: LayoutDashboard, rune: "⚜",  accent: "#F0B429", desc: "Your kingdom's heart" },
  { href: "/personality",  label: "Soul Forge",     icon: Brain,           rune: "✦",  accent: "#A855F7", desc: "Forge your identity" },
  { href: "/reflection",   label: "Oracle Scrolls", icon: BookOpen,        rune: "◈",  accent: "#60A5FA", desc: "Ancient wisdom" },
  { href: "/habits",       label: "Daily Quests",   icon: Target,          rune: "⚡", accent: "#10B981", desc: "Build your legend" },
  { href: "/achievements", label: "Hall of Glory",  icon: Trophy,          rune: "★",  accent: "#F97316", desc: "Your conquests" },
  { href: "/future",       label: "Fate's Vision",  icon: Zap,             rune: "◇",  accent: "#EC4899", desc: "Glimpse destiny" },
];

const bottomItems = [
  { href: "/settings", label: "Kingdom Edicts", icon: Settings,    rune: "⚙", accent: "#94A3B8", desc: "Royal settings" },
  { href: "/billing",  label: "Royal Treasury", icon: CreditCard,  rune: "◉", accent: "#F0B429", desc: "Manage power" },
];

interface NavItemProps {
  href: string; label: string; icon: React.ElementType; rune: string;
  accent: string; desc: string; isActive: boolean;
}

function SidebarNavItem({ href, label, icon: Icon, rune, accent, desc, isActive }: NavItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`nav-item group relative ${isActive ? "active" : ""}`}
      style={{ overflow: "hidden" }}
    >
      {/* Animated background fill on hover/active */}
      <AnimatePresence>
        {(hovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            style={{
              position: "absolute", inset: 0, originX: 0,
              background: isActive
                ? `linear-gradient(90deg, ${accent}18 0%, ${accent}06 100%)`
                : `linear-gradient(90deg, ${accent}0D 0%, transparent 100%)`,
              borderRadius: "inherit",
            }}
          />
        )}
      </AnimatePresence>

      {/* Left accent bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-bar"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            style={{
              position: "absolute", left: 0, top: "10%", bottom: "10%", width: 3,
              background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
              borderRadius: "0 2px 2px 0",
              boxShadow: `0 0 12px ${accent}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon orb */}
      <motion.div
        animate={isActive ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          background: isActive ? `${accent}20` : hovered ? `${accent}12` : "rgba(255,255,255,0.04)",
          border: `1px solid ${isActive || hovered ? `${accent}50` : "rgba(255,255,255,0.06)"}`,
          boxShadow: isActive ? `0 0 16px ${accent}40, inset 0 0 8px ${accent}10` : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Icon size={15} style={{ color: isActive ? accent : hovered ? `${accent}CC` : "rgba(255,255,255,0.4)", transition: "color 0.2s" }} />
        {/* Glow pulse when active */}
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: `${accent}30` }}
          />
        )}
      </motion.div>

      {/* Label + desc */}
      <div className="flex-1 min-w-0">
        <div className={`text-[13px] font-semibold leading-tight transition-colors duration-200 ${isActive ? "" : "text-white/55"}`}
          style={{ color: isActive ? accent : undefined, fontFamily: isActive ? "var(--font-kingdom), serif" : "inherit" }}>
          {label}
        </div>
        <AnimatePresence>
          {(hovered || isActive) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[10px] leading-tight overflow-hidden"
              style={{ color: `${accent}80` }}
            >
              {desc}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rune */}
      <motion.span
        className="nav-rune ml-auto text-[11px] flex-shrink-0"
        animate={isActive ? { opacity: [0.6, 1, 0.6] } : { opacity: hovered ? 0.6 : 0.25 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: isActive ? accent : undefined }}
      >
        {rune}
      </motion.span>

      {/* Particle burst on active */}
      {isActive && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none rounded-full"
              style={{ width: 3, height: 3, background: accent, right: 8 + i * 6, top: "50%", marginTop: -1.5 }}
              animate={{ y: [-8, -20, -8], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </>
      )}
    </Link>
  );
}

export function KingdomSidebar() {
  const pathname = usePathname();

  return (
    <aside className="kingdom-sidebar w-[240px] min-h-screen flex flex-col flex-shrink-0 z-20 relative">

      {/* ── LOGO ── */}
      <div className="px-5 py-6 border-b border-[rgba(201,146,42,0.12)] relative overflow-hidden">
        {/* Logo bg glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,146,42,0.05), transparent)" }}
        />
        <div className="flex items-center gap-3 relative">
          <motion.div
            animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(201,146,42,0.5),inset_0_0_12px_rgba(240,180,41,0.2)]"
            style={{ background: "linear-gradient(135deg, #7A5B1A, #C9922A, #F0B429)", border: "1px solid rgba(240,180,41,0.4)" }}
          >
            <span className="text-xl">👑</span>
          </motion.div>
          <div>
            <motion.div
              animate={{ textShadow: ["0 0 8px rgba(240,180,41,0.4)", "0 0 20px rgba(240,180,41,0.8)", "0 0 8px rgba(240,180,41,0.4)"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-[15px] font-bold text-[#F0B429] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-kingdom), serif" }}
            >
              Echo AI
            </motion.div>
            <div className="text-[10px] text-white/30 tracking-[0.15em] uppercase">Kingdom Control</div>
          </div>
        </div>
      </div>

      {/* ── RULER XP BAR ── */}
      <div className="px-5 py-4 border-b border-[rgba(201,146,42,0.08)] relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/40 tracking-[0.12em] uppercase">Ruler Level</span>
          <motion.span
            animate={{ boxShadow: ["0 0 6px rgba(240,180,41,0.3)", "0 0 12px rgba(240,180,41,0.6)", "0 0 6px rgba(240,180,41,0.3)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="level-badge flex items-center gap-1"
          >
            <Flame size={10} className="text-[#F0B429]" />
            <span>Lvl 1</span>
          </motion.span>
        </div>

        {/* XP bar with flowing liquid */}
        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(240,180,41,0.15)" }}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "28%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7A5B1A, #C9922A, #F0B429, #FFD878)" }}
          >
            {/* Liquid shimmer */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", borderRadius: "inherit" }}
            />
          </motion.div>
          {/* Spark at tip */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ position: "absolute", top: "50%", left: "28%", transform: "translate(-50%, -50%)", width: 6, height: 6, borderRadius: "50%", background: "#FFD878", boxShadow: "0 0 8px #FFD878" }}
          />
        </div>

        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-white/30">0 XP</span>
          <span className="text-[10px] text-white/30">1000 XP</span>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[9px] text-white/20 tracking-[0.2em] uppercase px-3 pt-2 pb-2 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span>Kingdom Halls</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        {navItems.map((item) => (
          <SidebarNavItem key={item.href} {...item} isActive={pathname === item.href} />
        ))}
      </nav>

      {/* ── BOTTOM ── */}
      <div className="p-3 space-y-1 border-t border-[rgba(201,146,42,0.08)]">
        <div className="text-[9px] text-white/20 tracking-[0.2em] uppercase px-3 pb-2 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span>Royal Chambers</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        {bottomItems.map((item) => (
          <SidebarNavItem key={item.href} {...item} isActive={pathname === item.href} />
        ))}
      </div>

      {/* ── TORCH FLICKER ── */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(201,146,42,0.08), transparent)" }}
      />
    </aside>
  );
}

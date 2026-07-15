"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  BookOpen,
  Target,
  Trophy,
  Settings,
  CreditCard,
  Zap,
  Sparkles,
  Flame,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Throne Room", icon: LayoutDashboard, rune: "⚜" },
  { href: "/personality", label: "Soul Forge", icon: Brain, rune: "✦" },
  { href: "/reflection", label: "Oracle Scrolls", icon: BookOpen, rune: "◈" },
  { href: "/habits", label: "Daily Quests", icon: Target, rune: "⚡" },
  { href: "/achievements", label: "Hall of Glory", icon: Trophy, rune: "★" },
  { href: "/future", label: "Fate's Vision", icon: Zap, rune: "◇" },
];

const bottomItems = [
  { href: "/settings", label: "Kingdom Edicts", icon: Settings, rune: "⚙" },
  { href: "/billing", label: "Royal Treasury", icon: CreditCard, rune: "◉" },
];

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  rune: string;
  isActive: boolean;
}

function SidebarNavItem({ href, label, icon: Icon, rune, isActive }: NavItemProps) {
  return (
    <Link href={href} className={`nav-item ${isActive ? "active" : ""}`}>
      <motion.div
        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex-shrink-0"
      >
        <Icon
          size={17}
          className={isActive ? "text-[#F0B429]" : "text-white/40 group-hover:text-white/70"}
        />
        {isActive && (
          <motion.div
            layoutId="nav-glow"
            className="absolute inset-0 rounded-sm"
            style={{ boxShadow: "0 0 12px rgba(240,180,41,0.7)" }}
          />
        )}
      </motion.div>
      <span
        className={`text-[13px] font-medium tracking-wide ${
          isActive ? "text-[#F0B429] font-semibold" : "text-white/55"
        }`}
        style={{ fontFamily: isActive ? "var(--font-kingdom), serif" : "inherit" }}
      >
        {label}
      </span>
      <span className="nav-rune ml-auto">{rune}</span>
    </Link>
  );
}

export function KingdomSidebar() {
  const pathname = usePathname();

  return (
    <aside className="kingdom-sidebar w-[240px] min-h-screen flex flex-col flex-shrink-0 z-20 relative">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[rgba(201,146,42,0.15)]">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A5B1A] to-[#C9922A] flex items-center justify-center shadow-[0_0_16px_rgba(201,146,42,0.4)]"
          >
            <Sparkles size={18} className="text-[#FFD878]" />
          </motion.div>
          <div>
            <div
              className="text-[15px] font-bold text-[#F0B429] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-kingdom), serif" }}
            >
              Echo AI
            </div>
            <div className="text-[10px] text-white/30 tracking-[0.15em] uppercase">
              Kingdom Control
            </div>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="px-5 py-4 border-b border-[rgba(201,146,42,0.1)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-white/40 tracking-[0.12em] uppercase">
            Level Progress
          </span>
          <span className="level-badge">
            <Flame size={10} className="text-[#F0B429]" />
            Lvl 1
          </span>
        </div>
        <div className="progress-magic progress-xp">
          <motion.div
            className="progress-magic__fill"
            initial={{ width: "0%" }}
            animate={{ width: "28%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-white/30">280 XP</span>
          <span className="text-[10px] text-white/30">1000 XP</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[9px] text-white/25 tracking-[0.18em] uppercase px-3 pt-2 pb-1">
          Kingdom Halls
        </div>
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[rgba(201,146,42,0.1)] space-y-1">
        <div className="text-[9px] text-white/25 tracking-[0.18em] uppercase px-3 pb-1">
          Royal Chambers
        </div>
        {bottomItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            {...item}
            isActive={pathname === item.href}
          />
        ))}
      </div>

      {/* Torch flicker effect at bottom */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,146,42,0.06), transparent)",
        }}
      />
    </aside>
  );
}

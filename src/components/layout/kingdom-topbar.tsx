"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Crown, Flame, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface KingdomTopbarProps {
  userName?: string | null;
  userImage?: string | null;
  userEmail?: string | null;
}

function PulsingCoin() {
  return (
    <motion.span
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      style={{ display: "inline-block" }}
    >
      🪙
    </motion.span>
  );
}

function NotificationBell() {
  const [active, setActive] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setActive(!active)}
      className="notification-crystal relative"
    >
      <motion.div
        animate={{ rotate: active ? [0, -15, 15, -10, 10, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Bell size={14} className="text-[#A855F7]" />
      </motion.div>
      <motion.span
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A855F7] border-2 border-[#09090B] flex items-center justify-center text-[8px] font-bold text-white"
      >
        3
      </motion.span>
      {/* Glow ring */}
      <motion.div
        animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.5, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid rgba(168,85,247,0.4)", pointerEvents: "none" }}
      />
    </motion.button>
  );
}

export function KingdomTopbar({ userName, userImage, userEmail }: KingdomTopbarProps) {
  const displayName = userName ?? userEmail?.split("@")[0] ?? "Ruler";
  const [searchFocused, setSearchFocused] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="kingdom-topbar h-16 flex items-center px-6 gap-4 sticky top-0 z-30 relative overflow-hidden">

      {/* Subtle header glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(240,180,41,0.02), transparent)", pointerEvents: "none" }}
      />

      {/* ── SEARCH ── */}
      <div className="flex-1 max-w-sm relative">
        <motion.div animate={{ scale: searchFocused ? 1.01 : 1 }} transition={{ duration: 0.2 }}>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
            style={{ color: searchFocused ? "rgba(240,180,41,0.7)" : "rgba(255,255,255,0.25)" }} />
          <input
            type="text"
            placeholder="Search the Kingdom..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2.5 text-[13px] text-white/70 placeholder:text-white/25 focus:outline-none transition-all duration-300 rounded-xl"
            style={{
              background: searchFocused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${searchFocused ? "rgba(240,180,41,0.4)" : "rgba(255,255,255,0.07)"}`,
              boxShadow: searchFocused ? "0 0 20px rgba(240,180,41,0.08)" : "none",
            }}
          />
        </motion.div>
      </div>

      <div className="flex items-center gap-3 ml-auto">

        {/* ── CLOCK ── */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-white/25 tracking-widest">
          <span>⏳</span>
          <span>{timeString}</span>
        </div>

        {/* ── STREAK ── */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer relative overflow-hidden"
          style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Flame size={13} className="text-[#F97316]" />
          </motion.div>
          <span className="text-[12px] font-semibold text-[#F97316]">0 day streak</span>
          {/* Fire glow sweep */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent)" }}
          />
        </motion.div>

        {/* ── GOLD ── */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer relative overflow-hidden"
          style={{ background: "rgba(240,180,41,0.06)", border: "1px solid rgba(240,180,41,0.15)" }}
        >
          <PulsingCoin />
          <motion.span
            animate={{ textShadow: ["0 0 4px rgba(240,180,41,0.3)", "0 0 10px rgba(240,180,41,0.6)", "0 0 4px rgba(240,180,41,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[12px] font-bold text-[#F0B429]"
          >
            0
          </motion.span>
        </motion.div>

        {/* ── XP PILL ── */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer"
          style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.18)" }}
        >
          <Zap size={12} className="text-[#A855F7]" />
          <span className="text-[12px] font-semibold text-[#A855F7]">0 XP</span>
        </motion.div>

        {/* ── NOTIFICATION ── */}
        <NotificationBell />

        {/* ── USER AVATAR ── */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.06]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[14px] font-bold text-white/90"
              style={{
                background: "linear-gradient(135deg, #4040C2, #6B21A8)",
                boxShadow: "0 0 16px rgba(107,33,168,0.5), inset 0 0 8px rgba(168,85,247,0.2)",
                border: "1px solid rgba(168,85,247,0.3)",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
            {/* Online indicator */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#09090B]"
              style={{ background: "#10B981", boxShadow: "0 0 6px #10B981" }}
            />
          </motion.div>

          <div className="hidden md:block">
            <div className="flex items-center gap-1 text-[12px] font-semibold text-white/85">
              {displayName}
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <Crown size={10} className="text-[#F0B429]" />
              </motion.span>
            </div>
            <div className="text-[10px] text-white/30 flex items-center gap-1">
              <Shield size={8} className="text-[#10B981]" />
              Free Ruler
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

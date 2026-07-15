"use client";

import { motion } from "framer-motion";
import { Bell, Search, Crown, Swords, ChevronDown } from "lucide-react";
import Link from "next/link";

interface KingdomTopbarProps {
  userName?: string | null;
  userImage?: string | null;
  userEmail?: string | null;
}

export function KingdomTopbar({ userName, userImage, userEmail }: KingdomTopbarProps) {
  const displayName = userName ?? userEmail?.split("@")[0] ?? "Ruler";

  return (
    <header className="kingdom-topbar h-14 flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search the Kingdom..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-[13px] text-white/60 placeholder:text-white/25 focus:outline-none focus:border-[rgba(201,146,42,0.4)] focus:bg-white/[0.06] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Streak indicator */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(240,120,30,0.1)] border border-[rgba(240,120,30,0.2)]"
        >
          <span className="text-[14px] animate-torch">🔥</span>
          <span className="text-[12px] font-semibold text-[#F97316]">
            0 day streak
          </span>
        </motion.div>

        {/* Gold / coins */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(240,180,41,0.08)] border border-[rgba(240,180,41,0.15)]">
          <span className="text-[13px] animate-coin">🪙</span>
          <span className="text-[12px] font-semibold text-[#F0B429]">0</span>
        </div>

        {/* Notification crystal */}
        <button className="notification-crystal">
          <Bell size={14} className="text-[#A855F7]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A855F7] border-2 border-[#09090B] flex items-center justify-center text-[8px] font-bold text-white">
            3
          </span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.06]">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4040C2] to-[#6B21A8] flex items-center justify-center text-[13px] font-bold text-white/90 shadow-[0_0_12px_rgba(107,33,168,0.4)]">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#09090B]" />
          </div>
          <div className="hidden md:block">
            <div className="text-[12px] font-semibold text-white/85 flex items-center gap-1">
              {displayName}
              <Crown size={9} className="text-[#F0B429]" />
            </div>
            <div className="text-[10px] text-white/35">Free Ruler</div>
          </div>
          <ChevronDown size={12} className="text-white/30 hidden md:block" />
        </div>
      </div>
    </header>
  );
}

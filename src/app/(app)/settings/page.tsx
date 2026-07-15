"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Trash2, ChevronRight, Crown, Mail, Image } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

function SettingRow({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.05] last:border-0">
      <div>
        <p className="text-[13px] font-medium text-white/80">{label}</p>
        <p className="text-[11px] text-white/35 mt-0.5">{desc}</p>
      </div>
      <div className="ml-4 flex-shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[800px] space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(201,146,42,0.3)]" />
          <span className="text-[10px] text-[#F0B429]/60 tracking-[0.2em] uppercase">Royal Edicts</span>
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          <span className="text-white/85">Kingdom Settings</span>
        </h1>
        <p className="text-white/40 mt-2 text-sm">Govern your account and preferences.</p>
      </motion.div>

      {/* Profile */}
      <motion.div variants={item} className="card-stone p-6">
        <div className="flex items-center gap-3 mb-5">
          <User size={16} className="text-[#F0B429]" />
          <h2 className="text-[14px] font-bold text-white/80" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            Ruler Profile
          </h2>
        </div>
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/[0.05]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4040C2] to-[#6B21A8] flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(107,33,168,0.4)]">
            R
          </div>
          <div>
            <p className="text-[15px] font-bold text-white/85">Ruler</p>
            <p className="text-[12px] text-white/40">Free Ruler · Level 1</p>
            <div className="level-badge mt-2">
              <Crown size={10} />
              Free Kingdom
            </div>
          </div>
        </div>
        <div className="space-y-0">
          <SettingRow label="Display Name" desc="How your name appears in the kingdom">
            <input
              type="text"
              placeholder="Ruler"
              className="w-44 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white/70 focus:outline-none focus:border-[rgba(201,146,42,0.4)] transition-all"
            />
          </SettingRow>
          <SettingRow label="Email" desc="Your sign-in address">
            <div className="flex items-center gap-2 text-[12px] text-white/35">
              <Mail size={12} />
              Connected via Google
            </div>
          </SettingRow>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="card-stone p-6">
        <div className="flex items-center gap-3 mb-5">
          <Bell size={16} className="text-[#A855F7]" />
          <h2 className="text-[14px] font-bold text-white/80" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            Royal Notifications
          </h2>
        </div>
        <div className="space-y-0">
          {[
            { label: "Daily Quest Reminders", desc: "Get reminded to complete your daily quests" },
            { label: "Achievement Unlocked", desc: "Celebrate when you earn new achievements" },
            { label: "Weekly Kingdom Report", desc: "Summary of your progress every week" },
            { label: "Streak at Risk", desc: "Alert when your streak is in danger" },
          ].map((n, i) => (
            <SettingRow key={i} label={n.label} desc={n.desc}>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full bg-white/10 peer-checked:bg-[#6B21A8] transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </SettingRow>
          ))}
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div variants={item} className="card-stone p-6 border-[rgba(239,68,68,0.2)]">
        <div className="flex items-center gap-3 mb-5">
          <Shield size={16} className="text-[#EF4444]" />
          <h2 className="text-[14px] font-bold text-[#EF4444]/80" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            Danger Zone
          </h2>
        </div>
        <div className="p-4 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-white/70">Delete Kingdom</p>
            <p className="text-[11px] text-white/35 mt-0.5">Permanently destroy all data. This cannot be undone.</p>
          </div>
          <button className="px-4 py-2 rounded-lg border border-[rgba(239,68,68,0.4)] text-[12px] font-semibold text-[#EF4444]/80 hover:bg-[rgba(239,68,68,0.1)] transition-colors flex items-center gap-2">
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

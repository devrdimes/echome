"use client";

import { motion } from "framer-motion";
import { CreditCard, Zap, Star, Crown, Check, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

const plans = [
  {
    name: "Free Ruler",
    icon: "🛡️",
    price: "$0",
    period: "forever",
    color: "#9CA3AF",
    glow: "rgba(156,163,175,0.2)",
    features: [
      "1 Soul Report per month",
      "7-day reflection history",
      "Basic habit tracking",
      "3 daily quests",
      "Basic achievements",
    ],
    cta: "Current Plan",
    current: true,
  },
  {
    name: "Pro Knight",
    icon: "⚔️",
    price: "$12",
    period: "per month",
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.25)",
    features: [
      "5 Soul Reports per month",
      "Unlimited reflections",
      "Advanced habit AI coaching",
      "Future Simulator (3/mo)",
      "All achievements + missions",
      "Priority AI queue",
    ],
    cta: "Upgrade to Knight",
    current: false,
    popular: true,
  },
  {
    name: "Ultimate Lord",
    icon: "👑",
    price: "$29",
    period: "per month",
    color: "#F0B429",
    glow: "rgba(240,180,41,0.25)",
    features: [
      "Unlimited Soul Reports",
      "Unlimited Future Simulations",
      "Custom AI model settings",
      "Export all data",
      "Exclusive Lord achievements",
      "Direct support",
    ],
    cta: "Claim the Crown",
    current: false,
  },
];

export default function BillingPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1100px] space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(240,180,41,0.3)]" />
          <span className="text-[10px] text-[#F0B429]/60 tracking-[0.2em] uppercase">Royal Treasury</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(240,180,41,0.3)]" />
        </div>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          <span className="hero-gradient-text">Kingdom Plans</span>
        </h1>
        <p className="text-white/40 mt-2 text-sm">Choose your rank. Command greater power.</p>
      </motion.div>

      {/* Plans */}
      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={item}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl p-6 flex flex-col ${
              plan.popular ? "ring-1 ring-[rgba(96,165,250,0.5)]" : ""
            }`}
            style={{
              background: plan.popular
                ? "linear-gradient(135deg, rgba(29,78,216,0.12), rgba(26,24,37,0.98))"
                : plan.current
                ? "linear-gradient(135deg, rgba(37,35,54,0.95), rgba(26,24,37,0.95))"
                : "linear-gradient(135deg, rgba(30,20,5,0.95), rgba(26,24,37,0.95))",
              border: `1px solid ${plan.color}30`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${plan.color}10`,
            }}
          >
            {plan.popular && (
              <div className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-b-lg text-[10px] font-bold text-white tracking-[0.1em] uppercase"
                style={{ background: "linear-gradient(90deg, #1D4ED8, #60A5FA)" }}
              >
                Most Popular
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}30`, boxShadow: `0 0 20px ${plan.glow}` }}
              >
                {plan.icon}
              </div>
              <h3
                className="text-[16px] font-bold mb-0.5"
                style={{ color: plan.color, fontFamily: "var(--font-kingdom), serif" }}
              >
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
                  {plan.price}
                </span>
                <span className="text-[12px] text-white/35">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                  <span className="text-[12px] text-white/55">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={plan.current ? "btn-stone w-full cursor-default" : "btn-gold w-full"}
              disabled={plan.current}
            >
              {!plan.current && <Zap size={13} />}
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Current subscription info */}
      <motion.div variants={item} className="card-stone p-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(156,163,175,0.1)] border border-[rgba(156,163,175,0.2)] flex items-center justify-center">
            <Shield size={18} className="text-white/40" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-white/70">Current Plan: Free Ruler</p>
            <p className="text-[11px] text-white/30 mt-0.5">No active subscription — upgrade anytime to unlock your full potential.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

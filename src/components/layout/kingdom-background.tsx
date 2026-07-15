"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

// ─── Firefly particle ────────────────────────────────────────────────────────
function Firefly({ x, y, size, delay, color }: { x: number; y: number; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, boxShadow: `0 0 ${size * 4}px ${color}` }}
      animate={{
        y: [0, -30, -10, -40, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0, 0.9, 0.4, 0.8, 0],
        scale: [0.5, 1, 0.7, 1.1, 0.5],
      }}
      transition={{ duration: 6 + Math.random() * 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Floating magic rune ──────────────────────────────────────────────────────
function FloatingRune({ x, y, symbol, delay }: { x: number; y: number; symbol: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none text-[rgba(240,180,41,0.08)] select-none"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${20 + Math.random() * 30}px`, fontFamily: "serif" }}
      animate={{ y: [-20, 20, -20], opacity: [0.03, 0.12, 0.03], rotate: [0, 360] }}
      transition={{ duration: 15 + Math.random() * 10, delay, repeat: Infinity, ease: "linear" }}
    >
      {symbol}
    </motion.div>
  );
}

// ─── Shooting star ────────────────────────────────────────────────────────────
function ShootingStar({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${Math.random() * 40}%`, left: "-5%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,220,120,0.8), transparent)", borderRadius: 2 }}
      animate={{ x: ["0vw", "110vw"], opacity: [0, 1, 1, 0], width: [0, 200, 200, 0] }}
      transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 8 + Math.random() * 12, ease: "easeOut" }}
    />
  );
}

// ─── Aurora streaks ───────────────────────────────────────────────────────────
function AuroraLayer({ color, opacity, duration, delay, startY }: { color: string; opacity: number; duration: number; delay: number; startY: number }) {
  return (
    <motion.div
      className="absolute inset-x-0 pointer-events-none"
      style={{ top: `${startY}%`, height: "30%", background: `radial-gradient(ellipse 100% 60% at 50% 50%, ${color} 0%, transparent 70%)`, opacity }}
      animate={{ opacity: [opacity * 0.3, opacity, opacity * 0.5, opacity * 0.8, opacity * 0.3], scaleX: [0.8, 1.1, 0.9, 1.05, 0.8] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Cursor light ─────────────────────────────────────────────────────────────
function CursorLight() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handler = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{ left: springX, top: springY, x: "-50%", y: "-50%", width: 600, height: 600, background: "radial-gradient(circle, rgba(240,180,41,0.04) 0%, rgba(168,85,247,0.02) 40%, transparent 70%)", borderRadius: "50%" }}
    />
  );
}

// ─── Mist drifting layer ──────────────────────────────────────────────────────
function MistLayer({ opacity, duration, delay, y }: { opacity: number; duration: number; delay: number; y: string }) {
  return (
    <motion.div
      className="absolute inset-x-0 pointer-events-none"
      style={{ top: y, height: "20%", background: "linear-gradient(90deg, transparent 0%, rgba(200,160,255,0.03) 20%, rgba(240,180,41,0.02) 50%, rgba(200,160,255,0.03) 80%, transparent 100%)" }}
      animate={{ x: ["-20%", "20%", "-20%"], opacity: [0, opacity, 0, opacity * 0.5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const FIREFLIES = Array.from({ length: 25 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: 20 + Math.random() * 70,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 8,
  color: i % 3 === 0 ? "rgba(240,180,41,0.9)" : i % 3 === 1 ? "rgba(168,85,247,0.8)" : "rgba(96,165,250,0.7)",
}));

const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ","✦","◈","⚜","◇","★","⚡"];
const FLOATING_RUNES = Array.from({ length: 12 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  symbol: RUNES[Math.floor(Math.random() * RUNES.length)]!,
  delay: Math.random() * 5,
}));

export function KingdomBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="kingdom-bg" aria-hidden="true">
      {/* === BASE GRADIENT === */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #06040D 0%, #0A080F 30%, #09090B 60%, #0D0C12 100%)"
      }} />

      {/* === AURORA LAYERS === */}
      <AuroraLayer color="rgba(107,33,168,0.18)" opacity={0.6} duration={12} delay={0} startY={-5} />
      <AuroraLayer color="rgba(240,180,41,0.06)" opacity={0.4} duration={18} delay={4} startY={5} />
      <AuroraLayer color="rgba(29,78,216,0.1)" opacity={0.3} duration={22} delay={8} startY={0} />

      {/* === STARS LAYER (CSS) === */}
      <div className="kingdom-bg__stars" />

      {/* === SHOOTING STARS === */}
      {mounted && (
        <>
          <ShootingStar delay={3} />
          <ShootingStar delay={11} />
          <ShootingStar delay={19} />
        </>
      )}

      {/* === CASTLE SILHOUETTE === */}
      <div className="kingdom-bg__silhouette" />

      {/* === VOLUMETRIC MOONLIGHT === */}
      <motion.div
        style={{ position: "absolute", top: 0, right: "15%", width: 400, height: 700, background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(200,160,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }}
        animate={{ opacity: [0.5, 1, 0.7, 0.9, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === BOTTOM CASTLE GLOW === */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(107,33,168,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "20%", background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(240,180,41,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* === MIST LAYERS === */}
      {mounted && (
        <>
          <MistLayer opacity={0.8} duration={25} delay={0} y="60%" />
          <MistLayer opacity={0.5} duration={35} delay={10} y="75%" />
          <MistLayer opacity={0.6} duration={20} delay={5} y="85%" />
        </>
      )}

      {/* === FIREFLIES === */}
      {mounted && FIREFLIES.map(f => <Firefly key={f.id} {...f} />)}

      {/* === FLOATING RUNES === */}
      {mounted && FLOATING_RUNES.map(r => <FloatingRune key={r.id} {...r} />)}

      {/* === CURSOR LIGHT === */}
      {mounted && <CursorLight />}

      {/* === SCAN LINE === */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)", pointerEvents: "none" }} />
    </div>
  );
}

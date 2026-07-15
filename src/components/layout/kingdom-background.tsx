"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(240,180,41,0.5)",
  "rgba(168,85,247,0.4)",
  "rgba(96,165,250,0.4)",
  "rgba(255,255,255,0.25)",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * -30,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]!,
  }));
}

export function KingdomBackground() {
  const particles = generateParticles(20);

  return (
    <div className="kingdom-bg" aria-hidden="true">
      {/* Gradient */}
      <div className="kingdom-bg__gradient" />

      {/* Stars */}
      <div className="kingdom-bg__stars" />

      {/* Animated fog */}
      <div className="kingdom-bg__fog" />

      {/* Castle silhouette */}
      <div className="kingdom-bg__silhouette" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Top purple haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 30% 0%, rgba(107,33,168,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

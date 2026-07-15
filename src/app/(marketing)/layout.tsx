import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 relative h-16 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A5B1A] to-[#C9922A] flex items-center justify-center shadow-[0_0_12px_rgba(201,146,42,0.4)]">
            <Sparkles size={15} className="text-[#FFD878]" />
          </div>
          <span className="text-[15px] font-bold text-[#F0B429] tracking-widest uppercase" style={{ fontFamily: "var(--font-kingdom), serif" }}>
            Echo AI
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-[13px] text-white/50 hover:text-white/80 transition-colors">
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn-gold text-[12px] py-2 px-5"
          >
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container relative z-10 py-8 border-t border-white/[0.05]">
        <p className="text-[11px] text-white/25 text-center tracking-wide">
          © 2026 Echo AI · Kingdom Control Center · All rights reserved
        </p>
      </footer>
    </div>
  );
}

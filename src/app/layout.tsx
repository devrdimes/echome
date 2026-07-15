import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-kingdom",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kingdom-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Echo AI — Kingdom Control Center", template: "%s | Echo AI" },
  description: "Your personal AI-powered Kingdom for personality insights, habit mastery, and self-transformation.",
  keywords: ["AI", "personality", "habits", "reflection", "dashboard", "self-improvement"],
  authors: [{ name: "Echo AI" }],
  creator: "Echo AI",
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#09090B" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${cinzel.variable} ${cinzelDecorative.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} antialiased min-h-screen bg-[#09090B] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

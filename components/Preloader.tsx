"use client";

import OCLogo from "@/components/site/OCLogo";

export default function Preloader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f0e8] dark:bg-[#120e0a]">
      {/* Logo */}
      <div className="mb-10">
        <OCLogo size="lg" />
      </div>

      {/* Spinner — rust ring */}
      <div className="relative w-12 h-12 mb-6">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#d6cfc2] dark:border-[rgba(255,255,255,0.08)]" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#c0392b] animate-spin" />
      </div>

      {/* Text */}
      <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.35)] text-xs font-medium tracking-[0.18em] uppercase animate-pulse"
        style={{ fontFamily: "var(--oc-mono,'IBM Plex Mono',monospace)" }}>
        Loading…
      </p>
    </div>
  );
}

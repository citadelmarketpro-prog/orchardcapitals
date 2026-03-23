"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Darker_Grotesque,
} from "next/font/google";
import OCLogo from "./OCLogo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--oc-serif",
  display: "swap",
});
const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--oc-mono",
  display: "swap",
});
const grotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--oc-sans",
  display: "swap",
});

/** Re-export OCLogo as OCBrand for backward-compat with existing auth left-panels */
export function OCBrand({ light = false }: { light?: boolean }) {
  return <OCLogo light={light} size="md" />;
}

export default function OCAuthShell({
  children,
  leftPanel,
}: {
  children: React.ReactNode;
  leftPanel: React.ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, id = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    };
    const tick = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      id = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);
    id = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className={`${cormorant.variable} ${ibmMono.variable} ${grotesque.variable} bg-[#f5f0e8] dark:bg-[#1c1510] text-[#1c1510] dark:text-[#f5f0e8]`}
      style={{ fontFamily: "var(--oc-sans),'Darker Grotesque',sans-serif", cursor: "none", overflowX: "hidden" }}
    >
      {/* ── static CSS: no isDark computation, all via CSS vars ── */}
      <style>{`
        .oc-serif { font-family: var(--oc-serif),'Cormorant Garamond',Georgia,serif; }
        .oc-mono  { font-family: var(--oc-mono),'IBM Plex Mono',monospace; }

        /* cursor */
        .a-dot  { position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;background:#c0392b;border-radius:50%;transform:translate(-50%,-50%); }
        .a-ring { position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;border:1.5px solid rgba(139,124,106,0.45);border-radius:50%;transform:translate(-50%,-50%);transition:width .18s,height .18s,border-color .18s; }

        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#2a2018;border-radius:2px;}

        /* ── theme tokens (no JS, flash-free) ── */
        :root {
          --a-bg:     #f5f0e8;
          --a-fg:     #1c1510;
          --a-muted:  #8c7b6a;
          --a-border: #d6cfc2;
          --a-paper:  #ede8de;
          --a-input:  #ffffff;
          --a-line:   rgba(74,63,53,0.12);
          --a-or:     #d6cfc2;
        }
        .dark {
          --a-bg:     #1c1510;
          --a-fg:     #f5f0e8;
          --a-muted:  rgba(245,240,232,0.45);
          --a-border: rgba(255,255,255,0.1);
          --a-paper:  rgba(255,255,255,0.035);
          --a-input:  rgba(255,255,255,0.04);
          --a-line:   rgba(255,255,255,0.08);
          --a-or:     rgba(245,240,232,0.2);
        }

        /* ── auth field ── */
        .a-field { position:relative; margin-bottom:1rem; }
        .a-input {
          width:100%; padding:.85rem 1rem .65rem;
          background:var(--a-input); border:1.5px solid var(--a-border);
          border-radius:8px; font-family:var(--oc-sans);
          font-size:.95rem; font-weight:500; color:var(--a-fg);
          outline:none; transition:border-color .2s,box-shadow .2s;
        }
        .a-input::placeholder { color:transparent; }
        .a-input:focus { border-color:#1c1510; box-shadow:0 0 0 3px rgba(28,21,16,.06); }
        .dark .a-input:focus { border-color:rgba(245,240,232,.3); box-shadow:0 0 0 3px rgba(245,240,232,.06); }
        .a-label {
          position:absolute; left:1rem; top:.82rem;
          font-family:var(--oc-mono); font-size:.65rem;
          letter-spacing:.12em; text-transform:uppercase;
          color:var(--a-muted); pointer-events:none;
          transition:top .18s,font-size .18s;
        }
        .a-label.up { top:.28rem; font-size:.56rem; }

        /* OTP digit boxes */
        .a-otp {
          width:3.2rem; height:3.5rem; text-align:center; font-size:1.5rem; font-weight:700;
          background:var(--a-input); border:1.5px solid var(--a-border);
          border-radius:8px; color:var(--a-fg); outline:none;
          transition:border-color .2s,box-shadow .2s;
        }
        .a-otp:focus { border-color:#c0392b; box-shadow:0 0 0 3px rgba(192,57,43,.15); }

        /* submit button — border always present to prevent layout shift */
        .a-submit {
          border: 1.5px solid transparent !important;
          transition: background .22s, transform .15s, box-shadow .22s, border-color .22s !important;
        }
        .a-submit:hover:not(:disabled) {
          background: linear-gradient(135deg,#c0392b,#e74c3c) !important;
          border-color: transparent !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(192,57,43,.35);
          color: #f5f0e8 !important;
        }
        /* dark mode — only change border colour, never the width */
        .dark .a-submit:not(:hover) {
          background: rgba(245,240,232,0.07) !important;
          border-color: rgba(245,240,232,0.16) !important;
          color: #f5f0e8 !important;
        }

        /* oauth / outline button */
        .a-oauth {
          background:var(--a-input); border:1.5px solid var(--a-border);
          color:var(--a-fg);
          transition:border-color .2s,background .2s,transform .15s;
        }
        .a-oauth:hover { background:var(--a-paper); transform:translateY(-1px); }

        /* divider line */
        .a-line { background:var(--a-line); }
        .a-or   { color:var(--a-or); }

        /* eyebrow */
        .a-eyebrow { display:flex; align-items:center; gap:.6rem; margin-bottom:.75rem; }

        /* fade up animation */
        @keyframes aFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .a-anim { animation:aFadeUp .5s ease both; }

        /* left panel keyframes */
        @keyframes aGlowA { from{transform:translate(0,0)} to{transform:translate(50px,70px)} }
        @keyframes aGlowB { from{transform:translate(0,0)} to{transform:translate(-45px,-55px)} }
        @keyframes aPulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0)} }
      `}</style>

      {/* cursor */}
      <div ref={dotRef}  className="a-dot" />
      <div ref={ringRef} className="a-ring" />

      <div className="grid md:grid-cols-2 min-h-screen">

        {/* ═══ LEFT — always dark, hidden on mobile ═══ */}
        <div className="hidden md:flex bg-[#120e0a] flex-col overflow-hidden relative">
          {leftPanel}
        </div>

        {/* ═══ RIGHT — themed ═══ */}
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-y-auto bg-[#f5f0e8] dark:bg-[#1c1510] py-16 px-[clamp(2rem,5vw,4.5rem)]">

          {/* theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed top-5 right-5 z-50 w-9 h-9 rounded-full border border-[#d6cfc2] dark:border-[rgba(255,255,255,0.1)] bg-[#f5f0e8] dark:bg-[#1c1510] flex items-center justify-center text-[#1c1510] dark:text-[#f5f0e8] cursor-pointer transition-all"
          >
            {mounted ? (isDark ? <Sun size={14}/> : <Moon size={14}/>) : <Moon size={14}/>}
          </button>

          {/* form content */}
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

/**
 * OCLogo — Logo 1 "Organic Branch Mark"
 *
 * Props:
 *   light  — true  → cream text (for always-dark panels / dark backgrounds)
 *            false → auto theme via CSS vars (default, for themed panels)
 *   size   — "sm" | "md" (default) | "lg"
 *   href   — link destination, defaults to "/"
 */
export default function OCLogo({
  light = false,
  size  = "md",
  href  = "/",
}: {
  light?: boolean;
  size?:  "sm" | "md" | "lg";
  href?:  string;
}) {
  const S = {
    sm: { mark: 30, text: "1.05rem", sub: "0.46rem", gap: ".65rem" },
    md: { mark: 38, text: "1.35rem", sub: "0.52rem", gap: ".75rem" },
    lg: { mark: 46, text: "1.65rem", sub: "0.58rem", gap: ".9rem"  },
  }[size];

  /* ── colours ── */
  const fgColor    = light ? "#f5f0e8"                  : "var(--oc-logo-fg,#1c1510)";
  const subColor   = light ? "rgba(245,240,232,0.45)"   : "var(--oc-logo-sub,#8c7b6a)";
  const innerColor = light ? "#f5f0e8"                  : "var(--oc-logo-inner,#1c1510)";

  return (
    <>
      {/* Flash-free CSS vars — only needed when not already set by parent shell */}
      <style>{`
        :root  { --oc-logo-fg:#1c1510; --oc-logo-sub:#8c7b6a; --oc-logo-inner:#1c1510; }
        .dark  { --oc-logo-fg:#f5f0e8; --oc-logo-sub:rgba(245,240,232,0.45); --oc-logo-inner:#f5f0e8; }
      `}</style>

      <Link
        href={href}
        style={{
          display: "flex", alignItems: "center", gap: S.gap,
          textDecoration: "none", flexShrink: 0,
        }}
      >
        {/* ── mark SVG (Logo 1 — Organic Branch) ── */}
        <svg
          width={S.mark} height={S.mark}
          viewBox="0 0 44 44" fill="none"
          style={{ flexShrink: 0 }}
          aria-hidden="true"
        >
          {/* outer rust ring */}
          <circle cx="22" cy="22" r="20" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.65"/>
          {/* inner O — adapts to bg */}
          <circle cx="22" cy="22" r="12" stroke={innerColor} strokeWidth="2.5" fill="none"/>
          {/* leaf at top */}
          <path d="M22 10 C22 10 26 5 22 2 C18 5 22 10 22 10Z" fill="#c0392b"/>
          {/* compass dots (subtle) */}
          <circle cx="34" cy="22" r="1" fill={light ? "rgba(245,240,232,0.25)" : "rgba(28,21,16,0.18)"} />
          <circle cx="10" cy="22" r="1" fill={light ? "rgba(245,240,232,0.25)" : "rgba(28,21,16,0.18)"} />
        </svg>

        {/* ── wordmark ── */}
        <div style={{ lineHeight: 1 }}>
          <div style={{
            fontFamily: "var(--oc-serif,'Cormorant Garamond',Georgia,serif)",
            fontSize:   S.text,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: fgColor,
            lineHeight: 1,
          }}>
            Orchard
          </div>
          <span style={{
            fontFamily:    "var(--oc-mono,'IBM Plex Mono',monospace)",
            fontSize:      S.sub,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color:         subColor,
            marginTop:     "0.18rem",
            display:       "block",
          }}>
            Capitals
          </span>
        </div>
      </Link>
    </>
  );
}

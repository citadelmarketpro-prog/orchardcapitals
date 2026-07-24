"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import OCLogo from "@/components/site/OCLogo";
import LiquidityProvidersSection from "@/components/site/LiquidityProvidersSection";
import AchievementsSection from "@/components/site/AchievementsSection";
import { Menu, X, ChevronDown } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--oc-poppins",
  display: "swap",
});

export const OC = "#c14e2a";
export const BLACK = "#0a0a0a";
export const WHITE = "#ffffff";
export const GRAY = "#f4f3f1";

const NAV_GROUPS = [
  {
    label: "Company",
    items: [
      ["About", "/about"],
      ["Regulations", "/regulations"],
      ["Security", "/security"],
      ["Insurance", "/insurance"],
    ],
  },
  {
    label: "Markets",
    items: [
      ["Trading Live", "/trading-live"],
      ["Swing Trading", "/swing-trading"],
      ["Futures", "/futures"],
      ["Options Trading", "/option-trading"],
      ["Advanced Trading", "/advance-trading"],
    ],
  },
  {
    label: "Copy Trading",
    items: [
      ["Top Traders", "/lead-traders"],
      ["Options Copy", "/option-copy-trading"],
    ],
  },
  {
    label: "Platform",
    items: [
      ["Software", "/software"],
      ["Insight", "/insight"],
    ],
  },
];

interface PageWrapperProps {
  children: React.ReactNode;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export default function PageWrapper({ children, ctaTitle, ctaSubtitle }: PageWrapperProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <div
      className={poppins.variable}
      style={{ fontFamily: "var(--oc-poppins), system-ui, sans-serif", color: BLACK, overflowX: "hidden" }}
    >
      {/* ── NAVBAR ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100, background: BLACK,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "border-color 0.3s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <OCLogo light size="sm" href="/" />

          {/* Desktop nav — dropdown groups */}
          <nav className="hidden lg:flex" style={{ gap: 4, alignItems: "center" }}>
            <Link href="/new-landing"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 500, textDecoration: "none", padding: "8px 12px", borderRadius: 8, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}>
              Overview
            </Link>
            {NAV_GROUPS.map(group => (
              <div key={group.label} style={{ position: "relative" }}
                onMouseEnter={() => openMenu(group.label)}
                onMouseLeave={scheduleClose}>
                <button
                  style={{ display: "flex", alignItems: "center", gap: 4, color: openGroup === group.label ? WHITE : "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: "8px 12px", borderRadius: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                  onMouseLeave={e => { if (openGroup !== group.label) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
                  {group.label}
                  <ChevronDown className="w-3.5 h-3.5" style={{ transition: "transform 0.2s", transform: openGroup === group.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {openGroup === group.label && (
                  <div
                    onMouseEnter={() => openMenu(group.label)}
                    onMouseLeave={scheduleClose}
                    style={{ position: "absolute", top: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)", background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px", minWidth: 190, boxShadow: "0 16px 48px rgba(0,0,0,0.5)", zIndex: 200 }}>
                    {group.items.map(([lbl, href]) => (
                      <Link key={lbl} href={href}
                        onClick={() => setOpenGroup(null)}
                        style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "9px 14px", borderRadius: 8, transition: "background 0.15s, color 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = WHITE; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
                        {lbl}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/login" className="hidden lg:block"
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              Sign in
            </Link>
            <Link href="/register" style={{
              background: OC, color: WHITE, fontSize: 14, fontWeight: 700,
              padding: "9px 20px", borderRadius: 100, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Open Account
            </Link>
            <button className="lg:hidden" onClick={() => setMenuOpen(v => !v)}
              style={{ color: WHITE, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 24px 24px", maxHeight: "80vh", overflowY: "auto" }}>
            <Link href="/new-landing" onClick={() => setMenuOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.75)", fontSize: 15, fontWeight: 500, textDecoration: "none", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              Overview
            </Link>
            {NAV_GROUPS.map(group => (
              <div key={group.label}>
                <button
                  onClick={() => setMobileOpen(mobileOpen === group.label ? null : group.label)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", color: "rgba(255,255,255,0.9)", fontSize: 15, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "left" }}>
                  {group.label}
                  <ChevronDown className="w-4 h-4" style={{ transition: "transform 0.2s", transform: mobileOpen === group.label ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.4)" }} />
                </button>
                {mobileOpen === group.label && (
                  <div style={{ paddingLeft: 16, paddingBottom: 4 }}>
                    {group.items.map(([lbl, href]) => (
                      <Link key={lbl} href={href} onClick={() => { setMenuOpen(false); setMobileOpen(null); }}
                        style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {lbl}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/login" onClick={() => setMenuOpen(false)}
              style={{ display: "block", color: "rgba(255,255,255,0.75)", fontSize: 15, fontWeight: 500, textDecoration: "none", padding: "13px 0" }}>
              Sign in
            </Link>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      {children}

      {/* ── CTA STRIP ── */}
      <section style={{ background: OC, padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: "var(--oc-poppins)", fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 300, color: WHITE, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.5px",
          }}>
            {ctaTitle ?? "Start growing your portfolio"}<br />
            <em style={{ fontStyle: "italic" }}>today.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, marginBottom: 36 }}>
            {ctaSubtitle ?? "Join 500,000+ investors already copying the world's top traders."}
          </p>
          <Link href="/register" style={{
            background: WHITE, color: OC, fontWeight: 800, fontSize: 16,
            padding: "16px 40px", borderRadius: 100, textDecoration: "none", display: "inline-block",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Open Free Account
          </Link>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <AchievementsSection />

      {/* ── LIQUIDITY PROVIDERS ── */}
      <LiquidityProvidersSection />

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0a0a", paddingTop: 64, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

          {/* Top columns */}
          <div style={{ display: "grid", gap: 32, marginBottom: 48 }} className="sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

            {/* Brand column */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <OCLogo light size="sm" href="/" />
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
                A premium copy trading platform connecting retail investors with elite professional traders. Transparent. Audited. Trusted.
              </p>
            </div>

            {/* Link columns */}
            {[
              { title: "Platform", links: [["Top Traders", "/lead-traders"], ["Pricing", "/new-landing#fees"], ["Copy Trading", "/option-copy-trading"], ["Software", "/software"]] },
              { title: "Company", links: [["About Us", "/about"], ["Lead Traders", "/lead-traders"], ["FAQs", "/faq"], ["Regulations", "/regulations"], ["Security", "/security"], ["Insurance", "/insurance"]] },
              { title: "Legal", links: [["Terms of Service", "/terms-of-service"], ["Privacy Policy", "/privacy-policy"], ["Risk Disclaimer", "/risk-disclaimer"], ["SIPC Disclosure", "/sipc-disclosure"], ["Form CRS", "/form-crs"]] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ color: WHITE, fontWeight: 700, fontSize: 14, marginBottom: 16 }}>{col.title}</p>
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href}
                    style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 32 }} />
        </div>
      </footer>

      {/* Disclaimer — separate block, WHITE background, dark text */}
      <div style={{ background: WHITE, padding: "32px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: "0.72rem", color: "#4b5563", lineHeight: 1.75, fontWeight: 500 }}>
            Disclaimer: Orchard Capital Management, LLC (Orchard Capital Management, LLC). CRD#: 269957 / SEC#: 801-106488. Registered Address: 130 N Garland Ct # 5701, Chicago, IL 60602.
          </p>
          <p style={{ fontSize: "0.72rem", color: "#4b5563", lineHeight: 1.75, fontWeight: 500 }}>
            Past performance is not an indication of future results. You should seek advice from an independent and suitably licensed financial advisor and ensure that you have the risk appetite, relevant experience and knowledge before you decide to trade. Trading with Orchard Capitals by following and/or copying or replicating the trades of other traders involves a high level of risk, even when following and/or copying the top-performing traders.
          </p>
          <p style={{ fontSize: "0.7rem", color: "#9ca3af", letterSpacing: "0.04em", paddingTop: "0.5rem" }}>
            Copyright © 2006–{new Date().getFullYear()} Orchard Capitals — Your Social Investment Network. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

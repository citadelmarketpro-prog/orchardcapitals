"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import OCLogo from "./OCLogo";
import { Sun, Moon, Menu, X } from "lucide-react";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Darker_Grotesque,
} from "next/font/google";

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

export default function OCPageShell({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState<string | null>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  /* custom cursor */
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

  const isDark  = mounted && resolvedTheme === "dark";
  const rust    = "#c0392b";
  const cream   = "#f5f0e8";
  const bark    = "#8c7b6a";
  const dark    = "#1c1510";
  const darker  = "#120e0a";
  const fg      = isDark ? cream  : dark;
  const muted   = isDark ? "rgba(245,240,232,0.4)" : bark;
  const border  = isDark ? "rgba(255,255,255,0.08)" : "rgba(74,63,53,0.12)";

  const NAV_LINKS = [
    ["Home",      "/"],
    ["Leaders",   "/leader"],
    ["Affiliate", "/affiliate"],
    ["Broker",    "/broker"],
    ["About",     "/about"],
  ] as const;

  const FOOTER_SECTIONS = [
    { title: "LEGALS", links: [
      ["Terms Of Service", "/terms-of-service"],
      ["Privacy Policy", "/privacy-policy"],
      ["Cookies Policy", "/cookies-policy"],
      ["Risk Disclaimer", "/risk-disclaimer"],
      ["Conflict of Interest Policy", "/conflict-of-interest"],
      ["Declaration of Consent", "/declaration-of-consent"],
      ["End-User License Agreement", "/end-user-license-agreement"],
    ]},
    { title: "FEATURES",     links: [["AutoGuard™", "/autoguard"]] },
    { title: "RESOURCES",    links: [["Affiliate Guide", "/affiliate-guide"], ["Leader Guide", "/leader-guide"], ["User Guide", "/user-guide"]] },
    { title: "ABOUT US",     links: [["Company", "/about"]] },
    { title: "PARTNERSHIPS", links: [["Leader", "/leader"], ["Affiliate", "/affiliate"], ["Broker", "/broker"]] },
    { title: "CONTACT",      links: [["+1 (929) 512-0241", "#"], ["support@orchardcapitals.com", "mailto:support@orchardcapitals.com"]] },
  ];

  return (
    <div
      className={`${cormorant.variable} ${ibmMono.variable} ${grotesque.variable} bg-[#f5f0e8] dark:bg-[#120e0a] text-[#1c1510] dark:text-[#f5f0e8]`}
      style={{ fontFamily: "var(--oc-sans),'Darker Grotesque',sans-serif", overflowX: "hidden", cursor: "none", minHeight: "100vh" }}
    >
      {/* ── scoped CSS ── */}
      <style>{`
        .oc-serif { font-family: var(--oc-serif),'Cormorant Garamond',Georgia,serif; }
        .oc-mono  { font-family: var(--oc-mono),'IBM Plex Mono',monospace; }
        .oc-sans  { font-family: var(--oc-sans),'Darker Grotesque',sans-serif; }

        /* cursor */
        .oc-dot  { position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;background:${rust};border-radius:50%;transform:translate(-50%,-50%);transition:transform .1s; }
        .oc-ring { position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;border:1.5px solid ${isDark ? "rgba(192,57,43,0.5)" : "rgba(139,124,106,0.45)"};border-radius:50%;transform:translate(-50%,-50%);transition:width .18s,height .18s,border-color .18s; }

        /* scrollbar */
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#2a2018;border-radius:2px;}

        /* nav link hover */
        .oc-navlink:hover { color:${isDark ? cream : dark}!important; }

        /* show/hide helpers */
        .oc-show-mobile { display:none; }
        @media(max-width:768px){
          .oc-hide-mobile { display:none!important; }
          .oc-show-mobile { display:flex!important; }
        }

        /* footer links */
        .oc-flink { font-size:.78rem;font-weight:600;color:rgba(245,240,232,.3);text-decoration:none;transition:color .2s;letter-spacing:.04em; }
        .oc-flink:hover { color:${cream}; }

        /* footer grid */
        .oc-footer-top { display:grid;grid-template-columns:minmax(200px,280px) 1fr;gap:3rem;align-items:flex-start; }
        @media(max-width:640px){ .oc-footer-top { grid-template-columns:1fr!important; } }

        /* ── OC CSS variables — static, survive SSR flash ── */
        :root {
          --oc-fg:     #1c1510;
          --oc-muted:  #8c7b6a;
          --oc-border: rgba(74,63,53,0.12);
          --oc-surfEl: #ede8de;
          --oc-surf:   #ffffff;
          --oc-rust:   #c0392b;
        }
        .dark {
          --oc-fg:     #f5f0e8;
          --oc-muted:  rgba(245,240,232,0.4);
          --oc-border: rgba(255,255,255,0.08);
          --oc-surfEl: rgba(255,255,255,0.025);
          --oc-surf:   rgba(255,255,255,0.04);
        }

        /* ── Heading typography override ── */
        .oc-content h1,
        .oc-content h2 {
          font-family: var(--oc-serif),'Cormorant Garamond',Georgia,serif !important;
          font-weight: 300 !important;
          letter-spacing: -0.02em !important;
          color: var(--oc-fg) !important;
          line-height: 1.1 !important;
        }
        .oc-content h3,
        .oc-content h4,
        .oc-content h5 {
          font-family: var(--oc-sans),'Darker Grotesque',sans-serif !important;
          font-weight: 800 !important;
          color: var(--oc-fg) !important;
        }

        /* ── Text colour overrides ── */
        .oc-content [class*="text-gray-9"],
        .oc-content [class*="text-gray-8"],
        .oc-content [class*="text-gray-7"],
        .oc-content [class*="text-gray-6"] { color: var(--oc-fg) !important; }

        .oc-content [class*="text-gray-5"],
        .oc-content [class*="text-gray-4"],
        .oc-content [class*="text-gray-3"] { color: var(--oc-muted) !important; }

        /* ── Background overrides ── */
        .oc-content [class*="bg-gray-50"],
        .oc-content [class*="bg-gray-100"],
        .oc-content [class*="bg-gray-800"],
        .oc-content [class*="bg-gray-900"] { background-color: var(--oc-surfEl) !important; }

        /* ── Border overrides ── */
        .oc-content [class*="border-gray-"],
        .oc-content [class*="border-white/"] { border-color: var(--oc-border) !important; }

        /* ── Divider lines ── */
        .oc-content .border-t,
        .oc-content .border-b { border-color: var(--oc-border); }

        /* ── Step / warm section bg ── */
        .oc-content [class*="bg-orange-50"] { background-color: rgba(192,57,43,0.05) !important; }
        .dark .oc-content [class*="bg-orange-50"] { background-color: rgba(255,255,255,0.02) !important; }

        /* ── Cards with white/transparent bg — keep them themed ── */
        .oc-content [class*="bg-white/70"] { background-color: rgba(255,255,255,0.7) !important; }
        .dark .oc-content [class*="bg-white/70"] { background-color: rgba(255,255,255,0.04) !important; }

        /* ── Hover on tab buttons in leader page ── */
        .oc-content [class*="hover:bg-gray-50"]:hover { background-color: var(--oc-surfEl) !important; }
        .oc-content [class*="hover:bg-white/5"]:hover { background-color: rgba(255,255,255,0.05) !important; }
      `}</style>

      {/* cursor */}
      <div ref={dotRef}  className="oc-dot" />
      <div ref={ringRef} className="oc-ring" />

      {/* ════════════ NAVBAR ════════════ */}
      <nav
        className="bg-[rgba(245,240,232,0.92)] dark:bg-[rgba(18,14,10,0.88)]"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 600, height: 66,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(1.2rem,4vw,3.5rem)",
          backdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: `1px solid ${border}`,
        }}
      >
        {/* brand */}
        <OCLogo size="md" />

        {/* centre links — desktop */}
        <div className="oc-hide-mobile" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="oc-navlink" style={{
              fontSize: ".8rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
              color: isDark ? "rgba(245,240,232,.4)" : bark, textDecoration: "none", transition: "color .2s",
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${border}`, background: "transparent", color: fg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s", flexShrink: 0 }}
          >
            {mounted ? (isDark ? <Sun size={15}/> : <Moon size={15}/>) : <Moon size={15}/>}
          </button>
          <Link href="/login" className="oc-hide-mobile oc-navlink" style={{
            fontSize: ".8rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
            color: isDark ? "rgba(245,240,232,.4)" : bark, textDecoration: "none",
          }}>
            Sign In
          </Link>
          <Link href="/register" className="oc-hide-mobile" style={{
            background: rust, color: "white", padding: ".55rem 1.4rem", borderRadius: 6,
            fontSize: ".78rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase",
            textDecoration: "none", boxShadow: "0 2px 14px rgba(192,57,43,.4)",
            transition: "background .2s", flexShrink: 0,
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#a93226")}
            onMouseLeave={e => (e.currentTarget.style.background = rust)}
          >
            Get Started
          </Link>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="oc-show-mobile"
            style={{ background: "transparent", border: "none", color: fg, cursor: "pointer", padding: 4 }}
            aria-label="menu"
          >
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* mobile nav overlay */}
      {mobileOpen && (
        <div
          className="bg-[#f5f0e8] dark:bg-[#120e0a]"
          style={{ position: "fixed", inset: 0, zIndex: 500, paddingTop: 72, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto" }}
        >
          <div style={{ width: "100%", maxWidth: 360, padding: "1.5rem 2rem", display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                fontSize: "1rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                color: fg, textDecoration: "none", padding: "1rem 0", borderBottom: `1px solid ${border}`,
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ width: "100%", maxWidth: 360, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: ".8rem" }}>
            <Link href="/login" onClick={() => setMobileOpen(false)} style={{
              width: "100%", textAlign: "center", border: `1px solid ${border}`, color: fg,
              padding: ".9rem", borderRadius: 6, fontSize: ".85rem", fontWeight: 700,
              letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none",
            }}>
              Sign In
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)} style={{
              width: "100%", textAlign: "center", background: rust, color: "white",
              padding: ".9rem", borderRadius: 6, fontSize: ".85rem", fontWeight: 800,
              letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none",
              boxShadow: "0 2px 14px rgba(192,57,43,.4)",
            }}>
              Get Started
            </Link>
          </div>
        </div>
      )}

      {/* ════════════ CONTENT ════════════ */}
      <main style={{ paddingTop: 66 }}>
        <div className="oc-content">
          {children}
        </div>
      </main>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", background: isDark ? darker : dark, color: cream }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "3.5rem clamp(1.2rem,4vw,3.5rem)" }}>

          {/* top: brand + link sections */}
          <div className="oc-footer-top">
            {/* brand col */}
            <div>
              <OCLogo light size="md" />
              <p style={{ fontSize: ".85rem", color: "rgba(245,240,232,.4)", lineHeight: 1.65, fontWeight: 500, marginTop: ".6rem" }}>
                Copy trade with Orchard Capitals
              </p>
            </div>

            {/* accordion link sections */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {FOOTER_SECTIONS.map(({ title, links }) => (
                <div key={title} style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                  <button
                    onClick={() => setFooterOpen(footerOpen === title ? null : title)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".9rem 0", background: "transparent", border: "none", cursor: "pointer", color: cream }}
                  >
                    <span className="oc-mono" style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,240,232,.5)" }}>
                      {title}
                    </span>
                    <span style={{ width: 22, height: 22, borderRadius: 4, border: "1px solid rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "rgba(245,240,232,.4)", transition: "transform .25s", transform: footerOpen === title ? "rotate(180deg)" : "none" }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </span>
                  </button>
                  <div style={{ overflow: "hidden", maxHeight: footerOpen === title ? "600px" : "0", opacity: footerOpen === title ? 1 : 0, transition: "max-height .3s ease,opacity .3s ease" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: ".55rem" }}>
                      {links.map(([label, href]) => (
                        <li key={label}>
                          <Link href={href} className="oc-flink">{label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* disclaimer */}
          <div style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontSize: ".72rem", color: "rgba(245,240,232,.25)", lineHeight: 1.75, fontWeight: 500 }}>
              Disclaimer: Orchard Capitals (Europe) Ltd., a Financial Services Company authorised and regulated by the Cyprus Securities Exchange Commission (CySEC) under the license # 109/10. Registered in Cyprus under Company No. HE 200595. Registered Office: 4 Profiti Ilia Str., Kanika Business Centre, 7th floor, Germasogeia, 4046, Limassol, Cyprus. Orchard Capitals (UK) Ltd, a Financial Services Company authorised and regulated by the Financial Conduct Authority (FCA) under the license FRN 583263. Registered Office: 24th floor, One Canada Square, Canary Wharf, London E14 5AB. Orchard Capitals (USA) Ltd, a financial company authorised and regulated by SEC; CRD 18000661. Orchard Capitals (ME) Limited, is licensed and regulated by the Abu Dhabi Global Market (&ldquo;ADGM&rdquo;)&apos;s Financial Services Regulatory Authority (&ldquo;FSRA&rdquo;) as an Authorised Person under Financial Services Permission Number 220073.
            </p>
            <p style={{ fontSize: ".72rem", color: "rgba(245,240,232,.25)", lineHeight: 1.75, fontWeight: 500 }}>
              Past performance is not an indication of future results. You should seek advice from an independent and suitably licensed financial advisor and ensure that you have the risk appetite, relevant experience and knowledge before you decide to trade. Trading with Orchard Capitals by following and/or copying or replicating the trades of other traders involves a high level of risk, even when following and/or copying the top-performing traders.
            </p>
            <p style={{ fontSize: ".7rem", color: "rgba(245,240,232,.15)", letterSpacing: ".04em", paddingTop: ".5rem" }}>
              Copyright &copy; 2006&ndash;2026 Orchard Capitals &mdash; Your Social Investment Network. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

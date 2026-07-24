"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, TrendingUp, BarChart2, Globe, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const FEATURES = [
  { icon: <Zap className="w-6 h-6" />, title: "Micro & Standard Contracts", desc: "Trade E-mini and Micro E-mini futures on indices like S&P 500, Nasdaq 100, and Dow Jones with flexible contract sizes." },
  { icon: <Globe className="w-6 h-6" />, title: "Nearly 24-Hour Access", desc: "Futures markets open Sunday evening and trade through Friday afternoon — reacting to global events as they happen." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Leverage with Defined Risk", desc: "Futures allow leveraged exposure to major markets while maintaining clearly defined margin requirements per contract." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Hedge Your Portfolio", desc: "Use index futures to hedge your equity holdings against broad market downturns. Manage systemic risk precisely." },
  { icon: <Shield className="w-6 h-6" />, title: "Copy Futures Specialists", desc: "Follow verified traders who specialize in index futures. Mirror their positions automatically with zero extra setup." },
  { icon: <Clock className="w-6 h-6" />, title: "Overnight Positions", desc: "Hold futures contracts overnight to capture gap-up or gap-down moves driven by earnings, data releases, or geopolitical events." },
];

const CONTRACTS = [
  { symbol: "/ES", name: "E-mini S&P 500", multiplier: "$50 per point", margin: "~$12,000" },
  { symbol: "/MES", name: "Micro E-mini S&P 500", multiplier: "$5 per point", margin: "~$1,200" },
  { symbol: "/NQ", name: "E-mini Nasdaq 100", multiplier: "$20 per point", margin: "~$15,000" },
  { symbol: "/MNQ", name: "Micro E-mini Nasdaq 100", multiplier: "$2 per point", margin: "~$1,500" },
  { symbol: "/YM", name: "E-mini Dow Jones", multiplier: "$5 per point", margin: "~$8,000" },
  { symbol: "/MYM", name: "Micro E-mini Dow Jones", multiplier: "$0.50 per point", margin: "~$800" },
];

export default function FuturesPage() {
  return (
    <PageWrapper
      ctaTitle="Trade Futures with Orchard Capitals"
      ctaSubtitle="Access major stock index futures — micro and standard contracts — nearly 24 hours a day.">

      {/* ── HERO ── */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "96px 24px 88px" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse at center, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <motion.img {...reveal} src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Futures Trading</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Trade the Index.<br /><em style={{ fontStyle: "italic", color: OC }}>Not Just the Stock.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Access S&P 500, Nasdaq 100, and Dow Jones futures — micro contracts included. Nearly 24 hours a day, five days a week, with defined risk and copy trading support.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Trade Futures <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTRACTS TABLE ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Available Contracts</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Six index futures contracts,<br /><em style={{ color: OC, fontStyle: "italic" }}>from micro to full-size.</em>
            </motion.h2>
          </div>
          <div style={{ background: GRAY, borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.5fr 1fr", padding: "14px 24px", background: `${OC}10`, borderBottom: "1px solid #e5e7eb" }}>
              {["Symbol", "Contract", "Multiplier", "Est. Margin"].map(h => (
                <span key={h} style={{ fontSize: 12, fontWeight: 700, color: OC, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>
            {CONTRACTS.map((c, i) => (
              <motion.div key={c.symbol} {...reveal} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.5fr 1fr", padding: "18px 24px", borderBottom: i < CONTRACTS.length - 1 ? "1px solid #e5e7eb" : "none", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--oc-poppins)", fontWeight: 800, color: OC, fontSize: 15 }}>{c.symbol}</span>
                <span style={{ color: BLACK, fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                <span style={{ color: "#6b7280", fontSize: 13 }}>{c.multiplier}</span>
                <span style={{ color: "#374151", fontSize: 13, fontWeight: 500 }}>{c.margin}</span>
              </motion.div>
            ))}
          </div>
          <p style={{ color: "#9ca3af", fontSize: 12, marginTop: 12, textAlign: "center" }}>Margin requirements are estimates and may vary. Not investment advice.</p>
        </div>
      </section>

      {/* ── FEATURES  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Why Trade Futures</span>
              </div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px", color: WHITE }}>
                React to the world as it<br /><em style={{ fontStyle: "italic" }}>happens, not after.</em>
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(f => (
                <motion.div key={f.title} {...reveal} style={{ background: WHITE, borderRadius: 12, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ color: OC, marginBottom: 10 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: BLACK }}>{f.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["23hrs", "Daily Market Hours"], ["6", "Index Futures Available"], ["1x", "Micro Contract Minimum"], ["$0", "Platform Fees"]].map(([val, lbl]) => (
              <motion.div key={lbl} {...reveal} style={{ padding: "40px 24px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{lbl}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

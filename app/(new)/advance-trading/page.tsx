"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, Check, BarChart2, Zap, TrendingUp, Settings } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const ORDER_TYPES = [
  { name: "Bracket Order", desc: "Simultaneously set a profit target and a stop-loss on any position — automatically." },
  { name: "Conditional Order", desc: "Trigger an order only when a specific price condition or indicator threshold is met." },
  { name: "Trailing Stop", desc: "Lock in profits dynamically — the stop price moves with the market in your favour." },
  { name: "One-Cancels-Other", desc: "Two orders placed simultaneously; executing one automatically cancels the other." },
  { name: "Good-Til-Cancelled", desc: "Keep your limit order live in the market until it fills or you manually cancel it." },
  { name: "Extended Hours", desc: "Trade before and after regular market hours during pre-market and after-hours sessions." },
];

const ANALYTICS = [
  { icon: <BarChart2 className="w-6 h-6" />, title: "Level 2 Market Data", desc: "See up to 60 levels of bid/ask depth for any stock or ETF. Understand where the real money is sitting." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Real-Time P&L Tracking", desc: "Live mark-to-market P&L on every position — updated tick by tick, not just at close." },
  { icon: <Zap className="w-6 h-6" />, title: "Options Flow Scanner", desc: "See unusual options activity and large block trades hitting the tape in real time." },
  { icon: <Settings className="w-6 h-6" />, title: "Customizable Screeners", desc: "Build and save stock screeners using 50+ technical and fundamental filters." },
];

export default function AdvanceTradingPage() {
  return (
    <PageWrapper
      ctaTitle="Unlock Advanced Trading Today"
      ctaSubtitle="Professional-grade tools available to every Orchard Capitals account — at no extra cost.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Advanced Trading</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Tools That Give You<br /><em style={{ fontStyle: "italic", color: OC }}>The Edge.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Advanced order types, Level 2 data, real-time scanners, and precision analytics — the same tools institutional traders rely on, built for individual investors.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Start Trading <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ORDER TYPES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Order Types</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Precision tools. Zero extra cost.
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              Precision control over every entry and exit — available on stocks, ETFs, and options.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORDER_TYPES.map(o => (
              <motion.div key={o.name} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${OC}12`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: OC, flexShrink: 0 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: BLACK }}>{o.name}</h3>
                </div>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYTICS  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Analytics & Data</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px", color: WHITE }}>
              Institutional data,<br /><em style={{ fontStyle: "italic" }}>retail price.</em>
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {ANALYTICS.map(a => (
                <motion.div key={a.title} {...reveal} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: WHITE, borderRadius: 12, padding: "18px 20px", border: "1px solid #e5e7eb" }}>
                  <div style={{ color: OC, flexShrink: 0, marginTop: 2 }}>{a.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: BLACK }}>{a.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

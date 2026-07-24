"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, Zap, Activity, BarChart2, Radio, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const FEATURES = [
  { icon: <Zap className="w-6 h-6" />, title: "Sub-Millisecond Execution", desc: "Orders are routed and filled in under a millisecond. No slippage, no delays — your price is your price." },
  { icon: <Activity className="w-6 h-6" />, title: "Live P&L Streaming", desc: "Every open position updates tick-by-tick. Watch your P&L move in real time as the market breathes." },
  { icon: <Radio className="w-6 h-6" />, title: "Real-Time Order Book", desc: "See live bid/ask quotes with depth-of-market data. Know exactly who is buying and selling at every level." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Streaming Charts", desc: "Candlestick charts refresh on every tick — no reloading required. Technical analysis on live data." },
  { icon: <Clock className="w-6 h-6" />, title: "Pre & After-Market Access", desc: "Trade before the bell opens and after it closes. React to earnings reports and economic data instantly." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Live Copy Mirroring", desc: "When a lead trader opens a position, your account mirrors it in under a second — live and automatic." },
];

export default function TradingLivePage() {
  return (
    <PageWrapper
      ctaTitle="Trade Live, Trade Fast"
      ctaSubtitle="Execute at the speed of the market with Orchard Capitals' real-time trading infrastructure.">

      {/* ── HERO ── */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "96px 24px 88px" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse at center, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <motion.img {...reveal} src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Trading</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Execute at the<br /><em style={{ fontStyle: "italic", color: OC }}>Speed of the Market.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Real-time quotes, tick-by-tick P&L, live order book depth, and sub-millisecond order routing. Professional trading infrastructure — for every account.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Start Live Trading <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Real-Time Features</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Everything live. Everything instant.
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              No refresh needed. No delayed quotes. The market moves — you see it, and you can act on it, in real time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <motion.div key={f.title} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{f.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADINGVIEW WIDGET CTA  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Powered by TradingView</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px", color: WHITE }}>
              Professional charts.<br /><em style={{ fontStyle: "italic" }}>Built right in.</em>
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              Orchard Capitals is powered by TradingView's charting engine — the same tool used by professional traders at top hedge funds. Over 100 technical indicators, 20+ chart types, and live data feeds are included with every account.
            </p>
            {["100+ technical indicators built-in", "Candlestick, Heikin-Ashi, Renko, and more", "Multi-timeframe analysis from 1 minute to monthly", "Drawing tools, annotations, and saved layouts"].map(item => (
              <motion.div key={item} {...reveal} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: WHITE, flexShrink: 0, marginTop: 6 }} />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["<1ms", "Order Execution Speed"], ["99.99%", "Platform Uptime"], ["24/5", "Live Market Hours"], ["$0", "Commission Per Trade"]].map(([val, lbl]) => (
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

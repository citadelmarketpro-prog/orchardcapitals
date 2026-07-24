"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, FileText, BarChart2, TrendingUp, BookOpen, Radio, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const SOURCES = [
  { icon: <Newspaper className="w-6 h-6" />, title: "Real-Time News Feed", desc: "Curated market news from top financial outlets — filtered by ticker, sector, or keyword. React before the crowd does." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Earnings Calendars", desc: "Track upcoming earnings reports, dividend dates, and economic data releases for every stock on your watchlist." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Analyst Ratings & Price Targets", desc: "View buy, hold, and sell ratings from Wall Street analysts alongside consensus price targets for any stock." },
  { icon: <Radio className="w-6 h-6" />, title: "Unusual Options Activity", desc: "Spot large institutional options bets as they hit the tape. Unusual order flow often signals major price moves ahead." },
  { icon: <FileText className="w-6 h-6" />, title: "SEC Filing Alerts", desc: "Get notified the moment a company files a 10-K, 10-Q, 8-K, or insider transaction report with the SEC." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Education & Commentary", desc: "Weekly market commentary from Orchard's lead traders — breaking down key setups, risks, and opportunities." },
];

const DATA_TYPES = [
  { label: "Fundamentals", items: ["P/E, P/S, P/B ratios", "EPS growth & revenue trends", "Free cash flow & debt levels", "Return on equity & margins"] },
  { label: "Technical Signals", items: ["RSI, MACD, Bollinger Bands", "Moving average crossovers", "Volume trend analysis", "Support & resistance levels"] },
  { label: "Sentiment", items: ["Short interest & days-to-cover", "Put/call ratio by ticker", "Insider buying & selling", "Institutional ownership changes"] },
];

export default function InsightPage() {
  return (
    <PageWrapper
      ctaTitle="Stay Ahead with Orchard Insight"
      ctaSubtitle="Access real-time news, analyst data, earnings calendars, and unusual options flow — all in one platform.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Market Insight</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Information Is the<br /><em style={{ fontStyle: "italic", color: OC }}>Real Edge.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Real-time news, earnings calendars, analyst ratings, unusual options flow, and SEC filing alerts — the data layer that professional traders rely on, built into every Orchard account.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Unlock Insight Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DATA TYPES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Data Categories</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Three lenses on every stock.<br /><em style={{ color: OC, fontStyle: "italic" }}>All in one place.</em>
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              Great traders don't rely on just one kind of data. Orchard Insight combines fundamentals, technicals, and sentiment into a unified research view.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DATA_TYPES.map(d => (
              <motion.div key={d.label} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: OC, marginBottom: 20 }}>{d.label}</h3>
                {d.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ color: "#374151", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOURCES  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Insight Sources</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px", color: WHITE }}>
              Six data streams.<br /><em style={{ fontStyle: "italic" }}>One dashboard.</em>
            </motion.h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOURCES.map(s => (
                <motion.div key={s.title} {...reveal} style={{ background: WHITE, borderRadius: 12, padding: "18px 20px", border: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ color: OC, flexShrink: 0, marginTop: 2 }}>{s.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: BLACK }}>{s.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
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
            {[["6", "Insight Data Streams"], ["Real-Time", "News & Filing Alerts"], ["$0", "Research Subscription Cost"], ["10K+", "Stocks Covered"]].map(([val, lbl]) => (
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

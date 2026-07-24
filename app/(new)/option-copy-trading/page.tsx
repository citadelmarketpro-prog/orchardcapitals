"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, Check, TrendingUp, Shield, Zap, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const STRATEGIES = ["Long Call", "Long Put", "Covered Call", "Cash-Secured Put", "Bull Call Spread", "Bear Put Spread", "Iron Condor", "Straddle", "Strangle", "Butterfly Spread", "Calendar Spread", "Diagonal Spread", "Collar"];

const HOW = [
  { num: "01", title: "Choose an Options Expert", desc: "Browse verified options traders ranked by return %, win rate, and strategy type. Filter by risk level and specialisation." },
  { num: "02", title: "Set Your Copy Parameters", desc: "Define how much capital to allocate, set stop-loss limits, and choose whether to copy all trades or specific option types only." },
  { num: "03", title: "Your Account Mirrors Theirs", desc: "When your lead trader opens an options position, your account mirrors it instantly — same strike, same expiry, same direction." },
  { num: "04", title: "Monitor and Adjust Anytime", desc: "Track live P&L on copied options positions. Adjust allocation, pause copying, or stop at any time from your dashboard." },
];

const BENEFITS = [
  { icon: <Zap className="w-6 h-6" />, title: "Zero Learning Curve", desc: "You don't need to understand Greeks or options pricing. The expert handles the strategy — you just collect the returns." },
  { icon: <Shield className="w-6 h-6" />, title: "Risk-Capped by Design", desc: "Copy parameters let you set a maximum loss threshold. Your account will stop copying if losses exceed your defined limit." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Full Trade Transparency", desc: "See every option trade your copied trader makes — strike price, expiry, premium paid, and live mark-to-market P&L." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "$0 Contract Fee", desc: "Options contract fees are $0 on Orchard Capitals. You keep more of your profit on every copied trade." },
];

export default function OptionCopyTradingPage() {
  return (
    <PageWrapper
      ctaTitle="Copy Expert Options Traders Today"
      ctaSubtitle="Access 13 options strategies with zero learning curve. Let verified experts trade for you.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Options Copy Trading</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Copy Expert Options.<br /><em style={{ fontStyle: "italic", color: OC }}>Zero Learning Curve.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Mirror the exact options strategies of verified traders — calls, puts, spreads, and more. Your account executes automatically. $0 contract fees.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Start Copying <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lead-traders" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                View Options Traders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Four steps. Zero guesswork.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW.map(h => (
              <motion.div key={h.num} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontFamily: "var(--oc-poppins)", fontSize: 36, fontWeight: 800, color: `${OC}30`, letterSpacing: "-1px", marginBottom: 16, lineHeight: 1 }}>{h.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: BLACK }}>{h.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Why Copy Options</span>
              </div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px", color: WHITE }}>
                Professional options returns,<br /><em style={{ fontStyle: "italic" }}>without the complexity.</em>
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map(b => (
                <motion.div key={b.title} {...reveal} style={{ background: WHITE, borderRadius: 12, padding: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ color: OC, marginBottom: 10 }}>{b.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: BLACK }}>{b.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 13 STRATEGIES STRIP ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: WHITE, textAlign: "center", letterSpacing: "-0.5px", marginBottom: 8 }}>
            13 Options Strategies <em style={{ color: OC, fontStyle: "italic" }}>Available to Copy</em>
          </motion.h2>
          <p style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", fontSize: 14, marginBottom: 40 }}>Each covered by verified traders with audited track records</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {STRATEGIES.map(s => (
              <motion.div key={s} {...reveal} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "8px 18px" }}>
                <span style={{ color: WHITE, fontSize: 13, fontWeight: 600 }}>{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

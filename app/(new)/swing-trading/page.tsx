"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, BarChart2, Target, Shield, Zap } from "lucide-react";

const ADVANTAGES = [
  { icon: <Clock className="w-6 h-6" />, title: "Hold for Days to Weeks", desc: "Swing trades are held from a few days up to several weeks — enough time for a trend to fully play out without the stress of intraday noise." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Ride Both Directions", desc: "Go long on bullish patterns or short on bearish breakdowns. Swing trading works in both bull and bear markets." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Technical + Fundamental Mix", desc: "The most effective swing strategies blend chart patterns with earnings catalysts, news events, and sector momentum." },
  { icon: <Target className="w-6 h-6" />, title: "Clear Entry and Exit Rules", desc: "Every swing trade has a defined target price and stop-loss before entry. No guessing — the math is done upfront." },
  { icon: <Shield className="w-6 h-6" />, title: "Risk Management Built In", desc: "Position sizing and stop-losses are calculated per trade so that no single loss can damage your overall portfolio significantly." },
  { icon: <Zap className="w-6 h-6" />, title: "Copy Expert Swing Traders", desc: "Let verified swing traders make the calls. Your account copies their positions automatically — same entry, same exit." },
];

const SETUPS = [
  { name: "Bull Flag", desc: "A sharp rally followed by a tight consolidation before a continuation breakout." },
  { name: "Ascending Triangle", desc: "Price makes higher lows while pressing against horizontal resistance — a classic breakout setup." },
  { name: "Pullback to Moving Average", desc: "A trending stock dips to its 20 or 50-day moving average, offering a high-probability re-entry." },
  { name: "Earnings Momentum", desc: "Strong earnings beat triggers a gap-up or sustained uptrend over the following weeks." },
  { name: "Cup and Handle", desc: "A rounded base followed by a brief handle consolidation before breaking to new highs." },
  { name: "Sector Rotation", desc: "Capital rotates from one sector to another — riding the early momentum into the new sector leader." },
];

export default function SwingTradingPage() {
  return (
    <PageWrapper
      ctaTitle="Swing into the Market with Orchard"
      ctaSubtitle="Copy expert swing traders or build your own strategy with professional tools and zero commissions.">

      {/* ── HERO ── */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "96px 24px 88px" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse at center, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Swing Trading</span>
            </div>
            <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Catch the Move.<br /><em style={{ fontStyle: "italic", color: OC }}>Not Just the Tick.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Swing trading captures multi-day trends in stocks, ETFs, and options. Defined entries, defined exits, and $0 commissions — on a platform built for precision.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Start Swing Trading <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lead-traders" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                Browse Swing Traders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Why Swing Trade</span>
            </div>
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              The balance between patience<br />and <em style={{ color: OC, fontStyle: "italic" }}>profit.</em>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              Swing trading gives you time to think, plan, and execute — without the chaos of second-to-second day trading.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map(a => (
              <div key={a.title} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{a.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{a.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SETUPS ── */}
      <section style={{ background: GRAY, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Popular Setups</span>
              </div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
                Six setups our traders<br /><em style={{ fontStyle: "italic", color: OC }}>use every week.</em>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SETUPS.map(s => (
                  <div key={s.name} style={{ background: WHITE, borderRadius: 12, padding: "18px 20px", border: "1px solid #e5e7eb" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0 }} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{s.name}</span>
                    </div>
                    <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6, paddingLeft: 16 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.1)", position: "sticky", top: 100 }}>
              <img src="/landing/images/unusual-9286c4a3.png" alt="Unusual options activity for swing setups" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["$0", "Commission Per Stock Trade"], ["500K+", "Active Traders"], ["6", "Popular Swing Setups"], ["24/5", "Market Access Hours"]].map(([val, lbl]) => (
              <div key={lbl} style={{ padding: "40px 24px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

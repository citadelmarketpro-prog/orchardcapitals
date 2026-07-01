"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, BarChart2, Target, Zap, DollarSign } from "lucide-react";

const BASICS = [
  { term: "Call Option", def: "The right to buy 100 shares of a stock at a specific price (strike) before a set date (expiry). Calls profit when the stock rises." },
  { term: "Put Option", def: "The right to sell 100 shares at a specific price before expiry. Puts profit when the stock falls — used to hedge or speculate on downside." },
  { term: "Strike Price", def: "The agreed price at which the option gives you the right to buy (call) or sell (put) the underlying stock." },
  { term: "Expiration Date", def: "The date on which the option contract expires. Options can expire weekly, monthly, or at longer intervals (LEAPs)." },
  { term: "Premium", def: "The price you pay (or collect) for the option contract. One contract represents 100 shares — so $2.50 premium = $250 cost." },
  { term: "IV (Implied Volatility)", def: "The market's expectation of future price movement. Higher IV means pricier options — understanding IV is key to trading options profitably." },
];

const STRATEGIES = [
  { icon: <TrendingUp className="w-6 h-6" />, name: "Buy Calls", risk: "Low", desc: "Bullish bet with defined risk. Maximum loss is limited to the premium paid." },
  { icon: <TrendingUp className="w-6 h-6" style={{ transform: "rotate(180deg)" }} />, name: "Buy Puts", risk: "Low", desc: "Bearish bet with defined risk. Profits if the stock drops before expiry." },
  { icon: <DollarSign className="w-6 h-6" />, name: "Covered Calls", risk: "Low", desc: "Sell calls against shares you own to generate income. Limits upside, earns premium." },
  { icon: <Shield className="w-6 h-6" />, name: "Protective Puts", risk: "Low", desc: "Buy puts on shares you hold to insure against a major decline. Classic hedge strategy." },
  { icon: <BarChart2 className="w-6 h-6" />, name: "Bull Call Spread", risk: "Medium", desc: "Buy a call, sell a higher-strike call. Reduces premium cost. Capped upside and downside." },
  { icon: <Target className="w-6 h-6" />, name: "Iron Condor", risk: "Medium", desc: "Sell both a call spread and put spread. Profits if the stock stays within a defined range." },
];

export default function OptionTradingPage() {
  return (
    <PageWrapper
      ctaTitle="Trade Options on Orchard Capitals"
      ctaSubtitle="$0 per contract. 13 strategies available. Start with defined-risk basics or advance to complex spreads.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Options Trading</span>
            </div>
            <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              More Ways to Profit.<br /><em style={{ fontStyle: "italic", color: OC }}>Defined Risk. $0 Fees.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Options give you the right — not the obligation — to buy or sell stocks at a set price. Use them to amplify gains, generate income, or hedge your portfolio. $0 per contract on Orchard Capitals.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Trade Options Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/option-copy-trading" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                Copy Options Traders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPTIONS BASICS ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Options Fundamentals</span>
            </div>
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Six terms every options<br />trader needs to <em style={{ color: OC, fontStyle: "italic" }}>understand.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BASICS.map(b => (
              <div key={b.term} style={{ background: GRAY, borderRadius: 16, padding: "26px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${OC}12`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 10, color: OC }}>{b.term}</h3>
                <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.7 }}>{b.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CBOE + STRATEGIES ── */}
      <section style={{ background: GRAY, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Strategies Available</span>
              </div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
                From beginner to <em style={{ fontStyle: "italic", color: OC }}>advanced.</em>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {STRATEGIES.map(s => (
                  <div key={s.name} style={{ background: WHITE, borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb", display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ color: OC, flexShrink: 0, marginTop: 2 }}>{s.icon}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{s.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: OC, background: `${OC}15`, borderRadius: 100, padding: "2px 8px" }}>Risk: {s.risk}</span>
                      </div>
                      <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.1)" }}>
                <img src="/landing/images/cboe-ee8f51a3.png" alt="CBOE options exchange" style={{ width: "100%", display: "block" }} />
              </div>
              <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                <img src="/landing/images/simplified-d23953ca.png" alt="Simplified trading interface" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["$0", "Per Contract Fee"], ["13", "Strategies Available"], ["100", "Shares Per Contract"], ["Weekly", "Options Expiries"]].map(([val, lbl]) => (
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

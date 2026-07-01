"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Layers, BarChart2, Zap, Settings } from "lucide-react";

const PLATFORM_FEATURES = [
  { icon: <BarChart2 className="w-6 h-6" />, title: "TradingView Charts Built In", desc: "100+ indicators, 20+ chart types, drawing tools, and multi-timeframe support — powered by the world's best charting engine." },
  { icon: <Zap className="w-6 h-6" />, title: "Real-Time Market Data", desc: "Live quotes, Level 2 order book depth, and tick-by-tick streaming. No delays, no refresh — the market feeds directly into your screen." },
  { icon: <Layers className="w-6 h-6" />, title: "Customizable Layout", desc: "Arrange your watchlist, charts, order entry, and P&L exactly how you want them. Save multiple layouts for different trading styles." },
  { icon: <Settings className="w-6 h-6" />, title: "Advanced Order Entry", desc: "Bracket orders, trailing stops, OCO orders, and conditional triggers — all accessible from a single streamlined order panel." },
  { icon: <Monitor className="w-6 h-6" />, title: "Multi-Monitor Support", desc: "Extend your workspace across multiple screens. Each panel is independently resizable and dockable for professional setups." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Full Mobile App", desc: "The full Orchard Capitals platform — including copy trading, charting, and order management — available on iOS and Android." },
];

export default function SoftwarePage() {
  return (
    <PageWrapper
      ctaTitle="Try the Platform Free"
      ctaSubtitle="Open an account and access the full Orchard Capitals platform — desktop, web, and mobile — at no cost.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Trading Platform</span>
            </div>
            <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              A Platform Built<br /><em style={{ fontStyle: "italic", color: OC }}>For Serious Traders.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Web-based, desktop, and mobile. Real-time data, professional charting, advanced order types, and copy trading — everything in one place, at no extra cost.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Open Free Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Platform Features</span>
            </div>
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Everything you need.<br /><em style={{ color: OC, fontStyle: "italic" }}>Nothing you don't.</em>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              No separate subscriptions for charting, data, or analytics. The full suite is included with every Orchard Capitals account.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORM_FEATURES.map(f => (
              <div key={f.title} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{f.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADE ANYWHERE ── */}
      <section style={{ background: GRAY, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.1)" }}>
              <img src="/landing/images/anywhere-8188b22d.png" alt="Trade from anywhere on any device" style={{ width: "100%", display: "block" }} />
            </div>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Available Everywhere</span>
              </div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px" }}>
                Your platform.<br /><em style={{ fontStyle: "italic", color: OC }}>Any device. Anytime.</em>
              </h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
                Orchard Capitals runs in your browser without downloads, as a native desktop app on Windows and Mac, and as a full-featured iOS and Android application — with your account synced across all three.
              </p>
              {[["Web Browser", "No download required — trades instantly from any browser"], ["Desktop App", "Windows and Mac native app with enhanced charting performance"], ["iOS & Android", "Full copy trading, order management, and real-time alerts on mobile"]].map(([device, desc]) => (
                <div key={device} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <span style={{ fontWeight: 700, color: BLACK, fontSize: 15, display: "block", marginBottom: 2 }}>{device}</span>
                    <span style={{ color: "#6b7280", fontSize: 13 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CUSTOM + STATS ── */}
      <section style={{ background: BLACK, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ marginBottom: 64 }}>
            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: WHITE, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px" }}>
                Customise your workspace.<br /><em style={{ fontStyle: "italic", color: OC }}>Trade your way.</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                From watchlist groupings and alert configurations to chart templates and order defaults — the platform adapts to how you trade, not the other way around.
              </p>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}>
              <img src="/landing/images/customized-f6f88e59.png" alt="Customized trading workspace" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["3", "Platforms (Web / Desktop / Mobile)"], ["100+", "Technical Indicators"], ["$0", "Platform Subscription Cost"], ["24/5", "Real-Time Data Access"]].map(([val, lbl]) => (
              <div key={lbl} style={{ padding: "36px 20px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(22px, 2.5vw, 38px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

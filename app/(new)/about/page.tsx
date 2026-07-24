"use client";
import PageWrapper, { OC, BLACK, WHITE } from "../_components/PageWrapper";
import Link from "next/link";
import { Users, Shield, TrendingUp, Globe, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const STATS = [
  { value: "500K+", label: "Active Investors" },
  { value: "$2.4B+", label: "Assets Under Copy" },
  { value: "150+", label: "Verified Expert Traders" },
  { value: "4.8★", label: "App Store Rating" },
];

const VALUES = [
  { icon: <Shield className="w-6 h-6" />, title: "Transparency First", desc: "Every trade, every fee, every risk metric — fully visible to you before you copy a single strategy." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Performance Verified", desc: "All lead traders undergo strict auditing. Only those with consistent, verified returns are listed." },
  { icon: <Users className="w-6 h-6" />, title: "Community Driven", desc: "500,000+ investors sharing strategies, insights, and trade ideas on a single platform." },
  { icon: <Globe className="w-6 h-6" />, title: "Global Access", desc: "Trade US stocks, ETFs, and options from anywhere in the world with no geographic restrictions." },
];

export default function AboutPage() {
  return (
    <PageWrapper
      ctaTitle="Join Orchard Capitals Today"
      ctaSubtitle="Be part of the next generation of smarter, community-driven stock investing.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>About Us</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Built by Traders,<br /><em style={{ fontStyle: "italic", color: OC }}>For Traders.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Orchard Capitals was founded with one mission — to make professional-grade stock trading accessible to every investor, regardless of experience level.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lead-traders" style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                View Top Traders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Our Story</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px" }}>
              Professional Trading,<br />Made Personal
            </motion.h2>
            <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              Orchard Capitals was born from a simple observation: the most profitable trading strategies were locked behind institutional walls, inaccessible to everyday investors. We set out to change that.
            </p>
            <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Today, we operate a fully transparent copy trading ecosystem where retail investors can mirror the exact strategies of verified expert traders — in real time, with full control over risk parameters.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Full trade history for every lead trader", "Risk-capped allocations to protect your capital", "Real-time position mirroring with sub-millisecond execution"].map(item => (
                <motion.div key={item} {...reveal} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Check className="w-4 h-4" style={{ color: OC, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "#374151", fontSize: 15 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES  —  ORANGE ── */}
      <section style={{ background: OC, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Our Values</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12, color: WHITE }}>
              The Principles Behind Every Trade
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              Four core principles guide every product decision and business practice at Orchard Capitals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <motion.div key={v.title} {...reveal} style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{v.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: WHITE, textAlign: "center", letterSpacing: "-0.5px", marginBottom: 56 }}>
            Orchard Capitals by the <em style={{ color: OC, fontStyle: "italic" }}>Numbers</em>
          </motion.h2>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {STATS.map(s => (
              <motion.div key={s.label} {...reveal} style={{ padding: "40px 24px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: OC, letterSpacing: "-1px", marginBottom: 8 }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

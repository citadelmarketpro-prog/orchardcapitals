"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, Shield, TrendingDown, Settings, Bell } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const HOW_IT_WORKS = [
  { icon: <TrendingDown className="w-6 h-6" />, title: "Monitors Every Trade", desc: "AutoGuard™ continuously monitors each leader's trading behavior and calculates a running exit value based on your specified capital protection amount." },
  { icon: <Settings className="w-6 h-6" />, title: "Calculates Your Threshold", desc: "When your account reaches the drawdown level you have set, AutoGuard™ automatically closes all open positions and disables the leader instantly — with no manual action required." },
  { icon: <Bell className="w-6 h-6" />, title: "Notifies You Immediately", desc: "You receive an instant notification the moment AutoGuard™ triggers. You can review what happened and choose a new leader from your dashboard at any time." },
  { icon: <Shield className="w-6 h-6" />, title: "Protects Your Principal", desc: "AutoGuard™ ensures a strategy deviation or unexpected market event cannot wipe out more than your defined threshold — your capital is protected, not just monitored." },
];

const STEPS = [
  { num: "1", title: "Create Your Account", desc: "Register and complete verification to unlock all copy trading features including AutoGuard™ protection." },
  { num: "2", title: "Find Your Match", desc: "Browse and filter lead traders by return, win rate, drawdown history, and risk score." },
  { num: "3", title: "Set Your AutoGuard™ Level", desc: "Choose the maximum drawdown or capital loss amount you are comfortable with for this leader." },
  { num: "4", title: "Copy and Grow", desc: "Replicate trades automatically while AutoGuard™ watches over your account — 24 hours a day, 5 days a week." },
];

export default function AutoGuardPage() {
  return (
    <PageWrapper ctaTitle="Invest Smarter with AutoGuard™" ctaSubtitle="Copy top traders with automatic protection. Your capital threshold is enforced — always.">

      {/* HERO */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "96px 24px 88px" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse at center, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <motion.img {...reveal} src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Protection Feature</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Autoprotect<br /><em style={{ fontStyle: "italic", color: OC }}>Your Account.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              AutoGuard™ is an account protection feature that monitors each leader's behavior and automatically removes a leader when their trading strategy deviates from its expected loss profile. Your capital. Your rules.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Create Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT IS AUTOGUARD */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 48 }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>What Is AutoGuard™</span>
              </div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 20 }}>
                Your safety net<br /><em style={{ fontStyle: "italic", color: OC }}>for copy trading.</em>
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                AutoGuard™ Capital Protection is available for all investors and is mandatory for users residing in the EU using the EU Orchard Capitals platform. It creates a protection shield for your investment capital.
              </p>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                When you copy a leader, you set a capital protection amount — the maximum you are willing to lose from that specific copy allocation. AutoGuard™ enforces this limit automatically, 24 hours a day.
              </p>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8 }}>
                If a leader's trading strategy deviates — whether due to unusual risk-taking, a market event, or a change in behavior — AutoGuard™ stops all open positions and removes the leader before further losses can accumulate.
              </p>
            </div>
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, color: OC }}>
                <Shield className="w-8 h-8" />
              </div>
              <h3 style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 14 }}>AutoGuard™ in Numbers</h3>
              {[["24/5", "Active monitoring during all trading hours"], ["Instant", "Position closure when threshold is hit"], ["100%", "Capital protection up to your defined limit"], ["EU Mandatory", "Required for all EU resident investors"]].map(([val, lbl]) => (
                <motion.div key={lbl} {...reveal} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>{lbl}</span>
                  <span style={{ fontWeight: 800, color: OC, fontSize: 16 }}>{val}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS  —  ORANGE */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", color: WHITE }}>
              Four layers of<br /><em style={{ fontStyle: "italic" }}>automatic protection.</em>
            </motion.h2>
          </div>
          <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(item => (
              <motion.div key={item.title} {...reveal} style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: BLACK }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px" }}>
              Ready to invest<br /><em style={{ color: OC, fontStyle: "italic" }}>smarter?</em>
            </motion.h2>
          </div>
          <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(s => (
              <motion.div key={s.num} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "32px 24px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: OC, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, margin: "0 auto 20px" }}>{s.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: BLACK, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 16, padding: "16px 44px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

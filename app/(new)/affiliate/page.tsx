"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight, DollarSign, Users, TrendingUp, Clock, Infinity, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const STEPS = [
  { num: "1", title: "Sign Up", desc: "Create your Orchard Capitals account and apply for the Affiliate Program through your dashboard." },
  { num: "2", title: "Get Your Link", desc: "Once approved, you receive a unique referral link with full tracking capabilities and 90-day attribution." },
  { num: "3", title: "Share and Promote", desc: "Share your referral link across social media, blogs, email, trading communities, and any other channels you have access to." },
  { num: "4", title: "Earn Commissions", desc: "When your referrals register and make their first deposit, you earn 10% instantly. Track everything from your affiliate dashboard." },
];

const BENEFITS = [
  { icon: <DollarSign className="w-6 h-6" />, title: "10% Referral Bonus", desc: "Earn 10% of every referred user's first deposit, credited directly to your account with no waiting period." },
  { icon: <Clock className="w-6 h-6" />, title: "Instant Credit", desc: "Commissions are credited to your account as soon as your referral's deposit is confirmed — no delays." },
  { icon: <Users className="w-6 h-6" />, title: "90-Day Tracking Cookie", desc: "Once a user clicks your link, you get credit for the referral for 90 full days — even if they don't register immediately." },
  { icon: <Infinity className="w-6 h-6" />, title: "Unlimited Referrals", desc: "There is no cap on the number of referrals you can make. The more you refer, the more you earn." },
  { icon: <CreditCard className="w-6 h-6" />, title: "No Minimum Threshold", desc: "Withdraw your commissions at any time, regardless of amount. Bank transfer, crypto, and e-wallets accepted." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Dedicated Dashboard", desc: "Real-time analytics, click tracking, conversion data, and custom sub-ID tracking — all in one place." },
];

const RULES = [
  "Do not make misleading claims about guaranteed profits or returns",
  "Always disclose your affiliate relationship when promoting Orchard Capitals",
  "Do not use spam, unsolicited messages, or deceptive tactics to acquire referrals",
  "Self-referrals and fraudulent registrations are strictly prohibited",
  "Do not bid on Orchard Capitals branded keywords in paid advertising",
  "Comply with all applicable laws and regulations in your jurisdiction",
];

export default function AffiliatePage() {
  return (
    <PageWrapper ctaTitle="Start Earning with Orchard Capitals" ctaSubtitle="Join our affiliate program and earn 10% commission on every qualified referral — no cap, no delay.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Affiliate Program</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Refer Traders.<br /><em style={{ fontStyle: "italic", color: OC }}>Earn 10%.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Every time someone registers through your unique referral link and makes their first deposit, you earn a 10% commission — instantly credited. No complicated tiers. No hidden conditions.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/affiliate-guide" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                View Affiliate Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMISSION HIGHLIGHT */}
      <section style={{ background: GRAY, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(0,0,0,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["10%", "Commission Per Referral"], ["90 Days", "Cookie Duration"], ["$0", "Minimum Withdrawal"], ["Unlimited", "Referrals Allowed"]].map(([val, lbl]) => (
              <motion.div key={lbl} {...reveal} style={{ padding: "40px 24px", background: WHITE, textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "#6b7280", fontSize: 13 }}>{lbl}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Four steps to your<br /><em style={{ color: OC, fontStyle: "italic" }}>first commission.</em>
            </motion.h2>
          </div>
          <div style={{ display: "grid", gap: 24 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(s => (
              <motion.div key={s.num} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "32px 24px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: OC, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>{s.num}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: BLACK, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS  —  ORANGE */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12, color: WHITE }}>
              Built to reward<br /><em style={{ fontStyle: "italic" }}>every referral.</em>
            </motion.h2>
          </div>
          <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(b => (
              <motion.div key={b.title} {...reveal} style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{b.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RULES */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Program Rules and<br /><em style={{ color: OC, fontStyle: "italic" }}>Guidelines.</em>
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16 }}>
              To maintain the integrity of our program, all affiliates must adhere to these guidelines:
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {RULES.map(rule => (
              <motion.div key={rule} {...reveal} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: GRAY, borderRadius: 12, padding: "16px 20px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 7 }} />
                <span style={{ color: "#374151", fontSize: 15, lineHeight: 1.6 }}>{rule}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}

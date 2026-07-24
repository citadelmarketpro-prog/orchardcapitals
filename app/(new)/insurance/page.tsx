"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { Shield, Check, ArrowRight, Lock, DollarSign, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const COVERAGE = [
  { icon: <Shield className="w-6 h-6" />, title: "SIPC Securities Protection", desc: "Your stocks, ETFs, and options are protected up to $500,000 per account under the Securities Investor Protection Corporation." },
  { icon: <DollarSign className="w-6 h-6" />, title: "Cash Protection", desc: "Cash held in your Orchard Capitals account is protected up to $250,000 — included within the $500,000 total SIPC limit." },
  { icon: <Lock className="w-6 h-6" />, title: "Negative Balance Protection", desc: "You can never lose more than you deposit. If your account balance falls below zero, Orchard absorbs the difference." },
  { icon: <FileCheck className="w-6 h-6" />, title: "Segregated Accounts", desc: "Client funds are held in fully segregated accounts, entirely separate from Orchard Capitals' own operating capital." },
];

export default function InsurancePage() {
  return (
    <PageWrapper
      ctaTitle="Invest with Total Confidence"
      ctaSubtitle="Your assets are protected every step of the way. Start copy trading with the peace of mind you deserve.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Account Insurance</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Your Investments,<br /><em style={{ fontStyle: "italic", color: OC }}>Fully Protected.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Orchard Capitals is a SIPC member. Your securities are protected up to $500,000 and your cash up to $250,000 — before you even log your first trade.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Open Protected Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COVERAGE DETAILS ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>What's Covered</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Four layers of protection
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              From regulatory protection to in-house safeguards, your money is covered at every level.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {COVERAGE.map(c => (
              <motion.div key={c.title} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "32px 28px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: OC }}>
                  {c.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: BLACK }}>{c.title}</h3>
                <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.7 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px", color: WHITE }}>
              Protected from day one,<br /><em style={{ fontStyle: "italic" }}>automatically.</em>
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              The moment you open an Orchard Capitals account, SIPC protections kick in automatically. There's nothing to activate, no forms to fill — you're covered.
            </p>
            {[
              "No application required — protection is automatic",
              "Covers stocks, ETFs, options, and bonds",
              "Cash holdings protected separately up to $250,000",
              "Protection applies even if Orchard Capitals were to close",
            ].map(item => (
              <motion.div key={item} {...reveal} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <Check className="w-4 h-4" style={{ color: WHITE, flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 15 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER STRIP ── */}
      <section style={{ background: BLACK, padding: "48px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.8 }}>
            SIPC protection covers up to $500,000 in securities (including up to $250,000 in cash) per customer. SIPC protection does not cover investment losses from market fluctuations, fraud not related to brokerage insolvency, or futures and commodities. For more information, visit{" "}
            <span style={{ color: OC }}>sipc.org</span>.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}

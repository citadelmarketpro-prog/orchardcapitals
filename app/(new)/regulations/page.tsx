"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { Shield, Check, ArrowRight, Globe, FileText, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const BODIES = [
  { name: "FINRA", full: "Financial Industry Regulatory Authority", desc: "We are a registered broker-dealer under FINRA, the self-regulatory organization that oversees all broker-dealers operating in the US." },
  { name: "SEC", full: "Securities and Exchange Commission", desc: "Our operations comply fully with SEC rules and regulations, ensuring the highest standards of disclosure, fairness, and investor protection." },
  { name: "SIPC", full: "Securities Investor Protection Corporation", desc: "Orchard Capitals is a SIPC member, providing customers up to $500,000 in securities protection in the event of firm insolvency." },
];

const PRINCIPLES = [
  { icon: <FileText className="w-6 h-6" />, title: "Full Disclosure", desc: "Every fee, spread, and risk metric is disclosed upfront. No hidden charges — ever." },
  { icon: <BadgeCheck className="w-6 h-6" />, title: "KYC & AML", desc: "Robust Know Your Customer and Anti-Money Laundering procedures protect every account on our platform." },
  { icon: <Globe className="w-6 h-6" />, title: "Data Privacy", desc: "Your personal and financial data is encrypted at rest and in transit, and never sold to third parties." },
  { icon: <Shield className="w-6 h-6" />, title: "Audit Trail", desc: "Every trade, transfer, and login is logged with a complete, immutable audit trail accessible by regulators." },
];

export default function RegulationsPage() {
  return (
    <PageWrapper
      ctaTitle="Trade on a Regulated Platform"
      ctaSubtitle="Orchard Capitals operates under the strictest regulatory standards in the industry. Your trust is our licence to operate.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Regulatory Framework</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Regulated. Transparent.<br /><em style={{ fontStyle: "italic", color: OC }}>Trusted.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Orchard Capitals operates within a strict regulatory framework covering registration, disclosure, investor protection, and data privacy. We hold ourselves to the highest standard.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Open an Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── REGULATORY BODIES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Regulatory Bodies</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Oversight you can rely on
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              We are registered with and regulated by the leading US financial authorities.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {BODIES.map((b, i) => (
              <motion.div key={b.name} {...reveal} style={{ display: "grid", alignItems: "center", gap: 32, background: GRAY, borderRadius: 16, padding: "32px 36px", border: "1px solid #e5e7eb" }} className="grid-cols-1 md:grid-cols-[140px_1fr]">
                <div>
                  <p style={{ fontFamily: "var(--oc-poppins)", fontSize: 36, fontWeight: 800, color: OC, letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>{b.name}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.04em" }}>{b.full}</p>
                </div>
                <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.75 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE PRINCIPLES  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Our Compliance</span>
              </div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px", color: WHITE }}>
                Compliance isn't optional.<br /><em style={{ fontStyle: "italic" }}>It's our standard.</em>
              </motion.h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
                Beyond regulatory requirements, we maintain internal standards that exceed industry minimums. From data protection to trade transparency, compliance is embedded in everything we do.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRINCIPLES.map(p => (
                <motion.div key={p.title} {...reveal} style={{ background: WHITE, borderRadius: 12, padding: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ color: OC, marginBottom: 10 }}>{p.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: BLACK }}>{p.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

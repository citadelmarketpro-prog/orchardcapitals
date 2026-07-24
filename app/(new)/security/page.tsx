"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { Shield, Lock, Eye, Smartphone, Server, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const FEATURES = [
  { icon: <Lock className="w-6 h-6" />, title: "256-Bit SSL Encryption", desc: "Every connection to Orchard Capitals is encrypted with 256-bit SSL, the same standard used by major banks worldwide." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Two-Factor Authentication", desc: "Add a second layer of security with 2FA via email code or authenticator app before accessing your account." },
  { icon: <Eye className="w-6 h-6" />, title: "Login Activity Monitoring", desc: "Every login attempt is logged with IP address, device, and timestamp. Suspicious logins trigger instant alerts." },
  { icon: <Server className="w-6 h-6" />, title: "Cold Storage for Funds", desc: "The majority of client assets are held in offline cold storage, inaccessible to online attackers." },
  { icon: <Shield className="w-6 h-6" />, title: "Regular Penetration Testing", desc: "Third-party security firms run quarterly penetration tests against our infrastructure to identify and close vulnerabilities." },
  { icon: <Lock className="w-6 h-6" />, title: "Biometric App Login", desc: "The Orchard Capitals mobile app supports fingerprint and Face ID login — faster and more secure than passwords." },
];

export default function SecurityPage() {
  return (
    <PageWrapper
      ctaTitle="Trade Securely on Orchard Capitals"
      ctaSubtitle="Your account is protected by bank-grade security from the moment you register.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Platform Security</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Bank-Grade Security.<br /><em style={{ fontStyle: "italic", color: OC }}>Zero Compromises.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Your account, your assets, and your data are protected by industry-leading security measures — active 24/7, automatically.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {["SSL-encrypted connections at all times", "Two-factor authentication on every login", "SIPC protection up to $500,000"].map(item => (
                <motion.div key={item} {...reveal} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Check className="w-4 h-4" style={{ color: OC, flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 15 }}>{item}</span>
                </motion.div>
              ))}
            </div>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Open Secure Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECURITY FEATURES ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Security Features</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Every layer of your account is protected
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              From the moment you log in to the moment you withdraw, multiple independent security systems are watching.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <motion.div key={f.title} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{f.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: WHITE, textAlign: "center", letterSpacing: "-0.5px", marginBottom: 48 }}>
            Security you can <em style={{ color: OC, fontStyle: "italic" }}>verify</em>
          </motion.h2>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["256-bit", "SSL Encryption"], ["99.99%", "Platform Uptime"], ["< 1 min", "Threat Response Time"], ["SOC 2", "Compliance Audited"]].map(([val, lbl]) => (
              <motion.div key={lbl} {...reveal} style={{ padding: "36px 20px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{lbl}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT  —  ORANGE ── */}
      <section style={{ background: OC, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px", color: WHITE }}>
              Something feel off?<br /><em style={{ fontStyle: "italic" }}>We're here 24/7.</em>
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
              If you ever notice suspicious activity, an unrecognised login, or anything that feels wrong — our security team is available around the clock to lock down your account within minutes.
            </p>
            <Link href="/register" style={{ background: BLACK, color: WHITE, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Contact Security Team
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

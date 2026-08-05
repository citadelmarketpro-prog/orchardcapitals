"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export default function SIPCDisclosurePage() {
  return (
    <PageWrapper ctaTitle="Your Assets Are Protected" ctaSubtitle="Orchard Capitals partners with SIPC-member clearing firms to protect your securities up to $500,000.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Legal</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 20 }}>
              SIPC<br /><em style={{ fontStyle: "italic", color: OC }}>Disclosure.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Last Updated: February 2026</p>
          </div>
        </div>
      </section>

      {/* PROTECTION STAT CARDS */}
      <section style={{ background: GRAY, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(0,0,0,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-1 sm:grid-cols-3">
            {[
              ["$500,000", "Total SIPC Protection Per Account"],
              ["$250,000", "Cash Protection Sublimit"],
              ["SIPC Member", "Clearing Firm Status"],
            ].map(([val, lbl]) => (
              <motion.div key={lbl} {...reveal} style={{ padding: "40px 28px", background: WHITE, textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "#6b7280", fontSize: 14 }}>{lbl}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: WHITE, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                1. What Is SIPC?
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                The Securities Investor Protection Corporation (SIPC) is a nonprofit membership organization created under the Securities Investor Protection Act of 1970. SIPC protects customers of SIPC-member broker-dealers in the event that the firm fails financially.
              </p>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85 }}>
                SIPC protection is not insurance against market losses. It specifically protects customers against the loss of cash and securities held at a failed SIPC-member brokerage firm — not against declines in the market value of investments.
              </p>
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                2. Coverage Limits
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                SIPC provides the following coverage for customers of member firms:
              </p>
              {[
                { label: "Total Coverage", desc: "Up to $500,000 per customer account for securities and cash combined." },
                { label: "Cash Sublimit", desc: "Up to $250,000 for cash claims within the total $500,000 limit." },
                { label: "Eligible Assets", desc: "Stocks, bonds, notes, warrants, and other securities. SIPC does not protect commodity futures contracts, currency, or fixed annuities." },
                { label: "Account Types", desc: "Each separate account type — individual, IRA, joint — may qualify for its own $500,000 protection limit." },
              ].map(item => (
                <motion.div key={item.label} {...reveal} style={{ paddingLeft: 20, borderLeft: `3px solid ${OC}30`, marginBottom: 18 }}>
                  <p style={{ fontWeight: 700, color: BLACK, fontSize: 16, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                3. What SIPC Does Not Cover
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                SIPC protection has important limitations. The following are not covered:
              </p>
              {[
                "Investment losses due to market fluctuations or poor investment decisions",
                "Commodity futures contracts, foreign exchange positions, and fixed annuities",
                "Losses resulting from fraudulent investments that were never actually purchased",
                "Unregistered investments that are not recognized as securities",
                "Losses from fraud perpetrated by the account holder themselves",
              ].map(item => (
                <motion.div key={item} {...reveal} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                </motion.div>
              ))}
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                4. How to File a SIPC Claim
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                If a SIPC-member broker-dealer fails, SIPC typically applies to a federal court to appoint a trustee to handle the firm's liquidation. The trustee will notify customers and provide claim forms. Most customers receive their assets within one to three months.
              </p>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85 }}>
                For more information about SIPC and your coverage, visit{" "}
                <span style={{ color: OC }}>www.sipc.org</span> or call SIPC at (202) 371-8300.
              </p>
            </div>

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions About Account Protection?</motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                Contact our support team to learn more about how your assets are protected at Orchard Capitals. We are committed to full transparency about the safeguards in place for your investments.
              </p>
              <Link href="/" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

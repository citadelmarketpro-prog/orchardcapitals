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

export default function FormCRSPage() {
  return (
    <PageWrapper ctaTitle="Open Your Account Today" ctaSubtitle="Join 500,000+ investors already copying the world's top traders on a regulated platform.">

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
              Form CRS<br /><em style={{ fontStyle: "italic", color: OC }}>Customer Relationship Summary.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Last Updated: February 2026 · Required by SEC Rule 17a-14</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: WHITE, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                1. Introduction
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                Orchard Capitals (USA) Ltd is registered with the Securities and Exchange Commission (SEC) as a broker-dealer (CRD 18000661). This Customer Relationship Summary (Form CRS) provides you with information about the types of services we offer, the fees and costs associated with those services, conflicts of interest, and our disciplinary history. Free and simple tools are available to research firms and financial professionals at Investor.gov/CRS.
              </p>
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                2. What Investment Services and Advice Can You Provide Me?
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                Orchard Capitals offers brokerage services, including the buying and selling of equities, options, ETFs, and futures. We also offer a copy trading platform that allows customers to replicate the trading activity of experienced lead traders. Our services include:
              </p>
              {[
                { label: "Self-Directed Brokerage", desc: "You make all investment decisions. We execute your orders and provide access to markets, tools, and data." },
                { label: "Copy Trading", desc: "You select a lead trader to follow. Our platform automatically replicates their trades proportionally in your account." },
                { label: "Market Access", desc: "Access to US equities, ETFs, options (up to Level 3), and futures on major US exchanges." },
              ].map(item => (
                <motion.div key={item.label} {...reveal} style={{ paddingLeft: 20, borderLeft: `3px solid ${OC}30`, marginBottom: 18 }}>
                  <p style={{ fontWeight: 700, color: BLACK, fontSize: 16, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8 }}>{item.desc}</p>
                </motion.div>
              ))}
              <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8, marginTop: 4, fontStyle: "italic" }}>
                Conversation starter: Ask us — "Given my financial situation, should I choose a brokerage account? Should I use copy trading?"
              </p>
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                3. What Fees Will I Pay?
              </motion.h2>
              {[
                { label: "$0 Commissions", desc: "Orchard Capitals charges $0 per trade for US stocks, ETFs, and options contracts." },
                { label: "Options Exercise Fee", desc: "A small fee may apply when exercising or assigning options contracts. Details are available in our fee schedule." },
                { label: "Copy Trading Fees", desc: "Lead traders may earn a performance fee — typically 5–20% of profits generated. This is paid by the investor from returns, not separately charged." },
                { label: "Margin Interest", desc: "If you use margin, interest is charged on borrowed funds based on the outstanding margin balance and current rate." },
                { label: "Wire Transfer Fees", desc: "Domestic and international wire transfers may incur a fee. ACH transfers are free." },
              ].map(item => (
                <motion.div key={item.label} {...reveal} style={{ paddingLeft: 20, borderLeft: `3px solid ${OC}30`, marginBottom: 18 }}>
                  <p style={{ fontWeight: 700, color: BLACK, fontSize: 16, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8 }}>{item.desc}</p>
                </motion.div>
              ))}
              <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8, marginTop: 4, fontStyle: "italic" }}>
                Conversation starter: "Help me understand how these fees and costs might affect my investments over time."
              </p>
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                4. What Are Your Legal Obligations to Me and How Else Does Your Firm Make Money?
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                As a broker-dealer, we are required to act in your best interest and not place our own interests ahead of yours (Regulation Best Interest). When we make a recommendation, we must have a reasonable basis for believing the recommendation is in your best interest.
              </p>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                We may receive payment for order flow (PFOF) from market makers who execute your orders. This is a common practice in the industry. While PFOF does not directly cost you more, it creates a potential conflict of interest. We are committed to routing your orders to achieve best execution regardless.
              </p>
              <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8, fontStyle: "italic" }}>
                Conversation starter: "How might your conflicts of interest affect me, and how will you address them?"
              </p>
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                5. Do You or Your Financial Professionals Have Legal or Disciplinary History?
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                Orchard Capitals and its financial professionals are committed to maintaining clean regulatory records. Visit Investor.gov/CRS to research our firm and any registered financial professionals using our free and simple search tool.
              </p>
              <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8, fontStyle: "italic" }}>
                Conversation starter: "As a financial professional, do you have any disciplinary history? For what type of conduct?"
              </p>
            </div>

            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                6. How to Get Additional Information
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                For more detailed information about our brokerage services, fees, and conflicts of interest, please visit our website or contact our compliance team directly at{" "}
                <span style={{ color: OC }}>compliance@orchardcapitals.com</span>.
              </p>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85 }}>
                Up-to-date information about Orchard Capitals is available from the SEC's EDGAR system at{" "}
                <span style={{ color: OC }}>www.sec.gov/cgi-bin/browse-edgar</span> and FINRA BrokerCheck at{" "}
                <span style={{ color: OC }}>brokercheck.finra.org</span>.
              </p>
            </div>

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions about this Form CRS or wish to learn more about how Orchard Capitals serves its clients, please do not hesitate to contact us. We are committed to full transparency.
              </p>
              <Link href="/new-landing" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}
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

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

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper ctaTitle="Open Your Account Today" ctaSubtitle="Join 500,000+ investors already copying the world's top traders.">

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
              Privacy<br /><em style={{ fontStyle: "italic", color: OC }}>Policy.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Last Updated: February 2026</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: WHITE, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>

            {/* Section 1 */}
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                1. Personal Information We Collect
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                Orchard Capitals is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services. We collect the following types of personal information:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
                {[
                  { label: "Application Information", desc: "When you open an account with Orchard Capitals, we collect personal information such as your full name, date of birth, residential address, email address, phone number, nationality, employment status, annual income, net worth, and trading experience. This information is required to comply with regulatory obligations and to assess the suitability of our services for you." },
                  { label: "Transaction Information", desc: "We collect information about your trading activity, including deposits, withdrawals, trade history, account balances, and payment methods. This data is essential for providing our services, processing transactions, and maintaining accurate financial records." },
                  { label: "Verification Information", desc: "To comply with anti-money laundering (AML) and know-your-customer (KYC) regulations, we may collect copies of government-issued identification documents, proof of address, proof of income or source of funds, selfie photographs for identity verification, and other documents as required by applicable regulations." },
                ].map(item => (
                  <motion.div key={item.label} {...reveal} style={{ paddingLeft: 20, borderLeft: `3px solid ${OC}30` }}>
                    <p style={{ fontWeight: 700, color: BLACK, fontSize: 16, marginBottom: 6 }}>{item.label}</p>
                    <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.8 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                2. Security Technology
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                Orchard Capitals employs industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security measures include:
              </p>
              {[
                "256-bit SSL/TLS encryption for all data transmitted between your device and our servers",
                "Advanced firewalls and intrusion detection systems to prevent unauthorized access",
                "Regular security audits and penetration testing by independent third parties",
                "Multi-factor authentication (MFA) options for account access",
                "Encrypted storage of sensitive data with strict access controls",
                "Employee training programs on data protection and information security best practices",
              ].map(item => (
                <motion.div key={item} {...reveal} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Section 3 */}
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                3. Sharing Information with Our Affiliates
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85 }}>
                Orchard Capitals may share your personal information with our affiliated companies and subsidiaries for the purposes of providing and improving our services, ensuring regulatory compliance across jurisdictions, conducting internal analytics and research, and managing risk across our group of companies. All affiliates are bound by the same privacy and data protection standards outlined in this policy.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                4. Sharing Information with Third Parties
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                We may share your personal information with third parties in the following circumstances:
              </p>
              {[
                "Payment processors and banking partners to facilitate deposits and withdrawals",
                "Identity verification and fraud prevention service providers",
                "Cloud hosting and technology infrastructure providers",
                "Professional advisors including lawyers, auditors, and consultants",
                "Analytics and marketing service providers to improve our services",
              ].map(item => (
                <motion.div key={item} {...reveal} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                </motion.div>
              ))}
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginTop: 14 }}>
                All third-party service providers are contractually obligated to protect your information and may only use it for the specific purposes for which it was shared.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                5. Regulatory Disclosure
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85 }}>
                Orchard Capitals may be required to disclose your personal information to regulatory authorities, law enforcement agencies, or other governmental bodies in response to lawful requests, subpoenas, court orders, or as otherwise required by applicable law. We will only disclose the minimum amount of information necessary to comply with such legal obligations and will notify you of such disclosures where legally permitted.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                6. Opt Out
              </motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                You have the right to opt out of certain data collection and communication practices. You may:
              </p>
              {[
                "Unsubscribe from marketing communications by clicking the unsubscribe link in any promotional email",
                "Request the deletion of your personal data, subject to regulatory retention requirements",
                "Disable non-essential cookies through your browser settings or our cookie preferences panel",
                "Request access to, correction of, or restriction of processing of your personal data",
              ].map(item => (
                <motion.div key={item} {...reveal} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                </motion.div>
              ))}
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginTop: 14 }}>
                Please note that opting out of certain data processing activities may limit your ability to use some features of our platform. To exercise any of these rights, please contact us at{" "}
                <span style={{ color: OC }}>support@orchardcapitals.com</span>.
              </p>
            </div>

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions about our Privacy Policy or how we handle your personal information, please reach out to our data protection team. We take your privacy seriously and are committed to addressing your concerns promptly.
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

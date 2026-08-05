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

const SECTIONS = [
  {
    title: "1. Your Consent Matters",
    body: [
      "At Orchard Capitals, we believe in transparency and informed consent. This Declaration of Consent outlines the specific consents you provide when you register for an account, use our services, and interact with our platform. By using Orchard Capitals, you acknowledge and agree to the consents described below. We encourage you to read this document carefully and contact us if you have any questions.",
    ],
  },
  {
    title: "2. Consent to Terms and Policies",
    body: [
      "By creating an account with Orchard Capitals, you confirm that you have read, understood, and agree to be bound by our Terms of Service, Privacy Policy, Cookies Policy, Risk Disclaimer, and all other applicable policies and agreements. You acknowledge that these documents form a legally binding agreement between you and Orchard Capitals.",
    ],
    links: [
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookies Policy", href: "/cookies-policy" },
      { label: "Risk Disclaimer", href: "/risk-disclaimer" },
    ],
  },
  {
    title: "3. Consent to Data Processing",
    body: ["You consent to the collection, processing, storage, and use of your personal data by Orchard Capitals as described in our Privacy Policy. This includes but is not limited to:"],
    list: [
      "Processing your personal information for account creation and management",
      "Using your data to provide, maintain, and improve our services",
      "Sharing your data with regulated third parties as necessary to deliver our services",
      "Transferring your data internationally where required for service delivery or regulatory compliance",
      "Retaining your data for the periods required by applicable laws and regulations",
    ],
  },
  {
    title: "4. Consent to Communications",
    body: [
      "You consent to receiving communications from Orchard Capitals, including but not limited to account notifications, transaction confirmations, security alerts, service updates, regulatory notices, and marketing communications. You may opt out of non-essential marketing communications at any time by following the unsubscribe instructions in our emails or by contacting our support team. Certain transactional and regulatory communications cannot be opted out of while your account remains active.",
    ],
  },
  {
    title: "5. Electronic Signatures and Records",
    body: [
      "You consent to the use of electronic signatures, records, and communications in connection with your account and transactions with Orchard Capitals. You agree that electronic signatures and records shall have the same legal effect, validity, and enforceability as manually executed signatures and paper-based records. You also agree to receive all account statements, confirmations, disclosures, and other communications in electronic format.",
    ],
  },
  {
    title: "6. Consent to Cookies and Tracking",
    body: [
      "You consent to the use of cookies and similar tracking technologies as described in our Cookies Policy. This includes essential cookies required for the operation of our platform, analytical cookies that help us improve our services, and marketing cookies that enable us to deliver relevant content. You may manage your cookie preferences through your browser settings.",
    ],
  },
  {
    title: "7. Consent to Identity Verification",
    body: [
      "You consent to Orchard Capitals conducting identity verification checks as required by anti-money laundering (AML) and know-your-customer (KYC) regulations. This may include verifying your identity through government-issued identification documents, conducting background checks through third-party verification services, verifying your source of funds and wealth, and performing ongoing monitoring of your account activity for suspicious transactions. You agree to provide all requested documentation promptly and accurately.",
    ],
  },
  {
    title: "8. Consent to Recording",
    body: [
      "You consent to Orchard Capitals recording and monitoring telephone conversations, electronic communications, and other interactions between you and Orchard Capitals. These recordings may be used to verify instructions, resolve disputes, ensure compliance with regulatory requirements, improve the quality of our services, and serve as evidence in legal or regulatory proceedings. Recordings will be retained in accordance with applicable regulatory requirements.",
    ],
  },
  {
    title: "9. Withdrawal of Consent",
    body: [
      "You have the right to withdraw your consent at any time, subject to legal and contractual restrictions. Please note that withdrawing certain consents may affect our ability to provide services to you and may result in the closure of your account. To withdraw your consent, please contact our support team at support@orchardcapitals.com. We will process your request in accordance with applicable laws and inform you of any consequences of the withdrawal.",
    ],
    email: "support@orchardcapitals.com",
  },
  {
    title: "10. Consent for Minors",
    body: [
      "Orchard Capitals services are only available to individuals who are at least 18 years of age (or the age of legal majority in your jurisdiction). By creating an account, you confirm that you meet this age requirement. If we become aware that we have collected personal information from a minor without appropriate parental or guardian consent, we will take steps to delete such information and close the associated account.",
    ],
  },
  {
    title: "11. Updates to This Declaration",
    body: [
      "Orchard Capitals may update this Declaration of Consent from time to time to reflect changes in our practices, services, or legal requirements. We will notify you of any material changes by posting the updated declaration on our website and, where appropriate, by sending you a notification. Your continued use of our services after any changes constitutes your acceptance of the updated declaration.",
    ],
  },
];

export default function DeclarationOfConsentPage() {
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
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 20 }}>
              Declaration<br /><em style={{ fontStyle: "italic", color: OC }}>of Consent.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Last Updated: February 2026</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: WHITE, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {SECTIONS.map(s => (
              <motion.div key={s.title} {...reveal}>
                <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                  {s.title}
                </motion.h2>
                {s.body.map((p, i) => (
                  <p key={i} style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
                ))}
                {s.list && (
                  <div style={{ marginTop: 8 }}>
                    {s.list.map(item => (
                      <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                        <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {s.links && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                    {s.links.map(l => (
                      <Link key={l.label} href={l.href} style={{ color: OC, fontSize: 15, textDecoration: "underline", textUnderlineOffset: 3 }}>{l.label}</Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions about this Declaration of Consent or wish to exercise any of your rights, please contact our support team. We are committed to ensuring that your consent is informed and that your rights are fully respected.
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

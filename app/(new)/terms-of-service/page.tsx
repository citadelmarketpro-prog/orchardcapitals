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
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using the Orchard Capitals platform, website, mobile applications, and any associated services (collectively, the \"Services\"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, you must not access or use our Services.",
      "These Terms constitute a legally binding agreement between you (\"User,\" \"you,\" or \"your\") and Orchard Capitals and its affiliated entities (\"Orchard Capitals,\" \"we,\" \"us,\" or \"our\"). By using our Services, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into this agreement.",
    ],
  },
  {
    title: "2. Account Registration and Security",
    body: [
      "To access certain features of our Services, you must register for an account. When registering, you agree to provide accurate, current, and complete information and to update such information as necessary to maintain its accuracy.",
      "You are solely responsible for maintaining the confidentiality of your account credentials, including your username and password. You agree to notify Orchard Capitals immediately of any unauthorized use of your account or any other breach of security. Orchard Capitals will not be liable for any loss or damage arising from your failure to protect your account information.",
      "You may not transfer, sell, or otherwise assign your account to any third party without prior written consent from Orchard Capitals. We reserve the right to suspend or terminate any account that we reasonably believe has been compromised or is being used in violation of these Terms.",
    ],
  },
  {
    title: "3. Trading Services",
    body: [
      "Orchard Capitals provides access to a range of financial trading services, including but not limited to copy trading, futures trading, options trading, and contracts for difference (CFDs). These services are provided on an \"as available\" basis and may be subject to market conditions, regulatory requirements, and system availability.",
      "Copy trading allows users to automatically replicate the trading strategies of other traders on the platform. By using copy trading features, you acknowledge that past performance is not indicative of future results and that you bear full responsibility for any trades executed on your behalf.",
      "Orchard Capitals does not provide investment advice, and no content on our platform should be construed as such. All trading decisions are made at your own discretion and risk. You should consult with a qualified financial advisor before making any investment decisions.",
    ],
  },
  {
    title: "4. Risk Disclosure",
    body: [
      "Trading in financial instruments, including futures, options, and contracts, carries a high level of risk and may not be suitable for all investors. You may sustain a total loss of your initial investment and, in some cases, may be required to deposit additional funds to cover margin requirements.",
      "The value of your investments can go down as well as up, and you should only trade with funds you can afford to lose. Orchard Capitals strongly recommends that you seek independent financial advice before engaging in any trading activity on our platform.",
    ],
  },
  {
    title: "5. Prohibited Activities",
    body: ["You agree not to engage in any of the following prohibited activities while using our Services:"],
    list: [
      "Market manipulation, including spoofing, layering, or wash trading",
      "Using automated systems, bots, or scripts to exploit the platform without prior authorization",
      "Engaging in money laundering, terrorist financing, or any other financial crime",
      "Accessing or attempting to access another user's account without authorization",
      "Interfering with or disrupting the integrity or performance of the Services",
      "Violating any applicable local, national, or international law or regulation",
      "Reverse engineering, decompiling, or disassembling any part of the platform",
      "Distributing malware, viruses, or any other harmful software through the platform",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "All content, features, and functionality of the Orchard Capitals platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Orchard Capitals or its licensors and are protected by international copyright, trademark, patent, and other intellectual property laws.",
      "You are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Services for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any content from the platform without prior written permission from Orchard Capitals.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Orchard Capitals and its directors, officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the Services.",
      "Orchard Capitals shall not be liable for any losses arising from market volatility, system failures, third-party service interruptions, or any other circumstances beyond our reasonable control. Our total aggregate liability to you for any claims arising out of or relating to these Terms or the Services shall not exceed the amount of fees paid by you to Orchard Capitals in the twelve (12) months preceding the claim.",
    ],
  },
  {
    title: "8. Termination",
    body: [
      "Orchard Capitals reserves the right to suspend or terminate your access to the Services at any time, with or without cause and with or without notice. You may also terminate your account at any time by contacting our support team.",
      "Upon termination, your right to use the Services will immediately cease. Any provisions of these Terms that by their nature should survive termination shall continue in full force and effect, including but not limited to intellectual property provisions, warranty disclaimers, indemnity obligations, and limitations of liability.",
    ],
  },
  {
    title: "9. Modifications to Terms",
    body: [
      "Orchard Capitals reserves the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the \"Last Updated\" date. Your continued use of the Services after any changes to the Terms constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the applicable Orchard Capitals entity is incorporated, without regard to its conflict of law provisions.",
      "Orchard Capitals operates through several regulated entities worldwide:",
    ],
    list: [
      "Orchard Capitals (Europe) Ltd. authorised by CySEC under license #109/10",
      "Orchard Capitals (UK) Ltd authorised by FCA under FRN 583263",
      "Orchard Capitals (USA) Ltd authorised by SEC; CRD 18000661",
      "Orchard Capitals (ME) Limited licensed by ADGM's FSRA under Permission Number 220073",
    ],
  },
];

export default function TermsOfServicePage() {
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
              Terms of<br /><em style={{ fontStyle: "italic", color: OC }}>Service.</em>
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
              </motion.div>
            ))}

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</motion.h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions or concerns about these Terms of Service, please contact our support team. We are here to help and will respond to your inquiry as soon as possible.
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

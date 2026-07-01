"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GETTING_STARTED = [
  "Create your Orchard Capitals account and complete the verification process.",
  "Navigate to the Affiliate section in your dashboard and submit your application.",
  "Once approved, you will receive a personalized referral link and tracking code.",
  "Share your link across your channels and start earning commissions on every qualified referral.",
];

const DASHBOARD_FEATURES = [
  "View your referral link and generate custom tracking URLs with sub-IDs",
  "Monitor real-time clicks, sign-ups, and conversions",
  "Track your commission earnings and full payment history",
  "Access promotional materials including banners, copy, and landing pages",
  "Request withdrawals of your earned commissions at any time",
];

const PROMOTION_TIPS = [
  { check: true, title: "Be authentic", desc: "Share your own experience with Orchard Capitals. Genuine recommendations convert better than generic pitches." },
  { check: true, title: "Educate your audience", desc: "Create content that explains how copy trading works and how Orchard Capitals makes it accessible." },
  { check: true, title: "Use multiple channels", desc: "Promote on social media, blogs, YouTube, email newsletters, and trading communities." },
  { check: true, title: "Leverage our materials", desc: "Use the banners, landing pages, and copy we provide in your dashboard." },
  { check: true, title: "Stay compliant", desc: "Always disclose your affiliate relationship and never make guarantees about trading profits." },
];

const TRACKING = [
  { label: "Click tracking", desc: "See exactly how many people click your referral links" },
  { label: "Conversion tracking", desc: "Monitor sign-ups, verifications, and first deposits" },
  { label: "Sub-ID tracking", desc: "Use custom sub-IDs to track different campaigns and channels" },
  { label: "Historical reports", desc: "Access detailed reports for any date range" },
];

const FAQS = [
  { q: "How long does the referral cookie last?", a: "Our tracking cookies last for 90 days. If a user clicks your link and registers within 90 days, you receive credit for the referral." },
  { q: "Can I refer myself or my own accounts?", a: "No. Self-referrals are not permitted and will result in removal from the affiliate program." },
  { q: "Is there a limit to how many people I can refer?", a: "There is no limit. Refer as many users as you can and earn commissions on every qualified referral." },
  { q: "What counts as a qualified referral?", a: "A qualified referral is a new user who registers through your link, completes account verification, and makes their first deposit." },
];

export default function AffiliateGuidePage() {
  return (
    <PageWrapper ctaTitle="Ready to Start Earning?" ctaSubtitle="Join the Orchard Capitals Affiliate Program today and start earning commissions on every referral.">

      {/* HERO */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "96px 24px 88px" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse at center, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Affiliate Guide</span>
            </div>
            <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Your Complete<br /><em style={{ fontStyle: "italic", color: OC }}>Affiliate Guide.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Everything you need to know to set up, promote, and maximize your earnings as an Orchard Capitals affiliate — from your first referral to withdrawal.
            </p>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Join the Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Getting Started</span>
            </div>
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Up and running in<br /><em style={{ color: OC, fontStyle: "italic" }}>four steps.</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {GETTING_STARTED.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", background: GRAY, borderRadius: 14, padding: "20px 24px", border: "1px solid #e5e7eb" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: OC, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.7, paddingTop: 6 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD + COMMISSION */}
      <section style={{ background: GRAY, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 40 }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
                <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Your Dashboard</span>
              </div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
                Your command<br /><em style={{ fontStyle: "italic", color: OC }}>center.</em>
              </h2>
              {DASHBOARD_FEATURES.map(f => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#374151", fontSize: 15, lineHeight: 1.7 }}>{f}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background: WHITE, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, color: OC, letterSpacing: "-1px", marginBottom: 8 }}>10%</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: BLACK, marginBottom: 14 }}>Commission on First Deposit</p>
                <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
                  You earn 10% of every referred user's first deposit. There is no cap on the number of referrals you can make, and commissions are credited instantly once the deposit is confirmed.
                </p>
                <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.7, background: `${OC}0a`, borderRadius: 10, padding: "14px 16px", border: `1px solid ${OC}20` }}>
                  <strong>Example:</strong> Refer a user who deposits $1,000 → you earn $100. Refer ten users → $1,000 in commissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTION TIPS */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Tips to maximize<br /><em style={{ color: OC, fontStyle: "italic" }}>your earnings.</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PROMOTION_TIPS.map(tip => (
              <div key={tip.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: GRAY, borderRadius: 14, padding: "20px 24px", border: "1px solid #e5e7eb" }}>
                <span style={{ color: OC, fontSize: 18, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>✓</span>
                <div>
                  <span style={{ fontWeight: 700, color: BLACK, fontSize: 15 }}>{tip.title} — </span>
                  <span style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.7 }}>{tip.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING */}
      <section style={{ background: GRAY, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 40 }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
                Comprehensive<br /><em style={{ fontStyle: "italic", color: OC }}>tracking and analytics.</em>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {TRACKING.map(t => (
                  <div key={t.label} style={{ background: WHITE, borderRadius: 12, padding: "18px 20px", border: "1px solid #e5e7eb" }}>
                    <p style={{ fontWeight: 700, color: BLACK, fontSize: 15, marginBottom: 4 }}>{t.label}</p>
                    <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
                FAQs
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {FAQS.map(faq => (
                  <div key={faq.q} style={{ background: WHITE, borderRadius: 12, padding: "18px 20px", border: "1px solid #e5e7eb" }}>
                    <p style={{ fontWeight: 700, color: BLACK, fontSize: 15, marginBottom: 6 }}>{faq.q}</p>
                    <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}

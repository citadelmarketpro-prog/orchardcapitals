"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: ["This Cookies Policy explains how Orchard Capitals uses cookies and similar tracking technologies when you visit our website and use our platform. By continuing to browse or use our services, you agree to the use of cookies as described in this policy. We encourage you to read this policy carefully to understand what cookies are, how we use them, and how you can manage your preferences."],
  },
  {
    title: "2. What Is a Cookie?",
    body: ["A cookie is a small text file that is placed on your computer, smartphone, or other device when you visit a website. Cookies are widely used to make websites work more efficiently, provide a better user experience, and supply information to the owners of the site. Cookies can be \"persistent\" (remaining on your device until they expire or are deleted) or \"session-based\" (deleted when you close your browser). They can be set by the website you are visiting (\"first-party cookies\") or by third parties whose content appears on the page (\"third-party cookies\")."],
  },
  {
    title: "3. How to Delete and Block Cookies",
    body: [
      "Most web browsers allow you to control cookies through their settings. You can set your browser to block or delete cookies, alert you when a cookie is being sent, or accept cookies only from certain websites. Please note that blocking or deleting cookies may impact your experience on our platform, and some features may not function properly.",
      "For more information about cookies, including how to see what cookies have been set and how to manage and delete them, please visit www.allaboutcookies.org.",
    ],
  },
  {
    title: "4. Your Consent",
    body: ["By using the Orchard Capitals website and platform, you consent to the placement of cookies on your device as described in this policy. When you first visit our website, you will be presented with a cookie consent banner that allows you to accept or customize your cookie preferences. You may withdraw your consent at any time by adjusting your browser settings or contacting us directly."],
  },
  {
    title: "5. Session Cookies",
    body: ["Session cookies are temporary cookies that are stored on your device only during your browsing session. They are deleted automatically when you close your browser. Orchard Capitals uses session cookies to maintain your login state, remember your preferences during a single session, ensure the security of your account while you are logged in, and enable the functionality of our trading platform in real time."],
  },
  {
    title: "6. Persistent Cookies",
    body: ["Persistent cookies remain on your device for a set period of time or until you manually delete them. Orchard Capitals uses persistent cookies to remember your login credentials (if you choose \"remember me\"), store your language and display preferences, analyze how you use our platform to improve our services, and deliver relevant content based on your interests and activity."],
  },
  {
    title: "7. Third Party Cookies",
    body: ["In addition to our own cookies, Orchard Capitals may allow third-party service providers to place cookies on your device. These third-party cookies are used for analytics services (e.g., Google Analytics) to help us understand how visitors interact with our website, advertising and marketing platforms to deliver targeted advertisements, social media plugins to enable sharing functionality, and fraud detection and security services. We do not control these third-party cookies, and their use is governed by the respective third party's privacy policy."],
  },
  {
    title: "8. Use of Web Beacons",
    body: ["In addition to cookies, Orchard Capitals may use web beacons (also known as pixel tags, clear GIFs, or tracking pixels) on our website and in our emails. Web beacons are tiny, invisible graphic images that allow us to track how users interact with our website and emails. We use web beacons to measure the effectiveness of our marketing campaigns, determine which emails have been opened and which links have been clicked, and analyze traffic patterns and user behavior on our platform."],
  },
  {
    title: "9. Opt Out",
    body: [
      "If you wish to opt out of non-essential cookies and tracking technologies, you can adjust your preferences through your browser settings or contact us directly. Please note that disabling certain cookies may affect the functionality of our platform.",
      "To opt out or manage your cookie preferences, please email us at support@orchardcapitals.com. Our team will assist you with updating your preferences promptly.",
    ],
    email: "support@orchardcapitals.com",
  },
];

export default function CookiesPolicyPage() {
  return (
    <PageWrapper ctaTitle="Open Your Account Today" ctaSubtitle="Join 500,000+ investors already copying the world's top traders on a regulated platform.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Legal</span>
            </div>
            <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 20 }}>
              Cookies<br /><em style={{ fontStyle: "italic", color: OC }}>Policy.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Last Updated: February 2026</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: WHITE, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {SECTIONS.map(s => (
              <div key={s.title}>
                <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                  {s.title}
                </h2>
                {s.body.map((p, i) => (
                  <p key={i} style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
                ))}
              </div>
            ))}

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions about our Cookies Policy or how we use tracking technologies, please get in touch with our support team. We are happy to provide further clarification on any aspect of this policy.
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

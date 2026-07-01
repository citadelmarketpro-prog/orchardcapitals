"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";

export default function RiskDisclaimerPage() {
  return (
    <PageWrapper ctaTitle="Trade Responsibly with Orchard Capitals" ctaSubtitle="Access professional tools, real-time data, and regulated copy trading — with full transparency on risk.">

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
              Risk<br /><em style={{ fontStyle: "italic", color: OC }}>Disclaimer.</em>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Last Updated: February 2026</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: WHITE, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>

            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                1. About Orchard Capitals
              </h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>
                Orchard Capitals is a globally recognized financial services provider offering access to a wide range of trading instruments and investment services. Orchard Capitals operates through several regulated entities across multiple jurisdictions:
              </p>
              {[
                "Orchard Capitals (Europe) Ltd. authorised by CySEC under license #109/10",
                "Orchard Capitals (UK) Ltd authorised by FCA under FRN 583263",
                "Orchard Capitals (USA) Ltd authorised by SEC; CRD 18000661",
                "Orchard Capitals (ME) Limited licensed by ADGM's FSRA under Permission Number 220073",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                2. Full Disclaimer
              </h2>
              {[
                "The information and services provided by Orchard Capitals are intended for educational and informational purposes only and should not be construed as investment advice, financial advice, trading advice, or any other type of advice. Orchard Capitals does not recommend that any financial instrument should be bought, sold, or held by you.",
                "Trading in financial instruments involves substantial risk and is not appropriate for every investor. The high degree of leverage that is often obtainable in financial trading can work against you as well as for you. The use of leverage can lead to large losses as well as gains.",
                "Before deciding to trade any financial instrument, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment. You should seek advice from an independent financial advisor if you have any doubts.",
              ].map((p, i) => (
                <p key={i} style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
              ))}
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                3. Performance Results and Limitations
              </h2>
              {[
                "Past performance is not necessarily indicative of future results. Any performance data, statistics, or results presented on the Orchard Capitals platform are provided for informational purposes only and should not be relied upon as a guarantee of future performance.",
                "Hypothetical or simulated performance results have inherent limitations. Unlike actual trading records, simulated results do not represent actual trading. Since trades have not actually been executed, results may have under- or over-compensated for the impact of certain market factors, such as lack of liquidity.",
                "Simulated trading programs are generally designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.",
              ].map((p, i) => (
                <p key={i} style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
              ))}
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: BLACK, marginBottom: 14, letterSpacing: "-0.3px" }}>
                4. Risk Warning
              </h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                Trading foreign exchange, contracts for difference (CFDs), futures, options, and other leveraged products carries a significant level of risk and may not be suitable for all investors. You should be aware of the following risks:
              </p>
              {[
                "You may lose all of your invested capital. You should not invest money that you cannot afford to lose.",
                "Leveraged trading can amplify both gains and losses. A small market movement can result in proportionally larger losses.",
                "Market conditions, including volatility, liquidity, and geopolitical events, can change rapidly and without warning.",
                "Stop-loss orders may not always be executed at the specified price due to market gaps or slippage.",
                "Technology failures, system outages, and internet connectivity issues may affect your ability to manage positions.",
                "Copy trading carries additional risks, as past performance of copied traders is not a guarantee of future results.",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0, marginTop: 8 }} />
                  <span style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.75 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Important notice — OC-tinted instead of red */}
            <div style={{ background: `${OC}0e`, border: `1px solid ${OC}28`, borderRadius: 16, padding: "32px 28px" }}>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: OC, marginBottom: 14, letterSpacing: "-0.3px" }}>
                5. Important Notice
              </h2>
              {[
                "CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. A significant percentage of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.",
                "The content on the Orchard Capitals platform is not directed at residents of any country or jurisdiction where such distribution or use would be contrary to local law or regulation. It is your responsibility to ensure that your use of the Orchard Capitals platform complies with all applicable laws and regulations in your jurisdiction.",
                "Orchard Capitals does not accept liability for any loss or damage, including without limitation any loss of profit, which may arise directly or indirectly from use of or reliance on the information provided on our platform. You are solely responsible for evaluating the merits and risks associated with using any information, products, or services provided through Orchard Capitals.",
              ].map((p, i) => (
                <p key={i} style={{ color: "#7c3526", fontSize: 16, lineHeight: 1.85, marginBottom: i < 2 ? 14 : 0 }}>{p}</p>
              ))}
            </div>

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions regarding this Risk Disclaimer or need further clarification on the risks involved in trading, please contact our support team. We strongly encourage all users to understand the risks before engaging in any trading activity.
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

"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import Link from "next/link";

const SECTIONS = [
  {
    title: "1. Agreement Overview",
    body: [
      "This End User License Agreement (\"EULA\") is a legal agreement between you (\"User,\" \"you,\" or \"your\") and Orchard Capitals (\"Company,\" \"we,\" \"us,\" or \"our\") governing your use of the Orchard Capitals software applications, including our web platform, mobile applications, desktop applications, APIs, and any related software and services (collectively, the \"Software\").",
      "By downloading, installing, accessing, or using the Software, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this EULA. If you do not agree to these terms, you must not download, install, or use the Software.",
    ],
  },
  {
    title: "2. License Grant",
    body: [
      "Subject to the terms and conditions of this EULA, Orchard Capitals grants you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the Software on devices that you own or control, solely for your personal, non-commercial use in connection with the trading services provided by Orchard Capitals. This license does not grant you any ownership rights in the Software and is subject to the restrictions set forth in this EULA.",
    ],
  },
  {
    title: "3. License Restrictions",
    body: ["You agree not to, and you will not permit others to:"],
    list: [
      "Copy, modify, adapt, translate, or create derivative works based on the Software",
      "Reverse engineer, disassemble, decompile, or attempt to derive the source code of the Software",
      "Rent, lease, lend, sell, sublicense, or distribute the Software to any third party",
      "Remove, alter, or obscure any proprietary notices, labels, or marks on the Software",
      "Use the Software for any purpose that is unlawful or prohibited by this EULA",
      "Use the Software to develop competing products or services",
      "Circumvent or attempt to circumvent any security features or access controls of the Software",
      "Use automated systems, bots, or scripts to interact with the Software without prior written authorization",
    ],
  },
  {
    title: "4. Intellectual Property Rights",
    body: [
      "The Software and all copies thereof are the intellectual property of Orchard Capitals and are protected by copyright, trademark, patent, and other intellectual property laws. Orchard Capitals retains all right, title, and interest in and to the Software, including all intellectual property rights therein. This EULA does not convey to you any rights of ownership in or related to the Software, and nothing in this EULA should be construed as granting any license or right to use any trademarks, service marks, or logos of Orchard Capitals without prior written consent.",
    ],
  },
  {
    title: "5. Software Updates and Modifications",
    body: [
      "Orchard Capitals may from time to time release updates, patches, bug fixes, enhancements, or new versions of the Software. Such updates may be installed automatically or may require your action. You agree that Orchard Capitals may update the Software at its sole discretion, and you acknowledge that this EULA applies to all such updates. Orchard Capitals reserves the right to modify, suspend, or discontinue the Software or any part thereof at any time without prior notice.",
    ],
  },
  {
    title: "6. Data Collection and Usage",
    body: [
      "The Software may collect certain data from your device and usage, including but not limited to device information, usage statistics, crash reports, performance data, and log files. This data is collected to improve the Software, provide technical support, and enhance the user experience. All data collection is governed by our Privacy Policy, which forms an integral part of this EULA.",
    ],
  },
  {
    title: "7. Third-Party Software and Services",
    body: [
      "The Software may include or integrate with third-party software components, libraries, or services. Such third-party components are subject to their own license agreements and terms of use. Orchard Capitals does not assume any responsibility or liability for any third-party software or services, and your use of such components is at your own risk. The inclusion of third-party components does not imply endorsement by Orchard Capitals.",
    ],
  },
  {
    title: "8. Warranty Disclaimer",
    body: [
      "THE SOFTWARE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. ORCHARD CAPITALS DOES NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE SOFTWARE IS AT YOUR SOLE RISK.",
    ],
    uppercase: true,
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ORCHARD CAPITALS, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SOFTWARE, EVEN IF ORCHARD CAPITALS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    ],
    uppercase: true,
  },
  {
    title: "10. Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless Orchard Capitals, its directors, officers, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the Software, your violation of this EULA, or your violation of any applicable law or regulation.",
    ],
  },
  {
    title: "11. Termination",
    body: [
      "This EULA is effective until terminated. Orchard Capitals may terminate this EULA at any time, with or without cause and with or without notice. You may terminate this EULA at any time by uninstalling the Software and deleting all copies from your devices.",
      "Upon termination, all rights granted to you under this EULA shall immediately cease, and you must stop using the Software and destroy all copies in your possession. Sections that by their nature should survive termination shall continue in full force and effect.",
    ],
  },
  {
    title: "12. Export Controls",
    body: [
      "The Software may be subject to export control laws and regulations. You agree to comply with all applicable export and re-export control laws and regulations, including those maintained by the U.S. Department of Commerce, the Treasury Department's Office of Foreign Assets Control (OFAC), and the Department of State. You represent and warrant that you are not located in any restricted country or on any government restricted party list.",
    ],
  },
  {
    title: "13. Governing Law and Jurisdiction",
    body: [
      "This EULA shall be governed by and construed in accordance with the laws of the jurisdiction in which the applicable Orchard Capitals entity is incorporated, without regard to its conflict of law provisions. Any disputes arising out of or in connection with this EULA shall be submitted to the exclusive jurisdiction of the courts in the relevant jurisdiction.",
    ],
  },
  {
    title: "14. Severability and Entire Agreement",
    body: [
      "If any provision of this EULA is held to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions shall continue in full force and effect.",
      "This EULA constitutes the entire agreement between you and Orchard Capitals with respect to the Software and supersedes all prior or contemporaneous communications, agreements, and understandings regarding the subject matter hereof.",
    ],
  },
];

export default function EULAPage() {
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
            <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 20 }}>
              End User License<br /><em style={{ fontStyle: "italic", color: OC }}>Agreement.</em>
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
                  <p key={i} style={{ color: "#4b5563", fontSize: s.uppercase ? 13 : 16, lineHeight: 1.85, marginBottom: 14, fontWeight: s.uppercase ? 500 : 400, textTransform: s.uppercase ? "none" : "none" }}>{p}</p>
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
              </div>
            ))}

            {/* CTA box */}
            <div style={{ background: GRAY, borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: 22, fontWeight: 700, color: BLACK, marginBottom: 12 }}>Questions?</h2>
              <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                If you have any questions about this End User License Agreement, please contact us at{" "}
                <span style={{ color: OC }}>support@orchardcapitals.com</span>. Our team is available to assist you with any inquiries regarding your rights and obligations under this agreement.
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

"use client";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import TraderCardsSkeleton from "../_components/TraderCardsSkeleton";
import Link from "next/link";
import { ArrowRight, Shield, Zap, SlidersHorizontal, Copy, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

interface CopyTrader {
  id: number;
  name: string;
  username: string;
  avatar_url: string | null;
  badge: string;
  gain: string;
  copiers: number;
  risk: number;
  trades: number;
  category: string;
  trend_direction: string;
  is_active: boolean;
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    stocks: "Stock Trader",
    options: "Options Specialist",
    etf: "ETF Strategist",
    tech: "Tech Investor",
    financial: "Financial Analyst",
    healthcare: "Healthcare Specialist",
    all: "Diversified Trader",
    crypto: "Multi-Asset Trader",
  };
  return map[cat] ?? "Stock Trader";
}

function badgeLabel(badge: string): string {
  const map: Record<string, string> = { gold: "Gold", silver: "Silver", bronze: "Bronze" };
  return map[badge] ?? badge;
}

function riskColor(risk: number): string {
  if (risk <= 3) return "#4ade80";
  if (risk <= 6) return "#facc15";
  return "#f87171";
}

const CAROUSEL_GAP = 20;

/* ─── Trader Roster Carousel ─── */
function TradersCarousel({ traders }: { traders: CopyTrader[] }) {
  const [idx, setIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [perView, setPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL = traders.length;

  useEffect(() => {
    const update = () => {
      const cpv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      setPerView(cpv);
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setCardWidth((w - CAROUSEL_GAP * (cpv - 1)) / cpv);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [TOTAL]);

  if (TOTAL === 0) return null;

  const pages = Math.max(1, Math.ceil(TOTAL / perView));
  const maxIdx = Math.max(0, TOTAL - perView);
  // Clamp instead of resetting via effect — keeps idx valid when perView changes on resize
  const clampedIdx = Math.min(idx, maxIdx);
  const currentPage = Math.floor(clampedIdx / perView);
  const prev = () => setIdx(Math.max(0, clampedIdx - perView));
  const next = () => setIdx(Math.min(maxIdx, clampedIdx + perView));
  const translateX = cardWidth > 0 ? clampedIdx * (cardWidth + CAROUSEL_GAP) : 0;

  const BtnStyle = (disabled: boolean): React.CSSProperties => ({
    flexShrink: 0, width: 44, height: 44, borderRadius: "50%",
    background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.14)",
    alignItems: "center", justifyContent: "center",
    cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.3 : 1,
    color: WHITE, transition: "background 0.2s, border-color 0.2s, opacity 0.2s",
  });

  const onBtnEnter = (e: React.MouseEvent<HTMLButtonElement>, disabled: boolean) => {
    if (disabled) return;
    e.currentTarget.style.background = OC;
    e.currentTarget.style.borderColor = OC;
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={prev} disabled={clampedIdx === 0} aria-label="Previous traders" className="hidden md:flex" style={BtnStyle(clampedIdx === 0)} onMouseEnter={e => onBtnEnter(e, clampedIdx === 0)} onMouseLeave={onBtnLeave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div ref={containerRef} style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ display: "flex", gap: CAROUSEL_GAP, transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)", transform: `translateX(-${translateX}px)` }}>
            {traders.map(t => (
              <motion.div key={t.id} {...reveal} style={{ flex: `0 0 ${cardWidth > 0 ? cardWidth + "px" : "calc(33.33% - 14px)"}`, minWidth: 0 }}>
                <div
                  style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px", transition: "border-color 0.2s, background 0.2s, transform 0.2s", cursor: "pointer", position: "relative", overflow: "hidden", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${OC}55`; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.035)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: `radial-gradient(ellipse at top right, ${OC}12 0%, transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                    <div style={{ position: "relative", width: 52, height: 52, borderRadius: "50%", flexShrink: 0 }}>
                      {t.avatar_url ? (
                        <motion.img {...reveal} src={t.avatar_url} alt={t.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${OC}45` }} />
                      ) : (
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${OC}30 0%, ${OC}10 100%)`, border: `1.5px solid ${OC}45`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: OC, fontSize: 15, fontWeight: 800 }}>{t.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: WHITE, fontWeight: 700, fontSize: 15, marginBottom: 3, lineHeight: 1.3 }}>{t.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1 }}>{categoryLabel(t.category)}</p>
                    </div>
                    <div style={{ background: t.badge === "gold" ? "rgba(250,204,21,0.12)" : t.badge === "silver" ? "rgba(192,192,192,0.12)" : `${OC}18`, border: `1px solid ${t.badge === "gold" ? "rgba(250,204,21,0.35)" : t.badge === "silver" ? "rgba(192,192,192,0.3)" : `${OC}40`}`, borderRadius: 100, padding: "4px 10px", flexShrink: 0 }}>
                      <span style={{ color: t.badge === "gold" ? "#facc15" : t.badge === "silver" ? "#d1d5db" : OC, fontSize: 10, fontWeight: 800, letterSpacing: "0.04em" }}>{badgeLabel(t.badge)}</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 20 }}>
                    <div style={{ textAlign: "center", paddingRight: 12 }}>
                      <p style={{ color: "#4ade80", fontSize: 19, fontWeight: 800, fontFamily: "var(--oc-poppins)", letterSpacing: "-0.5px", marginBottom: 4 }}>+{parseFloat(t.gain).toFixed(0)}%</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Return</p>
                    </div>
                    <div style={{ textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.07)", borderRight: "1px solid rgba(255,255,255,0.07)", padding: "0 12px" }}>
                      <p style={{ color: WHITE, fontSize: 19, fontWeight: 800, fontFamily: "var(--oc-poppins)", letterSpacing: "-0.5px", marginBottom: 4 }}>{t.copiers.toLocaleString()}</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Copiers</p>
                    </div>
                    <div style={{ textAlign: "center", paddingLeft: 12 }}>
                      <p style={{ color: riskColor(t.risk), fontSize: 19, fontWeight: 800, fontFamily: "var(--oc-poppins)", letterSpacing: "-0.5px", marginBottom: 4 }}>{t.risk}/10</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Risk</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <TrendingUp className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                        <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{t.trades.toLocaleString()}</span> trades
                      </span>
                    </div>
                    <Link href="/register" style={{ background: OC, color: WHITE, fontSize: 13, fontWeight: 700, padding: "8px 20px", borderRadius: 100, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                      Copy <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <button onClick={next} disabled={clampedIdx >= maxIdx} aria-label="Next traders" className="hidden md:flex" style={BtnStyle(clampedIdx >= maxIdx)} onMouseEnter={e => onBtnEnter(e, clampedIdx >= maxIdx)} onMouseLeave={onBtnLeave}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setIdx(Math.min(i * perView, maxIdx))} aria-label={`Go to traders page ${i + 1}`}
              style={{ width: i === currentPage ? 28 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === currentPage ? OC : "rgba(255,255,255,0.18)", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      )}
    </div>
  );
}

const BENEFITS = [
  { icon: <Zap className="w-6 h-6" />, title: "Automatic Trade Mirroring", desc: "When a lead trader opens a position, your account mirrors it in under a second. No manual execution, no watching charts all day." },
  { icon: <Shield className="w-6 h-6" />, title: "Verified & Audited Traders", desc: "Every lead trader on Orchard Capitals has a verified track record. Performance figures are audited — what you see is real." },
  { icon: <SlidersHorizontal className="w-6 h-6" />, title: "Full Control Over Risk", desc: "Set your allocation amount and a maximum loss limit per trader. Your copy stops automatically if losses hit your defined threshold." },
  { icon: <Copy className="w-6 h-6" />, title: "Stop or Adjust Anytime", desc: "Pause copying, swap traders, or withdraw your capital at any time. You are always in control — the platform works for you." },
];

const STEPS = [
  { num: "01", title: "Browse the Leaderboard", desc: "Explore verified lead traders ranked by return, win rate, number of copiers, and risk score. Filter by strategy type or sector." },
  { num: "02", title: "Pick a Trader to Follow", desc: "Review a trader's full performance history — monthly returns, max drawdown, and active trade breakdown — before committing." },
  { num: "03", title: "Set Your Copy Parameters", desc: "Choose how much capital to allocate and set a stop-loss limit. Your settings are independent from every other copier." },
  { num: "04", title: "Sit Back and Let It Run", desc: "Every trade the lead trader makes is mirrored in your account automatically. Monitor live P&L from your dashboard." },
];

export default function LeadTradersPage() {
  const [traders, setTraders] = useState<CopyTrader[]>([]);
  const [tradersLoading, setTradersLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/traders/")
      .then(r => r.ok ? r.json() : [])
      .then(data => setTraders(Array.isArray(data) ? data.slice(0, 9) : []))
      .catch(() => {})
      .finally(() => setTradersLoading(false));
  }, []);

  return (
    <PageWrapper
      ctaTitle="Start Copying Expert Traders Today"
      ctaSubtitle="Browse verified lead traders and mirror their stock strategies automatically — with zero manual execution.">

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
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Copy Trading</span>
            </div>
            <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 5.5vw, 70px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 24 }}>
              Copy Experts.<br /><em style={{ fontStyle: "italic", color: OC }}>Earn Like Experts.</em>
            </motion.h1>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 540 }}>
              Browse verified professional stock traders, choose who to follow, and let your account mirror their positions automatically — in real time, with zero effort.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Start Copying <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lead-traders" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                Browse Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY COPY ── */}
      <section style={{ background: WHITE, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Why Copy Trade</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Their expertise.<br /><em style={{ color: OC, fontStyle: "italic" }}>Your account.</em>
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Skip the research, the screen-watching, and the guesswork — copy a professional's strategy and let it work for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(b => (
              <motion.div key={b.title} {...reveal} style={{ background: GRAY, borderRadius: 16, padding: "28px 24px", border: "1px solid #e5e7eb", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${OC}15`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{b.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TRADER ROSTER ── */}
      <section style={{ background: BLACK, padding: "88px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 1000, height: 700, background: `radial-gradient(ellipse at center, ${OC}15 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>

          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Roster</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 14 }}>
              Verified traders you can<br /><em style={{ fontStyle: "italic", color: OC }}>start copying right now.</em>
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
              Every trader listed here is audited and active. Their returns are real. Your account can mirror them automatically.
            </p>
          </div>

          <div style={{ marginBottom: 44 }}>
            {tradersLoading
              ? <TraderCardsSkeleton />
              : <TradersCarousel traders={traders} />
            }
          </div>

          {!tradersLoading && traders.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", fontSize: 14, marginBottom: 32 }}>
              No traders available at this time. Check back soon.
            </p>
          )}
          <div style={{ textAlign: "center" }}>
            <Link href="/login"
              style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 36px", borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Copy Traders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW TO START COPYING  —  ORANGE ── */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 12, color: WHITE }}>
              Four steps to copying<br /><em style={{ fontStyle: "italic" }}>a professional trader.</em>
            </motion.h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800, margin: "0 auto" }}>
            {STEPS.map(s => (
              <motion.div key={s.num} {...reveal} style={{ display: "flex", gap: 24, alignItems: "flex-start", background: WHITE, borderRadius: 16, padding: "28px 32px", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 14, background: `${OC}12`, border: `1px solid ${OC}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: OC, fontSize: 14, fontWeight: 800 }}>{s.num}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: BLACK }}>{s.title}</h3>
                  <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: BLACK, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }} className="grid-cols-2 sm:grid-cols-4">
            {[["500K+", "Active Copiers"], ["$2.4B+", "Capital Being Copied"], ["150+", "Verified Lead Traders"], ["98%", "Copier Satisfaction Rate"]].map(([val, lbl]) => (
              <motion.div key={lbl} {...reveal} style={{ padding: "40px 24px", background: "rgba(255,255,255,0.02)", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: OC, letterSpacing: "-0.5px", marginBottom: 8 }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{lbl}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

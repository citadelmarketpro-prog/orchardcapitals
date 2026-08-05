"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../(new)/_components/PageWrapper";
import TraderCardsSkeleton from "../(new)/_components/TraderCardsSkeleton";
import { motion } from "framer-motion";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--oc-serif",
  display: "swap",
});
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Shield,
  Zap,
  BarChart2,
  Users,
  TrendingUp,
  Lock,
  Globe,
  BookOpen,
  Bell,
  Clock,
  Layers,
  User,
} from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

/* ─── Static data ─── */

const AWARDS = [
  { label: "Best Copy Trading Platform", sub: "FinTech Awards 2024" },
  { label: "Most Transparent Broker", sub: "Investor Choice 2024" },
  { label: "Top Rated App", sub: "App Store · 4.8★" },
  { label: "SIPC Member", sub: "Up to $500,000 Protection" },
];

const WHY_CARDS = [
  { icon: <TrendingUp className="w-7 h-7" />, title: "Automated Order Execution", desc: "Fine-tune your copy parameters with stop-loss limits, capital allocation controls, and real-time position sync." },
  { icon: <Globe className="w-7 h-7" />, title: "Global Market Access", desc: "Stocks, ETFs, Options, and Index Funds — all through a single account with one unified portfolio view." },
  { icon: <BookOpen className="w-7 h-7" />, title: "200+ Educational Courses", desc: "From beginner fundamentals to institutional-grade options strategy — learn while you earn." },
  { icon: <Bell className="w-7 h-7" />, title: "24/7 Smart Alerts", desc: "Get notified the moment a trader you follow opens a position. Never miss a move." },
];

const TRADING_STYLES = [
  { icon: <Clock className="w-6 h-6" />, title: "Swing Trading", desc: "Capture multi-day trends with defined entries and exits — for stocks, ETFs, and options.", href: "/swing-trading" },
  { icon: <Layers className="w-6 h-6" />, title: "Futures", desc: "Trade futures contracts on indices, commodities, and more with greater leverage potential.", href: "/futures" },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Options", desc: "$0 contract fee options trading with 13 strategies and real-time analysis tools.", href: "/option-trading" },
  { icon: <Zap className="w-6 h-6" />, title: "Advanced Trading", desc: "Conditional orders, algorithmic execution, and pro-grade tools for active traders.", href: "/advance-trading" },
];

const COMMUNITY = [
  { title: "Learn", desc: "Build your trading skills with 200+ courses — from beginner basics to advanced derivatives strategy.", link: "Get started", icon: <BookOpen className="w-6 h-6" /> },
  { title: "24/7 Market News", desc: "Live updates from 50+ premium sources. Stay ahead of every market-moving event.", link: "Get started", icon: <Bell className="w-6 h-6" /> },
  { title: "Orchard Community", desc: "Connect with 500K+ investors worldwide. Share insights, strategies, and trade ideas.", link: "Get started", icon: <Users className="w-6 h-6" /> },
];

const FAQS = [
  { q: "How do I open an account?", a: "Create a free account in under two minutes — verify your identity, fund your account, and you're ready to start copy trading." },
  { q: "How does copy trading actually work?", a: "Choose a verified trader, set your allocation, and every trade they open or close mirrors proportionally into your account in real time." },
  { q: "What does Orchard Capitals charge in fees?", a: "$0 management fee, $0 commission on stock and ETF trades, and $0 equity options contract fee. There's no account minimum to get started." },
  { q: "Is my money protected?", a: "Yes. Orchard Capitals is a SIPC member, protecting securities customers up to $500,000, including $250,000 for cash claims." },
  { q: "Can I stop copying a trader at any time?", a: "Yes — you have full control to pause, adjust your allocation, or stop copying any trader instantly from your dashboard." },
];

/* ─── Copy Trader types + helpers ─── */
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
    stocks: "Stock Trader", options: "Options Specialist", etf: "ETF Strategist",
    tech: "Tech Investor", financial: "Financial Analyst", healthcare: "Healthcare Specialist",
    all: "Diversified Trader", crypto: "Multi-Asset Trader",
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

/* ─── TradingView Market Overview ─── */
function MarketOverviewWidget() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light", dateRange: "12M", showChart: true, locale: "en",
      isTransparent: false, showSymbolLogo: true, showFloatingTooltip: false,
      width: "100%", height: "660",
      tabs: [
        { title: "Stocks", symbols: [{ s: "NASDAQ:AAPL", d: "Apple" }, { s: "NASDAQ:GOOGL", d: "Alphabet" }, { s: "NASDAQ:MSFT", d: "Microsoft" }, { s: "NASDAQ:AMZN", d: "Amazon" }, { s: "NASDAQ:NVDA", d: "NVIDIA" }, { s: "NYSE:TSLA", d: "Tesla" }, { s: "NYSE:META", d: "Meta" }, { s: "NYSE:JPM", d: "JPMorgan" }], originalTitle: "Stocks" },
        { title: "ETFs", symbols: [{ s: "AMEX:SPY", d: "S&P 500 ETF" }, { s: "AMEX:QQQ", d: "Nasdaq-100 ETF" }, { s: "AMEX:IWM", d: "Russell 2000 ETF" }, { s: "AMEX:GLD", d: "Gold ETF" }, { s: "AMEX:TLT", d: "20+ Yr Treasury ETF" }, { s: "AMEX:VTI", d: "Vanguard Total Market" }], originalTitle: "ETFs" },
        { title: "Indices", symbols: [{ s: "FOREXCOM:SPXUSD", d: "S&P 500" }, { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" }, { s: "FOREXCOM:DJI", d: "Dow Jones" }, { s: "INDEX:NKY", d: "Nikkei 225" }, { s: "INDEX:DEU40", d: "DAX 40" }, { s: "FOREXCOM:UKXGBP", d: "FTSE 100" }], originalTitle: "Indices" },
      ],
    });
    ref.current.appendChild(script);
  }, []);
  return (
    <div ref={ref} className="tradingview-widget-container w-full">
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}

const CAROUSEL_GAP = 20;

/* ─── Copy Traders Carousel ─── */
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

/* ─── Persistent bottom conversion bar ─── */
function StickyOfferBar() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 250, background: BLACK, borderTop: "1px solid rgba(255,255,255,0.1)", padding: "14px 20px", boxShadow: "0 -8px 24px rgba(0,0,0,0.35)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
        <Link href="/login" style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          <User className="w-4 h-4" /> Sign in
        </Link>
        <Link href="/register" style={{ background: OC, color: WHITE, fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 100, textDecoration: "none" }}>
          Open Account
        </Link>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
const INT_GROUPS = [
  ["TradeStation", "Tastytrade", "Ally Invest"],
  ["E-Trade", "WEBULL", "Think or Swim"],
  ["TD Ameritrade", "Interactive Brokers", "Schwab"],
];

export default function HomePage() {
  const [traders, setTraders] = useState<CopyTrader[]>([]);
  const [tradersLoading, setTradersLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [intIdx, setIntIdx] = useState(0);
  const [intFade, setIntFade] = useState(false);

  useEffect(() => {
    fetch("/api/auth/traders/")
      .then(r => r.ok ? r.json() : [])
      .then(data => setTraders(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => {})
      .finally(() => setTradersLoading(false));
  }, []);

  /* integration badge cycling */
  useEffect(() => {
    const id = setInterval(() => {
      setIntFade(true);
      setTimeout(() => {
        setIntIdx(p => (p + 1) % INT_GROUPS.length);
        setIntFade(false);
      }, 350);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
    <StickyOfferBar />
    <PageWrapper
      ctaTitle="Start growing your portfolio"
      ctaSubtitle="Join 500,000+ investors already copying the world's top traders."
    >

      {/* ══════════════════════════════════════════
          HERO  —  BLACK
      ══════════════════════════════════════════ */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "48px 24px 0" }} className="lg:pt-18">
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: `radial-gradient(ellipse at center, ${OC}28 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 400, background: `radial-gradient(ellipse at center, ${OC}14 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-10 lg:gap-12">
            <div className="lg:pb-16">
              {/* Integrates-with cycling badge — group of platforms, compact single line */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: ".38rem .85rem", borderRadius: 100, marginBottom: 24, maxWidth: "100%", flexWrap: "nowrap", overflow: "hidden" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "oc-pulse 1.8s ease-in-out infinite" }} />
                <span style={{ fontFamily: "monospace", fontSize: ".62rem", letterSpacing: ".07em", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap", flexShrink: 0 }}>Integrates with</span>
                <span style={{ display: "flex", alignItems: "center", gap: ".3rem", transition: "opacity .35s,transform .35s", opacity: intFade ? 0 : 1, transform: intFade ? "translateY(5px)" : "translateY(0)", overflow: "hidden" }}>
                  {INT_GROUPS[intIdx].map((p, i) => (
                    <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: ".3rem" }}>
                      <span style={{ fontFamily: "monospace", fontSize: ".62rem", fontWeight: 700, color: WHITE, whiteSpace: "nowrap" }}>{p}</span>
                      {i < INT_GROUPS[intIdx].length - 1 && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: ".65rem", lineHeight: 1 }}>·</span>}
                    </span>
                  ))}
                </span>
              </div>

              <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 300, color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
                The Premium<br />
                <em style={{ fontStyle: "italic", color: OC }}>Copy Trading</em><br />
                Platform
              </motion.h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                Mirror verified professional traders automatically. Your account, their expertise — executed in milliseconds.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 40 }} className="sm:flex sm:flex-wrap sm:gap-4">
                {AWARDS.map(a => (
                  <motion.div key={a.label} {...reveal} style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)" }}>
                    <p style={{ color: WHITE, fontSize: 11, fontWeight: 700, lineHeight: 1.3, marginBottom: 2 }}>{a.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{a.sub}</p>
                  </motion.div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", boxShadow: `0 8px 32px ${OC}40`, transition: "opacity 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Open Account
                </Link>
                <Link href="/lead-traders" style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  View Top Traders <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 16 }}>
                *All investing involves risk. Past performance is not indicative of future results.
              </p>
            </div>
            <div style={{ position: "relative", alignSelf: "flex-end" }}>
              <div style={{ borderRadius: "20px 20px 0 0", overflow: "hidden", boxShadow: "0 -24px 80px rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
                <motion.img {...reveal} src="/landing/images/anywhere-8188b22d.png" alt="Orchard Capitals Platform" style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "cover", objectPosition: "center top" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUICK NAV CARDS  —  WHITE
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "64px 24px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="sm:grid-cols-3">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Top Traders", href: "/lead-traders" },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Fees & Plans", href: "#fees" },
              { icon: <Shield className="w-5 h-5" />, label: "Why Orchard", href: "#why" },
            ].map(card => (
              <Link key={card.label} href={card.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", border: "1px solid #e5e7eb", borderRadius: 14, textDecoration: "none", background: WHITE, transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = OC; e.currentTarget.style.boxShadow = `0 4px 20px ${OC}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: OC }}>{card.icon}</span>
                  <span style={{ color: BLACK, fontSize: 15, fontWeight: 600 }}>{card.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: "#9ca3af" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNER WITH US  —  WHITE, editorial
      ══════════════════════════════════════════ */}
      <section className={cormorant.variable} style={{ background: WHITE, padding: "88px 24px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-10 lg:gap-16 items-center" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16 / 11" }}>
            <motion.img {...reveal} src="/images/new/learn_support_t_journey.jpg" alt="An Orchard Capitals advisor meeting with clients" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          </div>
          <div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-serif), 'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontSize: "clamp(30px, 3.2vw, 44px)", lineHeight: 1.2, letterSpacing: "-0.3px", color: BLACK, marginBottom: 20 }}>
              Explore every way we support your trading journey
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
              Whether you&apos;re just getting started with copy trading or managing a multi-strategy portfolio, our team offers dedicated onboarding, account guidance, and support tailored to how you trade.
            </p>
            <Link href="/about" style={{ display: "inline-block", border: `1.5px solid ${BLACK}`, color: BLACK, fontWeight: 600, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = BLACK; e.currentTarget.style.color = WHITE; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BLACK; }}>
              Explore working with us
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEES  —  BLACK / DARK
      ══════════════════════════════════════════ */}
      <section id="fees" style={{ background: BLACK, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: WHITE, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.5px" }}>
              Keep more.<br />Trade more.
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
              Nothing to hide here — just transparent pricing across every product, every account.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16, marginBottom: 44 }}>
            {[
              { value: "$0", label: "Management fee", desc: "No AUM charge, ever." },
              { value: "$0", label: "Commission on trades", desc: "Stocks & ETFs, unlimited." },
              { value: "$0", label: "Options contract fee", desc: "Per-contract cost, waived." },
              { value: "No Min", label: "Account minimum", desc: "Start with any amount." },
            ].map(f => (
              <motion.div key={f.label} {...reveal} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.1)", borderTop: `3px solid ${OC}`, borderRadius: 14, padding: "28px 20px" }}>
                <div style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: WHITE, letterSpacing: "-1px", marginBottom: 10 }}>{f.value}</div>
                <div style={{ color: WHITE, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}>
              Start for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARKET MOMENT  —  RUST BANNER
      ══════════════════════════════════════════ */}
      <section style={{ background: `radial-gradient(ellipse at center, ${OC} 0%, #6b3016 100%)`, padding: "88px 24px", textAlign: "center" }}>
        <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 800, color: WHITE, letterSpacing: "-0.5px", lineHeight: 1.12, marginBottom: 36, textTransform: "uppercase" }}>
          The market&apos;s moving.<br />Are you copying?
        </motion.h2>
        <Link href="/register" style={{ background: BLACK, color: WHITE, fontWeight: 800, fontSize: 15, padding: "16px 40px", borderRadius: 100, textDecoration: "none", display: "inline-block", letterSpacing: "0.02em" }}>
          Open an Account
        </Link>
      </section>

      {/* ══════════════════════════════════════════
          PARTNERS STRIP  —  LIGHT GRAY
      ══════════════════════════════════════════ */}
      <section style={{ background: GRAY, padding: "40px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ color: "#9ca3af", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", marginBottom: 28 }}>
            Regulated · Insured · Trusted
          </p>
        </div>

        {/* Scrolling payment strip — full-bleed, matches citadelsmarket's FeaturesSection */}
        <div className="overflow-hidden w-full h-28">
          <div className="animate-scroll-strip">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src="/landing/payment-methods-strip.svg"
                alt=""
                className="h-28 w-auto flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARKET OVERVIEW  —  WHITE
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, textAlign: "center", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Every Market. One Screen.
          </motion.h2>
          <p style={{ color: "#6b7280", textAlign: "center", fontSize: 16, marginBottom: 40 }}>
            Real-time data across stocks, ETFs, and indices — so you&apos;re never trading blind.
          </p>
          <div style={{ borderRadius: 16, overflow: "hidden" }}>
            <MarketOverviewWidget />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COPY TRADERS  —  BLACK
      ══════════════════════════════════════════ */}
      <section style={{ background: BLACK, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 60 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}35`, borderRadius: 100, padding: "6px 14px", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
              <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Copy Trading</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.5px" }}>
              Copy the Best.<br /><em style={{ fontStyle: "italic", color: OC }}>Earn Like the Best.</em>
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, lineHeight: 1.7 }}>
              Follow audited, top-performing traders and let every trade mirror into your account instantly — full transparency, zero manual work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", marginBottom: 56 }}>
            {[{ value: "83K+", label: "Active Copiers" }, { value: "$890M+", label: "Assets Under Copy" }, { value: "98%", label: "Execution Accuracy" }].map(s => (
              <motion.div key={s.label} {...reveal} style={{ background: "rgba(255,255,255,0.03)", padding: "20px 24px" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(26px, 6vw, 40px)", fontWeight: 700, color: OC, marginBottom: 4, letterSpacing: "-0.5px" }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginBottom: 44 }}>
            {tradersLoading
              ? <TraderCardsSkeleton />
              : <TradersCarousel traders={traders} />
            }
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/lead-traders" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "12px 28px", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = OC; e.currentTarget.style.color = OC; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
              Browse all traders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section> 

      {/* ══════════════════════════════════════════
          BUILT TO PERFORM  —  WHITE  (plain icon grid)
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}12`, border: `1px solid ${OC}25`, borderRadius: 100, padding: "5px 12px", marginBottom: 16 }}>
              <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Built to Perform</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, letterSpacing: "-0.5px", marginBottom: 12 }}>
              Everything a serious<br />trader needs.
            </motion.h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              No plugins, no add-ons — the tools that matter come standard with every account.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {WHY_CARDS.map(c => (
              <motion.div key={c.title} {...reveal} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: OC }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: BLACK }}>{c.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY ORCHARD  —  ORANGE  (bento)
      ══════════════════════════════════════════ */}
      <section id="why" style={{ background: OC, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 items-start">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 20, color: WHITE }}>
                  Built to help<br />you win.
                </motion.h2>
                <Link href="/register" style={{ background: BLACK, color: WHITE, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}>
                  Get Started
                </Link>
              </div>
              <div style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 520 }}>
                <motion.img {...reveal} src="/images/new/advance_order.jpg" alt="Advanced orders" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.4) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>Advanced orders, <span style={{ color: OC }}>simplified</span></h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Fine-tune your trading with conditional and advanced order types built for precision.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5">
              <div className="md:row-span-2" style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 680 }}>
                <motion.img {...reveal} src="/images/new/deep_market.jpg" alt="Market insights" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 32%, rgba(0,0,0,0.4) 62%, rgba(0,0,0,0.4) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>Unlock in-depth market insights</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Navigate markets with real-time data and up to 60 bid/ask price levels.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
              <div style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 380 }}>
                <motion.img {...reveal} src="/images/new/pro_support.jpg" alt="24/7 support" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.4) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>24/7 professional support</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Our team is available around the clock to assist you at every step.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
              <div style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 380 }}>
                <motion.img {...reveal} src="/images/new/trade_on_any_device.jpg" alt="Trade anywhere" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.4) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>Trade anywhere</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Access your portfolio on desktop, tablet, or mobile — anytime, anywhere.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ASSETS GRID  —  BLACK + GLOBE BG
      ══════════════════════════════════════════ */}
      <section style={{ background: BLACK, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <motion.img {...reveal} src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 0 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: WHITE, textAlign: "center", marginBottom: 8, letterSpacing: "-0.5px" }}>
            One Account. Every Market.
          </motion.h2>
          <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: 16, marginBottom: 48 }}>
            Stocks, options, ETFs, and more — build a full portfolio without switching platforms.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-4">
            <div className="lg:row-span-2" style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: WHITE, fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.4px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                Global Stocks <ChevronRight className="w-6 h-6" style={{ color: "rgba(255,255,255,0.5)" }} />
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.75 }}>
                Invest in domestic and international stocks with real-time Level 2 market data and fractional share support. Build a diversified equity portfolio across every major exchange, all from a single Orchard Capitals account — no need to juggle multiple platforms or brokers.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", padding: "28px 24px", minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: WHITE, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Options <ChevronRight className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>
                Trade options with $0 contract fees and real-time, intuitive analysis tools. Choose from 13 built-in strategies — from simple covered calls to multi-leg spreads — designed to help you manage risk with precision.
              </p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", padding: "28px 24px", minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: WHITE, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                ETFs &amp; Funds <ChevronRight className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>
                Access hundreds of commission-free ETFs, index funds, and curated thematic baskets. Build instant diversification across sectors and asset classes without the friction of picking individual stocks one by one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRADE YOUR STYLE  —  ORANGE
      ══════════════════════════════════════════ */}
      <section style={{ background: OC, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100, padding: "5px 12px", marginBottom: 20 }}>
              <span style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Trade Your Style</span>
            </div>
            <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.5px", color: WHITE }}>
              Every strategy.<br /><em style={{ fontStyle: "italic" }}>One platform.</em>
            </motion.h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>
              Whether you hold for minutes or weeks, Orchard Capitals has the tools built for how you trade.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRADING_STYLES.map(s => (
              <Link key={s.title} href={s.href} style={{ background: WHITE, borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.05)", textDecoration: "none", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${OC}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: OC }}>{s.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: BLACK }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{s.desc}</p>
                <span style={{ color: OC, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>Learn more <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRO ANALYTICS  —  WHITE
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: 40, alignItems: "center" }} className="lg:grid-cols-2 lg:gap-16">
            <div>
              <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px" }}>
                Trade with an<br />Institutional Edge
              </motion.h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { title: "13 pre-set risk strategies", desc: "Choose from conservative, balanced, or aggressive copy parameters." },
                  { title: "Unusual options activity", desc: "Detect market shifts with live insights on high-volume trades and institutional block buys." },
                  { title: "Audited trade history", desc: "Full P&L breakdown, Sharpe ratio, drawdown, and win-rate — before you copy a single trade." },
                ].map((item, i) => (
                  <motion.div key={item.title} {...reveal} style={{ display: "flex", gap: 16, padding: "24px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ width: 3, background: i === 1 ? OC : "#e5e7eb", borderRadius: 3, flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.2px" }}>{item.title}</h3>
                      <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.08)" }}>
              <motion.img {...reveal} src="/images/new/trade_eith_edge.jpg" alt="Orchard Capitals Desktop Platform" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY  —  DARK with photo texture
      ══════════════════════════════════════════ */}
      <section style={{ background: "#111", padding: "0 0 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <motion.img {...reveal} src="/images/new/learn_faster.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 20% 50%, ${OC}22 0%, transparent 55%)`, pointerEvents: "none", zIndex: 1 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 0", position: "relative", zIndex: 2 }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: WHITE, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Learn faster.<br /><em style={{ fontStyle: "italic", color: OC }}>Trade smarter.</em>
          </motion.h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 56 }}>Resources, community, and support — every step of your journey.</p>
          <div style={{ display: "grid", gap: 0 }} className="sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY.map((c, i) => (
              <motion.div key={c.title} {...reveal} style={{ padding: "32px 28px 40px", borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: i < COMMUNITY.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ color: OC, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.2px" }}>{c.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{c.desc}</p>
                <Link href="#" style={{ color: OC, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  {c.link} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECURITY  —  BLACK
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: WHITE, marginBottom: 48, letterSpacing: "-0.5px" }}>
            Security you don&apos;t have to think about
          </motion.h2>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { title: "Account protection", desc: "Orchard Capitals is a SIPC member, protecting securities customers up to $500,000 (including $250,000 for cash claims)." },
              { title: "Multi-factor authentication", desc: "We provide industry-standard MFA on all accounts, with biometric login support on mobile." },
              { title: "256-bit encryption", desc: "All data transmissions are protected with bank-grade TLS 1.3 encryption, end to end." },
              { title: "Segregated client funds", desc: "Your funds are held in segregated accounts and never used for company operations." },
            ].map(item => (
              <motion.div key={item.title} {...reveal} style={{ display: "grid", gap: 24, padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="lg:grid-cols-[280px_1fr]">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Lock className="w-4 h-4" style={{ color: OC, flexShrink: 0 }} />
                  <span style={{ color: WHITE, fontWeight: 700, fontSize: 15 }}>{item.title}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ  —  GRAY
      ══════════════════════════════════════════ */}
      <section style={{ background: GRAY, padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, textAlign: "center", marginBottom: 48, letterSpacing: "-0.5px" }}>
            Get answers to your questions
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => {
              const open = faqOpen === i;
              return (
                <motion.div key={f.q} {...reveal} style={{ background: WHITE, borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <button onClick={() => setFaqOpen(open ? null : i)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ color: BLACK, fontSize: 16, fontWeight: 700 }}>{f.q}</span>
                    <ChevronDown className="w-5 h-5" style={{ color: OC, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {open && (
                    <div style={{ padding: "0 24px 22px" }}>
                      <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IT'S FREE  —  BLACK, wave video
      ══════════════════════════════════════════ */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "100px 24px 130px" }}>
          <motion.h2 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(44px, 7vw, 92px)", fontWeight: 800, color: WHITE, letterSpacing: "-1.5px", lineHeight: 1, marginBottom: 24 }}>
            It&apos;s free
          </motion.h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
            Available to anyone with an Orchard account. Sign up today.
          </p>
          <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "15px 36px", borderRadius: 100, textDecoration: "none", display: "inline-block", boxShadow: `0 8px 32px ${OC}40`, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Sign Up
          </Link>
        </div>
        <div style={{ position: "relative", width: "100%", height: "clamp(220px, 32vw, 380px)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
            <source src="/videos/wave_footer.webm" type="video/webm" />
          </video>
        </div>
      </section>

    </PageWrapper>
    </>
  );
}

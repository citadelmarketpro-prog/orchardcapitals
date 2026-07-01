"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  BarChart2,
  Users,
  TrendingUp,
  Lock,
  Globe,
  BookOpen,
  Bell,
  Check,
} from "lucide-react";

/* ─── Static data ─── */

const AWARDS = [
  { label: "Best Copy Trading Platform", sub: "FinTech Awards 2024" },
  { label: "Most Transparent Broker", sub: "Investor Choice 2024" },
  { label: "Top Rated App", sub: "App Store · 4.8★" },
  { label: "SIPC Member", sub: "Up to $500,000 Protection" },
];

const FEATURES = [
  { image: "/landing/images/unlock-75e82a23.png", title: "Follow Elite Traders", desc: "Mirror the exact trades of verified professionals. Every strategy audited with full transparency.", link: "Get started" },
  { image: "/landing/images/simplified-d23953ca.png", title: "Advanced Orders, Simplified", desc: "Fine-tune your entries with conditional orders, bracket orders, and precision execution controls.", link: "Get started" },
  { image: "/landing/images/unusual-9286c4a3.png", title: "Deep Market Analytics", desc: "Sharpe ratio, max drawdown, win rate, full trade history — before you commit a single dollar.", link: "Get started" },
  { image: "/landing/images/global-stocks-beadfc37.png", title: "Global Stock Markets", desc: "Invest in domestic and international stocks with real-time Level 2 data and fractional shares.", link: "Get started" },
  { image: "/landing/images/options-87eff21b.png", title: "Options Trading", desc: "$0 contract fee options trading with 13 strategies and real-time intuitive analysis tools.", link: "Get started" },
  { image: "/landing/images/Crypto-5a0f0df3.webp", title: "Diversify with ETFs & Index Funds", desc: "Build a resilient portfolio with commission-free ETFs, index funds, and sector baskets — all in one account.", link: "Get started" },
  { image: "/landing/images/anywhere-8188b22d.png", title: "Trade on Any Device", desc: "Access your full portfolio and copy trading dashboard on desktop, tablet, or mobile — anytime.", link: "Get started" },
  { image: "/landing/images/faq-ada43f74.png", title: "24/7 Professional Support", desc: "Expert support available around the clock whenever you need it most.", link: "Get started" },
  { image: "/landing/images/fee-ff9f34dc.png", title: "Zero Commission Trading", desc: "$0 management fee, zero commission on trades, and $0 equity options contract fee.", link: "Get started" },
];

const WHY_CARDS = [
  { icon: <TrendingUp className="w-7 h-7" />, title: "Automated Order Execution", desc: "Fine-tune your copy parameters with stop-loss limits, capital allocation controls, and real-time position sync." },
  { icon: <Globe className="w-7 h-7" />, title: "Global Market Access", desc: "Stocks, ETFs, Options, and Index Funds — all through a single account with one unified portfolio view." },
  { icon: <BookOpen className="w-7 h-7" />, title: "200+ Educational Courses", desc: "From beginner fundamentals to institutional-grade options strategy — learn while you earn." },
  { icon: <Bell className="w-7 h-7" />, title: "24/7 Smart Alerts", desc: "Get notified the moment a trader you follow opens a position. Never miss a move." },
];

const COMMUNITY = [
  { title: "Learn", desc: "Build your trading skills with 200+ courses — from beginner basics to advanced derivatives strategy.", link: "Get started", icon: <BookOpen className="w-6 h-6" /> },
  { title: "24/7 Market News", desc: "Live updates from 50+ premium sources. Stay ahead of every market-moving event.", link: "Get started", icon: <Bell className="w-6 h-6" /> },
  { title: "Orchard Community", desc: "Connect with 500K+ investors worldwide. Share insights, strategies, and trade ideas.", link: "Get started", icon: <Users className="w-6 h-6" /> },
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

/* ─── Sparkline SVG (kept for potential use) ─── */
function Sparkline({ positive = true }: { positive?: boolean }) {
  const color = positive ? "#22c55e" : "#ef4444";
  const path = positive
    ? "M0,28 L8,24 L16,26 L24,20 L32,22 L40,16 L48,18 L56,12 L64,8"
    : "M0,8 L8,12 L16,10 L24,16 L32,14 L40,20 L48,18 L56,24 L64,28";
  return (
    <svg width="64" height="36" viewBox="0 0 64 36" fill="none">
      <path d={path} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Features Carousel ─── */
const CAROUSEL_GAP = 20;

function FeaturesCarousel() {
  const [idx, setIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [perView, setPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL = FEATURES.length;

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
  }, []);

  const pages = Math.ceil(TOTAL / perView);
  const maxIdx = Math.max(0, TOTAL - perView);
  const currentPage = Math.floor(idx / perView);
  const prev = () => setIdx(i => Math.max(0, i - perView));
  const next = () => setIdx(i => Math.min(maxIdx, i + perView));
  const translateX = cardWidth > 0 ? idx * (cardWidth + CAROUSEL_GAP) : 0;
  const btnMarginTop = cardWidth > 0 ? cardWidth / 2 - 22 : 80;

  const BtnStyle = (disabled: boolean): React.CSSProperties => ({
    flexShrink: 0, alignSelf: "flex-start", marginTop: btnMarginTop,
    width: 44, height: 44, borderRadius: "50%", background: WHITE, border: "1.5px solid #e5e7eb",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.3 : 1,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transition: "background 0.2s, border-color 0.2s, opacity 0.2s", color: "#374151",
  });

  const onBtnEnter = (e: React.MouseEvent<HTMLButtonElement>, disabled: boolean) => {
    if (disabled) return;
    e.currentTarget.style.background = OC;
    e.currentTarget.style.borderColor = OC;
    e.currentTarget.style.color = WHITE;
  };
  const onBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = WHITE;
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.color = "#374151";
  };

  return (
    <section id="offer" style={{ background: WHITE, padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, textAlign: "center", marginBottom: 8, letterSpacing: "-0.5px" }}>
          What&apos;s New
        </h2>
        <p style={{ color: "#6b7280", textAlign: "center", fontSize: 16, marginBottom: 48 }}>
          The latest features, markets, and strategies — built for serious investors.
        </p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <button onClick={prev} disabled={idx === 0} aria-label="Previous" style={BtnStyle(idx === 0)} onMouseEnter={e => onBtnEnter(e, idx === 0)} onMouseLeave={onBtnLeave}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div ref={containerRef} style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: CAROUSEL_GAP, transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)", transform: `translateX(-${translateX}px)` }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ flex: `0 0 ${cardWidth > 0 ? cardWidth + "px" : "calc(33.33% - 14px)"}`, minWidth: 0 }}>
                  <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4 / 5", background: "#111" }}>
                    <img src={f.image} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <div style={{ paddingTop: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 10, letterSpacing: "-0.2px" }}>{f.title}</h3>
                    <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}>{f.desc}</p>
                    <Link href="/register" style={{ color: OC, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{f.link} &gt;</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={next} disabled={idx >= maxIdx} aria-label="Next" style={BtnStyle(idx >= maxIdx)} onMouseEnter={e => onBtnEnter(e, idx >= maxIdx)} onMouseLeave={onBtnLeave}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setIdx(Math.min(i * perView, maxIdx))} aria-label={`Go to page ${i + 1}`}
              style={{ width: i === currentPage ? 28 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === currentPage ? OC : "#d1d5db", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main component ─── */
export default function NewLandingPage() {
  const [traders, setTraders] = useState<CopyTrader[]>([]);
  const [tradersLoading, setTradersLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/traders/")
      .then(r => r.ok ? r.json() : [])
      .then(data => setTraders(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => {})
      .finally(() => setTradersLoading(false));
  }, []);

  return (
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
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(193,78,42,0.12)", border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
                <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Trusted by 500,000+ investors</span>
              </div>
              <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 300, color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 24 }}>
                The Premium<br />
                <em style={{ fontStyle: "italic", color: OC }}>Copy Trading</em><br />
                Platform
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                Mirror verified professional traders automatically. Your account, their expertise — executed in milliseconds.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 40 }} className="sm:flex sm:flex-wrap sm:gap-4">
                {AWARDS.map(a => (
                  <div key={a.label} style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)" }}>
                    <p style={{ color: WHITE, fontSize: 11, fontWeight: 700, lineHeight: 1.3, marginBottom: 2 }}>{a.label}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{a.sub}</p>
                  </div>
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
                <img src="/landing/images/anywhere-8188b22d.png" alt="Orchard Capitals Platform" style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "cover", objectPosition: "center top" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUICK NAV CARDS  —  WHITE
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="sm:grid-cols-4">
            {[
              { icon: <BarChart2 className="w-5 h-5" />, label: "What We Offer", href: "#offer" },
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
          WHAT WE OFFER  —  WHITE  (carousel)
      ══════════════════════════════════════════ */}
      <FeaturesCarousel />

      {/* ══════════════════════════════════════════
          PARTNERS STRIP  —  LIGHT GRAY
      ══════════════════════════════════════════ */}
      <section style={{ background: GRAY, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ color: "#9ca3af", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", marginBottom: 28 }}>
            Regulated · Insured · Trusted
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
            {["SIPC Member", "FINRA Registered", "SEC Compliant", "Alpaca Markets", "Interactive Brokers"].map(p => (
              <div key={p} style={{ padding: "12px 24px", background: WHITE, borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13, fontWeight: 700, color: "#374151", letterSpacing: "-0.2px" }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEES  —  BLACK / DARK
      ══════════════════════════════════════════ */}
      <section id="fees" style={{ background: "#0d0d0d", padding: "64px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: `radial-gradient(ellipse at top right, ${OC}18 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 48 }} className="lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: WHITE, lineHeight: 1.1, marginBottom: 28, letterSpacing: "-0.5px" }}>
              Lower fees.<br />More potential.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {["$0 management fee", "Zero commission on trades", "$0 equity options contract fee", "No account minimums — start with any amount"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Check className="w-4 h-4" style={{ color: OC, flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 16 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}>
              Start for Free
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src="/landing/images/fee-ff9f34dc.png" alt="$0 commission" style={{ maxWidth: 440, width: "100%", borderRadius: 20, filter: `drop-shadow(0 16px 48px ${OC}4d)` }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARKET OVERVIEW  —  WHITE
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, textAlign: "center", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Discover Top-Performing Assets
          </h2>
          <p style={{ color: "#6b7280", textAlign: "center", fontSize: 16, marginBottom: 40 }}>
            Track real-time prices across stocks, ETFs, and indices — all in one place.
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
            <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, marginBottom: 18, letterSpacing: "-0.5px" }}>
              Copy the Best.<br /><em style={{ fontStyle: "italic", color: OC }}>Earn Like the Best.</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, lineHeight: 1.7 }}>
              Browse verified expert stock traders and automatically mirror their strategies in real time — no manual execution required.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", marginBottom: 56 }} className="sm:grid-cols-3">
            {[{ value: "500K+", label: "Active Copiers" }, { value: "$2.4B+", label: "Assets Under Copy" }, { value: "98%", label: "Execution Accuracy" }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", padding: "24px 28px" }}>
                <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: OC, marginBottom: 4, letterSpacing: "-0.5px" }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: 44 }}>
            {tradersLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px", height: 230 }}>
                    <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 14, borderRadius: 6, background: "rgba(255,255,255,0.07)", marginBottom: 8, width: "60%" }} />
                        <div style={{ height: 10, borderRadius: 6, background: "rgba(255,255,255,0.05)", width: "40%" }} />
                      </div>
                    </div>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 16 }} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {[0, 1, 2].map(j => <div key={j} style={{ height: 40, borderRadius: 8, background: "rgba(255,255,255,0.05)" }} />)}
                    </div>
                  </div>
                ))
              : traders.map(t => (
                  <div key={t.id}
                    style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px", transition: "border-color 0.2s, background 0.2s, transform 0.2s", cursor: "pointer", position: "relative", overflow: "hidden" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${OC}55`; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.035)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, background: `radial-gradient(ellipse at top right, ${OC}12 0%, transparent 70%)`, pointerEvents: "none" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                      <div style={{ position: "relative", width: 52, height: 52, borderRadius: "50%", flexShrink: 0 }}>
                        {t.avatar_url ? (
                          <img src={t.avatar_url} alt={t.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `1.5px solid ${OC}45` }} />
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
                ))
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
          WHY ORCHARD  —  LIGHT GRAY  (bento)
      ══════════════════════════════════════════ */}
      <section id="why" style={{ background: GRAY, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 items-start">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: 20, color: BLACK }}>
                  Why trade with<br />Orchard?
                </h2>
                <Link href="/register" style={{ background: OC, color: WHITE, fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 100, textDecoration: "none", display: "inline-block" }}>
                  Get Started
                </Link>
              </div>
              <div style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 520 }}>
                <img src="/landing/images/simplified-d23953ca.png" alt="Advanced orders" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 35%, transparent 65%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>Advanced orders, <span style={{ color: OC }}>simplified</span></h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Fine-tune your trading with conditional and advanced order types built for precision.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5">
              <div className="md:row-span-2" style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 680 }}>
                <img src="/landing/images/unlock-75e82a23.png" alt="Market insights" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 32%, transparent 62%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>Unlock in-depth market insights</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Navigate markets with real-time data and up to 60 bid/ask price levels.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
              <div style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 380 }}>
                <img src="/landing/images/faq-ada43f74.png" alt="24/7 support" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 35%, transparent 65%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, padding: "0 24px 28px" }}>
                  <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, lineHeight: 1.25, marginBottom: 8 }}>24/7 professional support</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>Our team is available around the clock to assist you at every step.</p>
                  <Link href="/register" style={{ color: OC, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
                </div>
              </div>
              <div style={{ background: "#111", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative", minHeight: 380 }}>
                <img src="/landing/images/anywhere-8188b22d.png" alt="Trade anywhere" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.8) 35%, transparent 65%)" }} />
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
          <img src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 0 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: WHITE, textAlign: "center", marginBottom: 8, letterSpacing: "-0.5px" }}>
            One-Stop Online Trading
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: 16, marginBottom: 48 }}>
            Diversify your investment portfolio with one account
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-4">
            <div className="lg:row-span-2" style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", overflow: "hidden", minHeight: 400, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ padding: "32px 32px 0" }}>
                <h3 style={{ color: WHITE, fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, letterSpacing: "-0.4px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  Global Stocks <ChevronRight className="w-6 h-6" style={{ color: "rgba(255,255,255,0.5)" }} />
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.65 }}>Invest in domestic and international stocks</p>
              </div>
              <div style={{ marginTop: 24, position: "relative", lineHeight: 0 }}>
                <img src="/landing/images/global-stocks-beadfc37.png" alt="Global Markets" style={{ width: "90%", display: "block", marginLeft: "auto", marginRight: "auto" }} />
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 20px 28px 32px", gap: 16, minHeight: 180 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: WHITE, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                  Options <ChevronRight className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
                </h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["$0 contract fee options trading", "Real-time intuitive analysis", "13 options strategies"].map(item => (
                    <li key={item} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: OC, fontWeight: 700, flexShrink: 0, lineHeight: "20px" }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flexShrink: 0, width: 140 }}>
                <img src="/landing/images/options-87eff21b.png" alt="Options CALL PUT" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 20px 28px 32px", gap: 16, minHeight: 180 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: WHITE, fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  ETFs &amp; Funds <ChevronRight className="w-5 h-5" style={{ color: "rgba(255,255,255,0.5)" }} />
                </h3>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Hundreds of commission-free ETFs", "Index funds & thematic baskets", "Instant diversification, zero friction"].map(item => (
                    <li key={item} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: OC, fontWeight: 700, flexShrink: 0, lineHeight: "20px" }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flexShrink: 0, width: 150 }}>
                <img src="/landing/images/Crypto-5a0f0df3.webp" alt="ETFs and Funds" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
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
              <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.5px" }}>
                Experience a Pro-level<br />Copy Trading Platform
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { title: "13 pre-set risk strategies", desc: "Choose from conservative, balanced, or aggressive copy parameters." },
                  { title: "Unusual options activity", desc: "Detect market shifts with live insights on high-volume trades and institutional block buys." },
                  { title: "Audited trade history", desc: "Full P&L breakdown, Sharpe ratio, drawdown, and win-rate — before you copy a single trade." },
                ].map((item, i) => (
                  <div key={item.title} style={{ display: "flex", gap: 16, padding: "24px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ width: 3, background: i === 1 ? OC : "#e5e7eb", borderRadius: 3, flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.2px" }}>{item.title}</h3>
                      <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.08)" }}>
              <img src="/landing/images/3-44f6f3fd.png" alt="Orchard Capitals Desktop Platform" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY  —  DARK with photo texture
      ══════════════════════════════════════════ */}
      <section style={{ background: "#111", padding: "0 0 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/landing/images/navigate-bg-6c9abac1.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 20% 50%, ${OC}22 0%, transparent 55%)`, pointerEvents: "none", zIndex: 1 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 0", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: WHITE, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Navigate trading<br /><em style={{ fontStyle: "italic", color: OC }}>with greater confidence</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 56 }}>Resources, community, and support — every step of your journey.</p>
          <div style={{ display: "grid", gap: 0 }} className="sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY.map((c, i) => (
              <div key={c.title} style={{ padding: "32px 28px 40px", borderTop: "1px solid rgba(255,255,255,0.08)", borderRight: i < COMMUNITY.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <div style={{ color: OC, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ color: WHITE, fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.2px" }}>{c.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{c.desc}</p>
                <Link href="#" style={{ color: OC, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  {c.link} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECURITY  —  BLACK
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: WHITE, marginBottom: 48, letterSpacing: "-0.5px" }}>
            Your account is protected
          </h2>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { title: "Account protection", desc: "Orchard Capitals is a SIPC member, protecting securities customers up to $500,000 (including $250,000 for cash claims)." },
              { title: "Multi-factor authentication", desc: "We provide industry-standard MFA on all accounts, with biometric login support on mobile." },
              { title: "256-bit encryption", desc: "All data transmissions are protected with bank-grade TLS 1.3 encryption, end to end." },
              { title: "Segregated client funds", desc: "Your funds are held in segregated accounts and never used for company operations." },
            ].map(item => (
              <div key={item.title} style={{ display: "grid", gap: 24, padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="lg:grid-cols-[280px_1fr]">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Lock className="w-4 h-4" style={{ color: OC, flexShrink: 0 }} />
                  <span style={{ color: WHITE, fontWeight: 700, fontSize: 15 }}>{item.title}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HIGHLIGHTS / NEWS  —  WHITE
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, textAlign: "center", marginBottom: 48, letterSpacing: "-0.5px" }}>
            Orchard Highlights
          </h2>
          <div style={{ display: "grid", borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb" }} className="md:grid-cols-2">
            <div style={{ background: "#111", aspectRatio: "4/3", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/landing/images/1-d34ddae5.png" alt="Orchard Capitals Platform Highlight" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", justifyContent: "center", background: GRAY }} className="md:p-10">
              <div style={{ display: "inline-block", background: `${OC}15`, borderRadius: 6, padding: "4px 12px", marginBottom: 16, alignSelf: "flex-start" }}>
                <span style={{ color: OC, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Press Release</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 16, letterSpacing: "-0.3px" }}>
                Orchard Capitals Surpasses 500,000 Investors with Industry-Leading Copy Trading Returns
              </h3>
              <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                Our platform continues to redefine retail investing by connecting everyday investors with institutional-calibre trading expertise through transparent, audited copy trading.
              </p>
              <p style={{ color: "#9ca3af", fontSize: 13 }}>06/29/2026</p>
            </div>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}

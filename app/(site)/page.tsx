"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import OCLogo from "@/components/site/OCLogo";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, BarChart2, SlidersHorizontal, Link2, Target, Zap } from "lucide-react";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Darker_Grotesque,
} from "next/font/google";

/* ─── Fonts ─── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--oc-serif",
  display: "swap",
});
const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--oc-mono",
  display: "swap",
});
const grotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--oc-sans",
  display: "swap",
});

/* ─── Static data ─── */
const MARQUEE = [
  { s: "AAPL", c: "+2.34%", up: true },
  { s: "SPY",  c: "+0.87%", up: true },
  { s: "TSLA", c: "−1.22%", up: false },
  { s: "NVDA", c: "+3.10%", up: true },
  { s: "QQQ",  c: "+1.05%", up: true },
  { s: "AMZN", c: "+1.89%", up: true },
  { s: "MSFT", c: "+0.54%", up: true },
  { s: "META", c: "−0.33%", up: false },
];

const TRADERS = [
  { i:"JR", img:"https://i.pravatar.cc/150?img=11", name:"Jake Reynolds",  spec:"Options Specialist", followers:"847 followers",  badge:"Top 1%", ret:"+182%", bar:"72%", wr:"74%", tr:"1,204", dd:"−8.2%",  col:"linear-gradient(135deg,#9b2c2c,#c0392b)" },
  { i:"SM", img:"https://i.pravatar.cc/150?img=5",  name:"Sofia Martinez", spec:"Futures Trader",     followers:"1.2K followers", badge:"Top 3%", ret:"+241%", bar:"88%", wr:"81%", tr:"892",   dd:"−11.4%", col:"linear-gradient(135deg,#6d28d9,#a855f7)" },
  { i:"MC", img:"https://i.pravatar.cc/150?img=67", name:"Marcus Chen",    spec:"Swing Trader",       followers:"2.4K followers", badge:"Top 1%", ret:"+319%", bar:"95%", wr:"69%", tr:"2,108", dd:"−15.1%", col:"linear-gradient(135deg,#0369a1,#0ea5e9)" },
];

const REVIEWS = [
  { img:"https://i.pravatar.cc/150?img=33", name:"David R.",       loc:"San Francisco, CA",   rating:5, text:"OrchardCapitals completely changed how I invest. I've been mirroring Jake Reynolds for 8 months and my portfolio is up 94%. The execution is flawless — every trade hits instantly." },
  { img:"https://i.pravatar.cc/150?img=47", name:"Priya K.",       loc:"London, UK",          rating:5, text:"I was skeptical at first but the results speak for themselves. Up 61% in six months just by following Sofia Martinez. The transparency and analytics are incredible." },
  { img:"https://i.pravatar.cc/150?img=15", name:"Tom W.",         loc:"Sydney, Australia",   rating:5, text:"Finally a copy trading platform that actually works. No slippage, no excuses. I've tried three others and none come close to the fill quality here." },
  { img:"https://i.pravatar.cc/150?img=64", name:"Amara O.",       loc:"Lagos, Nigeria",      rating:5, text:"The setup took literally four minutes. Now my account mirrors a top trader automatically. I check in once a week and the returns have been consistently strong." },
  { img:"https://i.pravatar.cc/150?img=22", name:"Carlos M.",      loc:"Mexico City, Mexico", rating:5, text:"Best fintech product I've used in years. The trader analytics are deep — Sharpe ratios, full drawdown history, audited returns. Everything you need to make an informed choice." },
  { img:"https://i.pravatar.cc/150?img=56", name:"Emma S.",        loc:"Toronto, Canada",     rating:4, text:"Really impressed with how smooth the onboarding was. Portfolio is up 38% in four months. Would love even more trader options but what's available is high quality." },
];

/* ─── Page ─── */
export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number|null>(null);
  const [footerOpen, setFooterOpen] = useState<string|null>(null);
  const [intIdx, setIntIdx] = useState(0);
  const [intFade, setIntFade] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  /* custom cursor */
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, id = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    };
    const tick = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      id = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);
    id = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);

  /* scroll reveal */
  useEffect(() => {
    if (!mounted) return;
    const els = document.querySelectorAll<HTMLElement>(".oc-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          (en.target as HTMLElement).classList.add("oc-revealed");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [mounted]);

  /* integration badge cycling */
  const INT_GROUPS = [
    ["TradeStation","Tastytrade","Ally Invest"],
    ["E-Trade","WEBULL","Think or Swim"],
    ["TD Ameritrade","Interactive Brokers","Schwab"],
  ];
  useEffect(() => {
    const id = setInterval(() => {
      setIntFade(true);
      setTimeout(() => {
        setIntIdx(p => (p + 1) % INT_GROUPS.length);
        setIntFade(false);
      }, 350);
    }, 3000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  /* ─── colour tokens ─── */
  const rust = "#c0392b";
  const cream = "#f5f0e8";
  const bark = "#8c7b6a";
  const dark = "#1c1510";
  const darker = "#120e0a";
  const leaf = "#3a6b35";

  const bg    = isDark ? darker : cream;
  const fg    = isDark ? cream  : dark;
  const muted = isDark ? "rgba(245,240,232,0.4)" : bark;
  const border= isDark ? "rgba(255,255,255,0.08)" : "rgba(74,63,53,0.12)";
  const surf  = isDark ? "rgba(255,255,255,0.04)" : "white";
  const surfEl= isDark ? "rgba(255,255,255,0.025)" : "#ede8de";

  return (
    <div
      className={`${cormorant.variable} ${ibmMono.variable} ${grotesque.variable} bg-[#f5f0e8] dark:bg-[#120e0a] text-[#1c1510] dark:text-[#f5f0e8]`}
      style={{ fontFamily: "var(--oc-sans), 'Darker Grotesque', sans-serif", overflowX: "hidden", cursor: "none", minHeight: "100vh" }}
    >

      {/* ── scoped CSS ── */}
      <style>{`
        .oc-serif { font-family: var(--oc-serif), 'Cormorant Garamond', Georgia, serif; }
        .oc-mono  { font-family: var(--oc-mono), 'IBM Plex Mono', monospace; }
        .oc-sans  { font-family: var(--oc-sans), 'Darker Grotesque', sans-serif; }

        /* cursor */
        .oc-dot  { position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;background:${rust};border-radius:50%;transform:translate(-50%,-50%);transition:transform .1s; }
        .oc-ring { position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;border:1.5px solid ${isDark?"rgba(192,57,43,0.5)":"rgba(139,124,106,0.45)"};border-radius:50%;transform:translate(-50%,-50%);transition:width .18s,height .18s,border-color .18s; }

        /* noise */
        .oc-noise::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:8000;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");}

        /* scrollbar */
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#2a2018;border-radius:2px;}

        /* reveal */
        .oc-reveal { opacity:0; transform:translateY(28px); transition:opacity .75s ease,transform .75s ease; }
        .oc-reveal.oc-revealed { opacity:1; transform:none; }

        /* review card fade-in */
        @keyframes oc-review-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        .oc-review-card { animation:oc-review-in .35s ease both; }

        /* marquee */
        @keyframes oc-mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .oc-mq-track { display:inline-flex;gap:2.5rem;animation:oc-mq 30s linear infinite;white-space:nowrap; }
        .oc-mq-track:hover { animation-play-state:paused; }

        /* glow drift */
        @keyframes oc-drift  { from{transform:translate(0,0)} to{transform:translate(40px,60px)} }
        .oc-glow1 { animation:oc-drift 16s ease-in-out infinite alternate; }
        .oc-glow2 { animation:oc-drift 22s ease-in-out infinite alternate-reverse; }

        /* live pulse */
        @keyframes oc-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0)} }
        .oc-live-dot { display:inline-block;width:5px;height:5px;border-radius:50%;background:${isDark?"#22c55e":leaf};animation:oc-pulse 1.8s ease-in-out infinite; }
        @keyframes oc-blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        .oc-live-dot2 { display:inline-block;width:5px;height:5px;border-radius:50%;background:${leaf};animation:oc-blink 1.8s infinite; }

        /* hero bg grid (dark) */
        .oc-hero-grid {
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);
          background-size:80px 80px;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%);
        }

        /* light hero cards */
        .oc-hcard{position:absolute;background:white;border-radius:16px;box-shadow:0 4px 40px rgba(28,21,16,.1);overflow:hidden;border:1px solid rgba(214,207,194,.6);transition:transform .4s ease,box-shadow .4s ease;}
        .oc-hcard:hover{box-shadow:0 12px 60px rgba(28,21,16,.18);}
        .oc-hc1{width:min(320px,85vw);top:40px;left:0;transform:rotate(-2deg);z-index:3;} .oc-hc1:hover{transform:rotate(0) translateY(-8px);}
        .oc-hc2{width:min(280px,75vw);top:0;right:0;transform:rotate(1.5deg);z-index:2;} .oc-hc2:hover{transform:rotate(0) translateY(-6px);}
        .oc-hc3{width:min(200px,55vw);bottom:20px;right:20px;transform:rotate(-1deg);z-index:4;} .oc-hc3:hover{transform:rotate(0) translateY(-4px);}

        /* trader card hover */
        .oc-tc{transition:border-color .3s,background .3s,transform .3s;}
        .oc-tc:hover{border-color:rgba(192,57,43,0.4)!important;background:${isDark?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.06)"}!important;transform:translateY(-5px);}

        /* ghost arrow btn */
        .oc-ghost-arrow::after{content:'→';transition:transform .2s;}
        .oc-ghost-arrow:hover::after{transform:translateX(4px);}

        /* step/bento hover */
        .oc-step:hover{background:${isDark?"rgba(255,255,255,0.04)":"#ede8de"};border-color:${rust}!important;}
        .oc-bc:hover{background:${isDark?"rgba(255,255,255,0.06)":"white"};border-color:${isDark?"rgba(255,255,255,0.14)":"#c9bfb2"}!important;}

        /* nav link hover */
        .oc-navlink:hover{color:${isDark?cream:dark}!important;}

        /* product card dark */
        .oc-trader-item{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:1rem;padding:.85rem .9rem;border-radius:10px;transition:background .2s;cursor:pointer;}
        .oc-trader-item:hover{background:rgba(255,255,255,0.04);}

        /* footer link */
        .oc-flink{font-size:.78rem;font-weight:600;color:rgba(245,240,232,.3);text-decoration:none;transition:color .2s;letter-spacing:.04em;}
        .oc-flink:hover{color:${cream};}
        .oc-lflink{font-size:.78rem;font-weight:500;color:${bark};text-decoration:none;transition:color .2s;letter-spacing:.04em;}
        .oc-lflink:hover{color:${dark};}

        /* CTA ghost btn */
        .oc-cta-ghost{border:1px solid rgba(255,255,255,.2);color:rgba(245,240,232,.6);padding:1rem 2.5rem;font-size:.85rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border-radius:4px;transition:border-color .2s,color .2s;display:inline-block;}
        .oc-cta-ghost:hover{border-color:rgba(255,255,255,.5);color:${cream};}

        /* int pill */
        .oc-pill{border:1px solid ${isDark?"rgba(255,255,255,.1)":"rgba(74,63,53,.2)"};padding:.3rem .9rem;border-radius:100px;font-size:.75rem;font-weight:600;color:${isDark?"rgba(245,240,232,.45)":bark};transition:border-color .2s,color .2s;}
        .oc-pill:hover{border-color:rgba(192,57,43,.5);color:${isDark?cream:dark};}

        /* show only on mobile (hamburger) */
        .oc-show-mobile{display:none;}

        /* responsive */
        @media(max-width:1024px){.oc-hero-grid{display:none;}}
        @media(max-width:900px){
          .oc-bento{grid-template-columns:1fr 1fr!important;}
          .oc-bento-a,.oc-bento-b{grid-column:1/-1!important;}
          .oc-bento-c,.oc-bento-d,.oc-bento-e{grid-column:span 1!important;}
        }
        @media(max-width:768px){
          .oc-hide-mobile{display:none!important;}
          .oc-show-mobile{display:flex!important;}
          .oc-hero-cols{grid-template-columns:1fr!important;padding-bottom:3rem!important;}
          .oc-hero-right{min-height:420px!important;padding-top:0!important;}
          .oc-hc1{width:min(270px,72vw)!important;top:20px!important;left:0!important;}
          .oc-hc2{width:min(230px,60vw)!important;top:0!important;right:0!important;}
          .oc-hc3{width:min(150px,40vw)!important;bottom:10px!important;right:10px!important;}
          .oc-bento{grid-template-columns:1fr!important;}
          .oc-bento-a,.oc-bento-b,.oc-bento-c,.oc-bento-d,.oc-bento-e{grid-column:1/-1!important;}
          .oc-testi{grid-template-columns:1fr!important;}
          .oc-testi-quote{font-size:clamp(1.3rem,5vw,1.8rem)!important;}
          .oc-footer{grid-template-columns:1fr!important;gap:2rem!important;justify-items:center;}
          .oc-footer-links{justify-content:center!important;}
          .oc-trader-item{grid-template-columns:auto 1fr auto!important;}
          .oc-stats-strip{gap:1.5rem!important;flex-wrap:wrap;}
        }
        @media(max-width:480px){
          .oc-hero-right{min-height:340px!important;}
          .oc-hc1{width:min(220px,80vw)!important;}
          .oc-hc2{width:min(185px,66vw)!important;}
          .oc-hc3{width:min(135px,44vw)!important;}
        }

        /* footer two-col → one-col on mobile */
        @media(max-width:640px){
          .oc-footer-top{grid-template-columns:1fr!important;}
        }

        /* ── dark mode: hero cards blend with the dark surface ── */
        .dark .oc-hcard{background:rgba(30,22,16,0.88)!important;border-color:rgba(255,255,255,0.09)!important;box-shadow:0 4px 32px rgba(0,0,0,0.45)!important;}
        .dark .oc-hcard-border{border-color:rgba(255,255,255,0.07)!important;}

        /* ── stats grid responsive ── */
        .oc-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);}
        @media(max-width:520px){
          .oc-stats-grid{grid-template-columns:1fr!important;}
          .oc-stats-grid>div{border-right:none!important;border-bottom:1px solid rgba(139,124,106,.15);}
          .oc-stats-grid>div:last-child{border-bottom:none;}
        }

        /* ── integrates badge: show only 1 platform on small screens ── */
        @media(max-width:520px){
          .oc-int-platforms>span:not(:first-child){display:none!important;}
        }

        /* ── hero card stack: keep all cards on small screens ── */
        @media(max-width:480px){
          .oc-hero-right{min-height:440px!important;}
          .oc-hc1{width:min(220px,78vw)!important;}
          .oc-hc2{width:min(185px,64vw)!important;}
          .oc-hc3{width:min(130px,40vw)!important;}
        }
      `}</style>

      {/* cursor */}
      <div ref={dotRef}  className="oc-dot" />
      <div ref={ringRef} className="oc-ring" />
      {/* noise */}
      <div className="oc-noise" aria-hidden />


      {/* ════════════════════════ NAVBAR ════════════════════════ */}
      <nav className="bg-[rgba(245,240,232,0.92)] dark:bg-[rgba(18,14,10,0.88)]" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:600, height:66,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 clamp(1.2rem,4vw,3.5rem)",
        backdropFilter:"blur(20px) saturate(1.4)",
        borderBottom:`1px solid ${border}`,
      }}>
        {/* brand */}
        <OCLogo size="md" />

        {/* centre links — desktop */}
        <div className="oc-hide-mobile" style={{ display:"flex", gap:"2.5rem", alignItems:"center" }}>
          {["#how","#features","#traders","#pricing"].map((h, i) => (
            <a key={h} href={h} className="oc-navlink" style={{ fontSize:".8rem", fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", color: isDark ? "rgba(245,240,232,.4)" : bark, textDecoration:"none", transition:"color .2s" }}>
              {["How It Works","Features","Traders","Pricing"][i]}
            </a>
          ))}
        </div>

        {/* right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          {/* theme toggle */}
          <button onClick={() => setTheme(isDark ? "light" : "dark")}
            style={{ width:36, height:36, borderRadius:"50%", border:`1px solid ${border}`, background:"transparent", color:fg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .2s", flexShrink:0 }}>
            {mounted ? (isDark ? <Sun size={15}/> : <Moon size={15}/>) : <Moon size={15}/>}
          </button>
          <Link href="/login" className="oc-hide-mobile oc-navlink" style={{ fontSize:".8rem", fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", color: isDark ? "rgba(245,240,232,.4)" : bark, textDecoration:"none" }}>
            Sign In
          </Link>
          <Link href="/register" className="oc-hide-mobile" style={{ background:rust, color:"white", padding:".55rem 1.4rem", borderRadius:6, fontSize:".78rem", fontWeight:800, letterSpacing:".08em", textTransform:"uppercase", textDecoration:"none", boxShadow:"0 2px 14px rgba(192,57,43,.4)", transition:"background .2s,transform .15s", flexShrink:0 }}
            onMouseEnter={e=>(e.currentTarget.style.background="#a93226")} onMouseLeave={e=>(e.currentTarget.style.background=rust)}>
            Get Started
          </Link>
          {/* hamburger */}
          <button onClick={()=>setMobileOpen(o=>!o)} style={{ background:"transparent", border:"none", color:fg, cursor:"pointer", padding:4 }}
            className="oc-show-mobile" aria-label="menu">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </nav>

      {/* mobile nav overlay */}
      {mobileOpen && (
        <div className="bg-[#f5f0e8] dark:bg-[#120e0a]" style={{ position:"fixed", inset:0, zIndex:500, paddingTop:72, display:"flex", flexDirection:"column", alignItems:"center", gap:0, overflowY:"auto" }}>
          <div style={{ width:"100%", maxWidth:360, padding:"1.5rem 2rem", display:"flex", flexDirection:"column", gap:0 }}>
            {[["#how","How It Works"],["#features","Features"],["#traders","Traders"],["#pricing","Pricing"]].map(([h,l]) => (
              <a key={h} href={h} onClick={()=>setMobileOpen(false)} style={{ fontSize:"1rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:fg, textDecoration:"none", padding:"1rem 0", borderBottom:`1px solid ${border}` }}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ width:"100%", maxWidth:360, padding:"1.5rem 2rem", display:"flex", flexDirection:"column", gap:".8rem" }}>
            <Link href="/login" onClick={()=>setMobileOpen(false)} style={{ width:"100%", textAlign:"center", border:`1px solid ${border}`, color:fg, padding:".9rem", borderRadius:6, fontSize:".85rem", fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", textDecoration:"none", transition:"border-color .2s" }}>
              Sign In
            </Link>
            <Link href="/register" onClick={()=>setMobileOpen(false)} style={{ width:"100%", textAlign:"center", background:rust, color:"white", padding:".9rem", borderRadius:6, fontSize:".85rem", fontWeight:800, letterSpacing:".08em", textTransform:"uppercase", textDecoration:"none", boxShadow:"0 2px 14px rgba(192,57,43,.4)" }}>
              Get Started
            </Link>
          </div>
        </div>
      )}


      <main style={{ paddingTop:10 }}>

        {/* ════════════════════════ HERO ════════════════════════ */}
        <section style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}>

          {/* atmospheric background */}
          <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}>
            {isDark && <div className="oc-hero-grid" />}
            {isDark && <>
              <div className="oc-glow1" style={{ position:"absolute", width:700, height:700, borderRadius:"50%", top:-200, right:-100, background:"radial-gradient(circle,rgba(155,44,44,.22) 0%,transparent 65%)" }}/>
              <div className="oc-glow2" style={{ position:"absolute", width:500, height:500, borderRadius:"50%", bottom:-100, left:"5%", background:"radial-gradient(circle,rgba(183,134,12,.1) 0%,transparent 65%)" }}/>
            </>}
          </div>

          {/* watermark */}
          <div aria-hidden style={{ position:"absolute", bottom:"-3rem", left:"-1rem", fontFamily:"var(--oc-serif),'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"22vw", fontWeight:300, lineHeight:1, color:"transparent", WebkitTextStroke:`1px ${isDark?"rgba(255,255,255,.035)":"rgba(74,63,53,.07)"}`, pointerEvents:"none", whiteSpace:"nowrap", userSelect:"none", letterSpacing:"-.03em" }}>
            {isDark ? "Grow" : "Grow"}
          </div>

          {/* hero content */}
          <div style={{ position:"relative", zIndex:1, maxWidth:1320, margin:"0 auto", width:"100%", padding:"clamp(6rem,12vw,140px) clamp(1.2rem,4vw,3.5rem) clamp(4rem,7vw,7rem)", display:"grid", gridTemplateColumns:"clamp(300px,50%,620px) 1fr", gap:"clamp(2rem,5vw,5rem)", alignItems:"flex-start", flex:1 }} className="oc-reveal oc-hero-cols">

            {/* left */}
            <div>
              {/* Integrates-with cycling badge — group of platforms, compact single line */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:".5rem", border:"1px solid rgba(139,124,106,.18)", background:"rgba(139,124,106,.07)", backdropFilter:"blur(12px)", padding:".38rem .85rem", borderRadius:100, marginBottom:"2.5rem", maxWidth:"100%", flexWrap:"nowrap", overflow:"hidden" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", flexShrink:0, animation:"oc-pulse 1.8s ease-in-out infinite" }}/>
                <span className="oc-mono" style={{ fontSize:".56rem", letterSpacing:".07em", color:muted, whiteSpace:"nowrap", flexShrink:0 }}>Integrates with</span>
                <span className="oc-int-platforms" style={{ display:"flex", alignItems:"center", gap:".3rem", transition:"opacity .35s,transform .35s", opacity: intFade ? 0 : 1, transform: intFade ? "translateY(5px)" : "translateY(0)", overflow:"hidden" }}>
                  {INT_GROUPS[intIdx].map((p, i) => (
                    <span key={p} style={{ display:"inline-flex", alignItems:"center", gap:".3rem" }}>
                      <span className="oc-mono" style={{ fontSize:".56rem", fontWeight:700, color:fg, whiteSpace:"nowrap" }}>{p}</span>
                      {i < INT_GROUPS[intIdx].length - 1 && <span style={{ color:muted, fontSize:".65rem", lineHeight:1 }}>·</span>}
                    </span>
                  ))}
                </span>
              </div>

              <h1 className="oc-serif" style={{ fontSize:"clamp(3.8rem,6.5vw,7.5rem)", fontWeight:300, lineHeight:.96, letterSpacing:"-.025em", color: isDark ? cream : dark, marginBottom:"2rem" }}>
                {isDark ? (
                  <>Trade Like<br/><em style={{ color:rust, fontStyle:"italic" }}>the Best</em><br/><span style={{ color: isDark ? "rgba(245,240,232,.35)":"rgba(28,21,16,.35)" }}>on Earth.</span></>
                ) : (
                  <>Trade<br/>Like the<br/><em style={{ color:rust, fontStyle:"italic" }}>Very Best.</em></>
                )}
              </h1>

              <p style={{ fontSize:"1.05rem", color:muted, lineHeight:1.75, maxWidth:440, marginBottom:"3rem", fontWeight:500 }}>
                Mirror real-time stock and options trades from top-performing traders. Precision, flexibility, and transparency — straight to your fingertips.
              </p>

              <div style={{ display:"flex", gap:"1.2rem", alignItems:"center", marginBottom:"4rem", flexWrap:"wrap" }}>
                <Link href="/register" style={{ background:isDark?rust:dark, color: isDark?"white":cream, padding:"1rem 2.5rem", fontSize:".85rem", fontWeight: isDark?800:700, letterSpacing:".08em", textTransform:"uppercase", textDecoration:"none", borderRadius: isDark?6:2, boxShadow: isDark?"0 4px 18px rgba(192,57,43,.4)":"none", transition:"background .22s,transform .15s", display:"inline-block" }}
                  onMouseEnter={e=>(e.currentTarget.style.background=isDark?"#a93226":rust)} onMouseLeave={e=>(e.currentTarget.style.background=isDark?rust:dark)}>
                  Start Copying Now
                </Link>
                <a href="#traders" className="oc-ghost-arrow" style={{ background:"none", border:"none", padding:0, color:isDark?bark:bark+"cc", fontSize:".85rem", fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", display:"inline-flex", alignItems:"center", gap:".5rem", cursor:"pointer", textDecoration:"none", transition:"color .2s" }}>
                  View Expert Traders
                </a>
              </div>

            </div>

            {/* right: card stack (always shown) */}
            <div className="oc-hero-right" style={{ position:"relative", paddingTop:"clamp(1rem,3vw,3rem)", display:"flex", alignItems:"flex-start", justifyContent:"center", minHeight:520 }}>
              {(
                /* ── card stack ── */
                <div style={{ position:"relative", width:"100%", height:520, flexShrink:0 }}>
                  {/* card 1 — trader */}
                  <div className="oc-hcard oc-hc1">
                    <div className="oc-hcard-border" style={{ padding:"1.2rem 1.4rem", borderBottom:"1px solid rgba(74,63,53,.12)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".12em", textTransform:"uppercase", color:muted }}>Top Trader · Options</span>
                      <span style={{ display:"flex", alignItems:"center", gap:".4rem", fontFamily:"var(--oc-mono)", fontSize:".58rem", color:leaf }}>
                        <span className="oc-live-dot2"/>Live
                      </span>
                    </div>
                    <div style={{ padding:"1.4rem" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:".9rem", marginBottom:"1.2rem" }}>
                        <img src="https://i.pravatar.cc/150?img=11" alt="Jake Reynolds" style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", display:"block" }}/>
                        <div><div style={{ fontWeight:800, fontSize:".95rem", color:fg }}>Jake Reynolds</div><div style={{ fontSize:".72rem", color:muted, marginTop:".1rem" }}>Options Specialist · 847 followers</div></div>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1rem" }}>
                        <div className="oc-serif" style={{ fontSize:"3.2rem", fontWeight:600, color:leaf, lineHeight:1 }}>+182%</div>
                        <div style={{ textAlign:"right" }}><span className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".1em", color:muted, textTransform:"uppercase", display:"block" }}>12-Month<br/>Return</span></div>
                      </div>
                      <div className="oc-hcard-border" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".5rem", paddingTop:"1rem", borderTop:"1px solid rgba(74,63,53,.12)" }}>
                        {[["74%","Win Rate"],["1,204","Trades"],["−8.2%","Max DD"]].map(([v,l]) => (
                          <div key={l}><div style={{ fontWeight:800, fontSize:".88rem", color:fg }}>{v}</div><div className="oc-mono" style={{ fontSize:".55rem", color:muted, textTransform:"uppercase", letterSpacing:".08em", marginTop:".1rem" }}>{l}</div></div>
                        ))}
                      </div>
                      <button style={{ width:"100%", marginTop:"1rem", background:rust, color:"white", border:"none", padding:".75rem", borderRadius:6, fontFamily:"var(--oc-sans)", fontWeight:700, fontSize:".8rem", letterSpacing:".08em", textTransform:"uppercase", cursor:"pointer", transition:"background .2s" }}
                        onMouseEnter={e=>(e.currentTarget.style.background="#a93226")} onMouseLeave={e=>(e.currentTarget.style.background=rust)}>
                        Copy This Trader
                      </button>
                    </div>
                  </div>

                  {/* card 2 — chart */}
                  <div className="oc-hcard oc-hc2">
                    <div className="oc-hcard-border" style={{ padding:"1.2rem 1.4rem", borderBottom:"1px solid rgba(74,63,53,.12)" }}>
                      <span className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".12em", textTransform:"uppercase", color:muted }}>Portfolio Performance</span>
                    </div>
                    <div style={{ padding:"1.2rem 1.4rem", height:120, position:"relative", overflow:"hidden" }}>
                      <svg width="100%" height="100%" viewBox="0 0 260 100" preserveAspectRatio="none">
                        <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={leaf} stopOpacity=".25"/><stop offset="100%" stopColor={leaf} stopOpacity="0"/></linearGradient></defs>
                        <path d="M0,80 L20,72 L40,75 L60,60 L80,55 L100,42 L120,38 L140,30 L160,25 L180,18 L200,12 L220,8 L240,5 L260,2" fill="none" stroke={leaf} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M0,80 L20,72 L40,75 L60,60 L80,55 L100,42 L120,38 L140,30 L160,25 L180,18 L200,12 L220,8 L240,5 L260,2 L260,100 L0,100 Z" fill="url(#cg)"/>
                      </svg>
                    </div>
                    <div style={{ padding:"0 1.4rem 1rem" }}><span className="oc-mono" style={{ fontSize:".55rem", color:muted, textTransform:"uppercase", letterSpacing:".1em" }}>Account Growth · Last 12 Months</span></div>
                  </div>

                  {/* card 3 — stat */}
                  <div className="oc-hcard oc-hc3">
                    <div style={{ padding:"1.4rem" }}>
                      <div className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".12em", textTransform:"uppercase", color:muted, marginBottom:".5rem" }}>Avg Fill Rate</div>
                      <div className="oc-serif" style={{ fontSize:"2.8rem", fontWeight:600, color:leaf, lineHeight:1 }}>97%</div>
                      <div style={{ fontSize:".72rem", color:muted, marginTop:".3rem" }}>Real-time mirroring</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </section>


        {/* ════════════════════════ MARQUEE ════════════════════════ */}
        <div style={{ overflow:"hidden", whiteSpace:"nowrap", background: isDark ? darker : dark, borderTop:`1px solid ${isDark?"rgba(255,255,255,.05)":"rgba(255,255,255,.04)"}`, borderBottom:`1px solid ${isDark?"rgba(255,255,255,.05)":"rgba(255,255,255,.04)"}`, padding:".85rem 0" }}>
          <div className="oc-mq-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:".6rem" }}>
                <span className="oc-mono" style={{ fontSize:".7rem", letterSpacing:".05em", color:"rgba(245,240,232,.4)" }}>
                  {item.s} <span style={{ color: item.up ? "#4ade80" : "#f87171" }}>{item.up?"↑":"↓"} {item.c}</span>
                </span>
                {i < MARQUEE.length*2-1 && <span style={{ color:"rgba(245,240,232,.1)", fontSize:".8rem" }}>·</span>}
              </span>
            ))}
          </div>
        </div>


        {/* ════════════════════════ STATS ════════════════════════ */}
        <section style={{ maxWidth:1320, margin:"0 auto", padding:"clamp(4rem,7vw,7rem) clamp(1.2rem,4vw,3.5rem)" }}>
          <div className="oc-reveal" style={{ textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"1rem", marginBottom:"3.5rem" }}>
              <div style={{ width:44, height:44, borderRadius:"50%", background: isDark?"rgba(192,57,43,.15)":"rgba(192,57,43,.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={rust} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <span className="oc-serif" style={{ fontSize:"clamp(1.5rem,2.5vw,2.8rem)", fontWeight:300, color:fg, letterSpacing:"-.01em" }}>Globally Regulated</span>
            </div>
            <div className="oc-stats-grid" style={{ border:`1px solid ${border}`, borderRadius:12, overflow:"hidden", maxWidth:860, margin:"0 auto", background:surf }}>
              {[["32K+","Active Traders"],["$150M+","Total Volume"],["10M+","Users"]].map(([v,l],i) => (
                <div key={i} style={{ padding:"clamp(1.2rem,3vw,2.5rem) clamp(.75rem,2vw,1.5rem)", textAlign:"center", borderRight: i<2?`1px solid ${border}`:undefined }}>
                  <span className="oc-serif" style={{ display:"block", fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:300, color:rust, lineHeight:1 }}>{v}</span>
                  <span className="oc-mono" style={{ display:"block", fontSize:".6rem", color:muted, textTransform:"uppercase", letterSpacing:".1em", marginTop:".5rem" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════ HOW IT WORKS ════════════════════════ */}
        <section id="how" style={{ maxWidth:1320, margin:"0 auto", padding:"clamp(5rem,9vw,9rem) clamp(1.2rem,4vw,3.5rem)" }}>
          <div className="oc-reveal">
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted }}>How It Works</span>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:fg, maxWidth:620, marginTop:".5rem" }}>
              Three steps.<br/><em style={{ color:rust }}>Zero complexity.</em>
            </h2>
            {!isDark && <p style={{ fontSize:"1rem", color:bark, lineHeight:1.75, maxWidth:500, marginBottom:"5rem", fontWeight:500, marginTop:"1.2rem" }}>No manual trades. No order entry. Just register, pick a trader, and every move mirrors instantly.</p>}
          </div>

          <div className="oc-reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:1, background:`1px solid ${border}`, border:`1px solid ${isDark?"rgba(255,255,255,.06)":border}`, borderRadius:14, overflow:"hidden", marginTop: isDark?"5rem":"0" }}>
            {[
              { n:"01", icon:<Link2 size={26}/>, title:"Setting Up your Account",    body:"Create your free account in under 2 minutes. Sign up with your email, verify your identity, and you're ready to start copy trading." },
              { n:"02", icon:<Target size={26}/>, title:"Choose Expert Traders",  body:"Browse 340+ verified performers filtered by return, drawdown, win rate, and strategy. Every trader is fully audited — no black boxes." },
              { n:"03", icon:<Zap size={26}/>,    title:"Trades Mirror Instantly", body:"The moment a trade fires, your account mirrors proportionally. Zero delay. Complete control to pause or stop anytime." },
            ].map((step, i) => (
              <div key={i} className="oc-step" style={{ background: isDark ? darker : "white", padding:"3rem 2.5rem", position:"relative", borderRight: i<2 ? `1px solid ${isDark?"rgba(255,255,255,.06)":border}` : undefined, transition:"background .3s,border-color .3s" }}>
                <span className="oc-serif" style={{ fontStyle:"italic", fontSize:"5rem", fontWeight:300, lineHeight:1, color: isDark?"rgba(255,255,255,.04)":"rgba(139,124,106,.12)", display:"block", marginBottom:"1.5rem" }}>{step.n}</span>
                <div style={{ marginBottom:"1.2rem", color:rust }}>{step.icon}</div>
                <div className="oc-serif" style={{ fontSize:"1.5rem", color:fg, marginBottom:".8rem", lineHeight:1.2 }}>{step.title}</div>
                <p style={{ fontSize:".9rem", color:muted, lineHeight:1.7, fontWeight:500 }}>{step.body}</p>
                {i<2 && <div style={{ position:"absolute", right:-1, top:"50%", transform:"translateY(-50%)", color: isDark?"rgba(255,255,255,.08)":"rgba(139,124,106,.25)", fontSize:"1rem" }}>→</div>}
              </div>
            ))}
          </div>
        </section>


        {/* ════════════════════════ WHY CHOOSE US ════════════════════════ */}
        <section style={{ maxWidth:1320, margin:"0 auto", padding:"0 clamp(1.2rem,4vw,3.5rem) clamp(5rem,9vw,9rem)" }}>
          <div className="oc-reveal" style={{ marginBottom:"4rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted }}>The Problem &amp; Solution</span>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:fg, maxWidth:540, marginTop:".5rem" }}>
              You should<br/><em style={{ color:rust }}>know this.</em>
            </h2>
          </div>
          <div className="oc-reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
            {/* Challenge */}
            <div style={{ border:`1px solid ${isDark?"rgba(239,68,68,.18)":"rgba(239,68,68,.25)"}`, background: isDark?"rgba(239,68,68,.04)":"rgba(254,242,242,.7)", borderRadius:14, padding:"2.5rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-60, right:-60, width:160, height:160, borderRadius:"50%", background:"rgba(239,68,68,.06)", pointerEvents:"none" }}/>
              <div style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background: isDark?"rgba(239,68,68,.12)":"#fee2e2", padding:".3rem .9rem", borderRadius:100, marginBottom:"1.5rem" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", flexShrink:0 }}/>
                <span className="oc-mono" style={{ fontSize:".6rem", letterSpacing:".1em", textTransform:"uppercase", color:"#ef4444" }}>The Challenge</span>
              </div>
              <div className="oc-serif" style={{ fontSize:"1.5rem", color:fg, marginBottom:"1rem", lineHeight:1.2 }}>Studying the market<br/>takes time</div>
              <p style={{ fontSize:".9rem", color:muted, lineHeight:1.75, fontWeight:500 }}>Building and maintaining a trading strategy is hard. Options require timing, strategy, and discipline. Only 11–26% of manual investors succeed on their own. With OrchardCapitals, you can replicate successful trades from seasoned options traders to tilt the odds in your favor.</p>
            </div>
            {/* Solution */}
            <div style={{ border:`1px solid ${isDark?"rgba(34,197,94,.18)":"rgba(34,197,94,.25)"}`, background: isDark?"rgba(34,197,94,.04)":"rgba(240,253,244,.7)", borderRadius:14, padding:"2.5rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-60, right:-60, width:160, height:160, borderRadius:"50%", background:"rgba(34,197,94,.06)", pointerEvents:"none" }}/>
              <div style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background: isDark?"rgba(34,197,94,.12)":"#dcfce7", padding:".3rem .9rem", borderRadius:100, marginBottom:"1.5rem" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", flexShrink:0 }}/>
                <span className="oc-mono" style={{ fontSize:".6rem", letterSpacing:".1em", textTransform:"uppercase", color:"#22c55e" }}>The Solution</span>
              </div>
              <div className="oc-serif" style={{ fontSize:"1.5rem", color:fg, marginBottom:"1rem", lineHeight:1.2 }}>Beat the odds with<br/><em style={{ color: isDark?"#4ade80":leaf }}>Copy Trading</em></div>
              <p style={{ fontSize:".9rem", color:muted, lineHeight:1.75, fontWeight:500, marginBottom:"1.8rem" }}>Proven success rate: over 73% of investors generate profits by copying top leaders — especially in dynamic options markets.</p>
              <Link href="/register" style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background:rust, color:"white", padding:".75rem 1.8rem", borderRadius:6, fontSize:".8rem", fontWeight:800, letterSpacing:".07em", textTransform:"uppercase", textDecoration:"none", boxShadow:"0 2px 14px rgba(192,57,43,.35)" }}>
                Start Copy Trading
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
        </section>


        {/* ════════════════════════ FEATURES BENTO ════════════════════════ */}
        <section id="features" style={{ maxWidth:1320, margin:"0 auto", padding:"0 clamp(1.2rem,4vw,3.5rem) clamp(5rem,9vw,9rem)" }}>
          <div className="oc-reveal">
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted }}>Platform Features</span>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:fg, maxWidth:580, marginTop:".5rem" }}>
              {isDark ? <>Everything you need.<br/><em style={{ color:rust }}>Nothing you don't.</em></> : <>Built for <em style={{ color:rust }}>serious</em> investors.</>}
            </h2>
          </div>

          <div className="oc-reveal oc-bento" style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gridTemplateRows:"auto auto", gap:"1.5rem", marginTop:"5rem" }}>
            {/* A — spans 7 */}
            <div className="oc-bc oc-bento-a" style={{ gridColumn:"span 7", border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2.5rem", transition:"background .3s,border-color .3s", overflow:"hidden", position:"relative" }}>
              <div className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:muted, marginBottom:"1rem" }}>Execution Engine</div>
              <div className="oc-serif" style={{ fontSize:"1.7rem", color:fg, marginBottom:".8rem", lineHeight:1.15 }}>Real-Time Copy.<br/><em style={{ color:rust }}>Zero Delay.</em></div>
              <p style={{ fontSize:".88rem", color:muted, lineHeight:1.7, fontWeight:500 }}>Trades execute in your account the millisecond they trigger. Proprietary order routing ensures fills within 0.01% of the original trade. Not lagged. Not approximated.</p>
              <span style={{ display:"inline-block", marginTop:"1.2rem", border:`1px solid ${isDark?"rgba(58,107,53,.4)":"rgba(58,107,53,.3)"}`, padding:".2rem .8rem", borderRadius:100, fontFamily:"var(--oc-mono)", fontSize:".58rem", letterSpacing:".1em", color:"#4ade80" }}>0ms LATENCY</span>
            </div>
            {/* B — spans 5 */}
            <div className="oc-bc oc-bento-b" style={{ gridColumn:"span 5", border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2.5rem", transition:"background .3s,border-color .3s", position:"relative", overflow:"hidden" }}>
              <div className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:muted, marginBottom:"1rem" }}>Compliance & Security</div>
              <div className="oc-serif" style={{ fontSize:"1.7rem", color:fg, marginBottom:".8rem", lineHeight:1.15 }}>Fully <em style={{ color:rust }}>Regulated.</em><br/>Always Audited.</div>
              <p style={{ fontSize:".88rem", color:muted, lineHeight:1.7, fontWeight:500 }}>Compliant across major global jurisdictions. Your funds never leave your own brokerage. We only copy signals — we never hold your capital.</p>
              <span style={{ display:"inline-block", marginTop:"1.2rem", border:`1px solid ${isDark?"rgba(58,107,53,.4)":"rgba(58,107,53,.3)"}`, padding:".2rem .8rem", borderRadius:100, fontFamily:"var(--oc-mono)", fontSize:".58rem", letterSpacing:".1em", color:"#4ade80" }}>GLOBALLY REGULATED</span>
            </div>
            {/* C — spans 4 */}
            <div className="oc-bc oc-bento-c" style={{ gridColumn:"span 4", border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2.5rem", transition:"background .3s,border-color .3s" }}>
              <div style={{ marginBottom:"1.5rem", color:rust }}><BarChart2 size={28}/></div>
              <div className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:muted, marginBottom:"1rem" }}>Analytics</div>
              <div className="oc-serif" style={{ fontSize:"1.7rem", color:fg, marginBottom:".8rem", lineHeight:1.15 }}>Deep Trader<br/><em style={{ color:rust }}>Analytics</em></div>
              <p style={{ fontSize:".88rem", color:muted, lineHeight:1.7, fontWeight:500 }}>24 months of audited live performance per trader. Sharpe ratio, drawdown, win rate, full trade history — all public.</p>
            </div>
            {/* D — spans 4, centered stat */}
            <div className="oc-bc oc-bento-d" style={{ gridColumn:"span 4", border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2.5rem", transition:"background .3s,border-color .3s", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
              <div className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:muted, marginBottom:"1rem" }}>Active Copiers</div>
              <div className="oc-serif" style={{ fontSize:"5rem", fontWeight:300, color:fg, lineHeight:1, letterSpacing:"-.03em" }}>212<span style={{ color:rust }}>K+</span></div>
              <p style={{ fontSize:".85rem", color:muted, marginTop:".5rem", fontWeight:500 }}>investors worldwide</p>
            </div>
            {/* E — spans 4 */}
            <div className="oc-bc oc-bento-e" style={{ gridColumn:"span 4", border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2.5rem", transition:"background .3s,border-color .3s" }}>
              <div style={{ marginBottom:"1.5rem", color:rust }}><SlidersHorizontal size={28}/></div>
              <div className="oc-mono" style={{ fontSize:".58rem", letterSpacing:".15em", textTransform:"uppercase", color:muted, marginBottom:"1rem" }}>Risk Controls</div>
              <div className="oc-serif" style={{ fontSize:"1.7rem", color:fg, marginBottom:".8rem", lineHeight:1.15 }}><em style={{ color:rust }}>You</em> Stay<br/>In Control</div>
              <p style={{ fontSize:".88rem", color:muted, lineHeight:1.7, fontWeight:500 }}>Max position size, daily loss limits, excluded instruments. Your parameters override the trader's — always.</p>
            </div>
          </div>
        </section>


        {/* ════════════════════════ WHAT YOU CAN COPY ════════════════════════ */}
        <section style={{ maxWidth:1320, margin:"0 auto", padding:"0 clamp(1.2rem,4vw,3.5rem) clamp(5rem,9vw,9rem)" }}>
          <div className="oc-reveal" style={{ marginBottom:"4rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted }}>Instruments</span>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:fg, maxWidth:540, marginTop:".5rem" }}>
              What you<br/>can <em style={{ color:rust }}>copy.</em>
            </h2>
          </div>
          <div className="oc-reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.5rem" }}>
            {[
              { icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>, title:"Stocks & ETFs", body:"Full-share orders or fractional allocations, instantaneous entry/exit mirroring, price-based T/P and S/L." },
              { icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>, title:"Single-Leg Options", body:"Replicate trade by trade: ticker, strike, expiry, premium, quantity, and timestamp. Calls and puts covered." },
              { icon:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3" fill="currentColor"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>, title:"Multi-Leg Strategies", body:"Copy complex structures as a single unit: verticals, iron condors, butterflies, calendars, ratio spreads." },
            ].map((item, i) => (
              <div key={i} className="oc-bc" style={{ border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2.5rem", textAlign:"center", transition:"background .3s,border-color .3s,transform .3s", cursor:"default" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)"}} onMouseLeave={e=>{e.currentTarget.style.transform="none"}}>
                <div style={{ width:52, height:52, borderRadius:14, background: isDark?"rgba(192,57,43,.1)":"rgba(192,57,43,.07)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", color:rust }}>
                  {item.icon}
                </div>
                <div className="oc-serif" style={{ fontSize:"1.4rem", color:fg, marginBottom:".8rem", lineHeight:1.15 }}>{item.title}</div>
                <p style={{ fontSize:".88rem", color:muted, lineHeight:1.7, fontWeight:500 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ════════════════════════ TRADERS ════════════════════════ */}
        <section id="traders" style={{ background: isDark ? "rgba(255,255,255,.02)" : dark, borderTop:`1px solid ${isDark?"rgba(255,255,255,.06)":"transparent"}`, borderBottom:`1px solid ${isDark?"rgba(255,255,255,.06)":"transparent"}` }}>
          <div style={{ maxWidth:1320, margin:"0 auto", padding:"clamp(5rem,9vw,9rem) clamp(1.2rem,4vw,3.5rem)" }}>
            <div className="oc-reveal">
              <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
                <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
                <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(245,240,232,.4)" }}>Expert Traders</span>
              </div>
              <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:cream, maxWidth:560, marginTop:".5rem" }}>
                Handpicked. Verified.<br/><em style={{ color:rust }}>Consistent.</em>
              </h2>
              <p style={{ fontSize:"1rem", color:"rgba(245,240,232,.4)", lineHeight:1.7, maxWidth:500, marginTop:"1.2rem", fontWeight:500 }}>Every trader passes a 6-month live performance review. No paper trading. No simulations. Real money, real results.</p>
            </div>

            <div className="oc-reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5rem", marginTop:"5rem" }}>
              {TRADERS.map((t) => (
                <div key={t.i} className="oc-tc" style={{ background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:"2rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:".9rem" }}>
                      <img src={t.img} alt={t.name} style={{ width:52, height:52, borderRadius:"50%", objectFit:"cover", display:"block" }}/>
                      <div><div style={{ fontWeight:800, fontSize:".95rem", color:cream }}>{t.name}</div><div style={{ fontSize:".7rem", color:"rgba(245,240,232,.4)", marginTop:".15rem" }}>{t.spec} · {t.followers}</div></div>
                    </div>
                    <span className="oc-mono" style={{ fontSize:".55rem", letterSpacing:".1em", textTransform:"uppercase", border:"1px solid rgba(192,57,43,.35)", color:rust, padding:".2rem .65rem", borderRadius:100 }}>{t.badge}</span>
                  </div>
                  <div className="oc-serif" style={{ fontSize:"4rem", fontWeight:300, color:"#4ade80", lineHeight:1, marginBottom:".2rem" }}>{t.ret}</div>
                  <div className="oc-mono" style={{ fontSize:".58rem", color:"rgba(245,240,232,.25)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"1.5rem" }}>12-Month Return</div>
                  <div style={{ height:2, background:"rgba(255,255,255,.06)", borderRadius:2, marginBottom:"1.5rem" }}>
                    <div style={{ height:2, background:`linear-gradient(90deg,${rust},#b7860c)`, borderRadius:2, width:t.bar }}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".5rem", marginBottom:"1.5rem" }}>
                    {[[t.wr,"Win Rate"],[t.tr,"Trades"],[t.dd,"Max DD"]].map(([v,l])=>(
                      <div key={String(l)}><div style={{ fontWeight:800, fontSize:".88rem", color:cream }}>{v}</div><div style={{ fontSize:".62rem", color:"rgba(245,240,232,.3)", textTransform:"uppercase", letterSpacing:".06em", marginTop:".1rem" }}>{l}</div></div>
                    ))}
                  </div>
                  <button style={{ width:"100%", background:"transparent", border:"1px solid rgba(255,255,255,.1)", color:cream, padding:".8rem", borderRadius:8, fontFamily:"var(--oc-sans)", fontWeight:800, fontSize:".78rem", letterSpacing:".08em", textTransform:"uppercase", cursor:"pointer", transition:"background .2s,border-color .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background=rust;e.currentTarget.style.borderColor=rust;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";}}>
                    Copy This Trader
                  </button>
                </div>
              ))}
            </div>

            <div className="oc-reveal" style={{ textAlign:"center", marginTop:"3.5rem", paddingTop:"3.5rem", borderTop:"1px solid rgba(255,255,255,.06)" }}>
              <Link href="/explore-traders" className="oc-ghost-arrow" style={{ fontFamily:"var(--oc-mono)", fontSize:".72rem", letterSpacing:".15em", textTransform:"uppercase", color:"rgba(245,240,232,.35)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:".6rem", transition:"color .2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color=cream)} onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,240,232,.35)")}>
                View all 340+ verified traders
              </Link>
            </div>
          </div>
        </section>


        {/* ════════════════════════ TESTIMONIAL ════════════════════════ */}
        <section style={{ borderTop:`1px solid ${border}` }}>
          <div className="oc-reveal oc-testi" style={{ maxWidth:1320, margin:"0 auto", padding:"clamp(5rem,9vw,9rem) clamp(1.2rem,4vw,3.5rem)", display:"grid", gridTemplateColumns:"1fr 2fr", gap:"clamp(3rem,7vw,7rem)", alignItems:"center" }}>
            <div>
              <div className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted, marginBottom:"1.5rem" }}>What Our Members Say</div>
              <div className="oc-serif" style={{ fontStyle:"italic", fontSize:"9rem", color: isDark?"rgba(255,255,255,.06)":bark+"33", lineHeight:.7 }}>"</div>
            </div>
            <div>
              <blockquote className="oc-serif oc-testi-quote" style={{ fontSize:"clamp(1.6rem,2.5vw,2.8rem)", fontWeight:300, lineHeight:1.35, color:fg, marginBottom:"2rem", letterSpacing:"-.01em" }}>
                "OrchardCapitals is the first platform that actually <em style={{ color:rust }}>delivers</em> on the promise of copy trading. The execution quality is unlike anything else I've used in twelve years of investing."
              </blockquote>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2.5rem" }}>
                <img src="https://i.pravatar.cc/150?img=33" alt="David R." style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", display:"block" }}/>
                <div><div style={{ fontWeight:800, fontSize:".95rem", color:fg }}>David R.</div><div style={{ fontSize:".75rem", color:muted, marginTop:".15rem" }}>Portfolio Manager · San Francisco</div></div>
              </div>
              <div style={{ display:"flex", gap:"3rem", paddingTop:"2.5rem", borderTop:`1px solid ${border}` }}>
                {[["+247%","Portfolio Return"],["18mo","On Platform"],["3","Traders Copied"]].map(([v,l])=>(
                  <div key={l}>
                    <span className="oc-serif" style={{ fontSize:"2rem", color: isDark?"#4ade80":leaf, display:"block", lineHeight:1 }}>{v}</span>
                    <span className="oc-mono" style={{ fontSize:".58rem", color:muted, textTransform:"uppercase", letterSpacing:".1em", marginTop:".3rem", display:"block" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════════════ FAQ ════════════════════════ */}
        <section style={{ maxWidth:900, margin:"0 auto", padding:"clamp(5rem,9vw,9rem) clamp(1.2rem,4vw,3.5rem)" }}>
          <div className="oc-reveal" style={{ textAlign:"center", marginBottom:"4rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem", justifyContent:"center" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted }}>FAQ</span>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:fg, marginTop:".5rem" }}>
              Your questions,<br/><em style={{ color:rust }}>answered.</em>
            </h2>
            <p style={{ fontSize:"1rem", color:muted, lineHeight:1.7, maxWidth:480, margin:"1.2rem auto 0", fontWeight:500 }}>Everything you need to know about copy trading on OrchardCapitals.</p>
          </div>
          <div className="oc-reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:"1rem" }}>
            {[
              { q:"Do I need trading experience?", a:"No trading experience is required. Our platform is designed for both beginners and experienced traders. You can start copying expert traders immediately and learn as you go." },
              { q:"Can I stop copying anytime?", a:"Yes, you have complete control. You can start or stop copying any trader at any time with just one click. There are no lock-in periods or penalties for stopping." },
              { q:"Is my money safe?", a:"Your funds are held in top-tier institutions and are completely secure. We use bank-level encryption and security measures. Your money remains in your own brokerage account — we never have direct access to your funds." },
              { q:"What is the minimum investment?", a:"The minimum investment varies depending on the trader you want to copy and your broker's requirements. Generally, you can start with as little as $500, but we recommend at least $1,000 for better diversification." },
            ].map((item, i) => (
              <div key={i} style={{ border:`1px solid ${faqOpen===i ? isDark?"rgba(192,57,43,.4)":"rgba(192,57,43,.35)" : border}`, background:surf, borderRadius:12, overflow:"hidden", transition:"border-color .25s" }}>
                <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.3rem 1.5rem", background:"transparent", border:"none", cursor:"pointer", color:fg, textAlign:"left", gap:"1rem" }}>
                  <span style={{ fontSize:".95rem", fontWeight:700, color: faqOpen===i ? rust : fg, transition:"color .2s", fontFamily:"var(--oc-sans)" }}>{item.q}</span>
                  <span style={{ width:26, height:26, borderRadius:"50%", border:`1px solid ${faqOpen===i?rust:isDark?"rgba(255,255,255,.12)":border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color: faqOpen===i?rust:muted, background: faqOpen===i? (isDark?"rgba(192,57,43,.12)":"rgba(192,57,43,.08)"):"transparent", transition:"all .2s", transform: faqOpen===i?"rotate(45deg)":"none" }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                  </span>
                </button>
                {faqOpen===i && (
                  <div style={{ padding:"0 1.5rem 1.3rem", borderTop:`1px solid ${isDark?"rgba(255,255,255,.06)":"rgba(74,63,53,.08)"}` }}>
                    <p style={{ fontSize:".88rem", color:muted, lineHeight:1.75, fontWeight:500, paddingTop:"1rem" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>


        {/* ════════════════════════ TRUST ════════════════════════ */}
        <section style={{ maxWidth:1320, margin:"0 auto", padding:"0 clamp(1.2rem,4vw,3.5rem) clamp(5rem,9vw,9rem)" }}>
          <div className="oc-reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1.2rem" }}>
            {[
              { icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>, title:"Social", body:"More than 35 million users globally" },
              { icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, title:"Reliable", body:"A leader in the fintech space since 2007" },
              { icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>, title:"Secured", body:"Bank-level encryption and security for client money and assets" },
              { icon:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, title:"Global", body:"Providing services around the world" },
            ].map((item, i) => (
              <div key={i} className="oc-bc" style={{ border:`1px solid ${border}`, background:surfEl, borderRadius:14, padding:"2rem", textAlign:"center", transition:"background .3s,border-color .3s,transform .3s", cursor:"default" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{ width:44, height:44, borderRadius:12, background: isDark?"rgba(192,57,43,.1)":"rgba(192,57,43,.07)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem", color:rust }}>
                  {item.icon}
                </div>
                <div style={{ fontWeight:800, fontSize:".95rem", color:fg, marginBottom:".5rem" }}>{item.title}</div>
                <p style={{ fontSize:".8rem", color:muted, lineHeight:1.65, fontWeight:500 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
        {/* ════════════════════════ MEMBER REVIEWS ════════════════════════ */}
        <section style={{ maxWidth:1320, margin:"0 auto", padding:"clamp(5rem,9vw,9rem) clamp(1.2rem,4vw,3.5rem)" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"3.5rem", textAlign:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1rem" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:muted }}>Member Reviews</span>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:300, lineHeight:1.03, letterSpacing:"-.02em", color:fg, marginTop:".5rem" }}>
              Trusted by<br/><em style={{ color:rust }}>real investors.</em>
            </h2>
          </div>

          <div style={{ position:"relative" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:"1.5rem" }}>
              {[
                REVIEWS[reviewIdx % REVIEWS.length],
                REVIEWS[(reviewIdx + 1) % REVIEWS.length],
                REVIEWS[(reviewIdx + 2) % REVIEWS.length],
              ].map((r, i) => (
                <div key={`${reviewIdx}-${i}`} className="oc-review-card" style={{ border:`1px solid ${border}`, background:surf, borderRadius:14, padding:"2rem", display:"flex", flexDirection:"column", gap:"1.2rem" }}>
                  <p style={{ fontSize:".9rem", color:muted, lineHeight:1.75, fontWeight:500, flexGrow:1 }}>&quot;{r.text}&quot;</p>
                  <div style={{ display:"flex", alignItems:"center", gap:".85rem", paddingTop:"1rem", borderTop:`1px solid ${border}` }}>
                    <img src={r.img} alt={r.name} style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", flexShrink:0 }}/>
                    <div>
                      <div style={{ fontWeight:800, fontSize:".9rem", color:fg }}>{r.name}</div>
                      <div className="oc-mono" style={{ fontSize:".6rem", color:muted, letterSpacing:".06em", marginTop:".15rem" }}>{r.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trustpilot star rating strip */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".75rem", marginTop:"2.5rem", paddingTop:"2.5rem", borderTop:`1px solid ${border}` }}>
              <img src="/trustpilot_images/star.svg" alt="Trustpilot 4.5 star rating" style={{ width:120, height:"auto", display:"block" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                <img src={isDark ? "/trustpilot_images/logo.svg" : "/trustpilot_images/logo_dark.svg"} alt="Trustpilot" style={{ height:18, display:"block" }}/>
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem", marginTop:"2rem" }}>
              <button
                onClick={() => setReviewIdx((reviewIdx - 1 + REVIEWS.length) % REVIEWS.length)}
                style={{ width:44, height:44, borderRadius:"50%", border:`1px solid ${border}`, background:surf, color:fg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"background .2s,border-color .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=rust;(e.currentTarget as HTMLButtonElement).style.borderColor=rust;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=surf;(e.currentTarget as HTMLButtonElement).style.borderColor=border;}}
                aria-label="Previous review">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                {REVIEWS.map((_,i) => (
                  <button key={i} onClick={() => setReviewIdx(i)} style={{ width: reviewIdx===i ? 20 : 6, height:6, borderRadius:3, background: reviewIdx===i ? rust : border, border:"none", cursor:"pointer", padding:0, transition:"width .25s,background .25s" }} aria-label={`Go to review ${i+1}`}/>
                ))}
              </div>
              <button
                onClick={() => setReviewIdx((reviewIdx + 1) % REVIEWS.length)}
                style={{ width:44, height:44, borderRadius:"50%", border:`1px solid ${border}`, background:surf, color:fg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"background .2s,border-color .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=rust;(e.currentTarget as HTMLButtonElement).style.borderColor=rust;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=surf;(e.currentTarget as HTMLButtonElement).style.borderColor=border;}}
                aria-label="Next review">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </section>




        {/* ════════════════════════ CTA ════════════════════════ */}
        <section style={{ position:"relative", overflow:"hidden", background: isDark ? darker : dark, borderTop:`1px solid ${isDark?"rgba(255,255,255,.06)":"transparent"}` }}>
          <div aria-hidden style={{ position:"absolute", bottom:"-3rem", left:"50%", transform:"translateX(-50%)", fontFamily:"var(--oc-serif)", fontStyle:"italic", fontSize:"28vw", fontWeight:300, lineHeight:1, color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.03)", pointerEvents:"none", whiteSpace:"nowrap", userSelect:"none" }}>
            Copy
          </div>
          <div className="oc-reveal" style={{ maxWidth:1320, margin:"0 auto", padding:"clamp(6rem,10vw,10rem) clamp(1.2rem,4vw,3.5rem)", textAlign:"center", position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:"1.5rem", justifyContent:"center" }}>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
              <span className="oc-mono" style={{ fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(245,240,232,.3)" }}>Begin your journey</span>
              <div style={{ width:32, height:1, background:rust, flexShrink:0 }}/>
            </div>
            <h2 className="oc-serif" style={{ fontSize:"clamp(3.5rem,7.5vw,9.5rem)", fontWeight:300, lineHeight:.95, letterSpacing:"-.025em", color:cream, marginBottom:"2.5rem" }}>
              Start Copying<br/><em style={{ color:rust }}>the Best.</em>
            </h2>
            <p style={{ fontSize:"1rem", color:"rgba(245,240,232,.45)", lineHeight:1.7, maxWidth:480, margin:"0 auto 3.5rem", fontWeight:500 }}>
              Join 300,000+ investors already mirroring the world's top traders. Setup takes under 5 minutes.
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/register" style={{ background:cream, color:dark, padding:"1.1rem 3rem", fontSize:".85rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", textDecoration:"none", borderRadius:4, transition:"background .2s,color .2s", display:"inline-block" }}
                onMouseEnter={e=>{e.currentTarget.style.background=rust;e.currentTarget.style.color=cream;}} onMouseLeave={e=>{e.currentTarget.style.background=cream;e.currentTarget.style.color=dark;}}>
                Create Free Account
              </Link>
              <a href="#traders" className="oc-cta-ghost">Browse Traders</a>
            </div>
          </div>
        </section>

      </main>


      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,.06)", background: isDark ? darker : dark, color:cream }}>
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"3.5rem clamp(1.2rem,4vw,3.5rem)" }}>

          {/* top: brand + link sections */}
          <div style={{ display:"grid", gridTemplateColumns:"minmax(200px,280px) 1fr", gap:"3rem", alignItems:"flex-start" }} className="oc-footer-top">
            {/* brand col */}
            <div>
              <OCLogo light size="md" />
              <p style={{ fontSize:".85rem", color:"rgba(245,240,232,.4)", lineHeight:1.65, fontWeight:500, marginTop:".6rem" }}>
                Copy trade with Orchard Capitals
              </p>
              {/* placeholder for app store badges */}
            </div>

            {/* link sections accordion */}
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {[
                { title:"LEGALS", links:[
                  ["Terms Of Service","/terms-of-service"],["Privacy Policy","/privacy-policy"],["Cookies Policy","/cookies-policy"],
                  ["Risk Disclaimer","/risk-disclaimer"],["Conflict of Interest Policy","/conflict-of-interest"],
                  ["Declaration of Consent","/declaration-of-consent"],["End-User License Agreement","/end-user-license-agreement"],
                ]},
                { title:"FEATURES", links:[["AutoGuard™","/autoguard"]] },
                { title:"RESOURCES", links:[["Affiliate Guide","/affiliate-guide"],["Leader Guide","/leader-guide"],["User Guide","/user-guide"]] },
                { title:"ABOUT US", links:[["Company","/about"]] },
                { title:"PARTNERSHIPS", links:[["Leader","/leader"],["Affiliate","/affiliate"],["Broker","/broker"]] },
                { title:"CONTACT", links:[["+1 (929) 512-0241","#"],["support@orchardcapitals.com","mailto:support@orchardcapitals.com"]] },
              ].map(({ title, links }) => (
                <div key={title} style={{ borderBottom:"1px solid rgba(255,255,255,.07)" }}>
                  <button
                    onClick={()=>setFooterOpen(footerOpen===title?null:title)}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:".9rem 0", background:"transparent", border:"none", cursor:"pointer", color:cream }}
                  >
                    <span className="oc-mono" style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(245,240,232,.5)" }}>{title}</span>
                    <span style={{ width:22, height:22, borderRadius:4, border:"1px solid rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"rgba(245,240,232,.4)", transition:"transform .25s", transform: footerOpen===title?"rotate(180deg)":"none" }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </span>
                  </button>
                  <div style={{ overflow:"hidden", maxHeight: footerOpen===title?"600px":"0", opacity: footerOpen===title?1:0, transition:"max-height .3s ease,opacity .3s ease" }}>
                    <ul style={{ listStyle:"none", padding:0, margin:"0 0 1rem", display:"flex", flexDirection:"column", gap:".55rem" }}>
                      {links.map(([label, href]) => (
                        <li key={label}>
                          <Link href={href} className="oc-flink">{label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* disclaimer */}
          <div style={{ marginTop:"3rem", paddingTop:"2.5rem", borderTop:"1px solid rgba(255,255,255,.06)", display:"flex", flexDirection:"column", gap:"1rem" }}>
            <p style={{ fontSize:".72rem", color:"rgba(245,240,232,.25)", lineHeight:1.75, fontWeight:500 }}>
              Disclaimer: Orchard Capitals (Europe) Ltd., a Financial Services Company authorised and regulated by the Cyprus Securities Exchange Commission (CySEC) under the license # 109/10. Registered in Cyprus under Company No. HE 200595. Registered Office: 4 Profiti Ilia Str., Kanika Business Centre, 7th floor, Germasogeia, 4046, Limassol, Cyprus. Orchard Capitals (UK) Ltd, a Financial Services Company authorised and regulated by the Financial Conduct Authority (FCA) under the license FRN 583263. Registered Office: 24th floor, One Canada Square, Canary Wharf, London E14 5AB. Orchard Capitals (USA) Ltd, a financial company authorised and regulated by SEC; CRD 298461. Orchard Capitals (ME) Limited, is licensed and regulated by the Abu Dhabi Global Market ("ADGM")'s Financial Services Regulatory Authority ("FSRA") as an Authorised Person under Financial Services Permission Number 220073.
            </p>
            <p style={{ fontSize:".72rem", color:"rgba(245,240,232,.25)", lineHeight:1.75, fontWeight:500 }}>
              Past performance is not an indication of future results. You should seek advice from an independent and suitably licensed financial advisor and ensure that you have the risk appetite, relevant experience and knowledge before you decide to trade. Trading with Orchard Capitals by following and/or copying or replicating the trades of other traders involves a high level of risk, even when following and/or copying the top-performing traders.
            </p>
            <p style={{ fontSize:".7rem", color:"rgba(245,240,232,.15)", letterSpacing:".04em", paddingTop:".5rem" }}>
              Copyright © 2006–2026 Orchard Capitals — Your Social Investment Network. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

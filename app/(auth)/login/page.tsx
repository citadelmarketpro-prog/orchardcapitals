"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { Poppins } from "next/font/google";
import OCLogo from "@/components/site/OCLogo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--oc-poppins",
  display: "swap",
});

const OC    = "#c14e2a";
const BLACK = "#0a0a0a";
const WHITE = "#ffffff";

type FormValues = { email: string; password: string };

const loginSchema = z.object({
  email:    z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const TICKER = [
  { s: "AAPL", p: "$189.42", c: "+2.34%", up: true  },
  { s: "NVDA", p: "$495.80", c: "+3.10%", up: true  },
  { s: "TSLA", p: "$248.91", c: "−1.22%", up: false },
  { s: "SPY",  p: "$475.30", c: "+0.87%", up: true  },
];

const STATS = [
  { value: "500K+", label: "Active Investors"  },
  { value: "$2.4B+", label: "Assets Under Copy" },
  { value: "98%",    label: "Fill Accuracy"     },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [focused,      setFocused]      = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, watch } =
    useForm<FormValues>({ resolver: zodResolver(loginSchema) });

  const emailVal    = watch("email");
  const passwordVal = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const response = await apiFetch("/login/", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result?.requires_verification) {
          toast.info("Login successful.");
          setTimeout(() => router.push(`/verify-email?email=${encodeURIComponent(data.email)}`), 1200);
          return;
        }
        toast.error(result?.error || "Something went wrong. Please try again.");
        return;
      }
      if (result?.requires_2fa) {
        toast.info("2FA code sent to your email");
        setTimeout(() => router.push(`/verify-2fa?email=${encodeURIComponent(data.email)}`), 1500);
        return;
      }
      toast.success("Login successful");
      router.push(result?.user?.has_submitted_kyc ? "/portfolio" : "/kyc");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared input style ── */
  const inputStyle = (field: string, hasError: boolean): React.CSSProperties => ({
    width: "100%",
    background: focused === field ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "#ef4444" : focused === field ? OC : "rgba(255,255,255,0.1)"}`,
    borderRadius: 10,
    padding: "14px 16px",
    color: WHITE,
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "var(--oc-poppins)",
    boxSizing: "border-box",
  });

  return (
    <div
      className={poppins.variable}
      style={{ fontFamily: "var(--oc-poppins), system-ui, sans-serif", minHeight: "100vh", background: BLACK, display: "flex", overflowX: "hidden" }}
    >
      {/* ══════════════════════════════════════════
          LEFT PANEL — branding
      ══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex"
        style={{ flex: "0 0 48%", flexDirection: "column", position: "relative", overflow: "hidden", padding: "40px 52px", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: -140, right: -140, width: 640, height: 640, background: `radial-gradient(circle, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60,  width: 400, height: 400, background: `radial-gradient(circle, ${OC}10 0%, transparent 65%)`, pointerEvents: "none" }} />

        {/* Watermark */}
        <div style={{ position: "absolute", bottom: "-1.5rem", left: "-1rem", fontFamily: "var(--oc-poppins)", fontSize: "18vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.03)", fontStyle: "italic", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
          Orchard
        </div>

        {/* Logo row */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <OCLogo light size="sm" href="/" />
          <Link href="/register"
            style={{ color: "rgba(255,255,255,0.28)", fontSize: 12, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}>
            New here? Create account →
          </Link>
        </div>

        {/* Headline + tickers */}
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40, paddingBottom: 40 }}>
          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 28, alignSelf: "flex-start" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
            <span style={{ color: OC, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Copy Trading Platform</span>
          </div>

          <h1 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 4.5vw, 68px)", fontWeight: 300, color: WHITE, lineHeight: 1.05, letterSpacing: "-1px", marginBottom: 20 }}>
            Welcome<br />
            <em style={{ fontStyle: "italic", color: OC }}>back.</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.75, maxWidth: 360, marginBottom: 40 }}>
            Your portfolio is waiting. Sign in to see your copied trades, live performance, and expert traders.
          </p>

          {/* Tickers */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 340 }}>
            {TICKER.map(t => (
              <div key={t.s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 14px", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}>
                <span style={{ fontSize: 13, color: WHITE, fontWeight: 700 }}>{t.s}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{t.p}</span>
                <span style={{ fontSize: 12, color: t.up ? "#4ade80" : "#f87171", fontWeight: 600 }}>
                  {t.up ? "↑" : "↓"} {t.c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 0, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              flex: 1, paddingRight: 24,
              paddingLeft: i > 0 ? 24 : 0,
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <p style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(18px, 2vw, 28px)", fontWeight: 700, color: WHITE, lineHeight: 1, marginBottom: 6 }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — form
      ══════════════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 24px" }}>
        {/* Mobile logo */}
        <div className="lg:hidden" style={{ alignSelf: "stretch", marginBottom: 40 }}>
          <OCLogo light size="sm" href="/" />
        </div>

        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: OC }} />
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Welcome back</span>
          </div>

          <h2 style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, color: WHITE, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 10 }}>
            Sign in to<br /><em style={{ fontStyle: "italic", color: OC }}>your account.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: OC, fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
              Create one free
            </Link>
          </p>

          {/* Google OAuth */}
          <button type="button" style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)",
            borderRadius: 10, padding: "12px 16px", color: WHITE, fontSize: 14, fontWeight: 600,
            cursor: "pointer", transition: "background 0.2s, border-color 0.2s", marginBottom: 20,
            fontFamily: "var(--oc-poppins)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)"; }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>or with email</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
                Email Address
              </label>
              <input
                id="email" type="email"
                {...register("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                style={inputStyle("email", !!errors.email)}
              />
              {errors.email && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 12, position: "relative" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  style={{ ...inputStyle("password", !!errors.password), paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPassword(s => !s)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 0, lineHeight: 1, display: "flex" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>{errors.password.message}</p>}
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginBottom: 24 }}>
              <Link href="/forgot-password" style={{ color: OC, fontSize: 12, fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "14px 24px",
              background: OC, color: WHITE,
              border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.75 : 1,
              transition: "opacity 0.2s, transform 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "var(--oc-poppins)",
              boxShadow: `0 8px 28px ${OC}40`,
            }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = loading ? "0.75" : "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
              {loading ? <PulseLoader color={WHITE} size={8} /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "28px 0" }} />

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
            New to Orchard Capitals?{" "}
            <Link href="/register" style={{ color: OC, fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
              Create a free account
            </Link>
          </p>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.14)", fontSize: 11, marginTop: 32, letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Orchard Capitals · SIPC Member · FINRA Registered
          </p>
        </div>
      </div>
    </div>
  );
}

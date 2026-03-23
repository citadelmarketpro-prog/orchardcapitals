"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import OCAuthShell, { OCBrand } from "@/components/site/OCAuthShell";

type FormValues = { email: string; password: string };

const loginSchema = z.object({
  email:    z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const TICKER = [
  { s: "AAPL", p: "$189.42", c: "+2.34%", up: true },
  { s: "NVDA", p: "$495.80", c: "+3.10%", up: true },
  { s: "TSLA", p: "$248.91", c: "−1.22%", up: false },
  { s: "SPY",  p: "$475.30", c: "+0.87%", up: true },
];

/* ─── Left panel ─── */
function LoginLeft() {
  return (
    <div className="flex flex-col flex-1 p-[2.8rem_3rem] relative" style={{ padding: "2.8rem 3rem" }}>
      {/* glows */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 700, height: 700, top: -200, right: -200, background: "radial-gradient(circle,rgba(155,44,44,.18) 0%,transparent 65%)", animation: "aGlowA 18s ease-in-out infinite alternate" }} />
      {/* watermark */}
      <div className="oc-serif absolute pointer-events-none select-none" style={{ bottom: "-2rem", left: "-1rem", fontSize: "22vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.035)", fontStyle: "italic", whiteSpace: "nowrap" }}>
        Trade
      </div>
      {/* nav row */}
      <div className="relative z-10 flex items-center justify-between">
        <OCBrand light />
        <Link href="/register" className="oc-mono transition-colors" style={{ fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,240,232,.3)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,.3)")}
        >
          New here? Create account →
        </Link>
      </div>
      {/* body */}
      <div className="relative z-10 flex flex-col flex-1 justify-center py-12">
        <h2 className="oc-serif" style={{ fontSize: "clamp(3rem,4.5vw,5.5rem)", fontWeight: 300, lineHeight: .96, letterSpacing: "-.025em", color: "#f5f0e8", marginBottom: "2rem" }}>
          Welcome<br /><em style={{ fontStyle: "italic", color: "#c0392b", display: "block" }}>back.</em>
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(245,240,232,.4)", lineHeight: 1.75, maxWidth: 360, fontWeight: 500, marginBottom: "2.5rem" }}>
          Your portfolio is waiting. Sign in to see your copied trades, performance, and expert traders.
        </p>
        {/* ticker */}
        <div className="flex flex-col gap-2" style={{ maxWidth: 340 }}>
          {TICKER.map(t => (
            <div key={t.s} className="flex items-center justify-between" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: ".7rem 1rem" }}>
              <span className="oc-mono" style={{ fontSize: ".72rem", color: "#f5f0e8", fontWeight: 600 }}>{t.s}</span>
              <span className="oc-mono" style={{ fontSize: ".7rem", color: "rgba(245,240,232,.5)" }}>{t.p}</span>
              <span className="oc-mono" style={{ fontSize: ".7rem", color: t.up ? "#4ade80" : "#f87171" }}>{t.up ? "↑" : "↓"} {t.c}</span>
            </div>
          ))}
        </div>
      </div>
      {/* stats */}
      <div className="relative z-10 flex pt-8" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
        {[["12K+","Active Copiers"],["$2.1B","Volume Copied"],["97%","Fill Accuracy"]].map(([n,l],i,a) => (
          <div key={l} className="flex flex-col" style={{ paddingRight: i<a.length-1?"2rem":0, marginRight: i<a.length-1?"2rem":0, borderRight: i<a.length-1?"1px solid rgba(255,255,255,.07)":"none" }}>
            <span className="oc-serif" style={{ fontSize: "1.8rem", fontWeight: 400, color: "#f5f0e8", lineHeight: 1 }}>{n}</span>
            <span className="oc-mono" style={{ fontSize: ".58rem", color: "rgba(245,240,232,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".25rem" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
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

  return (
    <OCAuthShell leftPanel={<LoginLeft />}>
      <div className="a-anim w-full" style={{ maxWidth: 390 }}>
        {/* eyebrow */}
        <div className="a-eyebrow">
          <div className="flex-shrink-0" style={{ width: 22, height: 1, background: "#c0392b" }} />
          <span className="oc-mono text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Welcome back</span>
        </div>

        <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8]" style={{ fontSize: "2.8rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: ".6rem" }}>
          Sign in to<br /><em style={{ fontStyle: "italic", color: "#c0392b" }}>your account.</em>
        </h1>
        <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".88rem", lineHeight: 1.6, fontWeight: 500, marginBottom: "2rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#c0392b", fontWeight: 700, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            Create one free
          </Link>
        </p>

        {/* Google */}
        <button type="button" className="a-oauth w-full flex items-center justify-center gap-2 rounded-lg mb-5" style={{ padding: ".75rem 1rem", fontSize: ".82rem", fontWeight: 700, cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px a-line" />
          <span className="oc-mono a-or" style={{ fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase" }}>or with email</span>
          <div className="flex-1 h-px a-line" />
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <div className="a-field">
            <input id="email" type="email" {...register("email")} className="a-input" placeholder=" "
              style={{ borderColor: errors.email ? "#ef4444" : undefined }} />
            <label htmlFor="email" className={`a-label ${emailVal ? "up" : ""}`}>Email Address</label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* password */}
          <div className="a-field">
            <input id="password" type={showPassword ? "text" : "password"} {...register("password")} className="a-input pr-10" placeholder=" "
              style={{ borderColor: errors.password ? "#ef4444" : undefined }} />
            <label htmlFor="password" className={`a-label ${passwordVal ? "up" : ""}`}>Password</label>
            <button type="button" onClick={() => setShowPassword(s => !s)}
              className="absolute right-3 top-3.5 text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] cursor-pointer bg-transparent border-none">
              {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* forgot */}
          <div className="text-right mb-5 -mt-2">
            <Link href="/forgot-password" className="oc-mono transition-opacity hover:opacity-70" style={{ fontSize: ".58rem", letterSpacing: ".08em", color: "#c0392b", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          {/* submit */}
          <button type="submit" disabled={loading} className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer transition-all disabled:opacity-60"
            style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
            {loading ? <PulseLoader color="#f5f0e8" size={10}/> : "Sign In →"}
          </button>

          <div className="h-px a-line my-7" />
          <p className="text-center text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".88rem", fontWeight: 500 }}>
            New to OrchardCapitals?{" "}
            <Link href="/register" style={{ color: "#c0392b", fontWeight: 800, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              Create a free account
            </Link>
          </p>
        </form>

        <p className="oc-mono text-center mt-8 text-[#8c7b6a]/40 dark:text-[rgba(245,240,232,0.15)]" style={{ fontSize: ".62rem", letterSpacing: ".06em" }}>
          © {new Date().getFullYear()} Orchard Capitals
        </p>
      </div>
    </OCAuthShell>
  );
}

"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, ArrowLeft, Lock, Smartphone, KeyRound } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import OCAuthShell, { OCBrand } from "@/components/site/OCAuthShell";

const TIPS = [
  { icon: <Lock size={15}/>,        label: "Code is valid for 10 minutes" },
  { icon: <Smartphone size={15}/>,  label: "Check the inbox of your registered email" },
  { icon: <ShieldCheck size={15}/>, label: "Never share your 2FA code with anyone" },
];

function TwoFALeft({ email }: { email: string }) {
  return (
    <div className="flex flex-col flex-1 relative overflow-hidden" style={{ padding: "2.8rem 3rem" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, top: -120, right: -120, background: "radial-gradient(circle,rgba(155,44,44,.15) 0%,transparent 65%)", animation: "aGlowA 18s ease-in-out infinite alternate" }} />
      <div className="oc-serif absolute pointer-events-none select-none" style={{ bottom: "-2rem", left: "-1rem", fontSize: "12vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.03)", fontStyle: "italic", whiteSpace: "nowrap" }}>
        Secure
      </div>

      {/* nav row */}
      <div className="relative z-10 flex items-center justify-between">
        <OCBrand light />
        <Link href="/login" className="oc-mono transition-colors" style={{ fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,240,232,.3)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,.3)")}
        >
          Back to sign in →
        </Link>
      </div>

      {/* body */}
      <div className="relative z-10 flex flex-col flex-1 justify-center py-12">
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: 36, height: 1, background: "#c0392b" }} />
          <span className="oc-mono" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,240,232,.35)" }}>Two-factor authentication</span>
        </div>

        <h2 className="oc-serif" style={{ fontSize: "clamp(2.8rem,4.5vw,5.2rem)", fontWeight: 300, lineHeight: .96, letterSpacing: "-.025em", color: "#f5f0e8", marginBottom: "2rem" }}>
          Verify your<br /><em style={{ fontStyle: "italic", color: "#c0392b", display: "block" }}>identity.</em>
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(245,240,232,.4)", lineHeight: 1.75, maxWidth: 340, fontWeight: 500, marginBottom: "2.5rem" }}>
          A 4-digit code was sent to{" "}
          <span style={{ color: "#f5f0e8", fontWeight: 700 }}>{email || "your email"}</span>.
          Enter it to complete sign in.
        </p>

        {/* tips */}
        <div className="flex flex-col gap-3" style={{ maxWidth: 360 }}>
          {TIPS.map((t, i) => (
            <div key={i} className="flex items-center gap-3" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: ".75rem 1rem" }}>
              <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: "rgba(192,57,43,.15)", color: "#c0392b" }}>
                {t.icon}
              </div>
              <span style={{ fontSize: ".82rem", color: "rgba(245,240,232,.6)", fontWeight: 500 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom */}
      <div className="relative z-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <span className="oc-serif" style={{ fontSize: "1.8rem", fontWeight: 400, color: "#f5f0e8", display: "block", lineHeight: 1 }}>2FA</span>
        <span className="oc-mono" style={{ fontSize: ".58rem", color: "rgba(245,240,232,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".25rem", display: "block" }}>Two-factor security</span>
      </div>
    </div>
  );
}

function Verify2FAContent() {
  const [code, setCode]           = useState(["", "", "", ""]);
  const [loading, setLoading]     = useState(false);
  const [resending, setResending] = useState(false);
  const router       = useRouter();
  const searchParams = useSearchParams();
  const email        = searchParams.get("email") || "";

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;           // digits only
    if (value.length > 1) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 3) document.getElementById(`tfa-${index + 1}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      document.getElementById(`tfa-${index - 1}`)?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setCode(pasted.split(""));
      document.getElementById(`tfa-3`)?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) { toast.error("Please enter the full 4-digit code"); return; }
    setLoading(true);
    try {
      const res    = await apiFetch("/verify-2fa/", { method: "POST", body: JSON.stringify({ email, code: fullCode }) });
      const result = await res.json();
      if (!res.ok) { toast.error(result?.error || "Invalid or expired code"); return; }
      toast.success("Identity verified!");
      setTimeout(() => router.push(result?.user?.has_submitted_kyc ? "/portfolio" : "/kyc"), 1000);
    } catch { toast.error("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res    = await apiFetch("/resend-2fa/", { method: "POST", body: JSON.stringify({ email }) });
      const result = await res.json();
      if (!res.ok) { toast.error(result?.error || "Failed to resend code"); return; }
      toast.success("New code sent to your email!");
      setCode(["", "", "", ""]);
      document.getElementById("tfa-0")?.focus();
    } catch { toast.error("Network error. Please try again."); }
    finally { setResending(false); }
  };

  return (
    <OCAuthShell leftPanel={<TwoFALeft email={email} />}>
      <div className="a-anim w-full text-center" style={{ maxWidth: 390 }}>
        {/* icon */}
        <div className="flex items-center justify-center mx-auto mb-6 rounded-full" style={{ width: 72, height: 72, background: "rgba(192,57,43,.1)", border: "1px solid rgba(192,57,43,.25)" }}>
          <KeyRound size={32} color="#c0392b"/>
        </div>

        {/* eyebrow */}
        <div className="a-eyebrow justify-center">
          <div className="shrink-0" style={{ width: 22, height: 1, background: "#c0392b" }} />
          <span className="oc-mono text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Two-factor authentication</span>
          <div className="shrink-0" style={{ width: 22, height: 1, background: "#c0392b" }} />
        </div>

        <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8] mb-2" style={{ fontSize: "2.6rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em" }}>
          Enter your <em style={{ fontStyle: "italic", color: "#c0392b" }}>code.</em>
        </h1>
        <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-8" style={{ fontSize: ".88rem", lineHeight: 1.6, fontWeight: 500 }}>
          We sent a 4-digit code to <strong className="text-[#1c1510] dark:text-[#f5f0e8]">{email || "your email"}</strong>
        </p>

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              id={`tfa-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="a-otp"
              autoFocus={i === 0}
            />
          ))}
        </div>

        {/* verify button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer transition-all disabled:opacity-60 mb-5"
          style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}
        >
          {loading ? <PulseLoader color="#f5f0e8" size={10}/> : "Verify & Sign In →"}
        </button>

        <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-5" style={{ fontSize: ".85rem" }}>
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="cursor-pointer bg-transparent border-none disabled:opacity-50"
            style={{ color: "#c0392b", fontWeight: 700, textDecoration: "underline", fontSize: ".85rem" }}
          >
            {resending ? "Sending…" : "Resend code"}
          </button>
        </p>

        <Link href="/login" className="inline-flex items-center gap-1.5" style={{ color: "#c0392b", fontSize: ".85rem", fontWeight: 700, textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
        >
          <ArrowLeft size={14}/> Back to Login
        </Link>

        <p className="oc-mono text-center mt-8 text-[#8c7b6a]/40 dark:text-[rgba(245,240,232,0.15)]" style={{ fontSize: ".62rem", letterSpacing: ".06em" }}>
          © {new Date().getFullYear()} Orchard Capitals
        </p>
      </div>
    </OCAuthShell>
  );
}

export default function Verify2FAPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#120e0a]">
        <PulseLoader color="#c0392b" size={12}/>
      </div>
    }>
      <Verify2FAContent />
    </Suspense>
  );
}

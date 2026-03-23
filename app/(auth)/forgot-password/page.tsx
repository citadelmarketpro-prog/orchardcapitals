"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ShieldCheck, Lock, Eye } from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import OCAuthShell, { OCBrand } from "@/components/site/OCAuthShell";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type ForgotFormData = z.infer<typeof forgotSchema>;

const FEATURES = [
  { icon: <ShieldCheck size={16}/>, label: "Bank-level encryption on all reset tokens" },
  { icon: <Lock size={16}/>,        label: "Tokens expire after 15 minutes" },
  { icon: <Eye size={16}/>,         label: "Reset activity logged for your security" },
  { icon: <Mail size={16}/>,        label: "Sent only to your verified email address" },
];

function ForgotLeft() {
  return (
    <div className="flex flex-col flex-1 relative overflow-hidden" style={{ padding: "2.8rem 3rem" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 700, height: 700, top: -200, right: -200, background: "radial-gradient(circle,rgba(155,44,44,.15) 0%,transparent 65%)", animation: "aGlowA 20s ease-in-out infinite alternate" }} />
      <div className="oc-serif absolute pointer-events-none select-none" style={{ bottom: "-2rem", left: "-1rem", fontSize: "18vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.03)", fontStyle: "italic", whiteSpace: "nowrap" }}>
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
          <span className="oc-mono" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,240,232,.35)" }}>Account recovery</span>
        </div>

        <h2 className="oc-serif" style={{ fontSize: "clamp(2.8rem,4.5vw,5.2rem)", fontWeight: 300, lineHeight: .96, letterSpacing: "-.025em", color: "#f5f0e8", marginBottom: "2rem" }}>
          We&apos;ve got<br /><em style={{ fontStyle: "italic", color: "#c0392b", display: "block" }}>you covered.</em>
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(245,240,232,.4)", lineHeight: 1.75, maxWidth: 340, fontWeight: 500, marginBottom: "2.5rem" }}>
          Forgot your password? No problem. We&apos;ll send a secure reset link directly to your inbox.
        </p>

        {/* security features */}
        <div className="flex flex-col gap-3" style={{ maxWidth: 380 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-3" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 8, padding: ".75rem 1rem" }}>
              <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: "rgba(192,57,43,.15)", color: "#c0392b" }}>
                {f.icon}
              </div>
              <span style={{ fontSize: ".82rem", color: "rgba(245,240,232,.6)", fontWeight: 500 }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom stat */}
      <div className="relative z-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <span className="oc-serif" style={{ fontSize: "1.8rem", fontWeight: 400, color: "#f5f0e8", display: "block", lineHeight: 1 }}>100%</span>
        <span className="oc-mono" style={{ fontSize: ".58rem", color: "rgba(245,240,232,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".25rem", display: "block" }}>Secure Recovery Rate</span>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [loading, setLoading]   = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } =
    useForm<ForgotFormData>({ resolver: zodResolver(forgotSchema) });

  const emailVal = watch("email");

  const onSubmit = async (data: ForgotFormData) => {
    setLoading(true);
    try {
      const response = await apiFetch("/password-reset/request/", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });
      const result = await response.json();
      if (!response.ok) { toast.error(result?.error || "Failed to send reset email"); return; }
      setEmailSent(true);
      toast.success("Password reset link sent! Check your email.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Email sent state ── */
  if (emailSent) {
    return (
      <OCAuthShell leftPanel={<ForgotLeft />}>
        <div className="a-anim w-full text-center" style={{ maxWidth: 390 }}>
          <div className="flex items-center justify-center mx-auto mb-6 rounded-full" style={{ width: 72, height: 72, background: "rgba(192,57,43,.1)", border: "1px solid rgba(192,57,43,.25)" }}>
            <Mail size={32} color="#c0392b"/>
          </div>

          <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8] mb-3" style={{ fontSize: "2.4rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em" }}>
            Check your <em style={{ fontStyle: "italic", color: "#c0392b" }}>inbox.</em>
          </h1>
          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-8" style={{ fontSize: ".92rem", lineHeight: 1.65, fontWeight: 500 }}>
            We&apos;ve sent a password reset link to <strong className="text-[#1c1510] dark:text-[#f5f0e8]">{emailVal}</strong>. Check your inbox and spam folder.
          </p>

          <Link href="/login">
            <button className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer mb-4"
              style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
              Back to Login
            </button>
          </Link>

          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".85rem" }}>
            Didn&apos;t receive the email?{" "}
            <button onClick={() => setEmailSent(false)} className="cursor-pointer bg-transparent border-none" style={{ color: "#c0392b", fontWeight: 700, textDecoration: "underline", fontSize: ".85rem" }}>
              Try again
            </button>
          </p>
        </div>
      </OCAuthShell>
    );
  }

  /* ── Form state ── */
  return (
    <OCAuthShell leftPanel={<ForgotLeft />}>
      <div className="a-anim w-full" style={{ maxWidth: 390 }}>
        {/* eyebrow */}
        <div className="a-eyebrow">
          <div className="shrink-0" style={{ width: 22, height: 1, background: "#c0392b" }} />
          <span className="oc-mono text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Account recovery</span>
        </div>

        <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8]" style={{ fontSize: "2.8rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: ".6rem" }}>
          Forgot your<br /><em style={{ fontStyle: "italic", color: "#c0392b" }}>password?</em>
        </h1>
        <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".88rem", lineHeight: 1.6, fontWeight: 500, marginBottom: "2rem" }}>
          Enter your email address and we&apos;ll send you a secure link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="a-field">
            <input id="email" type="email" {...register("email")} className="a-input" placeholder=" "
              style={{ borderColor: errors.email ? "#ef4444" : undefined }} />
            <label htmlFor="email" className={`a-label ${emailVal ? "up" : ""}`}>Email Address</label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer transition-all disabled:opacity-60 mt-2"
            style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
            {loading ? <PulseLoader color="#f5f0e8" size={10}/> : "Send Reset Link →"}
          </button>

          <div className="h-px a-line my-6" />
          <p className="text-center text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".88rem", fontWeight: 500 }}>
            Remember your password?{" "}
            <Link href="/login" style={{ color: "#c0392b", fontWeight: 800, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              Sign in
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

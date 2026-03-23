"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import OCAuthShell, { OCBrand } from "@/components/site/OCAuthShell";

const resetSchema = z
  .object({
    new_password:     z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine(d => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

const TIPS = [
  "Use at least 12 characters for stronger security",
  "Mix uppercase, lowercase, numbers and symbols",
  "Avoid using personal info like your name or birthday",
  "Use a unique password not used on other sites",
];

function ResetLeft() {
  return (
    <div className="flex flex-col flex-1 relative overflow-hidden" style={{ padding: "2.8rem 3rem" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, top: -100, left: -100, background: "radial-gradient(circle,rgba(155,44,44,.15) 0%,transparent 65%)", animation: "aGlowA 18s ease-in-out infinite alternate" }} />
      <div className="oc-serif absolute pointer-events-none select-none" style={{ bottom: "-2rem", left: "-1rem", fontSize: "14vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.03)", fontStyle: "italic", whiteSpace: "nowrap" }}>
        Password
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
          <span className="oc-mono" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,240,232,.35)" }}>Password reset</span>
        </div>

        <h2 className="oc-serif" style={{ fontSize: "clamp(2.8rem,4.5vw,5.2rem)", fontWeight: 300, lineHeight: .96, letterSpacing: "-.025em", color: "#f5f0e8", marginBottom: "2rem" }}>
          Secure your<br /><em style={{ fontStyle: "italic", color: "#c0392b", display: "block" }}>account.</em>
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(245,240,232,.4)", lineHeight: 1.75, maxWidth: 340, fontWeight: 500, marginBottom: "2.5rem" }}>
          Create a strong new password to protect your portfolio and trading activity.
        </p>

        {/* password tips */}
        <div className="flex flex-col gap-2.5" style={{ maxWidth: 380 }}>
          <span className="oc-mono" style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(245,240,232,.25)", marginBottom: ".25rem" }}>Password tips</span>
          {TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="shrink-0 rounded-full mt-1.5" style={{ width: 5, height: 5, background: "#c0392b", display: "block" }} />
              <span style={{ fontSize: ".82rem", color: "rgba(245,240,232,.5)", fontWeight: 500, lineHeight: 1.55 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom */}
      <div className="relative z-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <span className="oc-serif" style={{ fontSize: "1.8rem", fontWeight: 400, color: "#f5f0e8", display: "block", lineHeight: 1 }}>256-bit</span>
        <span className="oc-mono" style={{ fontSize: ".58rem", color: "rgba(245,240,232,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".25rem", display: "block" }}>AES Encryption</span>
      </div>
    </div>
  );
}

function ResetPasswordContent() {
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [validating,  setValidating]  = useState(true);
  const [tokenValid,  setTokenValid]  = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [userEmail,   setUserEmail]   = useState("");

  const router       = useRouter();
  const searchParams = useSearchParams();
  const uid   = searchParams.get("uid");
  const token = searchParams.get("token");

  const { register, handleSubmit, formState: { errors }, watch } =
    useForm<ResetFormData>({ resolver: zodResolver(resetSchema) });

  const newPassVal     = watch("new_password");
  const confirmPassVal = watch("confirm_password");

  useEffect(() => {
    const validateToken = async () => {
      if (!uid || !token) { toast.error("Invalid reset link"); setValidating(false); return; }
      try {
        const res    = await apiFetch("/password-reset/validate/", { method: "POST", body: JSON.stringify({ uid, token }) });
        const result = await res.json();
        if (res.ok && result.valid) { setTokenValid(true); setUserEmail(result.user?.email || ""); }
        else { toast.error(result.error || "Invalid or expired reset link"); setTokenValid(false); }
      } catch { toast.error("Failed to validate reset link"); setTokenValid(false); }
      finally { setValidating(false); }
    };
    validateToken();
  }, [uid, token]);

  const onSubmit = async (data: ResetFormData) => {
    if (!uid || !token) { toast.error("Invalid reset link"); return; }
    setLoading(true);
    try {
      const res    = await apiFetch("/password-reset/confirm/", {
        method: "POST",
        body: JSON.stringify({ uid, token, new_password: data.new_password, confirm_password: data.confirm_password }),
      });
      const result = await res.json();
      if (!res.ok) {
        const msg = Array.isArray(result?.error) ? result.error.join(" ") : result?.error || "Failed to reset password";
        toast.error(msg); return;
      }
      setResetSuccess(true);
      toast.success("Password reset successful!");
      setTimeout(() => router.push("/login"), 2000);
    } catch { toast.error("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  /* validating state */
  if (validating) {
    return (
      <OCAuthShell leftPanel={<ResetLeft />}>
        <div className="text-center">
          <PulseLoader color="#c0392b" size={12}/>
          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mt-4" style={{ fontSize: ".9rem" }}>Validating reset link…</p>
        </div>
      </OCAuthShell>
    );
  }

  /* invalid token state */
  if (!tokenValid) {
    return (
      <OCAuthShell leftPanel={<ResetLeft />}>
        <div className="a-anim w-full text-center" style={{ maxWidth: 390 }}>
          <div className="flex items-center justify-center mx-auto mb-6 rounded-full" style={{ width: 72, height: 72, background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)" }}>
            <span style={{ fontSize: "2rem" }}>✕</span>
          </div>
          <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8] mb-3" style={{ fontSize: "2.4rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em" }}>
            <em style={{ fontStyle: "italic", color: "#c0392b" }}>Invalid</em> reset link
          </h1>
          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-8" style={{ fontSize: ".92rem", lineHeight: 1.65, fontWeight: 500 }}>
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/forgot-password">
              <button className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer"
                style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
                Request New Link →
              </button>
            </Link>
            <Link href="/login">
              <button className="w-full rounded-lg font-extrabold uppercase tracking-widest cursor-pointer text-[#1c1510] dark:text-[#f5f0e8]"
                style={{ padding: ".95rem", border: "1.5px solid var(--a-border)", background: "transparent", fontSize: ".82rem", letterSpacing: ".1em" }}>
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </OCAuthShell>
    );
  }

  /* success state */
  if (resetSuccess) {
    return (
      <OCAuthShell leftPanel={<ResetLeft />}>
        <div className="a-anim w-full text-center" style={{ maxWidth: 390 }}>
          <div className="flex items-center justify-center mx-auto mb-6 rounded-full" style={{ width: 72, height: 72, background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)" }}>
            <CheckCircle size={32} color="#22c55e"/>
          </div>
          <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8] mb-3" style={{ fontSize: "2.4rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em" }}>
            Password <em style={{ fontStyle: "italic", color: "#c0392b" }}>reset!</em>
          </h1>
          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".92rem", lineHeight: 1.65, fontWeight: 500 }}>
            Your password has been reset successfully. Redirecting you to sign in…
          </p>
          <div className="mt-6">
            <PulseLoader color="#c0392b" size={10}/>
          </div>
        </div>
      </OCAuthShell>
    );
  }

  /* form state */
  return (
    <OCAuthShell leftPanel={<ResetLeft />}>
      <div className="a-anim w-full" style={{ maxWidth: 390 }}>
        {/* eyebrow */}
        <div className="a-eyebrow">
          <div className="shrink-0" style={{ width: 22, height: 1, background: "#c0392b" }} />
          <span className="oc-mono text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Password reset</span>
        </div>

        <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8]" style={{ fontSize: "2.8rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: ".6rem" }}>
          Create a new<br /><em style={{ fontStyle: "italic", color: "#c0392b" }}>password.</em>
        </h1>

        {userEmail && (
          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-6" style={{ fontSize: ".85rem", lineHeight: 1.6, fontWeight: 500 }}>
            Resetting password for <strong className="text-[#1c1510] dark:text-[#f5f0e8]">{userEmail}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={userEmail ? "" : "mt-6"}>
          {/* new password */}
          <div className="a-field">
            <input id="new_password" type={showNew ? "text" : "password"} {...register("new_password")} className="a-input pr-10" placeholder=" "
              style={{ borderColor: errors.new_password ? "#ef4444" : undefined }} />
            <label htmlFor="new_password" className={`a-label ${newPassVal ? "up" : ""}`}>New Password</label>
            <button type="button" onClick={() => setShowNew(s => !s)}
              className="absolute right-3 top-3.5 text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] cursor-pointer bg-transparent border-none">
              {showNew ? <EyeOff size={17}/> : <Eye size={17}/>}
            </button>
            {errors.new_password && <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>}
          </div>

          {/* confirm password */}
          <div className="a-field">
            <input id="confirm_password" type={showConfirm ? "text" : "password"} {...register("confirm_password")} className="a-input pr-10" placeholder=" "
              style={{ borderColor: errors.confirm_password ? "#ef4444" : undefined }} />
            <label htmlFor="confirm_password" className={`a-label ${confirmPassVal ? "up" : ""}`}>Confirm Password</label>
            <button type="button" onClick={() => setShowConfirm(s => !s)}
              className="absolute right-3 top-3.5 text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] cursor-pointer bg-transparent border-none">
              {showConfirm ? <EyeOff size={17}/> : <Eye size={17}/>}
            </button>
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
          </div>

          {/* submit */}
          <button type="submit" disabled={loading} className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer transition-all disabled:opacity-60 mt-2"
            style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
            {loading ? <PulseLoader color="#f5f0e8" size={10}/> : "Reset Password →"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#120e0a]">
        <PulseLoader color="#c0392b" size={12}/>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}

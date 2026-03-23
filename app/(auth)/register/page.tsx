"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select, { GroupBase, PropsValue } from "react-select";
import countryList from "react-select-country-list";
import { Eye, EyeOff, Gift } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { apiFetch } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import OCAuthShell, { OCBrand } from "@/components/site/OCAuthShell";

interface CountryOption { value: string; label: string; flag: string; }

const registerSchema = z.object({
  firstName:    z.string().min(1, "First name is required"),
  lastName:     z.string().min(1, "Last name is required"),
  email:        z.email("Enter a valid email address"),
  password:     z.string()
    .min(8, "Use 8 or more characters")
    .regex(/[A-Z]/, "One uppercase character required")
    .regex(/[a-z]/, "One lowercase character required")
    .regex(/[0-9]/, "One number required")
    .regex(/[^A-Za-z0-9]/, "One special character required"),
  country:      z.object({ value: z.string(), label: z.string(), flag: z.string() })
    .refine(val => Boolean(val?.value && val?.label), { message: "Country is required" }),
  referralCode: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const PROOF = [
  { i: "JR", name: "Jake Reynolds",  spec: "Options Specialist", ret: "+182%", col: "linear-gradient(135deg,#9b2c2c,#c0392b)" },
  { i: "SM", name: "Sofia Martinez", spec: "Futures Trader",     ret: "+241%", col: "linear-gradient(135deg,#6d28d9,#a855f7)" },
  { i: "MC", name: "Marcus Chen",    spec: "Swing Trader",       ret: "+319%", col: "linear-gradient(135deg,#0369a1,#0ea5e9)" },
];

function RegisterLeft() {
  return (
    <div className="flex flex-col flex-1 relative overflow-hidden" style={{ padding: "2.8rem 3rem" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, top: -160, left: -160, background: "radial-gradient(circle,rgba(155,44,44,.2) 0%,transparent 65%)", animation: "aGlowA 15s ease-in-out infinite alternate" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 450, height: 450, bottom: -80, right: -80, background: "radial-gradient(circle,rgba(183,134,12,.12) 0%,transparent 65%)", animation: "aGlowB 20s ease-in-out infinite alternate" }} />
      <div className="oc-serif absolute pointer-events-none select-none" style={{ bottom: "-2.5rem", left: "-1rem", fontSize: "20vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.035)", fontStyle: "italic", whiteSpace: "nowrap" }}>
        Grow
      </div>
      {/* nav row */}
      <div className="relative z-10 flex items-center justify-between">
        <OCBrand light />
        <Link href="/login" className="oc-mono transition-colors" style={{ fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,240,232,.3)", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,.3)")}
        >
          Already a member? Sign in →
        </Link>
      </div>
      {/* body */}
      <div className="relative z-10 flex flex-col flex-1 justify-center py-12">
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: 36, height: 1, background: "#c0392b" }} />
          <span className="oc-mono" style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,240,232,.35)" }}>Join the community</span>
        </div>
        <h2 className="oc-serif" style={{ fontSize: "clamp(2.8rem,4.5vw,5.5rem)", fontWeight: 300, lineHeight: .96, letterSpacing: "-.025em", color: "#f5f0e8", marginBottom: "2rem" }}>
          Start copying<br /><em style={{ fontStyle: "italic", color: "#c0392b", display: "block" }}>experts.</em>
        </h2>
        <p style={{ fontSize: "1rem", color: "rgba(245,240,232,.4)", lineHeight: 1.75, maxWidth: 360, fontWeight: 500, marginBottom: "2.5rem" }}>
          Follow proven traders and mirror their strategies automatically — no experience needed.
        </p>
        {/* proof cards */}
        <div className="flex flex-col gap-3" style={{ maxWidth: 380 }}>
          {PROOF.map(p => (
            <div key={p.i} className="flex items-center gap-3" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: ".9rem 1.1rem" }}>
              <div className="shrink-0 flex items-center justify-center rounded-full font-extrabold text-white" style={{ width: 40, height: 40, background: p.col, fontSize: ".8rem" }}>{p.i}</div>
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: ".85rem", color: "#f5f0e8" }}>{p.name}</div>
                <div style={{ fontSize: ".7rem", color: "rgba(245,240,232,.35)", marginTop: ".1rem" }}>{p.spec}</div>
              </div>
              <div className="oc-serif shrink-0" style={{ fontSize: "1.45rem", fontWeight: 400, color: "#4ade80" }}>{p.ret}</div>
            </div>
          ))}
        </div>
      </div>
      {/* stats */}
      <div className="relative z-10 flex pt-8" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
        {[["12K+","Active Copiers"],["$2.1B","Volume Copied"],["97%","Fill Accuracy"]].map(([n,l],i,a) => (
          <div key={l} style={{ paddingRight: i<a.length-1?"2rem":0, marginRight: i<a.length-1?"2rem":0, borderRight: i<a.length-1?"1px solid rgba(255,255,255,.07)":"none" }}>
            <span className="oc-serif" style={{ fontSize: "1.8rem", fontWeight: 400, color: "#f5f0e8", display: "block", lineHeight: 1 }}>{n}</span>
            <span className="oc-mono" style={{ fontSize: ".58rem", color: "rgba(245,240,232,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".25rem", display: "block" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegisterPageContent() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted]             = useState(false);
  const [showPassword, setShowPassword]   = useState(false);
  const [loading, setLoading]             = useState(false);
  const [message, setMessage]             = useState<string | null>(null);
  const [referralCode, setReferralCode]   = useState("");
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [referrerName, setReferrerName]   = useState("");
  const router       = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } =
    useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const watched = watch();

  const countryOptions: CountryOption[] = useMemo(() =>
    countryList().getData().map(c => ({ value: c.value, label: c.label, flag: c.value.toLowerCase() })),
  []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const refParam = searchParams.get("ref");
    if (refParam) {
      const upper = refParam.trim().toUpperCase();
      setReferralCode(upper); setValue("referralCode", upper);
      localStorage.setItem("referral_code", upper);
      validateReferralCode(upper);
    } else {
      const stored = localStorage.getItem("referral_code");
      if (stored) { setReferralCode(stored); setValue("referralCode", stored); validateReferralCode(stored); }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setValue]);

  const validateReferralCode = async (code: string) => {
    if (!code) { setReferralValid(null); return; }
    try {
      const res  = await apiFetch(`/referral/validate/?code=${code}`);
      const data = await res.json();
      if (data.success && data.valid) { setReferralValid(true); setReferrerName(data.referrer.name); }
      else { setReferralValid(false); setReferrerName(""); }
    } catch { setReferralValid(false); }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    async function fetchCountry() {
      try {
        const res  = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_calling_code) localStorage.setItem("country_calling_code", data.country_calling_code);
        const found = countryOptions.find(c => c.label.toLowerCase() === data.country_name?.toLowerCase());
        if (found) setValue("country", found);
      } catch { /* silent */ }
    }
    fetchCountry();
  }, [countryOptions, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true); setMessage(null);
    try {
      const payload = {
        first_name:           data.firstName,
        last_name:            data.lastName,
        email:                data.email,
        password:             data.password,
        country:              data.country.label,
        referral_code:        referralCode || undefined,
        country_calling_code: localStorage.getItem("country_calling_code") || "",
      };
      const res    = await apiFetch("/register/", { method: "POST", body: JSON.stringify(payload) });
      const result = await res.json();
      if (!res.ok) {
        const err = result?.error
          ? (Array.isArray(result.error) ? result.error.join(" ") : String(result.error))
          : "Registration failed. Please try again.";
        throw new Error(err);
      }
      setMessage("Registration successful! Redirecting...");
      if (result.user?.country_calling_code) localStorage.setItem("country_calling_code", result.user.country_calling_code);
      localStorage.removeItem("referral_code");
      setTimeout(() => router.push("/onboarding"), 1500);
    } catch (error: unknown) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Something went wrong."}`);
    } finally { setLoading(false); }
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <OCAuthShell leftPanel={<RegisterLeft />}>
      <div className="a-anim w-full" style={{ maxWidth: 420 }}>
        {/* eyebrow */}
        <div className="a-eyebrow">
          <div className="shrink-0" style={{ width: 22, height: 1, background: "#c0392b" }} />
          <span className="oc-mono text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Create your account</span>
        </div>

        <h1 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8]" style={{ fontSize: "2.8rem", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-.02em", marginBottom: ".6rem" }}>
          Join the smart<br /><em style={{ fontStyle: "italic", color: "#c0392b" }}>community.</em>
        </h1>
        <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".88rem", lineHeight: 1.6, fontWeight: 500, marginBottom: "2rem" }}>
          Already a member?{" "}
          <Link href="/login" style={{ color: "#c0392b", fontWeight: 700, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            Sign in here
          </Link>
        </p>

        {/* referral banner */}
        {referralCode && referralValid && (
          <div className="flex items-center gap-3 rounded-xl mb-5 p-4" style={{ background: "rgba(192,57,43,.08)", border: "1px solid rgba(192,57,43,.25)" }}>
            <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "rgba(192,57,43,.15)" }}>
              <Gift size={16} color="#c0392b"/>
            </div>
            <div>
              <p className="text-[#1c1510] dark:text-[#f5f0e8] font-bold" style={{ fontSize: ".85rem" }}>Referred by {referrerName}!</p>
              <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".75rem" }}>You&apos;ll get special bonuses when you join</p>
            </div>
          </div>
        )}
        {referralCode && referralValid === false && (
          <div className="rounded-xl mb-5 p-4" style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)" }}>
            <p className="text-red-500" style={{ fontSize: ".85rem" }}>Invalid referral code</p>
          </div>
        )}

        {/* Google */}
        <button type="button" className="a-oauth w-full flex items-center justify-center gap-2 rounded-lg mb-5 font-bold cursor-pointer" style={{ padding: ".75rem 1rem", fontSize: ".82rem" }}>
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
          {/* first + last */}
          <div className="grid grid-cols-2 gap-3">
            <div className="a-field">
              <input id="firstName" type="text" {...register("firstName")} className="a-input" placeholder=" "
                style={{ borderColor: errors.firstName ? "#ef4444" : undefined }} />
              <label htmlFor="firstName" className={`a-label ${watched.firstName ? "up" : ""}`}>First Name</label>
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="a-field">
              <input id="lastName" type="text" {...register("lastName")} className="a-input" placeholder=" "
                style={{ borderColor: errors.lastName ? "#ef4444" : undefined }} />
              <label htmlFor="lastName" className={`a-label ${watched.lastName ? "up" : ""}`}>Last Name</label>
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* email */}
          <div className="a-field">
            <input id="email" type="email" {...register("email")} className="a-input" placeholder=" "
              style={{ borderColor: errors.email ? "#ef4444" : undefined }} />
            <label htmlFor="email" className={`a-label ${watched.email ? "up" : ""}`}>Email Address</label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* country */}
          <div className="mb-4">
            <span className="oc-mono text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] block mb-1.5" style={{ fontSize: ".58rem", letterSpacing: ".15em", textTransform: "uppercase" }}>Country</span>
            {mounted && (
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select<CountryOption, false, GroupBase<CountryOption>>
                    instanceId="country-select"
                    value={(field.value as CountryOption) ?? null}
                    options={countryOptions}
                    placeholder="Select your country"
                    formatOptionLabel={(opt) => (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className={`fi fi-${opt.flag}`}/>
                        <span>{opt.label}</span>
                      </div>
                    )}
                    onChange={(sel: PropsValue<CountryOption>) =>
                      field.onChange(Array.isArray(sel) ? sel[0] : sel)
                    }
                    styles={{
                      control: (b) => ({ ...b, backgroundColor: "var(--a-input)", borderColor: errors.country ? "#ef4444" : "var(--a-border)", borderWidth: "1.5px", borderRadius: 8, boxShadow: "none", paddingTop: 6, paddingBottom: 6 }),
                      singleValue: (b) => ({ ...b, color: "var(--a-fg)" }),
                      menu: (b) => ({ ...b, zIndex: 50, backgroundColor: isDark ? "#1c1510" : "#fff", border: "1px solid var(--a-border)", borderRadius: 8 }),
                      option: (b, { isFocused, isSelected }) => ({ ...b, backgroundColor: isSelected ? "#c0392b" : isFocused ? (isDark ? "rgba(255,255,255,.06)" : "#ede8de") : "transparent", color: isSelected ? "#fff" : "var(--a-fg)", cursor: "pointer" }),
                      placeholder: (b) => ({ ...b, color: "var(--a-muted)", fontSize: ".9rem" }),
                      input: (b) => ({ ...b, color: "var(--a-fg)" }),
                    }}
                  />
                )}
              />
            )}
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>

          {/* password */}
          <div className="a-field mb-2">
            <input id="password" type={showPassword ? "text" : "password"} {...register("password")} className="a-input pr-10" placeholder=" "
              style={{ borderColor: errors.password ? "#ef4444" : undefined }} />
            <label htmlFor="password" className={`a-label ${watched.password ? "up" : ""}`}>Password</label>
            <button type="button" onClick={() => setShowPassword(s => !s)}
              className="absolute right-3 top-3.5 text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] cursor-pointer bg-transparent border-none">
              {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
            </button>
          </div>

          {/* password rules */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5">
            {[
              { l: "8+ characters",    t: (v: string) => v.length >= 8 },
              { l: "Uppercase letter", t: (v: string) => /[A-Z]/.test(v) },
              { l: "Special char",     t: (v: string) => /[^A-Za-z0-9]/.test(v) },
              { l: "Lowercase letter", t: (v: string) => /[a-z]/.test(v) },
              { l: "One number",       t: (v: string) => /[0-9]/.test(v) },
            ].map(rule => {
              const pass = watched.password ? rule.t(watched.password) : false;
              return (
                <div key={rule.l} className="flex items-center gap-1.5">
                  <span className="rounded-full shrink-0" style={{ width: 6, height: 6, background: pass ? "#22c55e" : "var(--a-border)", display: "block" }} />
                  <span style={{ fontSize: ".72rem", color: pass ? "#22c55e" : "var(--a-muted)", fontWeight: 600 }}>{rule.l}</span>
                </div>
              );
            })}
          </div>

          <input type="hidden" {...register("referralCode")} />

          {/* submit */}
          <button type="submit" disabled={loading} className="a-submit w-full rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-widest cursor-pointer transition-all disabled:opacity-60"
            style={{ padding: "1rem", border: "none", background: "#1c1510", fontSize: ".88rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
            {loading ? <PulseLoader color="#f5f0e8" size={10}/> : "Create Account →"}
          </button>

          {message && (
            <p className={`text-center text-sm font-semibold mt-4 ${message.startsWith("Registration") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </form>

        <p className="oc-mono text-center mt-8 text-[#8c7b6a]/40 dark:text-[rgba(245,240,232,0.15)]" style={{ fontSize: ".62rem", letterSpacing: ".06em" }}>
          © {new Date().getFullYear()} Orchard Capitals
        </p>
      </div>
    </OCAuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#120e0a] text-[#f5f0e8]" style={{ fontFamily: "serif", fontSize: "1.2rem" }}>
        Loading...
      </div>
    }>
      <RegisterPageContent />
    </Suspense>
  );
}

"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  Sun, Moon, Upload, X, Shield, Lock,
  CheckCircle2, FileCheck, Loader2, Check,
  ArrowRight, ArrowLeft, User, Banknote, MapPin, CreditCard,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import {
  Cormorant_Garamond, IBM_Plex_Mono, Darker_Grotesque,
} from "next/font/google";
import Link from "next/link";
import OCLogo from "@/components/site/OCLogo";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","600"], style: ["normal","italic"], variable: "--oc-serif", display: "swap" });
const ibmMono   = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500","600"], variable: "--oc-mono", display: "swap" });
const grotesque = Darker_Grotesque({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--oc-sans", display: "swap" });

const CLOUDINARY_CLOUD_NAME   = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME   || "your-cloud-name";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "elite_preset";
const MAX_FILE_SIZE   = 10 * 1024 * 1024;
const ALLOWED_TYPES   = ["image/jpeg","image/jpg","image/png","image/webp"];

const kycSchema = z.object({
  title: z.enum(["mr","mrs","ms","dr","prof"], { message: "Please select a title" }),
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name:  z.string().min(2, "Last name must be at least 2 characters"),
  dob:        z.string().min(1, "Date of birth is required"),
  currency:   z.string().min(1, "Currency is required"),
  status_of_employment: z.enum(["employed","self_employed","unemployed","student","retired"], { message: "Please select employment status" }),
  source_of_income:     z.enum(["salary","business","investments","pension","savings","inheritance","other"], { message: "Please select source of income" }),
  industry:             z.string().min(1, "Please select an industry"),
  annual_amount:        z.enum(["0-15k","15k-50k","50k-200k","200k-500k","500k-1m","1m-3m","3m+"], { message: "Please select annual income range" }),
  estimated_net_worth:  z.enum(["0-50k","50k-100k","100k-500k","500k-1m","1m-5m","5m+"], { message: "Please select net worth range" }),
  address:     z.string().min(5, "Address must be at least 5 characters"),
  city:        z.string().min(2, "City is required"),
  region:      z.string().min(2, "Province/State is required"),
  postal_code: z.string().min(3, "Postal code is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters")
    .refine(p => p.replace(/[\s\+\-\(\)]/g,"").length >= 10, "Please enter a complete phone number"),
  id_type: z.enum(["passport","driver_license","national_id","voter_card"], { message: "Please select an ID type" }),
});
type KYCFormData = z.infer<typeof kycSchema>;

const STAGES = [
  { title: "Personal Information",  desc: "Your basic personal details",             icon: <User size={16}/> },
  { title: "Financial Information", desc: "Your financial details and preferences",   icon: <Banknote size={16}/> },
  { title: "Address Information",   desc: "Your residential address",                 icon: <MapPin size={16}/> },
  { title: "Identity Verification", desc: "Upload your identification documents",     icon: <CreditCard size={16}/> },
];

export default function KYCVerificationPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted]           = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [loading, setLoading]           = useState(false);
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack,  setUploadingBack]  = useState(false);
  const [idFrontUrl,     setIdFrontUrl]     = useState<string | null>(null);
  const [idBackUrl,      setIdBackUrl]      = useState<string | null>(null);
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview,  setIdBackPreview]  = useState<string | null>(null);
  const [countryCallingCode, setCountryCallingCode] = useState("");
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const router  = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger } =
    useForm<KYCFormData>({ resolver: zodResolver(kycSchema), mode: "onChange" });

  useEffect(() => setMounted(true), []);

  /* custom cursor */
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, id = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px"; };
    const tick = () => { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + "px"; ring.style.top = ry + "px"; id = requestAnimationFrame(tick); };
    document.addEventListener("mousemove", onMove);
    id = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);

  /* prefetch profile */
  useEffect(() => {
    if (!mounted) return;
    const fetchProfile = async () => {
      try {
        const res = await apiFetch("/profile/");
        if (res.ok) {
          const raw  = await res.json();
          const data = raw.user || raw;
          if (data.has_submitted_kyc) { router.push("/portfolio"); return; }
          const code = data.country_calling_code || localStorage.getItem("country_calling_code") || "";
          setCountryCallingCode(code);
          if (code && !getValues("phone")) setValue("phone", code);
        }
      } catch {
        const code = localStorage.getItem("country_calling_code") || "";
        setCountryCallingCode(code);
        if (code) setValue("phone", code);
      }
    };
    fetchProfile();
  }, [mounted, setValue, getValues, router]);

  /* upload helpers */
  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) return `File too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`;
    if (!ALLOWED_TYPES.includes(file.type)) return "Only JPEG, PNG, WebP allowed";
    return null;
  };
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    fd.append("folder", "kyc_documents");
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Failed to upload image");
    return (await res.json()).secure_url;
  };

  const onDropFront = useCallback(async (files: File[]) => {
    const file = files[0]; if (!file) return;
    const err = validateFile(file); if (err) { toast.error(err); return; }
    setUploadingFront(true);
    try { setIdFrontPreview(URL.createObjectURL(file)); setIdFrontUrl(await uploadToCloudinary(file)); toast.success("Front ID uploaded"); }
    catch { toast.error("Failed to upload front ID"); setIdFrontPreview(null); setIdFrontUrl(null); }
    finally { setUploadingFront(false); }
  }, []);

  const onDropBack = useCallback(async (files: File[]) => {
    const file = files[0]; if (!file) return;
    const err = validateFile(file); if (err) { toast.error(err); return; }
    setUploadingBack(true);
    try { setIdBackPreview(URL.createObjectURL(file)); setIdBackUrl(await uploadToCloudinary(file)); toast.success("Back ID uploaded"); }
    catch { toast.error("Failed to upload back ID"); setIdBackPreview(null); setIdBackUrl(null); }
    finally { setUploadingBack(false); }
  }, []);

  const { getRootProps: getFrontRoot, getInputProps: getFrontInput, isDragActive: isDragFront } =
    useDropzone({ onDrop: onDropFront, accept: { "image/*": [".jpeg",".jpg",".png",".webp"] }, maxFiles: 1, maxSize: MAX_FILE_SIZE, disabled: uploadingFront });
  const { getRootProps: getBackRoot,  getInputProps: getBackInput,  isDragActive: isDragBack  } =
    useDropzone({ onDrop: onDropBack,  accept: { "image/*": [".jpeg",".jpg",".png",".webp"] }, maxFiles: 1, maxSize: MAX_FILE_SIZE, disabled: uploadingBack });

  const handleNext = async () => {
    const fields: Record<number, (keyof KYCFormData)[]> = {
      0: ["title","first_name","last_name","dob"],
      1: ["currency","status_of_employment","source_of_income","industry","annual_amount","estimated_net_worth"],
      2: ["address","city","region","postal_code","phone"],
    };
    const isValid = await trigger(fields[currentStage]);
    if (isValid) setCurrentStage(s => s + 1);
  };

  const onSubmit = async (data: KYCFormData) => {
    if (!idFrontUrl || !idBackUrl) { toast.error("Please upload both front and back of your ID"); return; }
    setLoading(true);
    try {
      const res    = await apiFetch("/submit-kyc/", { method: "POST", body: JSON.stringify({ ...data, id_front_url: idFrontUrl, id_back_url: idBackUrl }) });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || result?.detail || `KYC submission failed (${res.status})`);
      toast.success("KYC submitted successfully! Redirecting...");
      setTimeout(() => router.push("/portfolio"), 2000);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed to submit KYC. Please try again."); }
    finally { setLoading(false); }
  };

  const isDark = mounted && resolvedTheme === "dark";
  const rust   = "#c0392b";
  const cream  = "#f5f0e8";

  return (
    <div className={`${cormorant.variable} ${ibmMono.variable} ${grotesque.variable} bg-[#f5f0e8] dark:bg-[#1c1510] text-[#1c1510] dark:text-[#f5f0e8] min-h-screen`}
      style={{ fontFamily: "var(--oc-sans),'Darker Grotesque',sans-serif", cursor: "none", overflowX: "hidden" }}>

      {/* ── CSS variables + utilities ── */}
      <style>{`
        .oc-serif { font-family: var(--oc-serif),'Cormorant Garamond',Georgia,serif; }
        .oc-mono  { font-family: var(--oc-mono),'IBM Plex Mono',monospace; }
        .kyc-dot  { position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;background:#c0392b;border-radius:50%;transform:translate(-50%,-50%); }
        .kyc-ring { position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;border:1.5px solid rgba(139,124,106,0.45);border-radius:50%;transform:translate(-50%,-50%);transition:width .18s,height .18s; }
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#2a2018;border-radius:2px;}

        :root {
          --a-fg:#1c1510; --a-muted:#8c7b6a; --a-border:#d6cfc2;
          --a-input:#ffffff; --a-paper:#ede8de; --a-line:rgba(74,63,53,0.12);
          --a-option-bg:#ffffff;
        }
        .dark {
          --a-fg:#f5f0e8; --a-muted:rgba(245,240,232,0.45); --a-border:rgba(255,255,255,0.1);
          --a-input:rgba(255,255,255,0.04); --a-paper:rgba(255,255,255,0.03); --a-line:rgba(255,255,255,0.08);
          --a-option-bg:#2a1f18;
        }

        /* field */
        .kyc-input, .kyc-select {
          width:100%; padding:.8rem 1rem;
          background:var(--a-input); border:1.5px solid var(--a-border);
          border-radius:8px; font-family:var(--oc-sans); font-size:.9rem;
          font-weight:500; color:var(--a-fg); outline:none;
          transition:border-color .2s,box-shadow .2s;
          -webkit-appearance:none;
        }
        .kyc-input:focus,.kyc-select:focus { border-color:#c0392b; box-shadow:0 0 0 3px rgba(192,57,43,.12); }
        .kyc-select option { background:var(--a-option-bg); color:var(--a-fg); }
        .kyc-label {
          display:block; font-family:var(--oc-mono); font-size:.58rem;
          letter-spacing:.14em; text-transform:uppercase; color:var(--a-muted);
          margin-bottom:.4rem;
        }
        .kyc-err { color:#ef4444; font-size:.75rem; margin-top:.3rem; }

        /* dropzone */
        .kyc-drop {
          border:2px dashed var(--a-border); border-radius:10px;
          padding:2rem 1rem; text-align:center; cursor:pointer;
          transition:border-color .2s,background .2s;
        }
        .kyc-drop:hover,.kyc-drop-active { border-color:#c0392b; background:rgba(192,57,43,.04); }
        .kyc-drop-disabled { opacity:.5; cursor:not-allowed; }

        /* submit btn — border always present to prevent layout shift */
        .kyc-btn-submit {
          border: 1.5px solid transparent !important;
          transition: background .22s, transform .15s, box-shadow .22s, border-color .22s !important;
        }
        .kyc-btn-submit:hover:not(:disabled) {
          background: linear-gradient(135deg,#c0392b,#e74c3c) !important;
          border-color: transparent !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(192,57,43,.35);
          color: #f5f0e8 !important;
        }
        /* dark mode — only change border colour, never the width */
        .dark .kyc-btn-submit:not(:hover) {
          background: rgba(245,240,232,0.07) !important;
          border-color: rgba(245,240,232,0.16) !important;
          color: #f5f0e8 !important;
        }

        @keyframes kGlowA { from{transform:translate(0,0)} to{transform:translate(45px,60px)} }
        @keyframes kFadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .kyc-fade { animation:kFadeUp .4s ease both; }
      `}</style>

      {/* cursor */}
      <div ref={dotRef}  className="kyc-dot" />
      <div ref={ringRef} className="kyc-ring" />

      {/* ════ LAYOUT ════ */}
      <div className="grid md:grid-cols-[340px_1fr] min-h-screen">

        {/* ══ LEFT — always dark ══ */}
        <div className="hidden md:flex flex-col bg-[#120e0a] relative overflow-hidden" style={{ padding: "2.6rem 2.4rem" }}>
          {/* glow */}
          <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, top: -100, left: -100, background: "radial-gradient(circle,rgba(155,44,44,.16) 0%,transparent 65%)", animation: "kGlowA 18s ease-in-out infinite alternate" }} />
          {/* watermark */}
          <div className="oc-serif absolute pointer-events-none select-none" style={{ bottom: "-1rem", left: "-1rem", fontSize: "16vw", fontWeight: 300, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.03)", fontStyle: "italic", whiteSpace: "nowrap" }}>
            Verify
          </div>

          {/* brand */}
          <div className="relative z-10 flex items-center justify-between mb-10">
            <OCLogo light size="md" />
          </div>

          {/* heading */}
          <div className="relative z-10 mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div style={{ width: 28, height: 1, background: rust }} />
              <span className="oc-mono" style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,240,232,.3)" }}>Identity verification</span>
            </div>
            <h2 className="oc-serif" style={{ fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 300, lineHeight: .96, letterSpacing: "-.02em", color: cream }}>
              Complete your<br /><em style={{ fontStyle: "italic", color: rust }}>profile.</em>
            </h2>
            <p style={{ fontSize: ".82rem", color: "rgba(245,240,232,.4)", lineHeight: 1.7, marginTop: ".8rem", fontWeight: 500, maxWidth: 240 }}>
              Verify your identity to unlock all trading and copy features.
            </p>
          </div>

          {/* vertical stepper */}
          <div className="relative z-10 flex flex-col gap-0">
            {STAGES.map((s, i) => {
              const done    = i < currentStage;
              const active  = i === currentStage;
              const pending = i > currentStage;
              return (
                <div key={i} className="flex gap-3">
                  {/* line + dot column */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center rounded-full shrink-0 transition-all duration-300"
                      style={{ width: 32, height: 32, background: done ? rust : active ? "rgba(192,57,43,.25)" : "rgba(255,255,255,.06)", border: active ? `1.5px solid ${rust}` : done ? "none" : "1.5px solid rgba(255,255,255,.1)", color: done ? "white" : active ? rust : "rgba(245,240,232,.3)", fontSize: ".8rem", fontWeight: 800 }}>
                      {done ? <Check size={14}/> : <span>{i + 1}</span>}
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className="transition-all duration-500" style={{ width: 1.5, flex: 1, minHeight: 28, background: i < currentStage ? rust : "rgba(255,255,255,.08)", margin: "4px 0" }} />
                    )}
                  </div>
                  {/* label */}
                  <div style={{ paddingBottom: i < STAGES.length - 1 ? "1.1rem" : 0, paddingTop: ".4rem" }}>
                    <p style={{ fontSize: ".82rem", fontWeight: 700, color: active ? cream : done ? "rgba(245,240,232,.55)" : "rgba(245,240,232,.25)", transition: "color .3s" }}>
                      {s.title}
                    </p>
                    {active && (
                      <p style={{ fontSize: ".72rem", color: "rgba(245,240,232,.35)", marginTop: ".15rem", lineHeight: 1.5 }}>{s.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* spacer */}
          <div className="flex-1" />

          {/* security badges */}
          <div className="relative z-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div className="flex flex-col gap-2">
              {[
                [<Lock size={12}/>,        "SSL encryption"],
                [<Shield size={12}/>,      "256-bit AES encryption"],
                [<FileCheck size={12}/>,   "GDPR compliant"],
                [<CheckCircle2 size={12}/>, "Regulated by CySEC, FCA, SEC"],
              ].map(([icon, label], i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: "rgba(192,57,43,.7)", flexShrink: 0 }}>{icon as React.ReactNode}</span>
                  <span className="oc-mono" style={{ fontSize: ".6rem", color: "rgba(245,240,232,.3)", letterSpacing: ".04em" }}>{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT — themed form ══ */}
        <div className="relative flex flex-col min-h-screen overflow-y-auto bg-[#f5f0e8] dark:bg-[#1c1510]">

          {/* top bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between bg-[rgba(245,240,232,0.92)] dark:bg-[rgba(28,21,16,0.92)] backdrop-blur-lg border-b border-[#d6cfc2] dark:border-[rgba(255,255,255,0.07)]" style={{ padding: ".9rem clamp(1.2rem,4vw,3rem)" }}>
            {/* mobile: brand */}
            <div className="flex md:hidden">
              <OCLogo size="sm" />
            </div>

            {/* mobile step dots */}
            <div className="flex md:hidden items-center gap-1.5">
              {STAGES.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-300" style={{ width: i === currentStage ? 20 : 6, height: 6, background: i < currentStage ? rust : i === currentStage ? rust : "var(--a-border)" }} />
              ))}
            </div>

            {/* desktop: progress text */}
            <div className="hidden md:flex items-center gap-2">
              <span className="oc-mono" style={{ fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--a-muted)" }}>
                Step {currentStage + 1} of {STAGES.length}
              </span>
              <span className="text-[#1c1510] dark:text-[#f5f0e8] font-bold" style={{ fontSize: ".85rem" }}>— {STAGES[currentStage].title}</span>
            </div>

            {/* theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-9 h-9 rounded-full border border-[#d6cfc2] dark:border-[rgba(255,255,255,0.1)] bg-transparent flex items-center justify-center text-[#1c1510] dark:text-[#f5f0e8] cursor-pointer transition-all"
            >
              {mounted ? (isDark ? <Sun size={14}/> : <Moon size={14}/>) : <Moon size={14}/>}
            </button>
          </div>

          {/* form body */}
          <div className="flex-1 flex flex-col" style={{ padding: "2rem clamp(1.2rem,4vw,3rem) 3rem" }}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div key={currentStage}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col"
                >
                  {/* stage header */}
                  <div className="mb-7">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 36, height: 36, background: rust, color: "white" }}>
                        {STAGES[currentStage].icon}
                      </div>
                      <div>
                        <h2 className="oc-serif text-[#1c1510] dark:text-[#f5f0e8]" style={{ fontSize: "1.9rem", fontWeight: 300, lineHeight: 1, letterSpacing: "-.02em" }}>
                          {STAGES[currentStage].title}
                        </h2>
                        <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".78rem", marginTop: ".2rem" }}>
                          {STAGES[currentStage].desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ─── STAGE 0: Personal ─── */}
                  {currentStage === 0 && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="kyc-label">Title</label>
                        <select {...register("title")} className="kyc-select">
                          <option value="">Select Title</option>
                          <option value="mr">Mr.</option>
                          <option value="mrs">Mrs.</option>
                          <option value="ms">Ms.</option>
                          <option value="dr">Dr.</option>
                          <option value="prof">Prof.</option>
                        </select>
                        {errors.title && <p className="kyc-err">{errors.title.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="kyc-label">First Name</label>
                          <input type="text" {...register("first_name")} placeholder="John" className="kyc-input"/>
                          {errors.first_name && <p className="kyc-err">{errors.first_name.message}</p>}
                        </div>
                        <div>
                          <label className="kyc-label">Last Name</label>
                          <input type="text" {...register("last_name")} placeholder="Doe" className="kyc-input"/>
                          {errors.last_name && <p className="kyc-err">{errors.last_name.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="kyc-label">Date of Birth</label>
                        <input type="date" {...register("dob")} className="kyc-input"/>
                        {errors.dob && <p className="kyc-err">{errors.dob.message}</p>}
                      </div>
                    </div>
                  )}

                  {/* ─── STAGE 1: Financial ─── */}
                  {currentStage === 1 && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="kyc-label">Currency</label>
                        <select {...register("currency")} className="kyc-select">
                          <option value="">Select Currency</option>
                          <option value="USD">USD — US Dollar</option>
                          <option value="EUR">EUR — Euro</option>
                          <option value="GBP">GBP — British Pound</option>
                          <option value="CAD">CAD — Canadian Dollar</option>
                          <option value="AUD">AUD — Australian Dollar</option>
                          <option value="JPY">JPY — Japanese Yen</option>
                        </select>
                        {errors.currency && <p className="kyc-err">{errors.currency.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="kyc-label">Employment Status</label>
                          <select {...register("status_of_employment")} className="kyc-select">
                            <option value="">Select Status</option>
                            <option value="employed">Employed</option>
                            <option value="self_employed">Self-Employed</option>
                            <option value="unemployed">Unemployed</option>
                            <option value="student">Student</option>
                            <option value="retired">Retired</option>
                          </select>
                          {errors.status_of_employment && <p className="kyc-err">{errors.status_of_employment.message}</p>}
                        </div>
                        <div>
                          <label className="kyc-label">Source of Income</label>
                          <select {...register("source_of_income")} className="kyc-select">
                            <option value="">Select Source</option>
                            <option value="salary">Salary</option>
                            <option value="business">Business</option>
                            <option value="investments">Investments</option>
                            <option value="pension">Pension</option>
                            <option value="savings">Savings</option>
                            <option value="inheritance">Inheritance</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.source_of_income && <p className="kyc-err">{errors.source_of_income.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="kyc-label">Industry</label>
                        <select {...register("industry")} className="kyc-select">
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="retail">Retail</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="construction">Construction</option>
                          <option value="agriculture">Agriculture</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="transportation">Transportation</option>
                          <option value="real_estate">Real Estate</option>
                          <option value="legal">Legal</option>
                          <option value="media">Media & Entertainment</option>
                          <option value="government">Government</option>
                          <option value="non_profit">Non-Profit</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.industry && <p className="kyc-err">{errors.industry.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="kyc-label">Annual Income (USD)</label>
                          <select {...register("annual_amount")} className="kyc-select">
                            <option value="">Select Range</option>
                            <option value="0-15k">Up to $15,000</option>
                            <option value="15k-50k">$15,000 – $50,000</option>
                            <option value="50k-200k">$50,000 – $200,000</option>
                            <option value="200k-500k">$200,000 – $500,000</option>
                            <option value="500k-1m">$500,000 – $1M</option>
                            <option value="1m-3m">$1M – $3M</option>
                            <option value="3m+">Over $3M</option>
                          </select>
                          {errors.annual_amount && <p className="kyc-err">{errors.annual_amount.message}</p>}
                        </div>
                        <div>
                          <label className="kyc-label">Estimated Net Worth (USD)</label>
                          <select {...register("estimated_net_worth")} className="kyc-select">
                            <option value="">Select Range</option>
                            <option value="0-50k">Up to $50,000</option>
                            <option value="50k-100k">$50,000 – $100,000</option>
                            <option value="100k-500k">$100,000 – $500,000</option>
                            <option value="500k-1m">$500,000 – $1M</option>
                            <option value="1m-5m">$1M – $5M</option>
                            <option value="5m+">Over $5M</option>
                          </select>
                          {errors.estimated_net_worth && <p className="kyc-err">{errors.estimated_net_worth.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── STAGE 2: Address ─── */}
                  {currentStage === 2 && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="kyc-label">Street Address</label>
                        <input type="text" {...register("address")} placeholder="123 Main Street" className="kyc-input"/>
                        {errors.address && <p className="kyc-err">{errors.address.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="kyc-label">City</label>
                          <input type="text" {...register("city")} placeholder="New York" className="kyc-input"/>
                          {errors.city && <p className="kyc-err">{errors.city.message}</p>}
                        </div>
                        <div>
                          <label className="kyc-label">Province / State</label>
                          <input type="text" {...register("region")} placeholder="NY" className="kyc-input"/>
                          {errors.region && <p className="kyc-err">{errors.region.message}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="kyc-label">Postal / Zip Code</label>
                          <input type="text" {...register("postal_code")} placeholder="10001" className="kyc-input"/>
                          {errors.postal_code && <p className="kyc-err">{errors.postal_code.message}</p>}
                        </div>
                        <div>
                          <label className="kyc-label">Phone Number</label>
                          <input type="tel" {...register("phone")} placeholder={countryCallingCode ? `${countryCallingCode} 234 567 8900` : "+1 234 567 8900"} className="kyc-input"/>
                          {errors.phone && <p className="kyc-err">{errors.phone.message}</p>}
                          {countryCallingCode && <p style={{ fontSize: ".72rem", color: "var(--a-muted)", marginTop: ".25rem" }}>Country code {countryCallingCode} detected</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── STAGE 3: Identity ─── */}
                  {currentStage === 3 && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="kyc-label">Identification Type</label>
                        <select {...register("id_type")} className="kyc-select">
                          <option value="">Select ID Type</option>
                          <option value="passport">Passport</option>
                          <option value="driver_license">Driver&apos;s License</option>
                          <option value="national_id">National ID</option>
                          <option value="voter_card">Voter&apos;s Card</option>
                        </select>
                        {errors.id_type && <p className="kyc-err">{errors.id_type.message}</p>}
                      </div>

                      {/* Front ID */}
                      <div>
                        <label className="kyc-label">Front of ID</label>
                        {!idFrontPreview ? (
                          <div {...getFrontRoot()} className={`kyc-drop ${isDragFront ? "kyc-drop-active" : ""} ${uploadingFront ? "kyc-drop-disabled" : ""}`}>
                            <input {...getFrontInput()}/>
                            <Upload className="mx-auto mb-3 text-[#8c7b6a] dark:text-[rgba(245,240,232,0.3)]" size={32}/>
                            <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".85rem", fontWeight: 500 }}>Drag & drop or click to upload</p>
                            <p className="oc-mono mt-1" style={{ fontSize: ".6rem", color: "var(--a-muted)", letterSpacing: ".08em" }}>JPEG · PNG · WebP · Max 10MB</p>
                          </div>
                        ) : (
                          <div className="relative w-full h-44 rounded-lg overflow-hidden group">
                            <Image src={idFrontPreview} alt="Front ID" fill className="object-cover"/>
                            {uploadingFront && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)" }}>
                                <Loader2 className="animate-spin mb-2" size={28} color="#f5f0e8"/>
                                <p style={{ color: "#f5f0e8", fontSize: ".82rem", fontWeight: 600 }}>Uploading…</p>
                              </div>
                            )}
                            {!uploadingFront && (
                              <button type="button" onClick={() => { setIdFrontUrl(null); setIdFrontPreview(null); }}
                                className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-red-500 hover:bg-red-600 text-white p-1.5">
                                <X size={14}/>
                              </button>
                            )}
                            {idFrontUrl && !uploadingFront && (
                              <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "#22c55e", color: "white", fontSize: ".72rem", fontWeight: 700 }}>
                                <Check size={11}/> Uploaded
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Back ID */}
                      <div>
                        <label className="kyc-label">Back of ID</label>
                        {!idBackPreview ? (
                          <div {...getBackRoot()} className={`kyc-drop ${isDragBack ? "kyc-drop-active" : ""} ${uploadingBack ? "kyc-drop-disabled" : ""}`}>
                            <input {...getBackInput()}/>
                            <Upload className="mx-auto mb-3 text-[#8c7b6a] dark:text-[rgba(245,240,232,0.3)]" size={32}/>
                            <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".85rem", fontWeight: 500 }}>Drag & drop or click to upload</p>
                            <p className="oc-mono mt-1" style={{ fontSize: ".6rem", color: "var(--a-muted)", letterSpacing: ".08em" }}>JPEG · PNG · WebP · Max 10MB</p>
                          </div>
                        ) : (
                          <div className="relative w-full h-44 rounded-lg overflow-hidden group">
                            <Image src={idBackPreview} alt="Back ID" fill className="object-cover"/>
                            {uploadingBack && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ background: "rgba(0,0,0,.7)", backdropFilter: "blur(4px)" }}>
                                <Loader2 className="animate-spin mb-2" size={28} color="#f5f0e8"/>
                                <p style={{ color: "#f5f0e8", fontSize: ".82rem", fontWeight: 600 }}>Uploading…</p>
                              </div>
                            )}
                            {!uploadingBack && (
                              <button type="button" onClick={() => { setIdBackUrl(null); setIdBackPreview(null); }}
                                className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-red-500 hover:bg-red-600 text-white p-1.5">
                                <X size={14}/>
                              </button>
                            )}
                            {idBackUrl && !uploadingBack && (
                              <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "#22c55e", color: "white", fontSize: ".72rem", fontWeight: 700 }}>
                                <Check size={11}/> Uploaded
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* security note */}
                      <div className="flex items-start gap-3 rounded-xl p-4 mt-1" style={{ background: "rgba(192,57,43,.06)", border: "1px solid rgba(192,57,43,.18)" }}>
                        <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "rgba(192,57,43,.12)" }}>
                          <Shield size={16} color={rust}/>
                        </div>
                        <div>
                          <p className="text-[#1c1510] dark:text-[#f5f0e8] font-bold mb-1" style={{ fontSize: ".85rem" }}>Privacy & Security</p>
                          <p className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)]" style={{ fontSize: ".78rem", lineHeight: 1.55 }}>Your documents are encrypted and used only for regulatory KYC compliance. We never share them with third parties.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-3 mt-8 pt-6" style={{ borderTop: "1px solid var(--a-line)" }}>
                    {currentStage > 0 && (
                      <button type="button" onClick={() => setCurrentStage(s => s - 1)}
                        className="flex items-center gap-2 rounded-lg font-bold uppercase tracking-wider text-[#1c1510] dark:text-[#f5f0e8] cursor-pointer transition-all hover:opacity-70"
                        style={{ flex: 1, padding: ".95rem", border: "1.5px solid var(--a-border)", background: "transparent", fontSize: ".78rem", letterSpacing: ".1em" }}>
                        <ArrowLeft size={16}/> Back
                      </button>
                    )}

                    {currentStage < 3 ? (
                      <button type="button" onClick={handleNext}
                        className="kyc-btn-submit flex items-center justify-center gap-2 rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-wider cursor-pointer transition-all"
                        style={{ flex: 2, padding: ".95rem", border: "none", background: "#1c1510", fontSize: ".82rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
                        Continue <ArrowRight size={16}/>
                      </button>
                    ) : (
                      <button type="submit" disabled={loading || uploadingFront || uploadingBack}
                        className="kyc-btn-submit flex items-center justify-center gap-2 rounded-lg text-[#f5f0e8] font-extrabold uppercase tracking-wider cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ flex: 2, padding: ".95rem", border: "none", background: "#1c1510", fontSize: ".82rem", letterSpacing: ".1em", boxShadow: "0 4px 18px rgba(28,21,16,.2)" }}>
                        {loading ? <><Loader2 size={16} className="animate-spin"/> Submitting…</> : <>Submit KYC <CheckCircle2 size={16}/></>}
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

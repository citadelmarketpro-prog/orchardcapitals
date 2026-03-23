"use client";

import React, { useState, useEffect } from "react";
import OCLogo from "@/components/site/OCLogo";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Darker_Grotesque,
} from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","600"], style: ["normal","italic"], variable: "--oc-serif", display: "swap" });
const ibmMono   = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500","600"], variable: "--oc-mono", display: "swap" });
const grotesque = Darker_Grotesque({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--oc-sans", display: "swap" });

const OnboardingLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const phases = [
    {
      label: "Initializing secure connection",
      icon: Shield,
    },
    {
      label: "Configuring trading environment",
      icon: BarChart3,
    },
    {
      label: "Loading market instruments",
      icon: Globe,
    },
    {
      label: "Finalizing account setup",
      icon: Zap,
    },
  ];

  // Smooth progress bar that moves through phases
  useEffect(() => {
    if (isComplete) return;

    const totalDuration = 12000; // 12 seconds total
    const interval = 50;
    const increment = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isComplete]);

  // Update phase based on progress
  useEffect(() => {
    const phaseIndex = Math.min(
      Math.floor(progress / (100 / phases.length)),
      phases.length - 1,
    );
    setCurrentPhase(phaseIndex);
  }, [progress, phases.length]);

  const handleComplete = () => {
    router.push("/kyc");
  };

  if (!mounted) return null;

  return (
    <div className={`${cormorant.variable} ${ibmMono.variable} ${grotesque.variable} min-h-screen bg-[#f5f0e8] dark:bg-[#0e0804] flex items-center justify-center p-6 transition-colors duration-500 overflow-hidden relative`}
      style={{ fontFamily: "var(--oc-sans,'Darker Grotesque',sans-serif)" }}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(193,78,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(193,78,42,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-lg w-full">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Brand */}
              <motion.div
                className="mb-12 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <OCLogo size="lg" />
              </motion.div>

              {/* Animated icon */}
              <motion.div
                className="mb-10 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#c14e2a]/20 rounded-full"
                    style={{ width: 100, height: 100, margin: "-10px" }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#c14e2a] rounded-full" />
                  </motion.div>

                  <div className="w-20 h-20 bg-gradient-to-br from-[#c14e2a] to-[#a8401f] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Progress percentage */}
              <motion.div
                className="mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-4xl font-bold text-[#1c1510] dark:text-[#f5f0e8] tabular-nums" style={{ fontFamily: "var(--oc-serif,'Cormorant Garamond',serif)", fontWeight: 300, fontSize: "4rem" }}>
                  {Math.round(progress)}%
                </span>
              </motion.div>

              {/* Current phase text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-8"
                  style={{ fontFamily: "var(--oc-mono,'IBM Plex Mono',monospace)", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase" }}
                >
                  {phases[currentPhase].label}
                </motion.p>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto mb-10">
                <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c14e2a] to-[#e07040] rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Phase indicators */}
              <motion.div
                className="flex justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {phases.map((phase, index) => {
                  const Icon = phase.icon;
                  const isActive = index === currentPhase;
                  const isDone = index < currentPhase;

                  return (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center gap-2"
                      animate={{
                        opacity: isDone ? 0.4 : isActive ? 1 : 0.25,
                      }}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isDone
                            ? "bg-[#c14e2a]/10 dark:bg-[#c14e2a]/10"
                            : isActive
                              ? "bg-[#c14e2a]/15 dark:bg-[#c14e2a]/15 ring-2 ring-[#c14e2a]/30"
                              : "bg-gray-100 dark:bg-gray-800/50"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#c14e2a]" />
                        ) : (
                          <Icon
                            className={`w-5 h-5 ${
                              isActive
                                ? "text-[#c14e2a]"
                                : "text-gray-400 dark:text-gray-600"
                            }`}
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              {/* Success icon */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  delay: 0.2,
                }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-[#c14e2a]/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ width: 128, height: 128, margin: "-16px" }}
                  />
                  <div className="w-24 h-24 bg-gradient-to-br from-[#c14e2a] to-[#a8401f] rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Success text */}
              <motion.h2
                className="text-[#1c1510] dark:text-[#f5f0e8] mb-3"
                style={{ fontFamily: "var(--oc-serif,'Cormorant Garamond',serif)", fontSize: "2.4rem", fontWeight: 300, letterSpacing: "-.02em", lineHeight: 1.1 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Account configured
              </motion.h2>

              <motion.p
                className="text-[#8c7b6a] dark:text-[rgba(245,240,232,0.45)] mb-10 max-w-sm mx-auto leading-relaxed"
                style={{ fontSize: ".92rem", fontWeight: 500 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Your trading environment is ready. Complete identity
                verification to unlock full platform access.
              </motion.p>

              {/* CTA */}
              <motion.button
                onClick={handleComplete}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c14e2a] hover:bg-[#a8401f] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Verification
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.p
                className="mt-6 text-[#8c7b6a]/60 dark:text-[rgba(245,240,232,0.25)]"
                style={{ fontFamily: "var(--oc-mono,'IBM Plex Mono',monospace)", fontSize: ".6rem", letterSpacing: ".1em", textTransform: "uppercase" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                This usually takes 2-3 minutes
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingLoading;

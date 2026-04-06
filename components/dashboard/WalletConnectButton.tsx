"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function WalletConnectButton() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="shrink-0"
    >
      {/* Shimmer border wrapper */}
      <div className="wallet-shimmer-wrapper">
        <motion.button
          onClick={() => router.push("/connect-wallet")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white dark:bg-[#1c0f06] text-gray-900 dark:text-white font-semibold text-sm whitespace-nowrap transition-colors"
        >
          {/* Wallet icon */}
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#c14e2a]/10 dark:bg-[#c14e2a]/20">
            <svg
              className="w-4 h-4 text-[#c14e2a] dark:text-[#e8784e]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </span>

          <span>
            <span className="text-[#c14e2a] dark:text-[#e8784e]">Wallet</span>
            {" "}Connect
          </span>

          {/* Animated dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c14e2a] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c14e2a]" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

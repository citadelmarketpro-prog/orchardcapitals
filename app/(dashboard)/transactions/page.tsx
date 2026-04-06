"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { Transaction } from "@/components/dashboard/modals/types";

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal">("all");
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/transactions/history/?limit=50&type=${filter}`);
      const data = await res.json();
      if (data.success) setTransactions(data.transactions);
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelWithdrawal = async (txId: number) => {
    setCancelling(txId);
    try {
      const res = await apiFetch(`/withdrawals/${txId}/cancel/`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Withdrawal cancelled successfully.");
        setTransactions((prev) =>
          prev.map((tx) =>
            tx.id === txId
              ? { ...tx, status: "cancelled", status_display: "Cancelled" }
              : tx
          )
        );
      } else {
        toast.error(data.error || "Failed to cancel withdrawal.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setCancelling(null);
      setConfirmCancelId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":  return "bg-green-500/20 text-green-400";
      case "failed":     return "bg-red-500/20 text-red-400";
      case "cancelled":  return "bg-gray-400/20 text-gray-400";
      default:           return "bg-yellow-500/20 text-yellow-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 px-1">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
          Transaction History
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View all your deposits and withdrawals
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {(["all", "deposit", "withdrawal"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === f
                ? "bg-[#c14e2a] text-white shadow-sm"
                : "bg-white/90 dark:bg-[#1c0f06]/80 border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            {f === "all" ? "All" : f === "deposit" ? "Deposits" : "Withdrawals"}
          </button>
        ))}
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white/90 dark:bg-[#1c0f06]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Info className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No transactions found</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {filter !== "all"
                ? `No ${filter}s to display. Try switching filters.`
                : "Your transaction history will appear here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {transactions.map((tx) => {
              const isPendingWithdrawal =
                tx.transaction_type === "withdrawal" && tx.status === "pending";
              const isConfirming = confirmCancelId === tx.id;
              const isCancelling = cancelling === tx.id;

              return (
                <div
                  key={tx.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* Main row */}
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      tx.transaction_type === "deposit"
                        ? "bg-green-500/15"
                        : "bg-red-500/15"
                    }`}>
                      {tx.transaction_type === "deposit" ? (
                        <ArrowDownRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      )}
                    </div>

                    {/* Info + meta */}
                    <div className="flex-1 min-w-0">
                      {/* Top line: type + amount */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {tx.transaction_type_display}
                        </p>
                        <p className={`text-sm font-bold shrink-0 ${
                          tx.transaction_type === "deposit"
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}>
                          {tx.transaction_type === "deposit" ? "+" : "-"}${parseFloat(tx.amount).toFixed(2)}
                        </p>
                      </div>

                      {/* Second line: ref + currency + status */}
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <p className="text-[10px] text-gray-500 font-mono truncate max-w-35 sm:max-w-none">
                          {tx.reference}
                        </p>
                        {tx.currency && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-gray-200 dark:bg-white/5 rounded text-gray-600 dark:text-gray-400 shrink-0">
                            {tx.currency}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${getStatusColor(tx.status)}`}>
                          {tx.status_display}
                        </span>
                      </div>

                      {/* Third line: date + cancel button */}
                      <div className="flex items-center justify-between gap-2 mt-1.5 flex-wrap">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">
                          {formatDate(tx.created_at)}
                        </p>
                        {isPendingWithdrawal && !isConfirming && (
                          <button
                            onClick={() => setConfirmCancelId(tx.id)}
                            className="text-[10px] font-medium px-2.5 py-1 rounded-lg border border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors whitespace-nowrap shrink-0"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inline confirm strip */}
                  <AnimatePresence>
                    {isConfirming && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                            <p className="text-xs text-red-700 dark:text-red-400">
                              Cancel withdrawal of{" "}
                              <span className="font-bold">${parseFloat(tx.amount).toFixed(2)}</span>?
                              {" "}This cannot be undone.
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            <button
                              onClick={() => handleCancelWithdrawal(tx.id)}
                              disabled={isCancelling}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-60 flex items-center gap-1.5"
                            >
                              {isCancelling ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : null}
                              {isCancelling ? "Cancelling…" : "Yes, cancel"}
                            </button>
                            <button
                              onClick={() => setConfirmCancelId(null)}
                              disabled={isCancelling}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/15 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}

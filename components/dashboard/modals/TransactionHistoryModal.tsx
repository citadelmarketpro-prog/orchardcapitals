"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Loader2, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { Transaction } from "./types";

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransactionHistoryModal({
  isOpen,
  onClose,
}: TransactionHistoryModalProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "deposit" | "withdrawal">("all");
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) fetchTransactions();
  }, [isOpen, filter]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/transactions/history/?limit=20&type=${filter}`);
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
      case "completed": return "bg-green-500/20 text-green-400";
      case "failed":    return "bg-red-500/20 text-red-400";
      case "cancelled": return "bg-gray-400/20 text-gray-400";
      default:          return "bg-yellow-500/20 text-yellow-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0e0804] border border-gray-200 dark:border-white/10 shadow-2xl"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Transaction History
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-5">
              {(["all", "deposit", "withdrawal"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    filter === f
                      ? "bg-[#c14e2a] text-white"
                      : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  {f === "all" ? "All" : f === "deposit" ? "Deposits" : "Withdrawals"}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12">
                <Info className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => {
                  const isPendingWithdrawal =
                    tx.transaction_type === "withdrawal" && tx.status === "pending";
                  const isConfirming = confirmCancelId === tx.id;
                  const isCancelling = cancelling === tx.id;

                  return (
                    <div
                      key={tx.id}
                      className="bg-gray-50 dark:bg-[#1c0f06]/80 border border-gray-200 dark:border-white/5 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
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
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {tx.transaction_type_display}
                            </p>
                            <p className="text-[10px] text-gray-500 font-mono">{tx.reference}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(tx.status)}`}>
                            {tx.status_display}
                          </span>
                          {isPendingWithdrawal && !isConfirming && (
                            <button
                              onClick={() => setConfirmCancelId(tx.id)}
                              className="text-[10px] font-medium px-2 py-0.5 rounded border border-red-200 dark:border-red-500/30 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-[10px] text-gray-500">{formatDate(tx.created_at)}</p>
                        <p className={`text-base font-bold ${
                          tx.transaction_type === "deposit" ? "text-green-400" : "text-red-400"
                        }`}>
                          {tx.transaction_type === "deposit" ? "+" : "-"}${parseFloat(tx.amount).toFixed(2)}
                        </p>
                      </div>

                      {tx.currency && (
                        <div className="mt-1.5">
                          <span className="text-[10px] px-2 py-0.5 bg-gray-200 dark:bg-white/5 rounded text-gray-600 dark:text-gray-400">
                            {tx.currency}
                          </span>
                        </div>
                      )}

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
                            <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              <p className="text-[10px] text-red-700 dark:text-red-400 flex-1">
                                Cancel <span className="font-bold">${parseFloat(tx.amount).toFixed(2)}</span>? This cannot be undone.
                              </p>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => handleCancelWithdrawal(tx.id)}
                                  disabled={isCancelling}
                                  className="text-[10px] font-semibold px-2.5 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-60 flex items-center gap-1"
                                >
                                  {isCancelling && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                                  {isCancelling ? "…" : "Yes"}
                                </button>
                                <button
                                  onClick={() => setConfirmCancelId(null)}
                                  disabled={isCancelling}
                                  className="text-[10px] font-medium px-2 py-1 rounded bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                  <X className="w-3 h-3" />
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Filter, X, UserCheck, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface ActiveTrader {
  trader_id: number;
  trader_name: string;
  trader_username: string;
  trader_avatar_url: string | null;
  trader_min_capital: string;
  cancel_requested: boolean;
}

interface Trade {
  id: number;
  trader_id: number | null;
  market: string;
  market_name: string;
  market_logo_url: string | null;
  direction: "buy" | "sell";
  direction_display: string;
  amount: string;
  entry_price: string;
  exit_price: string | null;
  profit_loss_percent: string;
  user_profit_loss: string;
  status: "open" | "closed";
  time_ago: string;
  is_profit: boolean;
  opened_at: string | null;
  closed_at: string | null;
  reference: string;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `${month} ${day}, ${year} ${time} ET`;
}

function maskAccountId(accountId: string | null): string {
  if (!accountId) return "Individual (••••0000)";
  return `Individual (••••${accountId.slice(-4)})`;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 last:border-0">
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-xs sm:text-sm text-right text-gray-900 dark:text-white">{children}</span>
    </div>
  );
}

export default function HistoryPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [activeTrader, setActiveTrader] = useState<ActiveTrader | null>(null);
  const [expandedTrades, setExpandedTrades] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedTrades((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    apiFetch("/profile/")
      .then((r) => r.json())
      .then((d) => { if (d.success) setAccountId(d.user?.account_id ?? null); })
      .catch(() => {});

    apiFetch("/copy-trader/active/")
      .then((r) => r.json())
      .then((d) => { if (d.success && d.is_copying) setActiveTrader(d as ActiveTrader); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchTrades();
  }, [statusFilter]);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      setError(null);
      let endpoint = "/copy-trader/history/?limit=100";
      if (statusFilter !== "all") endpoint += `&status=${statusFilter}`;
      const res = await apiFetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (data.success) {
        setTrades(data.trades || []);
        setTotalCount(data.total_count || 0);
      }
    } catch {
      setError("Failed to load trade history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Trade History
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {totalCount} {totalCount === 1 ? "trade" : "trades"} total
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1c0f06] border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2c1a0c]/50 transition-all"
          >
            <Filter className="w-4 h-4" />
            Filters
            {statusFilter !== "all" && (
              <span className="px-2 py-0.5 bg-[#c14e2a] text-white text-xs rounded-full">1</span>
            )}
          </button>
        </div>

        {/* Copying Trader Banner */}
        {activeTrader && (
          <Link href={`/explore-traders/${activeTrader.trader_id}`}>
            <div className="mb-6 flex items-center gap-4 p-4 bg-white dark:bg-[#1c0f06] border border-gray-200 dark:border-white/10 rounded-2xl hover:border-[#c14e2a]/40 transition-all cursor-pointer">
              {activeTrader.trader_avatar_url ? (
                <Image
                  src={activeTrader.trader_avatar_url}
                  alt={activeTrader.trader_name}
                  width={52}
                  height={52}
                  className="w-13 h-13 rounded-full object-cover shrink-0 border-2 border-emerald-200 dark:border-emerald-900/40"
                  unoptimized
                />
              ) : (
                <div className="w-13 h-13 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 text-emerald-600 font-bold text-lg">
                  {activeTrader.trader_name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Currently Copying</span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{activeTrader.trader_name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">@{activeTrader.trader_username} &middot; ID #{activeTrader.trader_id}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Min. Capital</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  ${parseFloat(activeTrader.trader_min_capital).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-white dark:bg-[#1c0f06] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filter Trades</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <div className="flex gap-2">
                {(["all", "open", "closed"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                      statusFilter === s
                        ? "bg-[#c14e2a] text-white"
                        : "bg-gray-100 dark:bg-[#0f1c35] text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-5 h-5 border-2 border-[#c14e2a] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={fetchTrades} className="px-6 py-2 bg-[#c14e2a] hover:bg-[#a8401f] text-white rounded-lg transition-colors text-sm">
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && trades.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">No trades yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs mb-6">
              {statusFilter !== "all"
                ? `No ${statusFilter} trades found`
                : "Start copying expert traders to see your trade history here"}
            </p>
            <Link href="/explore-traders">
              <button className="px-6 py-2.5 bg-[#c14e2a] hover:bg-[#a8401f] text-white text-sm font-semibold rounded-lg transition-colors">
                Explore Traders
              </button>
            </Link>
          </div>
        )}

        {/* Trade Detail Cards */}
        {!loading && !error && trades.length > 0 && (
          <div className="space-y-5">
            {trades.map((trade) => {
              const rawQty = parseFloat(trade.amount);
              const entryPrice = parseFloat(trade.entry_price);
              const pnl = parseFloat(trade.user_profit_loss);
              const pnlPct = parseFloat(trade.profit_loss_percent);

              // If quantity is 0 in DB, derive total cost from P&L and percentage
              let totalCost: number;
              let qty: number;
              if (rawQty > 0 && entryPrice > 0) {
                totalCost = rawQty * entryPrice;
                qty = rawQty;
              } else if (Math.abs(pnlPct) > 0 && Math.abs(pnl) > 0) {
                totalCost = Math.abs(pnl) / (Math.abs(pnlPct) / 100);
                qty = entryPrice > 0 ? totalCost / entryPrice : 0;
              } else {
                totalCost = 0;
                qty = 0;
              }

              const marketValue = totalCost + pnl;
              const isFilled = trade.status === "closed";
              const pnlSign = trade.is_profit ? "+" : "-";
              const pnlColor = trade.is_profit
                ? "text-green-500"
                : "text-red-500";

              return (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#0f0f0f] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden"
                >
                  {/* ── Asset Header ── */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      {trade.market_logo_url ? (
                        <Image
                          src={trade.market_logo_url}
                          alt={trade.market_name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-xl object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                          {trade.market.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight">
                          {trade.market}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-tight">
                          {trade.market_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm sm:text-base font-bold ${pnlColor}`}>
                        {pnlSign}${Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className={`text-[11px] sm:text-xs ${pnlColor}`}>
                        ({pnlSign}{Math.abs(pnlPct).toFixed(2)}%)
                      </p>
                    </div>
                  </div>

                  {/* ── Detail Rows ── */}
                  <div className="px-5">
                    <Row label="Direction">
                      <span className={`font-semibold ${trade.direction === "buy" ? "text-green-500" : "text-red-500"}`}>
                        {trade.direction_display.toUpperCase()}
                      </span>
                    </Row>
                    <Row label="Quantity">{qty.toFixed(4)}</Row>
                    <Row label="Filled Price">
                      ${entryPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Row>
                    <Row label="Total Cost">
                      ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Row>
                    <Row label="Market Value">
                      ${marketValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Row>
                    <Row label="Unrealized P/L">
                      <span className={pnlColor}>
                        {pnlSign}${Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                        ({pnlSign}{Math.abs(pnlPct).toFixed(2)}%)
                      </span>
                    </Row>
                    <Row label="Status">
                      <span className="font-semibold">{isFilled ? "Filled" : "Unfilled"}</span>
                    </Row>
                  </div>

                  {/* ── Toggle Button ── */}
                  <div className="px-5 pb-4">
                    <button
                      onClick={() => toggleExpand(trade.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-100 dark:border-white/10 rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                      {expandedTrades.has(trade.id) ? (
                        <><ChevronUp className="w-3.5 h-3.5" /> Hide details</>
                      ) : (
                        <><ChevronDown className="w-3.5 h-3.5" /> Load more details</>
                      )}
                    </button>
                  </div>

                  {/* ── Order Details + Fills (collapsible) ── */}
                  {expandedTrades.has(trade.id) && (
                    <>
                      <div className="px-5 pb-4">
                        <div className="bg-gray-50 dark:bg-white/4 rounded-xl p-4 grid grid-cols-2 gap-x-6 gap-y-5">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order Type</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Market</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order ID</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-all">{trade.reference}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time in Force</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Day</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{maskAccountId(accountId)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {isFilled ? "Filled" : "Opened"}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{formatDate(trade.opened_at)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Currency</p>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">USD</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-5">
                        <div className="border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden">
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Fills</p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs min-w-95">
                              <thead>
                                <tr className="border-b border-gray-100 dark:border-white/5">
                                  {["Time", "Qty", "Price", "Amount"].map((h) => (
                                    <th key={h} className="text-left text-gray-500 dark:text-gray-400 font-normal px-4 py-2">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-gray-700 dark:text-gray-300 px-4 py-3 whitespace-nowrap">
                                    {formatDate(trade.opened_at)}
                                  </td>
                                  <td className="text-gray-700 dark:text-gray-300 px-4 py-3 whitespace-nowrap">
                                    {qty.toFixed(4)}
                                  </td>
                                  <td className="text-gray-700 dark:text-gray-300 px-4 py-3 whitespace-nowrap">
                                    ${entryPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </td>
                                  <td className="text-gray-700 dark:text-gray-300 px-4 py-3 whitespace-nowrap">
                                    ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

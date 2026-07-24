"use client";
import { useState } from "react";
import PageWrapper, { OC, BLACK, WHITE, GRAY } from "../_components/PageWrapper";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

type ContentBlock =
  | { type: "text"; content: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] };

interface FAQEntry {
  question: string;
  content: ContentBlock[];
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQEntry[];
}

const categories: FAQCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        question: "What are digital options?",
        content: [
          { type: "text", content: "Option is a derivative financial instrument based on any underlying asset, such as a stock, a currency pair, oil, etc." },
          { type: "text", content: "Digital option - a non-standard option that is used to make a profit on price movements of such assets for a certain period of time." },
          { type: "text", content: "A digital option, depending on the terms agreed upon by the parties to the transaction, at a time determined by the parties, brings a fixed income (the difference between the trade income and the price of the asset) or loss (in the amount of the value of the asset)." },
          { type: "text", content: "Since the digital option is purchased in advance at a fixed price, the size of the profit, as well as the size of the potential loss, are known even before the trade." },
          { type: "text", content: "Another feature of these deals is the time limit. Any option has its own term (expiration time or conclusion time)." },
          { type: "text", content: "Regardless of the degree of change in the price of the underlying asset, in case of winning an option, a fixed payment is always made. Your risks are limited only by the amount for which the option is acquired." },
        ],
      },
      {
        question: "What are the varieties of digital options?",
        content: [
          { type: "text", content: "Making an option trade, you must choose the underlying asset that will underlie the option. Your forecast will be carried out on this asset." },
          { type: "text", content: "Simply, buying a digital contract, you are actually betting on the price movement of such an underlying asset." },
          { type: "text", content: 'An underlying asset is an "item" whose price is taken into account when concluding a trade. As the underlying asset of digital options, the most sought-after products on the markets usually act. There are four types of them:' },
          {
            type: "list",
            items: [
              "Securities (shares of world companies)",
              "Currency pairs (EUR / USD, GBP / USD, etc.)",
              "Raw materials and precious metals (oil, gold, etc.)",
              "Indices (S&P 500, Dow, dollar index, etc.)",
            ],
          },
          { type: "text", content: "There is no such thing as a universal underlying asset. When choosing it, you can only use your own knowledge, intuition, analytical info, and market analysis for that financial instrument." },
        ],
      },
      {
        question: "What is the gist of digital options trading?",
        content: [
          { type: "text", content: "A digital option is the simplest type of derivative financial instrument. To profit, you don't need to predict the exact price—just whether it will go up or down." },
          { type: "text", content: "The principle is to decide if the price will increase or decrease by the time the contract executes." },
          { type: "text", content: "It doesn't matter if the price goes up or down by one point or one hundred; the key is predicting the direction." },
          { type: "text", content: "If your prognosis is correct, you get a fixed income." },
        ],
      },
      {
        question: "How to learn quickly how to make money in the digital options market?",
        content: [
          { type: "text", content: "To profit, you need to correctly predict the price direction (up or down). For stable income:" },
          { type: "list", items: ["Develop your own trading strategies and follow them.", "Diversify your risks."] },
          { type: "text", content: "To create strategies and find diversification, monitor the market, study analytics and stats from various sources like expert opinions, internet resources, and the Company website." },
        ],
      },
      {
        question: "At what expense does the Company pay profit to the Client in case of successful trade?",
        content: [
          { type: "text", content: "The Company earns with clients. It benefits from a high share of successful trades due to a percentage of payments based on the strategy chosen by the Client." },
          { type: "text", content: "Additionally, all trades contribute to the Company's trading volume passed to brokers or exchanges, which feed into the liquidity pool and help improve market liquidity." },
        ],
      },
      {
        question: "Can I close my account? How to do it?",
        content: [
          { type: "text", content: 'You can delete your account in your Individual Account by clicking on the "Delete Account" button at the bottom of the profile page.' },
        ],
      },
      {
        question: "What is the expiration period of a trade?",
        content: [
          { type: "text", content: "The expiration period is the time after which the trade is completed and the result is summed up." },
          { type: "text", content: "When concluding a trade, you choose the execution time (e.g., 1 minute, 2 hours, a month, etc.)." },
        ],
      },
      {
        question: "What is a trading platform and why is it needed?",
        content: [
          { type: "text", content: "A trading platform is a software complex that lets Clients perform trades using various financial instruments. It also provides access to real-time quotes, market data, and Company actions." },
        ],
      },
      {
        question: "What are the possible results of the placed trades?",
        content: [
          { type: "text", content: "There are three possible outcomes in digital options:" },
          {
            type: "list",
            items: [
              "Your forecast is correct → you earn income.",
              "Your forecast is wrong → you lose only your investment.",
              "The outcome is zero (no price change) → you get your investment back.",
            ],
          },
        ],
      },
      {
        question: "Is the download of the program to a computer or smartphone required?",
        content: [
          { type: "text", content: "No, it's not required. You just need to register on the Company's website and open an individual account." },
        ],
      },
      {
        question: "In what currency is the Client's account opened? Can I change the currency of the Client's account?",
        content: [
          { type: "text", content: "By default, a trading account is opened in US dollars." },
          { type: "text", content: "However, you can change the currency anytime in your profile. Available currency options are listed there." },
        ],
      },
    ],
  },
  {
    id: "financial",
    label: "Financial",
    items: [
      {
        question: "What determines profit size?",
        content: [
          { type: "text", content: "There are several factors that affect the size of your profit:" },
          {
            type: "list",
            items: [
              "The liquidity of the asset (the more in demand, the more profit)",
              "The time of the trade (morning vs. afternoon liquidity)",
              "Brokerage company tariffs",
              "Market changes (e.g., economic events, asset changes)",
            ],
          },
        ],
      },
      {
        question: "How can I calculate the profit for a trade?",
        content: [
          { type: "text", content: "You do not have to calculate the profit yourself. Digital options offer a fixed profit per transaction." },
          { type: "text", content: "Example: A correct prediction may earn 90% of the value, regardless of how much the price changes." },
          { type: "text", content: "Steps to determine profit:" },
          {
            type: "ordered",
            items: [
              "Choose the asset",
              "Enter the price of the option",
              "Set the trade time — the platform calculates the exact percentage",
            ],
          },
          { type: "text", content: "Profit can be up to 98% of the investment. It's fixed upon acquisition, avoiding percentage drops later. Your balance updates automatically after the trade closes." },
        ],
      },
      {
        question: "What is the minimum deposit amount?",
        content: [
          { type: "text", content: "You can start trading with a small amount. The minimum deposit is 5000 US dollars." },
        ],
      },
      {
        question: "How to withdraw money from the account?",
        content: [
          { type: "text", content: "Withdrawals are made through your individual account using the same method as your deposit." },
          { type: "text", content: "Example: If you deposited via Visa, withdrawals will also use Visa." },
          { type: "text", content: "Large withdrawals may require verification. It's important to register the account in your name for proof." },
        ],
      },
      {
        question: "Is there any fee for depositing or withdrawing funds?",
        content: [
          { type: "text", content: "We do not charge fees for deposits or withdrawals. However, your bank or payment provider may apply transaction or currency conversion fees." },
          { type: "text", content: "For clients participating in mirror trading, a 5% brokerage fee on trade volume and a Pro Traders 15% performance fee on realized profits apply in accordance with the terms of the service. The performance fee is deducted only upon the withdrawal of realized profits." },
        ],
      },
      {
        question: "Do I need to deposit the trading platform account and how often?",
        content: [
          { type: "text", content: "To trade with real funds, yes, a deposit is required." },
          { type: "text", content: "You can also use a demo account for practice, strategy testing, and learning — no deposit needed for that." },
        ],
      },
      {
        question: "How can I deposit?",
        content: [
          {
            type: "ordered",
            items: [
              'Click the green "Deposit" button',
              "Select a deposit method",
              "Choose the deposit currency",
              "Enter the amount",
              "Copy your unique deposit address for the asset",
              "Initiate the transfer from your exchange or wallet",
              "Upload your receipt",
              "Confirm your deposit",
            ],
          },
        ],
      },
      {
        question: "How long does it take to withdraw funds?",
        content: [
          { type: "text", content: "Withdrawals typically take 1–5 days depending on request volume. The company aims to process on the same day." },
        ],
      },
      {
        question: "What is the minimum withdrawal amount?",
        content: [
          { type: "text", content: "Minimum withdrawal is 10 USD for most systems. For cryptocurrencies, it's 50 USD or more (e.g., Bitcoin)." },
        ],
      },
      {
        question: "Do I need to provide documents to withdraw?",
        content: [
          { type: "text", content: "Usually not, but the Company may request ID documents to prevent fraud or illegal activity. The process is simple and requires minimal documentation." },
        ],
      },
    ],
  },
  {
    id: "registration",
    label: "Registration & Verification",
    items: [
      {
        question: "What data is required to register on the Company website?",
        content: [
          { type: "text", content: "To register, you need to provide your name (in English), email address, phone number (with code), and a secure password. Once registered, you can fund your account to start trading." },
        ],
      },
      {
        question: "Can I use fake or someone else's information when registering?",
        content: [
          { type: "text", content: "No. You must enter accurate personal data. Mismatched info may lead to identity checks or account blocking." },
        ],
      },
      {
        question: "How do I know if I need to verify my account?",
        content: [
          { type: "text", content: "If verification is required, you'll be notified via email or SMS. Make sure your contact details are up to date." },
        ],
      },
      {
        question: "How long does the verification process take?",
        content: [
          { type: "text", content: "The verification process takes up to 5 minutes to 12 hours after you submit the required documents." },
        ],
      },
      {
        question: "I made a mistake entering my account data. How can I fix it?",
        content: [
          { type: "text", content: "Contact the technical support team via the Company's website to correct your account information." },
        ],
      },
      {
        question: "What is account verification?",
        content: [
          { type: "text", content: "Verification confirms your identity using documents such as a passport photo page, a selfie, or proof of address. Additional documents may be requested if needed." },
        ],
      },
      {
        question: "How will I know I've passed verification?",
        content: [
          { type: "text", content: "You'll receive an email and/or SMS notification once your account has been successfully verified and ready to use." },
        ],
      },
    ],
  },
];

/* ─── FAQ Item ─── */
interface FAQItemProps {
  question: string;
  content: ContentBlock[];
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, content, isOpen, onToggle }: FAQItemProps) {
  return (
    <div style={{ border: `1px solid ${isOpen ? OC + "40" : "#e5e7eb"}`, background: isOpen ? `${OC}08` : "transparent", borderRadius: 12, overflow: "hidden", transition: "background 0.2s, border-color 0.2s" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontWeight: 600, fontSize: 16, paddingRight: 16, color: isOpen ? OC : BLACK, transition: "color 0.2s" }}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" style={{ color: OC, flexShrink: 0 }} />
        ) : (
          <ChevronDown className="w-5 h-5" style={{ color: "#9ca3af", flexShrink: 0 }} />
        )}
      </button>

      <div style={{ maxHeight: isOpen ? 1200 : 0, opacity: isOpen ? 1 : 0, padding: isOpen ? "0 24px 22px" : "0 24px", overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
          {content.map((block, i) => {
            if (block.type === "text") {
              return (
                <p key={i} style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.7 }}>
                  {block.content}
                </p>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 4, listStyle: "none" }}>
                  {block.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "#4b5563", fontSize: 14, lineHeight: 1.6 }}>
                      <span style={{ marginTop: 7, width: 6, height: 6, borderRadius: "50%", background: OC, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "ordered") {
              return (
                <ol key={i} style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 4, listStyle: "none" }}>
                  {block.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#4b5563", fontSize: 14, lineHeight: 1.6 }}>
                      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: `${OC}15`, color: OC, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {j + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setOpenItem(null);
  };

  const currentItems = categories[activeTab].items;

  return (
    <PageWrapper
      ctaTitle="Still Have Questions?"
      ctaSubtitle="Our support team is available around the clock to help you get started.">

      {/* ── HERO ── */}
      <section style={{ background: BLACK, position: "relative", overflow: "hidden", padding: "96px 24px 80px" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: `radial-gradient(ellipse at center, ${OC}22 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <motion.img {...reveal} src="/landing/images/earth-75efc463.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${OC}18`, border: `1px solid ${OC}30`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: OC, display: "inline-block" }} />
            <span style={{ color: OC, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Help Center</span>
          </div>
          <motion.h1 {...reveal} style={{ fontFamily: "var(--oc-poppins)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: WHITE, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 20 }}>
            Frequently Asked<br /><em style={{ fontStyle: "italic", color: OC }}>Questions</em>
          </motion.h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            Everything you need to know about trading, accounts, deposits, and verification on Orchard Capitals.
          </p>
        </div>
      </section>

      {/* ── FAQ CONTENT ── */}
      <section style={{ background: WHITE, padding: "72px 24px 96px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* Category Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
            {categories.map((cat, idx) => {
              const active = activeTab === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(idx)}
                  style={{
                    borderRadius: 100,
                    padding: "9px 18px",
                    fontSize: 14,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                    background: active ? OC : GRAY,
                    color: active ? WHITE : "#374151",
                    boxShadow: active ? `0 4px 16px ${OC}40` : "none",
                  }}
                >
                  {cat.label}
                  <span style={{
                    marginLeft: 8,
                    borderRadius: 100,
                    padding: "1px 7px",
                    fontSize: 11,
                    background: active ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.08)",
                    color: active ? WHITE : "#6b7280",
                  }}>
                    {cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentItems.map((item, idx) => (
              <FAQItem
                key={`${activeTab}-${idx}`}
                question={item.question}
                content={item.content}
                isOpen={openItem === idx}
                onToggle={() => setOpenItem(openItem === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

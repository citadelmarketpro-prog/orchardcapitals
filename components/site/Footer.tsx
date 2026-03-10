"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Links */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Logo and App Downloads */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <span className="text-2xl font-bold">
                Scops<span className="text-[var(--primary)]">Trade</span>
              </span>
            </div>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              Copytrade with ScopsTrade
            </p>
        {/* Google and Apple store here */}
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              <FooterSection
                title="LEGALS"
                links={[
                  { label: "Terms Of Service", href: "/terms-of-service" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Cookies Policy", href: "/cookies-policy" },
                  { label: "Risk Disclaimer", href: "/risk-disclaimer" },
                  { label: "Conflict of Interest Policy", href: "/conflict-of-interest" },
                  { label: "Declaration of Consent", href: "/declaration-of-consent" },
                  { label: "End-User License Agreement", href: "/end-user-license-agreement" },
                ]}
              />
              <FooterSection
                title="FEATURES"
                links={[
                  { label: "AutoGuard TM", href: "/autoguard" },
                ]}
              />
              <FooterSection
                title="RESOURCES"
                links={[
                  { label: "Affiliate Guide", href: "/affiliate-guide" },
                  { label: "Leader Guide", href: "/leader-guide" },
                  { label: "User Guide", href: "/user-guide" },
                ]}
              />
              <FooterSection
                title="ABOUT US"
                links={[
                  { label: "Company", href: "/about" },
                ]}
              />
              <FooterSection
                title="PARTNERSHIPS"
                links={[
                  { label: "Leader", href: "/leader" },
                  { label: "Affiliate", href: "/affiliate" },
                  { label: "Broker", href: "/broker" },
                ]}
              />
              <FooterSection
                title="CONTACT"
                links={[
                  { label: "+1 (929) 512-0241", href: "#" },
                  { label: "support@scopstrade.com", href: "mailto:support@scopstrade.com" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-[var(--border)] pt-8">
          <div className="space-y-4 text-xs leading-relaxed text-[var(--foreground-muted)]">
            <p>
              Disclaimer ScopsTrade (Europe) Ltd., a Financial Services Company
              authorised and regulated by the Cyprus Securities Exchange
              Commission (CySEC) under the license # 109/10. Registered in
              Cyprus under Company No. HE 200595. Registered Office: 4 Profiti
              Ilia Str., Kanika Business Centre, 7th floor, Germasogeia, 4046,
              Limassol, Cyprus. ScopsTrade (UK) Ltd, a Financial Services
              Company authorised and regulated by the Financial Conduct
              Authority (FCA) under the license FRN 583263. Registered Office:
              24th floor, One Canada Square, Canary Wharf, London E14 5AB.
              ScopsTrade (USA) Ltd, a financial company authorised and regulated
              by SEC; CRD 298461. API Level 2 Securities and Investments
              Commission on Futures and Investments; Commission registered under
              Financial Services License 491139. Registered Office: Level 3, 60
              Castlereagh Street, Sydney NSW 2000, Australia. ScopsTrade (ME)
              Limited, is licensed and regulated by the Abu Dhabi Global Market
              (&ldquo;ADGM&rdquo;)&apos;s Financial Services Regulatory Authority (&ldquo;FSRA&rdquo;) as an
              Authorised Person to conduct the Regulated Activities of (a)
              Dealing in Investments as Principal (Matched), (b) Arranging Deals
              in Investments, (c) Providing Custody, (d) Arranging Custody and
              (e) Managing Assets (under Financial Services Permission Number
              220073) under the Financial Services and Market Regulations 2015
              (&ldquo;FSMR&rdquo;). Its registered office and its principal place of
              business is at Office 207 and 208, 15th Floor Floor, Al Sarab
              Tower, ADGM Square, Al Maryah Island, Abu Dhabi, United Arab
              Emirates (&ldquo;UAE&rdquo;). Clients who are tax residents of Finland may be
              subject to Finnish income taxes on income (profits) and assets in
              accordance with applicable Finnish tax laws.
            </p>
            <p>
              Past performance is not an indication of future results. You
              should seek advice from an independent and suitably licensed
              financial advisor and ensure that you have the risk appetite,
              relevant experience and knowledge before you decide to trade.
              Under no circumstances shall ScopsTrade have any liability to any
              person or entity for any loss or damage in whole or part caused
              by, resulting from, or relating to any transactions related to
              Stock and options investments are risky and do not benefit from
              the protections available to clients receiving MiFID regulated
              investment services for dispute resolution. Trading with
              ScopsTrade by following and/or copying or replicating the trades
              of other traders involves a high level of risks, even when
              following and/or copying or replicating the top-performing
              traders. Such risks include the risk that you may be
              following/copying the trading decisions of possibly inexperienced
              or unprofessional traders, or traders whose ultimate purpose or
              intention, or financial status may differ from yours. Past
              performance of a ScopsTrade Community Member is not a reliable
              indicator of his future performance. Content on ScopsTrade&apos;s
              social trading platform is generated by members of its community
              and does not contain advice or recommendations by or on behalf of
              ScopsTrade- Your Social Investment Network.
            </p>
            <p className="pt-4">
              Copyright &copy; 2006-2026 ScopsTrade - Your Social Investment Network,
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer Section Component
interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterSection = ({ title, links }: FooterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] pb-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="text-xs font-bold uppercase tracking-wider">
          {title}
        </span>
        <span
          className={`flex h-6 w-6 items-center justify-center rounded border border-[var(--foreground)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* Links */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mt-2 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;

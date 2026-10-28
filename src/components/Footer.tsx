"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F3F3F3] text-[#1A1A1A]" style={{ paddingTop: "128px", paddingBottom: "64px" }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8" style={{ paddingBottom: "64px" }}>
          {/* Brand & Logo Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block transition-transform duration-200 hover:scale-[1.02]">
              <img
                src="/images/logo-new.png"
                alt="Bascorp Group"
                style={{ height: "42px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <p className="font-instrument-sans text-[16px] text-[#1A1A1A] leading-relaxed max-w-sm">
              BASCORP Group is a diversified investment and business group operating at the intersection of investment, strategic capital, business development, and long-term value creation across the Arabian Gulf, the wider Middle East, and Asia.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white border border-gray-200/60 hover:border-[#00A2E2] hover:bg-[#00A2E2]/10 transition-all duration-200 shadow-xs group"
                aria-label="LinkedIn"
              >
                <img
                  src="/linkedin_black.svg"
                  alt="LinkedIn"
                  className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </a>
              <a
                href="mailto:info@bascorpgroup.com"
                className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white border border-gray-200/60 hover:border-[#00A2E2] hover:bg-[#00A2E2]/10 transition-all duration-200 shadow-xs group"
                aria-label="Email"
              >
                <img
                  src="/email_icon.svg"
                  alt="Email"
                  className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </a>
            </div>
          </div>

          {/* Pages Directory Column */}
          <div className="flex flex-col gap-6 lg:pl-8">
            <h3
              className="font-clash-grotesk font-semibold tracking-wide text-[#00A2E2] uppercase"
              style={{ fontSize: "20px" }}
            >
              Pages
            </h3>
            <ul className="flex flex-col gap-3 font-instrument-sans text-[#1A1A1A] font-medium" style={{ fontSize: "16px" }}>
              <li>
                <Link href="/about" className="hover:text-[#00A2E2] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/our-investments" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Our Investment
                </Link>
              </li>
              <li>
                <Link href="/investment-approach" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Investment Approach
                </Link>
              </li>
              <li>
                <Link href="/business-building-development" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Business Building & Development
                </Link>
              </li>
              <li>
                <Link href="/strategic-partnerships" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Strategic Partnerships
                </Link>
              </li>
              <li>
                <Link href="/portfolio-management" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Portfolio Management
                </Link>
              </li>
              <li>
                <Link href="/lets-connect" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Let&apos;s Connect
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-6">
            <h3
              className="font-clash-grotesk font-semibold tracking-wide text-[#00A2E2] uppercase"
              style={{ fontSize: "20px" }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-3 font-instrument-sans text-[#1A1A1A] font-medium" style={{ fontSize: "16px" }}>
              <li>
                <Link href="/#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Debt Funding
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Finance Investments
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Business Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-6">
            <h3
              className="font-clash-grotesk font-semibold tracking-wide text-[#00A2E2] uppercase"
              style={{ fontSize: "20px" }}
            >
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 font-instrument-sans text-[#1A1A1A] font-medium" style={{ fontSize: "16px" }}>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 text-[#00A2E2] shrink-0 mt-1" />
                <a href="mailto:info@bascorpgroup.com" className="hover:text-[#00A2E2] transition-colors break-all">
                  info@bascorpgroup.com
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#00A2E2] shrink-0 mt-1" />
                <span className="leading-relaxed">
                  1 Sheikh Issa Ave, Building 440,
                  <br />
                  Manama, Kingdom Of Bahrain
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#D9D9D9] flex justify-center items-center text-[#1A1A1A] font-instrument-sans font-medium" style={{ paddingTop: "40px", paddingBottom: "40px", fontSize: "14px" }}>
          <p>© 2026 BASCORP Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

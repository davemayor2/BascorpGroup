"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F3F3F3] text-[#1A1A1A]" style={{ paddingTop: "128px", paddingBottom: "64px" }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8" style={{ paddingBottom: "64px" }}>
          {/* Brand & Logo Column */}
          <div className="flex flex-col gap-6">
            <a href="#home" className="inline-block transition-transform duration-200 hover:scale-[1.02]">
              <img
                src="/logo.png"
                alt="Bascorp Group"
                style={{ height: "42px", width: "auto", objectFit: "contain" }}
              />
            </a>
            <p className="font-instrument-sans text-sm text-[#1A1A1A]/70 leading-relaxed max-w-sm">
              Bascorp Group is a diversified investment company with a growing portfolio of businesses and strategic partnerships across the Arabian Gulf, Middle East, and Asia.
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
              <a
                href="tel:+97143975550"
                className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white border border-gray-200/60 hover:border-[#00A2E2] hover:bg-[#00A2E2]/10 transition-all duration-200 shadow-xs group"
                aria-label="Phone"
              >
                <img
                  src="/call_icon_black.svg"
                  alt="Phone"
                  className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </a>
            </div>
          </div>

          {/* Pages Directory Column */}
          <div className="flex flex-col gap-6 lg:pl-8">
            <h3 className="font-clash-grotesk text-lg font-semibold tracking-wide text-[#00A2E2] uppercase">
              Pages
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[#1A1A1A]/70 font-instrument-sans">
              <li>
                <a href="#about" className="hover:text-[#00A2E2] transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Team
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Our Investment
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Investment Approach
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  About Consulting
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Disciplined Investment Strategy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Corporate Governance
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-clash-grotesk text-lg font-semibold tracking-wide text-[#00A2E2] uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[#1A1A1A]/70 font-instrument-sans">
              <li>
                <a href="#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Debt Funding
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Finance Investments
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A2E2] transition-colors duration-200">
                  Business Development
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-clash-grotesk text-lg font-semibold tracking-wide text-[#00A2E2] uppercase">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-[#1A1A1A]/70 font-instrument-sans">
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 text-[#00A2E2] shrink-0 mt-1" />
                <a href="tel:+1234567890" className="hover:text-[#00A2E2] transition-colors">
                  +123 456 7890
                </a>
              </li>
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

        <div className="border-t border-[#D9D9D9] flex justify-center items-center text-xs text-[#1A1A1A]/50 font-instrument-sans" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <p>@Bascorpgroup 2026. All rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

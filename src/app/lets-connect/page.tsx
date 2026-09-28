"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  ArrowRight,
  Send,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TICKER_ITEMS = [
  "Strategic Partnership Inquiries",
  "Direct Investments",
  "Regional Expansion",
  "Middle East & Asia Focus",
  "Disciplined Capital Allocation",
  "Proven Governance",
];

const SECTOR_OPTIONS = [
  "General Partnership Inquiry",
  "Healthcare & Pharmaceuticals",
  "Wholesale & Retail Trade",
  "Private Equity",
  "Transportation & Logistics",
  "Telecommunications & Digital Infrastructure",
  "Public Equity",
  "Corporate Advisory & Consulting",
];

export default function LetsConnectPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const heroStatRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    sector: SECTOR_OPTIONS[0],
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate high-fidelity smooth submission
    setTimeout(() => {
      setFormStatus("success");
    }, 1000);
  };

  useGSAP(
    () => {
      // 1. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-fade-up",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.1,
          clearProps: "transform",
        }
      ).fromTo(
        ".hero-contact-card",
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          clearProps: "transform",
        },
        "-=0.3"
      );

      // 2. Glitch / Scramble Text Animation Helper
      const runGlitch = (
        element: HTMLElement | null,
        targetText: string,
        options?: {
          duration?: number;
          delay?: number;
          chars?: string;
          ease?: string;
        }
      ) => {
        if (!element) return;
        const chars = options?.chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const duration = options?.duration ?? 1.5;
        const delay = options?.delay ?? 0;
        const ease = options?.ease ?? "power2.out";
        const progressObj = { value: 0 };

        gsap.to(progressObj, {
          value: 1,
          duration,
          delay,
          ease,
          onStart: () => {
            let initial = "";
            for (let i = 0; i < targetText.length; i++) {
              if (targetText[i] === " ") {
                initial += " ";
              } else {
                initial += chars[Math.floor(Math.random() * chars.length)];
              }
            }
            element.textContent = initial;
          },
          onUpdate: () => {
            const p = progressObj.value;
            const settledLength = Math.floor(p * targetText.length);
            let result = "";
            for (let i = 0; i < targetText.length; i++) {
              if (targetText[i] === " ") {
                result += " ";
              } else if (i < settledLength) {
                result += targetText[i];
              } else {
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                result += randomChar;
              }
            }
            element.textContent = result;
          },
          onComplete: () => {
            element.textContent = targetText;
          },
        });
      };

      // Hero Tag Glitch Animation: "LET'S CONNECT"
      if (tagRef.current) {
        runGlitch(tagRef.current, "LET'S CONNECT", {
          duration: 1.5,
          delay: 0.15,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'",
        });
      }

      // Hero Stat Cards Glitch
      const heroStatTargets = ["Bahrain", "+973 1753 0816", "24–48h"];
      heroStatTargets.forEach((target, idx) => {
        const el = heroStatRefs.current[idx];
        if (el) {
          runGlitch(el, target, {
            duration: 1.4,
            delay: 0.35 + idx * 0.1,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+–",
          });
        }
      });

      // 3. Form & Contact Section Entrance
      gsap.from(".contact-info-col", {
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(".contact-form-col", {
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: "top 78%",
        },
        opacity: 0,
        y: 35,
        duration: 0.85,
        ease: "power3.out",
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F3F3F3] text-[#111111] overflow-x-hidden font-instrument-sans selection:bg-[#00A2E2] selection:text-white"
    >
      {/* Floating Dark Navbar */}
      <Navbar />

      <main className="w-full">
        {/* =====================================================================
            1. HERO / TOP INTRO SECTION (Matching About Us & Our Investments)
           ===================================================================== */}
        <section
          ref={heroRef}
          style={{
            paddingTop: "148px",
            paddingBottom: "100px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "calc(100% - 32px)",
            maxWidth: "1400px",
            background:
              "linear-gradient(180deg, #F3F3F3 0%, #F3F3F3 18%, #DBEEF6 36%, #CEF1FD 54%, #A3E3FD 76%, #93E0FF 100%)",
            borderRadius: "0 0 20px 20px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
          className="relative bg-[#F3F3F3]"
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1280px",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
            className="flex flex-col items-center text-center"
          >
            {/* Tag with Glitch Decrypt Animation */}
            <span
              ref={tagRef}
              className="hero-fade-up font-clash-grotesk text-xs sm:text-sm font-normal tracking-[0.18em] text-[#111111] uppercase block"
              style={{ marginBottom: "28px" }}
            >
              LET&apos;S CONNECT
            </span>

            {/* Main Heading */}
            <h1
              className="hero-fade-up font-clash-grotesk font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.12] sm:leading-[1.15] text-[#111111] tracking-tight max-w-4xl"
              style={{ marginBottom: "28px" }}
            >
              Start the <span className="text-[#00A2E2]">Conversation</span>.
              <br />
              Explore New <span className="text-[#00A2E2]">Opportunities</span>.
            </h1>

            {/* Subtitle Paragraph */}
            <p
              className="hero-fade-up font-instrument-sans text-sm sm:text-base md:text-[17px] text-[#555555] max-w-2xl leading-relaxed font-normal"
              style={{ marginBottom: "42px" }}
            >
              Whether you are an ambitious business seeking growth capital, an institutional investor exploring co-investment, or looking to scale across Middle Eastern and Asian markets, our team is at your service.
            </p>

            {/* Direct Action Anchors */}
            <div className="hero-fade-up flex items-center justify-center gap-4 flex-wrap" style={{ marginBottom: "64px" }}>
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-between gap-6 sm:gap-8 bg-white text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xs hover:shadow-md border border-gray-200/80 group select-none cursor-pointer"
                style={{
                  paddingLeft: "24px",
                  paddingRight: "8px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  height: "52px",
                  borderRadius: "10px",
                }}
              >
                <span
                  className="font-instrument-sans font-medium text-black leading-none"
                  style={{ fontSize: "16px" }}
                >
                  Send an Inquiry
                </span>
                <div
                  className="flex items-center justify-center bg-[#00A2E2] group-hover:bg-[#008bc4] transition-all duration-300 shrink-0"
                  style={{ width: "36px", height: "36px", borderRadius: "6px" }}
                >
                  <img
                    src="/button arrow.svg"
                    alt="Arrow"
                    style={{ width: "16px", height: "16px", objectFit: "contain" }}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
              </a>

              <a
                href="tel:+97317530816"
                className="inline-flex items-center gap-3 bg-transparent text-[#111111] font-instrument-sans font-medium transition-all duration-300 hover:bg-black/5 border border-black/20"
                style={{
                  paddingLeft: "22px",
                  paddingRight: "22px",
                  height: "52px",
                  borderRadius: "10px",
                  fontSize: "15.5px",
                }}
              >
                <Phone className="w-4 h-4 text-[#00A2E2]" />
                <span>Direct Line: +973 1753 0816</span>
              </a>
            </div>

            {/* 3 Contact Stat Cards Row (Universal Rule: Generous Padding) */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full max-w-4xl"
              style={{ marginTop: "16px" }}
            >
              {/* Card 1: Headquarters */}
              <div
                className="hero-contact-card bg-white rounded-[14px] py-9 px-7 sm:py-10 sm:px-8 border border-[#CDCDCD] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 shadow-xs"
                style={{ minHeight: "180px" }}
              >
                <span
                  ref={(el) => {
                    heroStatRefs.current[0] = el;
                  }}
                  className="font-clash-grotesk font-medium text-[38px] sm:text-[42px] lg:text-[46px] text-[#111111] tracking-tight leading-none mb-3"
                >
                  Bahrain
                </span>
                <span className="font-instrument-sans text-sm sm:text-[15px] text-[#737373] font-normal leading-tight">
                  Manama Headquarters &bull; Arabian Gulf
                </span>
              </div>

              {/* Card 2: Phone */}
              <div
                className="hero-contact-card bg-white rounded-[14px] py-9 px-7 sm:py-10 sm:px-8 border border-[#CDCDCD] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 shadow-xs"
                style={{ minHeight: "180px" }}
              >
                <span
                  ref={(el) => {
                    heroStatRefs.current[1] = el;
                  }}
                  className="font-clash-grotesk font-medium text-[28px] sm:text-[32px] lg:text-[34px] text-[#00A2E2] tracking-tight leading-none mb-3"
                >
                  +973 1753 0816
                </span>
                <span className="font-instrument-sans text-sm sm:text-[15px] text-[#737373] font-normal leading-tight">
                  Sun – Thu &bull; 8:30 AM – 5:30 PM (GMT+3)
                </span>
              </div>

              {/* Card 3: Response Time */}
              <div
                className="hero-contact-card bg-white rounded-[14px] py-9 px-7 sm:py-10 sm:px-8 border border-[#CDCDCD] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 shadow-xs"
                style={{ minHeight: "180px" }}
              >
                <span
                  ref={(el) => {
                    heroStatRefs.current[2] = el;
                  }}
                  className="font-clash-grotesk font-medium text-[38px] sm:text-[42px] lg:text-[46px] text-[#111111] tracking-tight leading-none mb-3"
                >
                  24–48h
                </span>
                <span className="font-instrument-sans text-sm sm:text-[15px] text-[#737373] font-normal leading-tight">
                  Prompt Advisory Response SLA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. SCROLLING TEXT RIBBON (Matching Our Investments Page Style)
           ===================================================================== */}
        <div
          className="w-full border-y border-[#E2E2E2] bg-white/80 backdrop-blur-xs overflow-hidden select-none"
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
          aria-label="Contact ticker"
        >
          <div className="animate-ticker flex items-center">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
              (item, idx) => (
                <div key={idx} className="flex items-center whitespace-nowrap">
                  <span
                    className="font-instrument-sans font-medium text-[#383838] tracking-wider uppercase"
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      paddingLeft: "28px",
                      paddingRight: "28px",
                    }}
                  >
                    {item}
                  </span>
                  <span
                    className="rounded-full bg-[#00A2E2] shrink-0"
                    style={{ width: "6px", height: "6px" }}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* =====================================================================
            3. MAIN CONTACT & INQUIRY FORM SECTION
           ===================================================================== */}
        <section
          id="inquiry-form"
          ref={formSectionRef}
          style={{
            paddingTop: "clamp(80px, 9vw, 120px)",
            paddingBottom: "clamp(90px, 10vw, 130px)",
          }}
          className="relative w-full"
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              {/* ================= LEFT COLUMN: OFFICE & CONTACT DETAILS ================= */}
              <div className="contact-info-col lg:col-span-5 flex flex-col gap-8">
                {/* Header Information */}
                <div>
                  <span className="font-instrument-sans text-xs sm:text-sm text-[#8E8E93] font-medium tracking-wide uppercase block mb-3">
                    CORPORATE CONTACT DIRECTORY
                  </span>
                  <h2 className="font-clash-grotesk font-semibold text-3xl sm:text-4xl md:text-[42px] leading-[1.16] text-[#111111] mb-5 tracking-tight">
                    Get in Touch with Our Advisory Group
                  </h2>
                  <p className="font-instrument-sans text-sm sm:text-[15.5px] text-neutral-600 leading-[1.7] max-w-lg">
                    Bascorp Group maintains its central executive headquarters in the Kingdom of Bahrain. For direct engagement, business proposals, or media inquiries, please connect through our official channels.
                  </p>
                </div>

                {/* Office Address Card (Strict & Universal Rule: Generous Padding) */}
                <div
                  className="bg-white rounded-[18px] border border-[#CDCDCD] flex flex-col gap-5 shadow-xs transition-all duration-300 hover:shadow-md"
                  style={{
                    padding: "clamp(28px, 3.5vw, 36px)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-[12px] bg-[#F3F3F3] flex items-center justify-center shrink-0 border border-gray-200/60 text-[#00A2E2]"
                    >
                      <MapPin className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="font-instrument-sans text-xs font-semibold text-[#8E8E93] uppercase tracking-wider block">
                        HEAD OFFICE ADDRESS
                      </span>
                      <h3 className="font-clash-grotesk text-lg font-semibold text-[#111111] leading-tight">
                        Manama, Kingdom of Bahrain
                      </h3>
                    </div>
                  </div>

                  <div className="font-instrument-sans text-sm sm:text-[15px] text-[#333333] leading-relaxed pl-1">
                    <p className="font-medium text-[#111111]">1 Sheikh Issa Ave, Building 440</p>
                    <p className="text-[#666666]">Diplomatic Area / Financial District</p>
                    <p className="text-[#666666]">Manama, Kingdom of Bahrain</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-[#737373]">
                    <Clock className="w-3.5 h-3.5 text-[#00A2E2]" />
                    <span>Sunday – Thursday: 8:30 AM – 5:30 PM (GMT+3)</span>
                  </div>
                </div>

                {/* Phone & Email Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Card */}
                  <a
                    href="tel:+97317530816"
                    className="bg-white rounded-[18px] border border-[#CDCDCD] flex flex-col justify-between group shadow-xs hover:border-[#00A2E2] hover:shadow-md transition-all duration-300 cursor-pointer"
                    style={{
                      padding: "clamp(24px, 3vw, 30px)",
                      minHeight: "160px",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#F3F3F3] group-hover:bg-[#00A2E2]/10 transition-colors flex items-center justify-center text-[#00A2E2]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-[#00A2E2] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Call <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div>
                      <span className="font-instrument-sans text-xs text-[#8E8E93] uppercase font-medium tracking-wide block mb-1">
                        DIRECT PHONE
                      </span>
                      <span className="font-clash-grotesk font-semibold text-base sm:text-[17px] text-[#111111] group-hover:text-[#00A2E2] transition-colors leading-snug block">
                        +973 1753 0816
                      </span>
                    </div>
                  </a>

                  {/* Email Card */}
                  <a
                    href="mailto:info@bascorpgroup.com"
                    className="bg-white rounded-[18px] border border-[#CDCDCD] flex flex-col justify-between group shadow-xs hover:border-[#00A2E2] hover:shadow-md transition-all duration-300 cursor-pointer"
                    style={{
                      padding: "clamp(24px, 3vw, 30px)",
                      minHeight: "160px",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#F3F3F3] group-hover:bg-[#00A2E2]/10 transition-colors flex items-center justify-center text-[#00A2E2]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-[#00A2E2] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Email <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div>
                      <span className="font-instrument-sans text-xs text-[#8E8E93] uppercase font-medium tracking-wide block mb-1">
                        OFFICIAL EMAIL
                      </span>
                      <span className="font-clash-grotesk font-semibold text-sm sm:text-[15px] text-[#111111] group-hover:text-[#00A2E2] transition-colors break-all leading-snug block">
                        info@bascorpgroup.com
                      </span>
                    </div>
                  </a>
                </div>

                {/* Picture Frame / Location Showcase (Matching Our Investments Outer Picture Frame Style) */}
                <div
                  className="relative w-full rounded-[14px] overflow-hidden border border-[#CDCDCD] shadow-sm select-none"
                  style={{
                    height: "240px",
                    borderRadius: "14px",
                  }}
                >
                  <img
                    src="/images/about_executive_banner.jpg"
                    alt="Bascorp Group Executive Headquarters"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle Dark Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "rgba(0, 0, 0, 0.42)",
                    }}
                  />
                  {/* Glassmorphic Badge At Bottom Left (Matching Our Investments Inner Box) */}
                  <div
                    className="absolute z-10 flex items-center gap-3"
                    style={{
                      bottom: "16px",
                      left: "16px",
                      borderRadius: "8pt",
                      background: "rgba(18, 20, 24, 0.78)",
                      backdropFilter: "blur(3px)",
                      WebkitBackdropFilter: "blur(3px)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      padding: "14px 20px",
                    }}
                  >
                    <Building className="w-4 h-4 text-[#00A2E2] shrink-0" />
                    <div>
                      <span className="font-instrument-sans font-medium text-white text-xs block leading-tight">
                        Kingdom of Bahrain Regional Hub
                      </span>
                      <span className="font-instrument-sans text-white/70 text-[11px] block">
                        Connecting Arabian Gulf & Asian Capital
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: INTERACTIVE INQUIRY FORM ================= */}
              <div className="contact-form-col lg:col-span-7">
                <div
                  className="bg-white rounded-[22px] border border-[#CDCDCD] shadow-sm relative overflow-hidden"
                  style={{
                    padding: "clamp(32px, 4.5vw, 54px)",
                  }}
                >
                  {/* Decorative subtle blue accent gradient at top border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{
                      background: "linear-gradient(90deg, #00A2E2 0%, #93E0FF 100%)",
                    }}
                  />

                  {/* Form Header */}
                  <div className="mb-8">
                    <span className="font-instrument-sans text-xs font-semibold text-[#00A2E2] uppercase tracking-wider block mb-2">
                      ONLINE INQUIRY DISPATCH
                    </span>
                    <h3 className="font-clash-grotesk font-semibold text-2xl sm:text-3xl text-[#111111] tracking-tight leading-snug mb-3">
                      Submit Your Partnership Proposal
                    </h3>
                    <p className="font-instrument-sans text-sm sm:text-[15px] text-[#666666] leading-relaxed">
                      Please provide details regarding your inquiry. Our investment committee and division leads review all submissions with strict confidentiality.
                    </p>
                  </div>

                  {formStatus === "success" ? (
                    <div
                      className="rounded-[16px] bg-[#F0FDF4] border border-[#BBF7D0] flex flex-col items-center justify-center text-center text-[#166534]"
                      style={{
                        padding: "clamp(36px, 5vw, 54px)",
                      }}
                    >
                      <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] mb-4 shadow-xs">
                        <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                      </div>
                      <h4 className="font-clash-grotesk font-semibold text-2xl text-[#166534] mb-2">
                        Inquiry Received Successfully
                      </h4>
                      <p className="font-instrument-sans text-sm text-[#15803D] max-w-md leading-relaxed mb-6">
                        Thank you for contacting Bascorp Group. Your message has been logged into our executive advisory dispatch. A representative will contact you within 24–48 business hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus("idle");
                          setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            company: "",
                            sector: SECTOR_OPTIONS[0],
                            subject: "",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 bg-[#16A34A] text-white font-instrument-sans font-medium text-sm px-6 py-3 rounded-[8px] hover:bg-[#15803D] transition-colors cursor-pointer select-none"
                      >
                        Submit Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Row 1: First Name & Last Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="firstName"
                            className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                          >
                            First Name <span className="text-[#00A2E2]">*</span>
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            placeholder="e.g. Alexander"
                            className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="lastName"
                            className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                          >
                            Last Name <span className="text-[#00A2E2]">*</span>
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            placeholder="e.g. Al-Mansoor"
                            className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email & Phone Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="email"
                            className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                          >
                            Corporate Email <span className="text-[#00A2E2]">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="alexander@company.com"
                            className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="phone"
                            className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+973 1234 5678"
                            className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all"
                          />
                        </div>
                      </div>

                      {/* Row 3: Company Name & Sector of Interest */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="company"
                            className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                          >
                            Company / Institution
                          </label>
                          <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({ ...formData, company: e.target.value })
                            }
                            placeholder="e.g. Al-Noor Holdings"
                            className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="sector"
                            className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                          >
                            Sector of Interest
                          </label>
                          <select
                            id="sector"
                            value={formData.sector}
                            onChange={(e) =>
                              setFormData({ ...formData, sector: e.target.value })
                            }
                            className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all cursor-pointer"
                          >
                            {SECTOR_OPTIONS.map((opt, i) => (
                              <option key={i} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 4: Subject */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="subject"
                          className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                        >
                          Subject <span className="text-[#00A2E2]">*</span>
                        </label>
                        <input
                          id="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          placeholder="e.g. Strategic Co-Investment Opportunity in Regional Healthcare"
                          className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] px-4 py-3.5 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all"
                        />
                      </div>

                      {/* Row 5: Message */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="message"
                          className="font-instrument-sans text-xs font-medium text-[#222222] uppercase tracking-wider"
                        >
                          Proposal Details / Message <span className="text-[#00A2E2]">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Please provide an overview of your organization, the investment or partnership scope, and key objectives..."
                          className="w-full bg-[#F8F9FA] border border-[#D5D5D5] rounded-[10px] p-4 text-sm sm:text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#00A2E2] focus:bg-white focus:ring-3 focus:ring-[#00A2E2]/15 transition-all resize-y"
                        />
                      </div>

                      {/* Submission Button & Security Note */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-[#737373]">
                          <Shield className="w-3.5 h-3.5 text-[#00A2E2]" />
                          <span>Confidential &amp; SSL Encrypted Transmission</span>
                        </div>

                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full sm:w-auto inline-flex items-center justify-between gap-6 bg-[#00A2E2] hover:bg-[#008bc4] active:scale-[0.98] text-white font-instrument-sans font-medium transition-all duration-300 shadow-md cursor-pointer select-none"
                          style={{
                            height: "54px",
                            paddingLeft: "28px",
                            paddingRight: "10px",
                            borderRadius: "10px",
                            fontSize: "16px",
                          }}
                        >
                          <span>{formStatus === "submitting" ? "Transmitting..." : "Send Message"}</span>
                          <div
                            className="flex items-center justify-center bg-white text-[#00A2E2] rounded-[6px] shrink-0"
                            style={{ width: "36px", height: "36px" }}
                          >
                            <img
                              src="/button arrow.svg"
                              alt="Arrow"
                              style={{ width: "16px", height: "16px", objectFit: "contain" }}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 invert"
                            />
                          </div>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. "HAVE AN OPPORTUNITY IN MIND?" CTA SECTION (HOME PAGE COMPONENT)
           ===================================================================== */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

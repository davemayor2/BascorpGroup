"use client";

import React, { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const DELIVERABLES = [
  "Sector Assessment",
  "Management Evaluation",
  "Financial Analysis",
  "Commercial Review",
  "Governance Review",
  "Exit Strategy",
  "Operational Due Diligence",
  "Capital Structure Optimization",
  "Sustainable Value Creation Plan",
  "Market Dynamics Analysis",
  "Strategic Growth Roadmapping",
  "Risk Assessment Framework",
];

const STEPS = [
  {
    tag: "Step 1",
    title: "Screen the Opportunity",
    description:
      "We review the opportunity against our core investment criteria, including sector fundamentals, business performance, management quality, and growth potential.",
  },
  {
    tag: "Step 2",
    title: "Evaluate the Business",
    description:
      "We conduct a deeper review of the company's financial performance, cash flows, business model, governance practices, and use of capital.",
  },
  {
    tag: "Step 3",
    title: "Structure the Investment",
    description:
      "Where the opportunity meets our criteria, we develop an investment structure aligned with the business requirements, risk considerations, and expected objectives.",
  },
  {
    tag: "Step 4",
    title: "Invest & Monitor",
    description:
      "Following investment, we maintain a disciplined approach to monitoring performance, supporting long-term value creation, and assessing defined exit objectives.",
  },
];

const CRITERIA_POINTS = [
  "Stable and predictable sector fundamentals",
  "Experienced and capable management",
  "Strong historical financial performance",
  "Robust cash-flow generation",
  "Realistic and compelling business plans",
  "Sound corporate governance",
  "Clearly defined exit framework",
];

export default function DisciplinedInvestmentStrategyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const split1Ref = useRef<HTMLElement>(null);
  const split2Ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Hero Content Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          heroRef.current,
          { opacity: 0.8 },
          { opacity: 1, duration: 0.8, ease: "power2.out" }
        )
        .fromTo(
          ".hero-anim-item",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            clearProps: "transform",
          },
          "-=0.4"
        );

      // 2. Intro Section Scroll Reveal - Slow, elegant fade in
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 78%",
          once: true,
        },
      });
      introTl
        .fromTo(
          introRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "opacity",
          }
        )
        .fromTo(
          ".intro-anim-item",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.32,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.2"
        );

      // 3. "How it works" White Box Scroll Reveal
      const howTl = gsap.timeline({
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 82%",
          once: true,
        },
      });
      howTl
        .fromTo(
          ".how-box-container",
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform",
          }
        )
        .fromTo(
          ".step-row-anim",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.3"
        );

      // 4. First Split Section Scroll Reveal
      const split1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: split1Ref.current,
          start: "top 82%",
          once: true,
        },
      });
      split1Tl.fromTo(
        split1Ref.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          clearProps: "transform",
        }
      );

      // 5. Second Split Section Scroll Reveal
      const split2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: split2Ref.current,
          start: "top 82%",
          once: true,
        },
      });
      split2Tl.fromTo(
        split2Ref.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          clearProps: "transform",
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener("load", handleLoad);
      }
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F3F3F3] text-[#111111] overflow-x-hidden font-instrument-sans selection:bg-[#00A2E2] selection:text-white"
    >
      {/* Standard Floating Dark Navbar */}
      <Navbar />

      <main className="w-full">
        {/* =====================================================================
            1. TOP BANNER (HERO SECTION)
            Full screen height, lowered text content, moody dark overlays
           ===================================================================== */}
        <section
          ref={heroRef}
          className="relative bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-end min-h-screen"
          style={{
            backgroundImage: "url('/images/investment_strategy_1.png')",
            backgroundPosition: "center 25%",
            minHeight: "100vh",
            paddingTop: "160px",
            paddingBottom: "clamp(44px, 5.5vh, 76px)",
          }}
        >
          {/* Moody Dark Overlays */}
          <div
            className="absolute inset-0 z-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(10, 12, 16, 0.72) 0%, rgba(10, 12, 16, 0.3) 38%, rgba(10, 12, 16, 0.88) 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-1"
            style={{
              background:
                "linear-gradient(to right, rgba(10, 12, 16, 0.85) 0%, rgba(10, 12, 16, 0.45) 50%, transparent 100%)",
            }}
          />

          {/* Centered container with wide cushion on left & right */}
          <div className="relative z-10 w-full container-custom">
            <div className="max-w-[1140px] w-full mx-auto">
              <div className="max-w-2xl flex flex-col items-start">
                {/* Small Tag: What We Do */}
                <span
                  className="hero-anim-item font-instrument-sans text-xs sm:text-[13px] text-white/70 font-medium tracking-wide block select-none"
                  style={{ marginBottom: "18px" }}
                >
                  What We Do
                </span>

                {/* Main Title: Disciplined Investment Strategy */}
                <h1
                  className="hero-anim-item font-clash-grotesk font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.08] tracking-tight"
                  style={{ marginBottom: "20px" }}
                >
                  Disciplined Investment{" "}
                  <span className="text-[#00A2E2]">Strategy</span>
                </h1>

                {/* Subtitle */}
                <p
                  className="hero-anim-item font-instrument-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-lg"
                  style={{ marginBottom: "36px" }}
                >
                  A disciplined investment approach providing tailored solutions
                  for sustainable growth across various sectors.
                </p>

                {/* Book A Call Button - 8pt corner radius */}
                <div className="hero-anim-item">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-between gap-6 sm:gap-8 bg-white text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md border border-gray-200/80 group select-none cursor-pointer w-fit"
                    style={{
                      paddingLeft: "24px",
                      paddingRight: "8px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      height: "52px",
                      borderRadius: "8pt",
                    }}
                  >
                    <span
                      className="font-instrument-sans font-medium text-black leading-none"
                      style={{ fontSize: "16px" }}
                    >
                      Book A Call
                    </span>
                    <div
                      className="flex items-center justify-center bg-[#00A2E2] group-hover:bg-[#008bc4] transition-all duration-300 shrink-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "6px",
                      }}
                    >
                      <img
                        src="/button arrow.svg"
                        alt="Arrow"
                        style={{
                          width: "16px",
                          height: "16px",
                          objectFit: "contain",
                        }}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. THE LIGHT GREY INTRO SECTION & DELIVERABLES
            Standard 140px section padding used in About.tsx, Services.tsx
           ===================================================================== */}
        <section
          ref={introRef}
          className="bg-[#F3F3F3] text-[#111111]"
          style={{
            paddingTop: "140px",
            paddingBottom: "100px",
          }}
        >
          <div className="container-custom">
            <div className="w-full">
              {/* Top Category Label: The Problem We Solve (18pt, medium) */}
              <h2
                className="intro-anim-item font-clash-grotesk font-medium text-[#111111] block"
                style={{
                  fontSize: "18pt",
                  fontWeight: 500,
                  marginBottom: "clamp(32px, 3.5vw, 52px)",
                }}
              >
                The Problem We Solve
              </h2>

              {/* Large Intro Paragraph 1 (48pt, border to border) */}
              <p
                className="intro-anim-item font-instrument-sans font-normal text-[#111111] w-full tracking-tight"
                style={{
                  fontSize: "clamp(28px, 3.8vw, 48pt)",
                  lineHeight: "1.24",
                  marginBottom: "clamp(36px, 4vw, 56px)",
                }}
              >
                Investment opportunities can look attractive on the surface, but
                sustainable value depends on the strength of the business,
                management team, financial performance, and the underlying
                market.
              </p>

              {/* Intro Paragraph 2 (48pt, border to border) */}
              <p
                className="intro-anim-item font-instrument-sans font-normal text-[#111111] w-full tracking-tight"
                style={{
                  fontSize: "clamp(28px, 3.8vw, 48pt)",
                  lineHeight: "1.24",
                  marginBottom: "clamp(64px, 7vw, 96px)",
                }}
              >
                Bascorp applies a disciplined investment framework to identify
                opportunities with strong fundamentals, realistic growth plans,
                and clearly defined paths to value creation.
              </p>

              {/* Deliverables Section */}
              <div className="intro-anim-item w-full">
                <h3
                  className="font-clash-grotesk font-medium text-[#111111] block"
                  style={{
                    fontSize: "18pt",
                    fontWeight: 500,
                    marginBottom: "24px",
                  }}
                >
                  Deliverables:
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-3.5 w-full">
                  {DELIVERABLES.map((item, idx) => (
                    <span
                      key={idx}
                      className="border border-[#6C6C6C] text-[#6C6C6C] rounded-full font-instrument-sans font-normal text-[15px] sm:text-[16px] transition-all duration-200 hover:border-[#00A2E2] hover:text-[#00A2E2] select-none whitespace-nowrap"
                      style={{
                        paddingLeft: "16pt",
                        paddingRight: "16pt",
                        paddingTop: "6pt",
                        paddingBottom: "6pt",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. THE "HOW IT WORKS" WHITE BOX SECTION
            Centered border-to-border card, aligned heading with step titles
           ===================================================================== */}
        <section
          ref={howItWorksRef}
          className="bg-[#F3F3F3] text-[#111111]"
          style={{
            paddingTop: "40px",
            paddingBottom: "140px",
          }}
        >
          <div className="container-custom">
            <div className="w-full">
              {/* White Box Card - Stretches border to border, generous internal padding adhering to AGENTS.md rule */}
              <div
                className="how-box-container bg-white w-full rounded-[24px] sm:rounded-[32px] border border-[#E5E5E5] shadow-xs"
                style={{
                  paddingTop: "64px",
                  paddingBottom: "64px",
                  paddingLeft: "clamp(28px, 6vw, 76px)",
                  paddingRight: "clamp(28px, 6vw, 76px)",
                }}
              >
                {/* Box Title - Left aligned perfectly with the step titles column */}
                <div
                  className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-12"
                  style={{ marginBottom: "56px" }}
                >
                  {/* Spacer that exactly matches Column 1 (Step Badge) */}
                  <div className="hidden md:block shrink-0 md:w-36" aria-hidden="true" />

                  {/* Heading: size 48, weight medium */}
                  <h2
                    className="font-clash-grotesk font-medium text-[#111111] tracking-tight"
                    style={{
                      fontSize: "clamp(32px, 3.8vw, 48px)",
                      fontWeight: 500,
                      lineHeight: "1.15",
                    }}
                  >
                    How it works
                  </h2>
                </div>

                {/* 4 Steps List */}
                <div className="divide-y divide-[#EAEAEA]">
                  {STEPS.map((step, idx) => (
                    <div
                      key={idx}
                      className="step-row-anim flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 md:gap-12 group"
                      style={{
                        paddingTop: "32px",
                        paddingBottom: "32px",
                      }}
                    >
                      {/* Left: Step Badge (stroke 6C6C6C, text 6C6C6C, size 20, px 16, py 6) */}
                      <div className="shrink-0 w-auto md:w-36">
                        <span
                          className="inline-block border border-[#6C6C6C] text-[#6C6C6C] bg-transparent rounded-full font-instrument-sans font-normal select-none"
                          style={{
                            fontSize: "20px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            paddingTop: "6px",
                            paddingBottom: "6px",
                          }}
                        >
                          {step.tag}
                        </span>
                      </div>

                      {/* Middle: Step Title (size 32) */}
                      <h3
                        className="font-clash-grotesk font-medium text-[#111111] md:w-[340px] lg:w-[400px] shrink-0"
                        style={{
                          fontSize: "clamp(24px, 2.5vw, 32px)",
                          fontWeight: 500,
                          lineHeight: "1.2",
                        }}
                      >
                        {step.title}
                      </h3>

                      {/* Right: Step Description (fill 737373) */}
                      <p className="font-instrument-sans text-[#737373] leading-relaxed max-w-xl md:flex-1 text-[14.5px] sm:text-[15.5px]">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. FIRST SPLIT SECTION (PICTURE ON LEFT, TEXT ON RIGHT)
            Presentation Hall image with tucked Book A Call button
           ===================================================================== */}
        <section
          ref={split1Ref}
          className="bg-[#F3F3F3] text-[#111111]"
          style={{
            paddingTop: "0px",
            paddingBottom: "140px",
          }}
        >
          <div className="container-custom">
            <div className="w-full">
              <div
                className="grid grid-cols-1 lg:grid-cols-12 items-center"
                style={{
                  columnGap: "clamp(48px, 6vw, 96px)",
                  rowGap: "48px",
                }}
              >
                {/* Left Column: Square Picture with Tucked "Book A Call" White Box */}
                <div className="lg:col-span-6 relative">
                  <div
                    className="relative overflow-hidden aspect-square border border-neutral-200/80 shadow-sm group"
                    style={{ borderRadius: "14px" }}
                  >
                    <img
                      src="/images/investment_strategy_2.png"
                      alt="Global Leadership & Innovation Summit"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* White Box / Button in Bottom-Left with padding from picture border */}
                    <a
                      href="#contact"
                      className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-white shadow-sm flex flex-col justify-between transition-all duration-300 group/btn hover:shadow-md cursor-pointer select-none"
                      style={{
                        borderRadius: "8px",
                        width: "306px",
                        maxWidth: "calc(100% - 32px)",
                        height: "162px",
                        paddingTop: "14px",
                        paddingRight: "14px",
                        paddingBottom: "14px",
                        paddingLeft: "16px",
                      }}
                    >
                      {/* Top-Right Arrow Inside Box using guidance_up-arrow.svg */}
                      <div className="self-end">
                        <img
                          src="/guidance_up-arrow.svg"
                          alt="Arrow"
                          className="w-6 h-6 object-contain transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>

                      {/* Text aligned at bottom-left: "Book A Call", weight medium, size 18 */}
                      <span
                        className="font-instrument-sans font-medium text-[#111111] leading-none block"
                        style={{
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        Book A Call
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Title and Bullet Points */}
                <div className="lg:col-span-6">
                  {/* Eyebrow: "INVESTMENT CRITERIA" in Clash display, size 18, weight medium */}
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginBottom: "16px",
                    }}
                  >
                    INVESTMENT CRITERIA
                  </span>

                  {/* Heading: "Businesses built on strong fundamentals", Instrument Sans, size 32, regular weight */}
                  <h2
                    className="font-instrument-sans font-normal text-[#111111] tracking-tight"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: "32px",
                      fontWeight: 400,
                      lineHeight: "1.24",
                      marginBottom: "36px",
                    }}
                  >
                    Businesses built on strong fundamentals
                  </h2>

                  {/* Bullet points: size 20, weight regular, color fill #737373, perfectly aligned, reduced dot size */}
                  <ul className="space-y-4 sm:space-y-5">
                    {CRITERIA_POINTS.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        {/* Dot container matching first line's 28px height for perfect vertical centering */}
                        <div
                          className="shrink-0 flex items-center justify-center select-none"
                          style={{ height: "28px", width: "12px" }}
                        >
                          <span
                            className="rounded-full shrink-0"
                            style={{
                              width: "5px",
                              height: "5px",
                              backgroundColor: "#737373",
                            }}
                          />
                        </div>
                        <span
                          className="font-instrument-sans font-normal"
                          style={{
                            fontSize: "20px",
                            lineHeight: "28px",
                            fontWeight: 400,
                            color: "#737373",
                          }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. SECOND SPLIT SECTION (WHO THIS IS FOR - REPLICA DESIGN WITH SWITCHED POSITIONS)
            Standard 140px section spacing, text on left, picture on right
           ===================================================================== */}
        <section
          ref={split2Ref}
          className="bg-[#F3F3F3] text-[#111111]"
          style={{
            paddingTop: "0px",
            paddingBottom: "140px",
          }}
        >
          <div className="container-custom">
            <div className="w-full">
              <div
                className="grid grid-cols-1 lg:grid-cols-12 items-center"
                style={{
                  columnGap: "clamp(48px, 6vw, 96px)",
                  rowGap: "48px",
                }}
              >
                {/* Left Column: Text Section */}
                <div className="lg:col-span-6">
                  {/* Eyebrow: "WHO THIS IS FOR" in Clash display, size 18, weight medium */}
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginBottom: "16px",
                    }}
                  >
                    WHO THIS IS FOR
                  </span>

                  {/* Heading: "Businesses with a clear path to sustainable growth", Instrument Sans, size 32, regular weight */}
                  <h2
                    className="font-instrument-sans font-normal text-[#111111] tracking-tight"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: "32px",
                      fontWeight: 400,
                      lineHeight: "1.24",
                      marginBottom: "36px",
                    }}
                  >
                    Businesses with a clear path to sustainable growth
                  </h2>

                  {/* Description: size 20, weight regular, color fill #737373 */}
                  <p
                    className="font-instrument-sans font-normal"
                    style={{
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 400,
                      color: "#737373",
                    }}
                  >
                    This approach is suited to established businesses with
                    experienced management teams, sound financial fundamentals,
                    realistic growth plans, and clearly defined opportunities
                    for value creation.
                  </p>
                </div>

                {/* Right Column: Square Picture with Tucked "Let's Connect" White Box */}
                <div className="lg:col-span-6 relative">
                  <div
                    className="relative overflow-hidden aspect-square border border-neutral-200/80 shadow-sm group"
                    style={{ borderRadius: "14px" }}
                  >
                    <img
                      src="/images/investment_strategy_3.png"
                      alt="Business leaders in strategic conference"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* White Box / Button in Bottom-Left with padding from picture border */}
                    <a
                      href="#contact"
                      className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-white shadow-sm flex flex-col justify-between transition-all duration-300 group/btn hover:shadow-md cursor-pointer select-none"
                      style={{
                        borderRadius: "8px",
                        width: "306px",
                        maxWidth: "calc(100% - 32px)",
                        height: "162px",
                        paddingTop: "14px",
                        paddingRight: "14px",
                        paddingBottom: "14px",
                        paddingLeft: "16px",
                      }}
                    >
                      {/* Top-Right Arrow Inside Box using guidance_up-arrow.svg */}
                      <div className="self-end">
                        <img
                          src="/guidance_up-arrow.svg"
                          alt="Arrow"
                          className="w-6 h-6 object-contain transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>

                      {/* Text aligned at bottom-left: "Let's Connect", weight medium, size 18 */}
                      <span
                        className="font-instrument-sans font-medium text-[#111111] leading-none block"
                        style={{
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        Let&apos;s Connect
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. BOTTOM SECTIONS: HOME PAGE CTA & FOOTER
           ===================================================================== */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

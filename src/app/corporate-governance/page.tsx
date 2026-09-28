"use client";

import React, { useRef } from "react";
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
  "Clear Accountability",
  "Committee Structure",
  "Delegation of Authority",
  "Audit & Internal Controls",
  "Stakeholder Protection",
  "Conduct & Sustainability",
];

const STEPS = [
  {
    tag: "Step 01",
    title: "Define Responsibilities",
    description:
      "We define the roles and responsibilities of the Board, committees, management and operational teams.",
  },
  {
    tag: "Step 02",
    title: "Strengthen Oversight",
    description:
      "Governance and risk oversight mechanisms at both Executive and Board levels to support informed decision-making.",
  },
  {
    tag: "Step 03",
    title: "Controls & Compliance",
    description:
      "Internal controls, risk management, compliance processes, and established policies provide a foundation for responsible operations.",
  },
  {
    tag: "Step 04",
    title: "Review & Maintain",
    description:
      "Governance practices are reviewed and maintained to support accountability, operational effectiveness, regulatory requirements, and long-term sustainability.",
  },
];

export default function CorporateGovernancePage() {
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

      // 2. Intro Section Scroll Reveal
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
            duration: 1.2,
            stagger: 0.2,
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
          howItWorksRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        )
        .fromTo(
          ".step-item",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.3"
        );

      // 4. Split 1 Scroll Reveal
      gsap.fromTo(
        split1Ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: split1Ref.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // 5. Split 2 Scroll Reveal
      gsap.fromTo(
        split2Ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: split2Ref.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

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
          className="relative bg-cover bg-no-repeat overflow-hidden flex flex-col justify-end min-h-screen [background-position:center_70px] md:[background-position:center_30%]"
          style={{
            backgroundImage: "url('/images/corporate_governance_1.png')",
            minHeight: "100vh",
            paddingTop: "160px",
            paddingBottom: "clamp(44px, 5.5vh, 76px)",
          }}
        >
          {/* Moody Dark Overlays matching reference */}
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

          {/* Centered container with wide, even cushion on left & right */}
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

                {/* Main Title: Corporate Governance (Governance in primary blue) */}
                <h1
                  className="hero-anim-item font-clash-grotesk font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.08] tracking-tight"
                  style={{ marginBottom: "24px" }}
                >
                  Corporate <span className="text-[#00A2E2]">Governance</span>
                </h1>

                {/* Subtitle */}
                <p
                  className="hero-anim-item font-instrument-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-lg font-normal"
                  style={{ marginBottom: "36px" }}
                >
                  A disciplined corporate governance framework establishing accountability, sound internal controls, and responsible oversight.
                </p>

                {/* Book A Call Button - matches 8pt button style */}
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
                      borderRadius: "8px",
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
                        borderRadius: "4px",
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
            2. THE LIGHT GREY INTRO SECTION & DELIVERABLES (THE PROBLEM WE SOLVE)
            Standard 140px section padding used across service pages
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
                Strong businesses need more than good strategies. They need clear
                responsibilities, effective oversight, sound internal controls,
                and disciplined decision-making.
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
                Bascorp&apos;s corporate governance framework establishes the
                structures and practices that support responsible management,
                effective risk oversight, regulatory compliance, and long-term
                organizational stability.
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
            3. "HOW IT WORKS" WHITE BOX SECTION
           ===================================================================== */}
        <section
          ref={howItWorksRef}
          className="relative bg-[#F3F3F3]"
          style={{
            paddingTop: "0px",
            paddingBottom: "140px",
          }}
        >
          <div className="container-custom">
            <div
              className="w-full bg-[#FFFFFF] rounded-[24px] sm:rounded-[32px] border border-[#E5E5E5] shadow-xs"
              style={{
                paddingTop: "clamp(48px, 6vw, 76px)",
                paddingBottom: "clamp(52px, 6.5vw, 84px)",
                paddingLeft: "clamp(24px, 5vw, 64px)",
                paddingRight: "clamp(24px, 5vw, 64px)",
              }}
            >
              <div className="w-full">
                {/* Box Title - Left aligned perfectly with the "Define Responsibilities" column */}
                <div
                  className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-12"
                  style={{ marginBottom: "56px" }}
                >
                  {/* Spacer that exactly matches Column 1 (Step Badge md:w-36) */}
                  <div className="hidden md:block shrink-0 md:w-36" aria-hidden="true" />

                  {/* Heading: size 48, weight medium, aligned with "Define Responsibilities" */}
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

                {/* 4 Steps Row List */}
                <div className="divide-y divide-[#EAEAEA]">
                  {STEPS.map((step, idx) => (
                    <div
                      key={idx}
                      className="step-item flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 md:gap-12 group"
                      style={{
                        paddingTop: "32px",
                        paddingBottom: "32px",
                      }}
                    >
                      {/* Left: Step Pill Badge (stroke 6C6C6C, text 6C6C6C, size 20, px 16, py 6) */}
                      <div className="shrink-0 w-auto md:w-36">
                        <span
                          className="inline-block border border-[#6C6C6C] text-[#6C6C6C] bg-transparent rounded-full font-instrument-sans font-medium select-none"
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

                      {/* Middle: Step Heading (size 32) */}
                      <h3
                        className="font-clash-grotesk font-normal text-[#111111] md:w-[340px] lg:w-[400px] shrink-0"
                        style={{
                          fontSize: "clamp(24px, 2.5vw, 32px)",
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
            Corporate Governance 2 image with tucked Book A Call button
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
                      src="/images/corporate_governance_2.png"
                      alt="Corporate Governance Framework Review"
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

                {/* Right Column: Title and Content Paragraphs */}
                <div className="lg:col-span-6">
                  {/* Eyebrow: "OUR GOVERNANCE FRAMEWORK" in Clash display, size 18, weight medium */}
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginBottom: "16px",
                    }}
                  >
                    OUR GOVERNANCE FRAMEWORK
                  </span>

                  {/* Heading: "Built on accountability and responsible oversight", Instrument Sans, size 32, regular weight */}
                  <h2
                    className="font-instrument-sans font-normal text-[#111111] tracking-tight"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: "32px",
                      fontWeight: 400,
                      lineHeight: "1.24",
                      marginBottom: "28px",
                    }}
                  >
                    Built on accountability and responsible oversight
                  </h2>

                  {/* Two descriptive paragraphs with text color fill #737373 */}
                  <div className="space-y-5">
                    <p
                      className="font-instrument-sans font-normal"
                      style={{
                        fontSize: "17px",
                        lineHeight: "1.65",
                        fontWeight: 400,
                        color: "#737373",
                      }}
                    >
                      Bascorp&apos;s governance framework brings together Board oversight, management accountability, risk management, internal controls, compliance, and corporate policies into a structured operating framework.
                    </p>
                    <p
                      className="font-instrument-sans font-normal"
                      style={{
                        fontSize: "17px",
                        lineHeight: "1.65",
                        fontWeight: 400,
                        color: "#737373",
                      }}
                    >
                      The approach is responsive to principles of good governance and practices adhered for leading commercial banks, regional regulatory frameworks, and financial institutions.
                    </p>
                  </div>
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

                  {/* Heading: "Organizations built for long-term responsibility", Instrument Sans, size 32, regular weight */}
                  <h2
                    className="font-instrument-sans font-normal text-[#111111] tracking-tight"
                    style={{
                      fontFamily: "var(--font-instrument-sans)",
                      fontSize: "32px",
                      fontWeight: 400,
                      lineHeight: "1.24",
                      marginBottom: "28px",
                    }}
                  >
                    Organizations built for long-term responsibility
                  </h2>

                  {/* Description: size 18px-20px, weight regular, color fill #737373 */}
                  <p
                    className="font-instrument-sans font-normal"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.65",
                      fontWeight: 400,
                      color: "#737373",
                    }}
                  >
                    A strong governance framework supports businesses that are growing, managing complex operations, engaging with investors and stakeholders, or seeking greater clarity around accountability, risk, and decision-making.
                  </p>
                </div>

                {/* Right Column: Square Picture with Tucked "Get Started" White Box */}
                <div className="lg:col-span-6 relative">
                  <div
                    className="relative overflow-hidden aspect-square border border-neutral-200/80 shadow-sm group"
                    style={{ borderRadius: "14px" }}
                  >
                    <img
                      src="/images/corporate_governance_3.png"
                      alt="Corporate leadership and governance"
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

                      {/* Text aligned at bottom-left: "Get Started", weight medium, size 18 */}
                      <span
                        className="font-instrument-sans font-medium text-[#111111] leading-none block"
                        style={{
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        Get Started
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. CTA SECTION
           ===================================================================== */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

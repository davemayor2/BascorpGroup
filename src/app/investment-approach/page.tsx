"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DELIVERABLES = [
  "Disciplined Capital Allocation",
  "Strategic Asset Selection",
  "Fundamental Opportunity Analysis",
  "Prudent Risk Assessment",
  "Long-Term Value Creation",
  "Quality Growth Evaluation",
  "Tailored Investment Structuring",
  "Selective Direct Investment",
];

const STEPS = [
  {
    tag: "Step 1",
    title: "Identify & Screen",
    description:
      "We identify and review businesses, assets, and opportunities with strong fundamentals, attractive growth prospects, and strategic market relevance.",
  },
  {
    tag: "Step 2",
    title: "Evaluate Opportunity & Risk",
    description:
      "We rigorously evaluate quality, downside protection, financial sustainability, and risk-return profiles before committing capital.",
  },
  {
    tag: "Step 3",
    title: "Selective Capital Allocation",
    description:
      "Capital is allocated selectively and disciplined, tailoring the investment structure to the specific requirements and potential of the opportunity.",
  },
  {
    tag: "Step 4",
    title: "Long-Term Value Realisation",
    description:
      "We focus on long-term potential, supporting management teams with patient capital and strategic perspective to create enduring value.",
  },
];

const VALUE_POINTS = [
  "Capital allocated on the basis of opportunity, risk, quality, and long-term potential",
  "Disciplined selection criteria focused on businesses with strong fundamentals",
  "Long-term investment perspective prioritizing sustainable growth over short-term trends",
  "Prudent risk management and governance embedded into every transaction",
  "Strategic alignment between capital providers and operating management",
  "Active capability to support portfolio companies through their next stage of development",
];

const renderScrubText = (text: string) => {
  const words = text.trim().split(/\s+/);
  return words.map((word, i) => (
    <React.Fragment key={i}>
      <span
        className="word-scrub inline-block transition-none"
        style={{ opacity: 0.3, willChange: "opacity" }}
      >
        {word}
      </span>
      {i < words.length - 1 ? " " : ""}
    </React.Fragment>
  ));
};

export default function InvestmentApproachPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const problemDescRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const split1Ref = useRef<HTMLElement>(null);
  const split2Ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Hero Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          heroRef.current,
          { opacity: 0 },
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

      // 2. Intro Section Scroll Reveal (Category Label & Deliverables)
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 92%",
          once: true,
        },
      });
      introTl.fromTo(
        ".intro-anim-item",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );

      // 3. "The Problem We Solve" Word-by-Word Scroll Scrub Animation
      if (problemDescRef.current) {
        const words = problemDescRef.current.querySelectorAll<HTMLElement>(
          ".word-scrub"
        );
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { opacity: 0.3 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: problemDescRef.current,
                start: "top 90%",
                end: "bottom 52%",
                scrub: 0.6,
              },
            }
          );
        }
      }

      // 3. "How it works" White Box Scroll Reveal
      const howTl = gsap.timeline({
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 92%",
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
            clearProps: "transform,opacity",
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
            clearProps: "transform,opacity",
          },
          "-=0.3"
        );

      // 4. First Split Section Scroll Reveal
      const split1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: split1Ref.current,
          start: "top 92%",
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
          clearProps: "transform,opacity",
        }
      );

      // 5. Second Split Section Scroll Reveal
      const split2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: split2Ref.current,
          start: "top 92%",
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
          clearProps: "transform,opacity",
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  useEffect(() => {
    gsap.config({ force3D: false });

    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("load", handleRefresh);
      window.addEventListener("resize", handleRefresh);
      if (document.fonts) {
        document.fonts.ready.then(handleRefresh);
      }
    }

    const t1 = setTimeout(handleRefresh, 250);
    const t2 = setTimeout(handleRefresh, 750);
    const t3 = setTimeout(handleRefresh, 1500);

    // Failsafe Observer: Ensure no critical section stays stuck at opacity 0 on legacy Safari / older Macs
    const failsafeElements = containerRef.current?.querySelectorAll<HTMLElement>(
      ".intro-anim-item, .how-box-container, .step-row-anim, section"
    );

    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              if (window.getComputedStyle(el).opacity === "0") {
                gsap.to(el, { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" });
              }
            }
          });
        },
        { rootMargin: "50px 0px 50px 0px" }
      );
      failsafeElements?.forEach((el) => observer?.observe(el));
    }

    const handleScrollFallback = () => {
      failsafeElements?.forEach((el) => {
        if (window.getComputedStyle(el).opacity === "0") {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 80) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.4, clearProps: "transform,opacity" });
          }
        }
      });
    };
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleRefresh);
        window.removeEventListener("resize", handleRefresh);
        window.removeEventListener("scroll", handleScrollFallback);
      }
      observer?.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F3F3F3] text-[#111111] overflow-x-clip font-instrument-sans selection:bg-[#00A2E2] selection:text-white"
    >
      {/* Standard Floating Dark Navbar */}
      <Navbar />

      <main className="w-full">
        {/* =====================================================================
            1. TOP BANNER (HERO SECTION)
            Matches Hero.tsx and About hero padding standards (pt: 160px, pb: 120px)
           ===================================================================== */}
        <section
          ref={heroRef}
          className="relative bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-end min-h-screen"
          style={{
            backgroundImage: "url('/images/service_1.png')",
            backgroundPosition: "center 50%",
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
                {/* Small Tag: Our Core Activities */}
                <span
                  className="hero-anim-item font-instrument-sans text-xs sm:text-[13px] text-white/70 font-medium tracking-wide block select-none"
                  style={{ marginBottom: "18px" }}
                >
                  Our Core Activities
                </span>

                {/* Main Title: Investment Approach (Approach in primary blue) */}
                <h1
                  className="hero-anim-item font-clash-grotesk font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.08] tracking-tight"
                  style={{ marginBottom: "20px" }}
                >
                  Investment <span className="text-[#00A2E2]">Approach</span>
                </h1>

                {/* Subtitle */}
                <p
                  className="hero-anim-item font-instrument-sans text-sm sm:text-base text-white/95 leading-relaxed max-w-lg"
                  style={{ marginBottom: "36px" }}
                >
                  We identify and invest in businesses, assets, and opportunities with strong fundamentals, allocating capital on the basis of opportunity, risk, quality, and long-term potential.
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
            2. THE LIGHT GREY INTRO SECTION & DELIVERABLES
            Standard 140px section padding used in About.tsx, Services.tsx, Portfolio.tsx
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
              {/* Top Category Label: The Problem We Solve (18pt) */}
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

              {/* Large Intro Paragraphs with Word-by-Word Scrub */}
              <div ref={problemDescRef} className="problem-desc-container w-full">
                <p
                  className="font-instrument-sans font-normal text-[#111111] w-full tracking-tight"
                  style={{
                    fontSize: "clamp(28px, 3.8vw, 48pt)",
                    lineHeight: "1.24",
                    marginBottom: "clamp(36px, 4vw, 56px)",
                  }}
                >
                  {renderScrubText(
                    "We identify and invest in businesses, assets, and opportunities with strong fundamentals, attractive growth prospects, and strategic relevance."
                  )}
                </p>

                <p
                  className="font-instrument-sans font-normal text-[#111111] w-full tracking-tight"
                  style={{
                    fontSize: "clamp(28px, 3.8vw, 48pt)",
                    lineHeight: "1.24",
                    marginBottom: "clamp(64px, 7vw, 96px)",
                  }}
                >
                  {renderScrubText(
                    "Our investment approach is selective and disciplined, with capital allocated on the basis of opportunity, risk, quality, and long-term potential."
                  )}
                </p>
              </div>

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
                      className="border border-[#2B2B2B]/60 text-[#222222] rounded-full font-instrument-sans font-medium text-[15px] sm:text-[16px] transition-all duration-200 hover:border-[#00A2E2] hover:text-[#00A2E2] select-none whitespace-nowrap"
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
            Standard 140px section padding, with generous internal card padding
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
                {/* Box Title - Left aligned perfectly with the "Understand" column */}
                <div
                  className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-12"
                  style={{ marginBottom: "56px" }}
                >
                  {/* Spacer that exactly matches Column 1 (Step Badge) */}
                  <div className="hidden md:block shrink-0 md:w-36" aria-hidden="true" />

                  {/* Heading: size 48, weight medium, aligned with "Understand" */}
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
                          className="inline-block border border-[#2B2B2B]/60 text-[#222222] bg-transparent rounded-full font-instrument-sans font-medium select-none"
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

                      {/* Right: Step Description */}
                      <p
                        className="font-instrument-sans text-[#2B2B2B] leading-relaxed max-w-xl md:flex-1 text-[14.5px] sm:text-[15.5px]"
                      >
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
            4. FIRST SPLIT SECTION (BLUE BUILDING IMAGE ON LEFT)
            Standard 140px section spacing & AboutPage team section column gaps
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
                      src="/images/Investment_Approach_2.png"
                      alt="Blue-tinted geometric skyscrapers"
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

                      {/* Text aligned at the bottom left: "Book A Call", weight medium, size 18 */}
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
                  {/* Eyebrow: "INVESTMENT PRINCIPLES" */}
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginBottom: "16px",
                    }}
                  >
                    INVESTMENT PRINCIPLES
                  </span>

                  {/* Heading */}
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
                    A disciplined approach to capital and enduring value
                  </h2>

                  {/* Bullet points: size 20, weight regular, color fill #737373, perfectly aligned, reduced dot size */}
                  <ul className="space-y-4 sm:space-y-5">
                    {VALUE_POINTS.map((point, idx) => (
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
                              backgroundColor: "#2B2B2B",
                            }}
                          />
                        </div>
                        <span
                          className="font-instrument-sans font-normal"
                          style={{
                            fontSize: "20px",
                            lineHeight: "28px",
                            fontWeight: 400,
                            color: "#2B2B2B",
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
            5. SECOND SPLIT SECTION (WHO IT IS FOR - REPLICA DESIGN WITH SWITCHED POSITIONS)
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
                  {/* Eyebrow: "WHO IT IS FOR" in Clash display, size 18, weight medium */}
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      marginBottom: "16px",
                    }}
                  >
                    WHO IT IS FOR
                  </span>

                  {/* Heading */}
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
                    Businesses with strong fundamentals seeking strategic capital
                  </h2>

                  {/* Description: size 20, weight regular */}
                  <p
                    className="font-instrument-sans font-normal"
                    style={{
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 400,
                      color: "#2B2B2B",
                    }}
                  >
                    Our approach is designed for established entities, operating businesses, and high-potential enterprises seeking disciplined capital, institutional perspective, and a long-term partner committed to sustainable value creation.
                  </p>
                </div>

                {/* Right Column: Square Picture with Tucked "Let's Connect" White Box */}
                <div className="lg:col-span-6 relative">
                  <div
                    className="relative overflow-hidden aspect-square border border-neutral-200/80 shadow-sm group"
                    style={{ borderRadius: "14px" }}
                  >
                    <img
                      src="/images/Investment_Approach_3.png"
                      alt="Professional working on laptop"
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

                      {/* Text aligned at the bottom left: "Let's Connect", weight medium, size 18 */}
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

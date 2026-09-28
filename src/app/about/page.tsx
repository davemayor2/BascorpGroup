"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Stat Cards Data ──
const HERO_STATS = [
  {
    value: "25+",
    label: "Years of experience",
  },
  {
    value: "100%",
    label: "Focused on Value",
  },
  {
    value: "152k",
    label: "Total Revenue",
  },
  {
    value: "360°",
    label: "Approach to Investment",
  },
];

// ── Mission, Vision & Approach Cards Data ──
const CORE_PILLARS = [
  {
    id: "(01)",
    title: "Our Mission",
    description:
      "To identify, develop, and support businesses with the potential to grow, while creating meaningful partnerships across the markets we serve.",
  },
  {
    id: "(02)",
    title: "Our Vision",
    description:
      "To build a diversified portfolio of businesses and partnerships that create lasting value and connect opportunities across emerging markets.",
  },
  {
    id: "(03)",
    title: "Our Approach",
    description:
      "Identifying opportunities with strong potential for sustainable growth. Building relationships that create long-term value for businesses and stakeholders.",
  },
];

// ── Management Team Data ──
const MANAGEMENT_TEAM = [
  {
    name: "H.H. Sheikh Mohammed Al Issa",
    role: "Chairman and Chief Executive Officer - Bascorp Group",
  },
  {
    name: "Mohammad Al Nahyan",
    role: "Member of Executive Committee and Chief Financial Officer (CFO)",
  },
  {
    name: "Dr Ismail Hussain",
    role: "Executive Director, Consulting Group CFO, and Head of Investment Committee, Bascorp Group",
  },
  {
    name: "G.C. Henderson",
    role: "Senior Executive Director",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const heroStatValuesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statFoundedRef = useRef<HTMLSpanElement>(null);
  const statLocationRef = useRef<HTMLSpanElement>(null);
  const teamParallaxRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Hero Entrance Animation
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
        ".hero-stat-card",
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

      // Glitch / Scramble Decrypt Text Animation Helper
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
        const chars =
          options?.chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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

      // Hero Tag Glitch Animation: "ABOUT BASCORP GROUP"
      if (tagRef.current) {
        runGlitch(tagRef.current, "ABOUT BASCORP GROUP", {
          duration: 1.6,
          delay: 0.15,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        });
      }

      // Hero Stat Cards Number Glitch Animations
      HERO_STATS.forEach((stat, idx) => {
        const el = heroStatValuesRef.current[idx];
        if (el) {
          const symbol = stat.value.replace(/[0-9a-zA-Z]/g, "");
          const chars = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ${symbol}`;
          runGlitch(el, stat.value, {
            duration: 1.4,
            delay: 0.35 + idx * 0.08,
            chars,
          });
        }
      });

      // 2. Overview Section ScrollTrigger
      gsap.from(".overview-header", {
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".overview-banner", {
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      });

      // Parallax scroll on Overview Banner Image (moves UPWARD as user scrolls down)
      if (imageRef.current && bannerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: 20 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.fromTo(
        ".overview-stat",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".overview-stat-row",
            start: "top 95%",
            once: true,
          },
        }
      );

      // Glitch Animation for the Big letters only in the stat cards below the picture frame
      ScrollTrigger.create({
        trigger: ".overview-stat-row",
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (statFoundedRef.current) {
            runGlitch(statFoundedRef.current, "2013", {
              duration: 1.4,
              chars: "0123456789",
            });
          }
          if (statLocationRef.current) {
            runGlitch(statLocationRef.current, "Bahrain", {
              duration: 1.5,
              delay: 0.1,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            });
          }
        },
      });

      // 3. Mission, Vision & Excellence Section ScrollTrigger
      gsap.from(pillarsRef.current, {
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Mission Section Scroll Slider Indicator Animation
      const missionSlider = gsap.timeline({
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 0.4,
        },
      });

      missionSlider
        .fromTo(
          ".mission-slider-indicator",
          { yPercent: -100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.15, ease: "power1.out" }
        )
        .to(".mission-slider-indicator", {
          yPercent: 355,
          duration: 0.75,
          ease: "none",
        })
        .to(".mission-slider-indicator", {
          opacity: 0,
          duration: 0.1,
          ease: "power1.in",
        });

      // 4. Team Section ScrollTrigger
      gsap.from(".team-header-content", {
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 35,
        stagger: 0.14,
        duration: 0.8,
        ease: "power3.out",
      });

      // Parallax scroll effect: The management team text section smoothly scrolls down with the user and stops at the end of the section
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cardsGrid = teamGridRef.current;
        const textEl = teamParallaxRef.current;
        if (!cardsGrid || !textEl) return;

        const getDistance = () => {
          const cardsH = cardsGrid.offsetHeight;
          const textH = textEl.offsetHeight;
          return Math.max(0, cardsH - textH);
        };

        gsap.to(textEl, {
          y: () => getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: cardsGrid,
            start: "top 22%",
            end: "bottom 78%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });



      // Refresh ScrollTrigger calculations
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
      {/* Floating Dark Navbar */}
      <Navbar />

      <main className="w-full">
        {/* =====================================================================
            1. HERO / TOP INTRO SECTION
           ===================================================================== */}
        <section
          ref={heroRef}
          style={{
            paddingTop: "148px",
            paddingBottom: "110px",
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
            {/* Tag */}
            <span
              ref={tagRef}
              className="hero-fade-up font-clash-grotesk text-xs sm:text-sm font-normal tracking-[0.18em] text-[#111111] uppercase block"
              style={{ marginBottom: "28px" }}
            >
              ABOUT BASCORP GROUP
            </span>

            {/* Main Heading */}
            <h1
              className="hero-fade-up font-clash-grotesk font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.12] sm:leading-[1.15] text-[#111111] tracking-tight max-w-4xl"
              style={{ marginBottom: "28px" }}
            >
              Building <span className="text-[#00A2E2]">Value</span>.
              <br />
              Creating <span className="text-[#00A2E2]">Opportunities</span>.
            </h1>

            {/* Subtitle Paragraph */}
            <p
              className="hero-fade-up font-instrument-sans text-sm sm:text-base md:text-[17px] text-[#555555] max-w-2xl leading-relaxed font-normal"
              style={{ marginBottom: "42px" }}
            >
              A diversified investment group connecting businesses, partnerships,
              <br className="hidden sm:inline" />
              and opportunities across the Middle East and Asia.
            </p>

            {/* White CTA Button: Book A Call (Home Page Component Style) */}
            <div className="hero-fade-up" style={{ marginBottom: "70px" }}>
              <a
                href="#contact"
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
                  Book A Call
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
            </div>

            {/* 4 Stat Cards Row */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 w-full max-w-5xl"
              style={{ marginTop: "24px" }}
            >
              {HERO_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="hero-stat-card bg-white rounded-[14px] py-9 px-7 sm:py-10 sm:px-8 border border-[#CDCDCD] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    opacity: 1,
                    minHeight: "180px",
                    borderRadius: "14px",
                    borderColor: "#CDCDCD",
                    boxShadow: "none",
                  }}
                >
                  <span
                    ref={(el) => {
                      heroStatValuesRef.current[idx] = el;
                    }}
                    className="font-clash-grotesk font-medium text-[42px] sm:text-[48px] lg:text-[50px] text-[#111111] tracking-tight leading-none mb-3"
                  >
                    {stat.value}
                  </span>
                  <span className="font-instrument-sans text-sm sm:text-[15px] text-[#737373] font-normal leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. "INNOVATIVE BUSINESS SOLUTIONS FOR SUCCESS COMPANY" SECTION
           ===================================================================== */}
        <section
          id="overview"
          ref={overviewRef}
          style={{ paddingTop: "130px", paddingBottom: "clamp(36px, 4vw, 52px)" }}
          className="relative w-full"
        >
          {/* Header remains inside container-custom */}
          <div className="container-custom">
            {/* Top Divider Line */}
            <div
              className="w-full h-[1px] bg-[#989898]"
              style={{ marginBottom: "26px" }}
            />

            {/* Section Header */}
            <div className="overview-header" style={{ marginBottom: "56px" }}>
              <span
                className="font-instrument-sans text-xs sm:text-sm text-[#8E8E93] font-medium tracking-wide block"
                style={{ marginBottom: "24px" }}
              >
                Overview
              </span>
              <h2 className="font-clash-grotesk font-semibold text-3xl sm:text-4xl md:text-[46px] leading-[1.12] text-[#111111] max-w-2xl">
                Innovative Business Solutions for Success Company
              </h2>
            </div>
          </div>

          {/* Full End-to-End Border Width Picture Frame Banner */}
          <div
            ref={bannerRef}
            className="overview-banner relative w-full overflow-hidden border-y border-[#989898]/40 flex items-end shadow-xs"
            style={{
              minHeight: "380px",
            }}
          >
            {/* Parallax Background Image Container with Expanded Bleed */}
            <div
              className="absolute left-0 right-0 w-full pointer-events-none overflow-hidden"
              style={{
                top: "-30%",
                height: "160%",
              }}
            >
              <img
                ref={imageRef}
                src="/images/about_us_image.png"
                alt="Bascorp Group Overview"
                className="overview-parallax-img w-full h-full object-cover object-[70%_center] md:object-[68%_center]"
              />
            </div>

            {/* Gradient overlay on the left for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />

            {/* Text content container with explicit guaranteed padding from the borders */}
            <div
              className="container-custom relative z-20 w-full"
              style={{
                paddingTop: "40px",
                paddingBottom: "52px",
              }}
            >
              <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-5">
                <p className="font-instrument-sans text-xs sm:text-[14.5px] md:text-[15.5px] text-white/95 leading-[1.65] font-normal">
                  Our focus is on maximizing each business opportunity which is presented to us, and creating mutually beneficial partnerships with like-minded companies and entrepreneurs, both in the Middle East and around the world.
                </p>
                <p className="font-instrument-sans text-xs sm:text-[14.5px] md:text-[15.5px] text-white/90 leading-[1.65] font-normal">
                  We work with our partners to create long-term business relationships, utilizing our expertise, professionalism and diverse network. Positioning ourselves for global expansion, we actively assess outbound as well as inbound investment propositions, placing capital in businesses and other vehicles that are designed to generate tangible social impact as well as a financial return.
                </p>
              </div>
            </div>
          </div>

          {/* Two Stat Highlights Below the Banner */}
          <div className="container-custom" style={{ marginTop: "clamp(56px, 7vw, 96px)" }}>
            <div className="overview-stat-row grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
              {/* Stat 1: Founded In */}
              <div
                className="overview-stat bg-[#FFFFFF] rounded-[14px] sm:rounded-[18px] border border-[#CDCDCD] flex flex-col justify-between transition-all duration-300"
                style={{
                  paddingTop: "clamp(18px, 2.2vw, 26px)",
                  paddingBottom: "clamp(18px, 2.2vw, 26px)",
                  paddingLeft: "clamp(22px, 2.6vw, 32px)",
                  paddingRight: "clamp(22px, 2.6vw, 32px)",
                  minHeight: "clamp(135px, 14vw, 155px)",
                }}
              >
                <span className="font-instrument-sans text-sm sm:text-base text-[#111111] font-medium leading-none block">
                  Founded In
                </span>
                <span
                  ref={statFoundedRef}
                  className="font-instrument-sans font-normal text-4xl sm:text-5xl md:text-[50px] lg:text-[54px] text-[#111111] self-end text-right leading-none tracking-tight block"
                >
                  2013
                </span>
              </div>

              {/* Stat 2: Serving Worldwide From Bahrain */}
              <div
                className="overview-stat bg-[#FFFFFF] rounded-[14px] sm:rounded-[18px] border border-[#CDCDCD] flex flex-col justify-between transition-all duration-300"
                style={{
                  paddingTop: "clamp(18px, 2.2vw, 26px)",
                  paddingBottom: "clamp(18px, 2.2vw, 26px)",
                  paddingLeft: "clamp(22px, 2.6vw, 32px)",
                  paddingRight: "clamp(22px, 2.6vw, 32px)",
                  minHeight: "clamp(135px, 14vw, 155px)",
                }}
              >
                <span className="font-instrument-sans text-sm sm:text-base text-[#111111] font-medium leading-none block">
                  Serving worldwide from
                </span>
                <span
                  ref={statLocationRef}
                  className="font-instrument-sans font-normal text-4xl sm:text-5xl md:text-[50px] lg:text-[54px] text-[#111111] self-end text-right leading-none tracking-tight block"
                >
                  Bahrain
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. MISSION, VISION & EXCELLENCE SECTION
           ===================================================================== */}
        <section
          style={{ paddingTop: "clamp(36px, 4vw, 52px)", paddingBottom: "clamp(70px, 8vw, 100px)" }}
          className="relative"
        >
          <div className="container-custom">
            {/* 1. Main Container (The Dark Wrapper) */}
            <div
              ref={pillarsRef}
              className="mission-dark-wrapper bg-[#000000] rounded-[32px] p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col md:flex-row items-stretch gap-8 md:gap-12 lg:gap-16 shadow-2xl relative"
              style={{
                padding: "clamp(36px, 4.5vw, 60px)",
              }}
            >
              {/* 2. Left Column (Flex-Between Layout) */}
              <div className="w-full md:flex-1 min-w-0 flex flex-col justify-between py-1">
                {/* Top Element: Heading */}
                <h2 className="font-clash-grotesk font-medium text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-white leading-[1.14] tracking-tight">
                  Mission, Vision & Excellence
                </h2>

                {/* Bottom Element Wrapper */}
                <div className="mt-8 md:mt-0 pt-6 md:pt-10 flex flex-col items-start" style={{ gap: "32px" }}>
                  <p className="font-instrument-sans text-sm sm:text-base text-[#D9D9D9] leading-relaxed max-w-sm">
                    Connecting businesses with opportunities across the Middle East and wider Asian markets.
                  </p>

                  {/* Button */}
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-between gap-6 sm:gap-8 bg-white text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xs hover:shadow-md border border-gray-200/80 group select-none cursor-pointer w-fit"
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
                      Book A Call
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
                </div>
              </div>

              {/* 3. The Custom Vertical Divider & Scroll Slider (Desktop Only) */}
              <div className="hidden md:block w-[2px] shrink-0 self-stretch rounded-full my-1 relative overflow-hidden bg-[#333333]">
                {/* Sliding Blue Indicator Line */}
                <div
                  className="mission-slider-indicator absolute left-0 top-0 w-full rounded-full bg-[#00A2E2]"
                  style={{
                    height: "22%",
                    boxShadow: "0 0 10px rgba(0, 162, 226, 0.9)",
                    transform: "translateY(-100%)",
                    opacity: 0,
                  }}
                />
              </div>

              {/* 4. Right Column (The 3 Stacked Cards) */}
              <div className="w-full md:flex-1 min-w-0 flex flex-col gap-4 sm:gap-5 justify-between">
                {CORE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="pillar-card mission-card bg-[#222222] rounded-2xl p-6 sm:p-7 md:p-8 flex flex-col justify-center border border-white/5 transition-all duration-300 hover:border-[#00A2E2]/40 opacity-100"
                    style={{
                      padding: "clamp(24px, 2.6vw, 36px)",
                      opacity: 1,
                    }}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-3.5 sm:mb-4">
                      <h3 className="font-instrument-sans font-medium text-lg sm:text-xl text-white">
                        {pillar.title}
                      </h3>
                      <span className="font-instrument-sans font-normal text-base sm:text-lg text-[#787878] shrink-0">
                        {pillar.id}
                      </span>
                    </div>

                    {/* Body Text */}
                    <p className="font-instrument-sans font-normal text-xs sm:text-[14px] md:text-[15px] leading-relaxed text-[#D9D9D9]">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. "MEET BASCORP GROUP" TEAM SECTION
           ===================================================================== */}
        <section
          id="team"
          ref={teamRef}
          style={{ paddingTop: "clamp(80px, 9vw, 120px)", paddingBottom: "clamp(80px, 9vw, 120px)" }}
          className="relative"
        >
          <div className="container-custom">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 items-start"
              style={{ columnGap: "clamp(48px, 6vw, 100px)", rowGap: "48px" }}
            >
              {/* Left Column: Heading & Description */}
              <div className="team-header-content lg:col-span-4 lg:pr-6 xl:pr-10">
                <div ref={teamParallaxRef} className="team-parallax-inner will-change-transform">
                  <span className="font-instrument-sans text-xs sm:text-sm text-[#8E8E93] font-medium tracking-wide block mb-3">
                    Management Team
                  </span>
                  <h2 className="font-clash-grotesk font-semibold text-3xl sm:text-4xl md:text-[42px] leading-[1.15] text-[#111111] mb-5">
                    Meet Bascorp Group
                  </h2>
                  <p className="font-instrument-sans text-sm sm:text-[15.5px] text-neutral-600 leading-[1.7] max-w-md">
                    We are dedicated to building long-term value for our clients. We
                    have fostered seasoned leadership to drive exceptional
                    execution across all of our business segments.
                  </p>
                </div>
              </div>

              {/* Right Column: 2x2 Grid of Team Cards */}
              <div
                ref={teamGridRef}
                className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2"
                style={{
                  columnGap: "clamp(32px, 3.5vw, 56px)",
                  rowGap: "clamp(48px, 5.5vw, 72px)",
                }}
              >
                {MANAGEMENT_TEAM.map((member, idx) => (
                  <div
                    key={idx}
                    className="team-card flex flex-col group cursor-pointer"
                  >
                    {/* Placeholder Photo Box */}
                    <div
                      className="team-photo-frame w-full aspect-[4/4.7] bg-[#D9D9D9] rounded-[20px] overflow-hidden relative shadow-xs transition-transform duration-300 group-hover:scale-[1.015] border border-gray-200/60 flex items-center justify-center"
                      style={{ marginBottom: "clamp(28px, 3vw, 42px)" }}
                    >
                      {/* Subtle elegant avatar icon / monogram watermark */}
                      <div className="w-16 h-16 rounded-full bg-white/40 flex items-center justify-center text-neutral-500 font-clash-grotesk text-xl font-medium tracking-wider">
                        {member.name
                          .split(" ")
                          .filter((w) => !w.startsWith("H."))
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="team-member-name font-clash-grotesk font-semibold text-lg sm:text-[21px] text-[#111111] leading-snug group-hover:text-[#00A2E2] transition-colors duration-200">
                      {member.name}
                    </h3>

                    {/* Role Title */}
                    <p
                      className="team-member-role font-instrument-sans text-xs sm:text-[14px] text-neutral-500 leading-relaxed"
                      style={{ marginTop: "4px" }}
                    >
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. "HAVE AN OPPORTUNITY IN MIND?" CTA SECTION (HOME PAGE COMPONENT)
           ===================================================================== */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

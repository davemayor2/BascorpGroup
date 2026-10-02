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

// ── Team Email & WhatsApp Icons (from /public/team email.svg & /public/team_whatsapp.svg) ──
const TeamEmailIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M30.8125 5.3125H3.1875C2.5998 5.3125 2.125 5.7873 2.125 6.375V27.625C2.125 28.2127 2.5998 28.6875 3.1875 28.6875H30.8125C31.4002 28.6875 31.875 28.2127 31.875 27.625V6.375C31.875 5.7873 31.4002 5.3125 30.8125 5.3125ZM29.4844 8.99141V26.2969H4.51562V8.99141L3.59922 8.27754L4.9041 6.60078L6.3252 7.70645H27.6781L29.0992 6.60078L30.4041 8.27754L29.4844 8.99141ZM27.6781 7.70312L17 16.0039L6.32187 7.70312L4.90078 6.59746L3.5959 8.27422L4.5123 8.98809L15.8545 17.8068C16.1807 18.0602 16.582 18.1978 16.995 18.1978C17.4081 18.1978 17.8094 18.0602 18.1355 17.8068L29.4844 8.99141L30.4008 8.27754L29.0959 6.60078L27.6781 7.70312Z"
      fill="currentColor"
    />
  </svg>
);

const TeamWhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.6712 20.3745C24.2491 20.1635 22.1793 19.1463 21.794 19.0046C21.4087 18.863 21.1282 18.795 20.8462 19.2171C20.5657 19.6379 19.7597 20.5856 19.5146 20.8661C19.2681 21.148 19.023 21.182 18.6022 20.9724C18.1815 20.7599 16.8243 20.3165 15.2164 18.8828C13.9655 17.7665 13.1197 16.388 12.8747 15.9659C12.6296 15.5451 12.8477 15.317 13.0588 15.1074C13.2487 14.919 13.4796 14.6158 13.6907 14.3707C13.9017 14.1256 13.9712 13.9485 14.1114 13.6666C14.2531 13.3861 14.1822 13.141 14.076 12.93C13.9712 12.7189 13.1297 10.6463 12.7783 9.80338C12.4369 8.98313 12.0898 9.09505 11.832 9.08088C11.5855 9.06955 11.305 9.06671 11.0245 9.06671C10.744 9.06671 10.2878 9.17155 9.9025 9.59371C9.51575 10.0145 8.42917 11.033 8.42917 13.1056C8.42917 15.1768 9.9365 17.1785 10.1476 17.4605C10.3587 17.7424 13.1155 21.9938 17.3386 23.817C18.3444 24.2505 19.1278 24.5098 19.7384 24.7025C20.7471 25.024 21.6651 24.9787 22.3904 24.8696C23.1979 24.7492 24.8809 23.851 25.2322 22.8679C25.5836 21.8847 25.5822 21.0418 25.4773 20.8661C25.3725 20.6905 25.092 20.5856 24.6698 20.3745M16.9887 30.8621H16.983C14.4747 30.8626 12.0124 30.1883 9.85433 28.91L9.34433 28.6068L4.04317 29.998L5.45842 24.83L5.1255 24.3001C3.72312 22.068 2.98101 19.4846 2.98492 16.8485C2.98775 9.12763 9.26925 2.84613 16.9943 2.84613C18.8343 2.84054 20.657 3.20073 22.3565 3.90578C24.0559 4.61082 25.5983 5.64665 26.894 6.95305C28.198 8.25113 29.2316 9.795 29.9348 11.4953C30.6381 13.1955 30.9971 15.0184 30.991 16.8584C30.9882 24.5792 24.7067 30.8621 16.9887 30.8621ZM28.9057 4.94138C27.3447 3.37068 25.4877 2.12518 23.4421 1.277C21.3966 0.428819 19.2031 -0.00520668 16.9887 4.71322e-05C7.70383 4.71322e-05 0.1445 7.55796 0.141667 16.847C0.137096 19.8033 0.912614 22.7084 2.38992 25.2691L0 34L8.93067 31.6569C11.4016 33.0018 14.1698 33.707 16.983 33.7082H16.9901C26.2749 33.7082 33.8342 26.1503 33.8371 16.8598C33.844 14.6459 33.4119 12.4527 32.5656 10.4069C31.7194 8.36111 30.4759 6.50345 28.9071 4.94138"
      fill="currentColor"
    />
  </svg>
);

// ── Management Team Data (Exact Reference) ──
const MANAGEMENT_TEAM = [
  {
    name: "H.H. Sheikh\nMohammed Al Issa",
    role: "Chairman and Chief Executive Officer - CEO",
    email: "ceo@bascorpgroup.com",
    hasWhatsApp: false,
  },
  {
    name: "G.C Henderson",
    role: "President, Finance & Budgets.",
    email: "finance@bascorpgroup.com",
    hasWhatsApp: false,
  },
  {
    name: "Dr. Fahad Ali Al\nShammari.",
    role: "Executive Director\nInvestment, Finance and Budget",
    email: "investment@bascorpgroup.com",
    whatsapp: "https://wa.me/13025369761",
    hasWhatsApp: true,
  },
  {
    name: "Dr Ismail Hussain",
    role: "Executive Director\nDeputy Group CFO and CEO Investment,\nMerger And Acquisition",
    email: "ismail@bascorpgroup.com",
    whatsapp: "https://wa.me/12537773485",
    hasWhatsApp: true,
  },
  {
    name: "Mohammad Al Nahyan",
    role: "Member of Executive Committee,\nChief Financial Officer – CFO",
    email: "cfo@bascorpgroup.com",
    whatsapp: "https://wa.me/971552479263",
    hasWhatsApp: true,
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
      gsap.fromTo(
        ".overview-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: overviewRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".overview-banner",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: overviewRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

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
      gsap.fromTo(
        ".team-header-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".team-card-wrapper",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );



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
                  style={{ width: "36px", height: "36px", borderRadius: "4px" }}
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
            <div
              className="overview-header"
              style={{
                marginBottom: "clamp(68px, 7.5vw, 104px)",
                paddingBottom: "clamp(12px, 1.5vw, 20px)",
              }}
            >
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
              minHeight: "clamp(520px, 50vw, 660px)",
            }}
          >
            {/* Parallax Background Image Container with Expanded Bleed */}
            <div
              className="absolute left-0 right-0 w-full pointer-events-none overflow-hidden"
              style={{
                top: "-30%",
                height: "160%",
                transform: "translate3d(0, 0, 0)",
                WebkitTransform: "translate3d(0, 0, 0)",
              }}
            >
              <img
                ref={imageRef}
                src="/images/about_us_image.png"
                alt="Bascorp Group Overview"
                className="overview-parallax-img w-full h-full object-cover object-[70%_center] md:object-[68%_center] will-change-transform"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                }}
              />
            </div>

            {/* Gradient overlay on the left for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />

            {/* Text content container with explicit guaranteed padding from the borders */}
            <div
              className="container-custom relative z-20 w-full"
              style={{
                paddingTop: "clamp(48px, 6vw, 80px)",
                paddingBottom: "clamp(56px, 7vw, 90px)",
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
            {/* 1. Main Container (The 00194C Wrapper) */}
            <div
              ref={pillarsRef}
              className="mission-dark-wrapper bg-[#00194C] rounded-[32px] p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col md:flex-row items-stretch gap-8 md:gap-12 lg:gap-16 shadow-2xl relative"
              style={{
                backgroundColor: "#00194C",
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
                  <p className="font-instrument-sans text-sm sm:text-base text-white leading-relaxed max-w-sm">
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
                      style={{ width: "36px", height: "36px", borderRadius: "4px" }}
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
              <div className="hidden md:block w-[2px] shrink-0 self-stretch rounded-full my-1 relative overflow-hidden bg-white/20">
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

              {/* 4. Right Column (The 3 Stacked Cards in Primary Blue with All White Text) */}
              <div className="w-full md:flex-1 min-w-0 flex flex-col gap-4 sm:gap-5 justify-between">
                {CORE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="pillar-card mission-card bg-[#00A2E2] rounded-2xl p-6 sm:p-7 md:p-8 flex flex-col justify-center border border-white/20 shadow-md transition-all duration-300 hover:border-white/40 opacity-100"
                    style={{
                      backgroundColor: "#00A2E2",
                      padding: "clamp(24px, 2.6vw, 36px)",
                      opacity: 1,
                    }}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-3.5 sm:mb-4">
                      <h3 className="font-instrument-sans font-medium text-lg sm:text-xl text-white">
                        {pillar.title}
                      </h3>
                      <span className="font-instrument-sans font-medium text-base sm:text-lg text-white shrink-0">
                        {pillar.id}
                      </span>
                    </div>

                    {/* Body Text */}
                    <p className="font-instrument-sans font-normal text-xs sm:text-[14px] md:text-[15px] leading-relaxed text-white">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. "MEET BASCORP GROUP" TEAM SECTION (REDESIGNED PER REFERENCE)
           ===================================================================== */}
        <section
          id="team"
          ref={teamRef}
          style={{
            paddingTop: "clamp(60px, 7vw, 100px)",
            paddingBottom: "clamp(90px, 10vw, 150px)",
          }}
          className="relative bg-[#F3F3F3]"
        >
          <div className="container-custom">
            {/* Top Divider Line matching reference */}
            <div
              className="w-full h-[1px] bg-[#CDCDCD]"
              style={{ marginBottom: "clamp(10px, 1.2vw, 14px)" }}
            />

            {/* Header Content: Eyebrow + Heading + Description */}
            <div
              className="team-header-content flex flex-col items-start"
              style={{
                marginBottom: "clamp(64px, 7vw, 100px)",
                paddingBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              <span
                className="font-instrument-sans text-xs sm:text-sm text-[#8E8E93] font-medium tracking-wide block select-none"
                style={{ marginBottom: "clamp(28px, 3.2vw, 42px)" }}
              >
                Management Team
              </span>
              <h2
                className="font-clash-grotesk font-semibold text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] leading-[1.12] text-[#111111] mb-7 sm:mb-8 tracking-tight"
              >
                Meet Bascorp Group
              </h2>
              <p
                className="font-instrument-sans text-sm sm:text-[15.5px] text-[#737373] leading-[1.7] max-w-xl font-normal"
              >
                We are dedicated to building a diverse team in all aspects. While we
                haven&apos;t reached full diversity yet, here&apos;s our current progress with
                open and honest communication.
              </p>
            </div>

            {/* Team Cards Grid: 3 columns on desktop, 5 cards matching reference layout */}
            <div
              className="team-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
              style={{ marginTop: "clamp(28px, 3vw, 48px)" }}
            >
              {MANAGEMENT_TEAM.map((member, idx) => (
                <div key={idx} className="team-card-wrapper w-full h-full flex flex-col">
                  <div
                    className="w-full h-full bg-white rounded-none border border-black/[0.04] shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center select-none"
                    style={{
                      paddingTop: "clamp(48px, 5.2vw, 68px)",
                      paddingBottom: "clamp(48px, 5.2vw, 68px)",
                      paddingLeft: "clamp(28px, 3vw, 44px)",
                      paddingRight: "clamp(28px, 3vw, 44px)",
                      minHeight: "clamp(330px, 32vw, 390px)",
                    }}
                  >
                    {/* Name and Role Block */}
                    <div className="flex flex-col items-center justify-center w-full">
                      {/* Member Name */}
                      <h3
                        className="font-clash-grotesk font-medium text-[22px] sm:text-[24px] lg:text-[26px] text-[#111111] leading-[1.24] tracking-tight mb-3 whitespace-pre-line"
                      >
                        {member.name}
                      </h3>

                      {/* Member Role */}
                      <p
                        className="font-instrument-sans font-normal text-[13.5px] sm:text-[14px] text-[#787878] leading-relaxed max-w-[270px] whitespace-pre-line"
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Social Action Icon Buttons */}
                    <div
                      className="flex items-center justify-center gap-3"
                      style={{ marginTop: "clamp(34px, 3.8vw, 48px)" }}
                    >
                      {/* Mail Button */}
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-[#ECECEC] hover:bg-[#00A2E2] flex items-center justify-center transition-all duration-200 group/icon cursor-pointer shadow-none"
                        aria-label={`Email ${member.name.replace("\n", " ")}`}
                      >
                        <TeamEmailIcon
                          className="w-[19px] h-[19px] text-[#A8A8A8] group-hover/icon:text-white transition-colors duration-200"
                        />
                      </a>

                      {/* WhatsApp Button (if member has WhatsApp) */}
                      {member.hasWhatsApp && member.whatsapp && (
                        <a
                          href={member.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-[4px] bg-[#ECECEC] hover:bg-[#00A2E2] flex items-center justify-center transition-all duration-200 group/icon cursor-pointer shadow-none"
                          aria-label={`WhatsApp ${member.name.replace("\n", " ")}`}
                        >
                          <TeamWhatsAppIcon
                            className="w-[19px] h-[19px] text-[#A8A8A8] group-hover/icon:text-white transition-colors duration-200"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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

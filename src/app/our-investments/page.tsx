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

const SECTOR_CARDS = [
  {
    id: "healthcare",
    category: "Healthcare & Pharmaceuticals",
    title: "Healthcare & Pharmaceuticals",
    description:
      "Bascorp Group is a private concern that combines the strength and security of a large, international institution with the nimbleness of our entrepreneurial beginnings. We have the financial capabilities to participate in major transactions, the resilience to withstand market volatility and the agility to quickly capitalize on new opportunities as they arise..",
    image: "/images/card1.png",
    icon: "/Icon_1.svg",
  },
  {
    id: "retail",
    category: "Wholesale & Retail Trade",
    title: "Wholesale & Retail Trade",
    description:
      "Supporting resilient supply chains, commercial distribution networks, and modern consumer retail platforms connecting high-growth consumer markets.",
    image: "/images/card2.png",
    icon: "/icon_retail.svg",
  },
  {
    id: "private-equity",
    category: "Private Equity",
    title: "Private Equity",
    description:
      "Deploying flexible, strategic capital into high-potential companies with strong management teams, proven unit economics, and clear pathways to operational scale and value creation.",
    image: "/images/card3.png",
    icon: "/private_equity.svg",
  },
  {
    id: "transportation",
    category: "Transportation",
    title: "Transportation",
    description:
      "Financing fleet infrastructure, multimodal logistics hubs, and supply chain technologies that streamline regional transit and freight efficiency.",
    image: "/images/card4.png",
    icon: "/transportation.svg",
  },
  {
    id: "telecommunications",
    category: "Telecommunications",
    title: "Telecommunications",
    description:
      "Backing essential digital infrastructure, high-speed connectivity networks, and enterprise telecommunication assets powering modern digital economies.",
    image: "/images/card5.png",
    icon: "/tele_comms.svg",
  },
  {
    id: "public-equity",
    category: "Public Equity",
    title: "Public Equity",
    description:
      "Active participation in publicly listed securities with attractive valuation multiples, sound corporate governance, and disciplined capital allocation policies.",
    image: "/images/card6.png",
    icon: "/public_equity.svg",
  },
];

const TICKER_ITEMS = [
  "Investing Across Industries",
  "Building Long-Term Value",
  "Diverse Sectors",
  "Strategic Opportunities",
  "Diversified Approach to Investment",
];

export default function OurInvestmentsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Hero Content Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          ".hero-fade-item",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            clearProps: "transform,opacity",
          }
        );

      // 2. Sector Cards Scroll Reveal Animation
      const cards = gsap.utils.toArray<HTMLElement>(".sector-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
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
      {/* 1. Top Standard Floating Dark Navbar */}
      <Navbar />

      <main className="flex flex-col w-full">
        {/* =====================================================================
            1. HERO INTRODUCTION
            Generous breathing room between the floating navbar and the headline
           ===================================================================== */}
        <section
          ref={heroRef}
          className="relative bg-[#F3F3F3]"
          style={{
            paddingTop: "clamp(210px, 18vw, 260px)",
            paddingBottom: "clamp(64px, 7vw, 96px)",
          }}
        >
          <div
            className="w-full mx-auto"
            style={{
              maxWidth: "1080px",
              paddingLeft: "clamp(24px, 5vw, 64px)",
              paddingRight: "clamp(24px, 5vw, 64px)",
            }}
          >
            <div className="flex flex-col items-start text-left">
              {/* Main Headline */}
              <h1
                className="hero-fade-item font-clash-grotesk font-semibold tracking-tight text-[#111111] max-w-4xl"
                style={{
                  fontSize: "clamp(38px, 4.6vw, 68px)",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                Diversified <span className="text-[#00A2E2]">Investments</span>.
                <br className="hidden sm:inline" />
                {" "}Multiple Paths to <span className="text-[#00A2E2]">Growth</span>.
              </h1>

              {/* Subtitle Description */}
              <p
                className="hero-fade-item font-instrument-sans text-[#666666] leading-relaxed max-w-2xl font-normal"
                style={{
                  fontSize: "clamp(17px, 1.25vw, 19px)",
                  marginBottom: "36px",
                }}
              >
                Bascorp Group invests across a diverse range of sectors and strategies, combining financial strength, market insight, and a long-term approach to identify opportunities and create sustainable value.
              </p>

              {/* White "Book A Call" Button */}
              <div className="hero-fade-item">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-between gap-6 sm:gap-8 bg-white text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-200/80 group select-none cursor-pointer w-fit"
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
        </section>

        {/* =====================================================================
            2. SCROLLING TEXT RIBBON
            Full edge-to-edge continuous, slow-scrolling ticker with bullet dots
           ===================================================================== */}
        <div
          ref={tickerRef}
          className="w-full border-y border-[#E2E2E2] bg-white/80 backdrop-blur-xs overflow-hidden select-none"
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
          aria-label="Investment sectors ticker"
        >
          <div className="animate-ticker flex items-center">
            {/* 4 sets of the sectors list for ultra-smooth seamless looping */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
              (sector, idx) => (
                <div key={idx} className="flex items-center whitespace-nowrap">
                  <span
                    className="font-instrument-sans font-medium text-[#383838] tracking-wider uppercase"
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      paddingLeft: "28px",
                      paddingRight: "28px",
                    }}
                  >
                    {sector}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#00A2E2] shrink-0"
                    aria-hidden="true"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* =====================================================================
            3. THE INVESTMENT SECTOR CARDS (MAIN CONTENT)
            Bigger outer box: 1314 x 603, corner radius 14
            Positioned dead-center of the screen
           ===================================================================== */}
        <section
          ref={cardsContainerRef}
          className="w-full bg-[#F3F3F3] text-[#111111] flex flex-col items-center justify-center"
          style={{
            paddingTop: "clamp(72px, 8vw, 110px)",
            paddingBottom: "clamp(110px, 12vw, 170px)",
          }}
        >
          <div
            className="w-full flex flex-col items-center justify-center mx-auto"
            style={{
              maxWidth: "1354px",
              paddingLeft: "clamp(16px, 2.5vw, 20px)",
              paddingRight: "clamp(16px, 2.5vw, 20px)",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              className="w-full flex flex-col items-center justify-center"
              style={{
                gap: "clamp(36px, 4vw, 56px)",
              }}
            >
              {SECTOR_CARDS.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="sector-card relative overflow-hidden group border border-black/5 mx-auto"
                    style={{
                      width: "100%",
                      maxWidth: "1314px",
                      height: "603px",
                      borderRadius: "14px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {/* Background Picture filling the whole outer box */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                      {/* Dark / black overlay on the outer box with increased intensity and guaranteed z-index */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.65)",
                          zIndex: 2,
                        }}
                      />
                    </div>

                    {/* Left-Aligned Smaller / Inner Box with Lessened Background Blur & 8pt Corner Radius */}
                    <div
                      className="absolute z-10 flex flex-col justify-between"
                      style={{
                        top: "16px",
                        bottom: "16px",
                        left: "16px",
                        width: "clamp(300px, 46%, 600px)",
                        maxWidth: "calc(100% - 32px)",
                        borderRadius: "8pt",
                        background: "rgba(18, 20, 24, 0.78)",
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        padding: "clamp(24px, 3.5vw, 42px)",
                      }}
                    >
                      {/* Top Row: Icon + text on left, "Get Started" button on right */}
                      <div
                        className="flex items-center justify-between gap-4 w-full"
                        style={{ paddingTop: "6px" }}
                      >
                        {/* Top Left: Icon_1.svg with text by its side */}
                        <div className="flex items-center gap-3 text-white select-none">
                          <img
                            src={card.icon}
                            alt={`${card.title} Icon`}
                            className="object-contain shrink-0"
                            style={{ width: "24px", height: "24px" }}
                          />
                          <span
                            className="font-instrument-sans font-medium text-white tracking-wide leading-none"
                            style={{ fontSize: "16px" }}
                          >
                            Investing Across Industries
                          </span>
                        </div>

                        {/* Top Right: "Get Started" button with sharp 0px radius, 15px text, 15px left / 8px right padding, increased top padding - desktop/tablet only */}
                        <a
                          href="#contact"
                          className="hidden md:inline-flex items-center text-white font-instrument-sans transition-all duration-300 hover:bg-white/10 shrink-0 group/btn select-none"
                          style={{
                            borderRadius: "0px",
                            border: "1px solid rgba(255, 255, 255, 0.75)",
                            paddingLeft: "15px",
                            paddingRight: "8px",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            gap: "10px",
                          }}
                        >
                          <span
                            className="font-medium leading-none"
                            style={{ fontSize: "15px" }}
                          >
                            Get Started
                          </span>
                          <img
                            src="/investments_arrow.svg"
                            alt="Arrow"
                            className="object-contain transition-transform duration-300 group-hover/btn:translate-x-0.5"
                            style={{ width: "18px", height: "18px" }}
                          />
                        </a>
                      </div>

                      {/* Bottom Left: Heading (weight medium, size 28) and Subheading (size 16, weight regular) */}
                      <div className="flex flex-col gap-4 max-w-xl">
                        <h3
                          className="font-clash-grotesk text-white tracking-tight leading-tight"
                          style={{
                            fontSize: "28px",
                            fontWeight: 500,
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="font-instrument-sans text-[#D1D5DB] leading-relaxed"
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        >
                          {card.description}
                        </p>
                        {/* Mobile view: standalone Get Started text below subheading (not in a box) */}
                        <a
                          href="#contact"
                          className="md:hidden inline-block text-white font-instrument-sans font-medium text-[15px] pt-1 underline underline-offset-4 hover:text-[#00A2E2] transition-colors select-none self-start"
                        >
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. GLOBAL CONTACT SECTION
            Standard "Have an Opportunity in Mind?" module
           ===================================================================== */}
        <Contact />
      </main>

      {/* 5. Standard Four-Column Light Grey Footer */}
      <Footer />
    </div>
  );
}

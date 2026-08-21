"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const metric1Ref = useRef<HTMLSpanElement>(null);
  const metric2Ref = useRef<HTMLSpanElement>(null);
  const metric3Ref = useRef<HTMLSpanElement>(null);

  // Structured vision statement blocks matching design reference & exact grammar
  const visionBlocks = [
    {
      text: "Our Vision it to be a trusted gateway for businesses ",
      isMuted: false,
    },
    {
      text: "seeking growth across the Middle East and beyond, ",
      isMuted: true,
    },
    {
      text: "creating lasting value through strategic investments, ",
      isMuted: false,
    },
    {
      text: "partnerships and opportunities across diverse industries.",
      isMuted: true,
    },
  ];

  useGSAP(
    () => {
      // ── Vision Statement Text Animation (Desktop only) ──
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        gsap.set(".about-muted-word", {
          color: "#000000",
          opacity: 1,
        });
      } else {
        gsap.to(".about-muted-word", {
          color: "#000000",
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        });
      }

      // ── Card Fade/Entrance Animation ──
      gsap.fromTo(
        ".about-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // ── Numeric Counters & Letter Scramble Animation (Mobile + Desktop) ──
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          // 1. Card 1 (20+): 0 -> 20 over 1.5s, appends '+' on complete
          const countObj1 = { val: 0 };
          gsap.to(countObj1, {
            val: 20,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (metric1Ref.current) {
                metric1Ref.current.textContent = `${Math.floor(countObj1.val)}`;
              }
            },
            onComplete: () => {
              if (metric1Ref.current) {
                metric1Ref.current.textContent = "20+";
              }
            },
          });

          // 2. Card 2 (6+): 0 -> 6 over 1.2s, appends '+' on complete
          const countObj2 = { val: 0 };
          gsap.to(countObj2, {
            val: 6,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (metric2Ref.current) {
                metric2Ref.current.textContent = `${Math.floor(countObj2.val)}`;
              }
            },
            onComplete: () => {
              if (metric2Ref.current) {
                metric2Ref.current.textContent = "6+";
              }
            },
          });

          // 3. Card 3 (Global): Cipher / Glitch text-scramble settling left to right
          const targetWord = "Global";
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          const scrambleObj = { progress: 0 };

          gsap.to(scrambleObj, {
            progress: 1,
            duration: 1.6,
            ease: "power1.inOut",
            onUpdate: () => {
              if (!metric3Ref.current) return;
              const p = scrambleObj.progress;
              const settledLength = Math.floor(p * targetWord.length);
              let output = "";

              for (let i = 0; i < targetWord.length; i++) {
                if (i < settledLength) {
                  output += targetWord[i];
                } else {
                  const randomChar = chars[Math.floor(Math.random() * chars.length)];
                  output += randomChar;
                }
              }
              metric3Ref.current.textContent = output;
            },
            onComplete: () => {
              if (metric3Ref.current) {
                metric3Ref.current.textContent = targetWord;
              }
            },
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F3F3F3]"
      style={{ paddingTop: "140px", paddingBottom: "140px" }}
    >
      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left Column — "About Us" badge (sticky on desktop only) ── */}
          <div className="lg:col-span-3 self-start flex items-center gap-3 lg:sticky lg:top-[120px]">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200/60 shrink-0">
              <img
                src="/about_us_icon.svg"
                alt="About Us"
                className="w-3.5 h-3.5 object-contain"
              />
            </div>
            <span className="text-sm font-bold text-black tracking-widest uppercase font-instrument-sans">
              About Us
            </span>
          </div>

          {/* ── Right Column — SCROLLING content ── */}
          <div className="lg:col-span-9 flex flex-col gap-20 md:gap-24 w-full">
            {/* Vision Statement */}
            <div ref={textRef} className="w-full">
              <p
                className="text-2xl sm:text-3xl md:text-[38px] leading-relaxed font-normal"
                style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
              >
                {visionBlocks.map((block, bIdx) => {
                  const words = block.text.split(" ");
                  return words.map((word, wIdx) => {
                    if (!word) return null;
                    return (
                      <React.Fragment key={`${bIdx}-${wIdx}`}>
                        {block.isMuted ? (
                          <span className="about-muted-word inline text-[#989898] opacity-40 font-normal transition-colors duration-200">
                            {word}
                          </span>
                        ) : (
                          <span className="inline text-black font-normal">
                            {word}
                          </span>
                        )}
                        {" "}
                      </React.Fragment>
                    );
                  });
                })}
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full"
            >
              {/* Card 1: 20+ */}
              <div
                className="about-card bg-white rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col select-none"
                style={{
                  height: "262px",
                  padding: "28px",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "74px",
                    height: "74px",
                    backgroundColor: "#F3F3F3",
                    borderRadius: "12px",
                    marginBottom: "auto",
                  }}
                >
                  <img
                    src="/20+_brain.svg"
                    alt="Years of Experience"
                    className="object-contain"
                    style={{ width: "36px", height: "36px" }}
                  />
                </div>

                <div className="flex flex-col" style={{ marginTop: "auto", gap: "6px" }}>
                  <span
                    ref={metric1Ref}
                    className="font-clash-grotesk font-medium text-[#00A2E2] leading-none"
                    style={{ fontSize: "48px", fontWeight: 500 }}
                  >
                    0
                  </span>
                  <span
                    className="font-instrument-sans font-normal text-[#989898] leading-snug"
                    style={{ fontSize: "14px" }}
                  >
                    Years of Experience
                  </span>
                </div>
              </div>

              {/* Card 2: 6+ */}
              <div
                className="about-card bg-white rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col select-none"
                style={{
                  height: "262px",
                  padding: "28px",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "74px",
                    height: "74px",
                    backgroundColor: "#F3F3F3",
                    borderRadius: "12px",
                    marginBottom: "auto",
                  }}
                >
                  <img
                    src="/pie_chart.svg"
                    alt="Investment Sectors"
                    className="object-contain"
                    style={{ width: "36px", height: "36px" }}
                  />
                </div>

                <div className="flex flex-col" style={{ marginTop: "auto", gap: "6px" }}>
                  <span
                    ref={metric2Ref}
                    className="font-clash-grotesk font-medium text-[#00A2E2] leading-none"
                    style={{ fontSize: "48px", fontWeight: 500 }}
                  >
                    0
                  </span>
                  <span
                    className="font-instrument-sans font-normal text-[#989898] leading-snug"
                    style={{ fontSize: "14px" }}
                  >
                    Investment Sectors
                  </span>
                </div>
              </div>

              {/* Card 3: Global */}
              <div
                className="about-card bg-white rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col select-none"
                style={{
                  height: "262px",
                  padding: "28px",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "74px",
                    height: "74px",
                    backgroundColor: "#F3F3F3",
                    borderRadius: "12px",
                    marginBottom: "auto",
                  }}
                >
                  <img
                    src="/globe_blue.svg"
                    alt="Investment Perspective"
                    className="object-contain"
                    style={{ width: "36px", height: "36px" }}
                  />
                </div>

                <div className="flex flex-col" style={{ marginTop: "auto", gap: "6px" }}>
                  <span
                    ref={metric3Ref}
                    className="font-clash-grotesk font-medium text-[#00A2E2] leading-none"
                    style={{ fontSize: "48px", fontWeight: 500 }}
                  >
                    Global
                  </span>
                  <span
                    className="font-instrument-sans font-normal text-[#989898] leading-snug"
                    style={{ fontSize: "14px" }}
                  >
                    Investment Perspective
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

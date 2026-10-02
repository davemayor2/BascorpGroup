"use client";

import React, { useRef, useEffect } from "react";
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
      text: "Our Vision is to be a trusted gateway for businesses ",
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
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
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
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F3F3F3]"
      style={{ paddingTop: "clamp(64px, 7vw, 110px)", paddingBottom: "clamp(80px, 9vw, 130px)" }}
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full"
            >
              {/* Card 1: 20+ */}
              <div
                className="about-card bg-white rounded-2xl sm:rounded-[22px] border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between select-none min-h-[290px] sm:min-h-[310px] md:min-h-[330px]"
                style={{ padding: "clamp(34px, 3.8vw, 48px)" }}
              >
                <div
                  className="flex items-center justify-center shrink-0 w-[64px] h-[64px] sm:w-[70px] sm:h-[70px] bg-[#F3F3F3] rounded-[12px] sm:rounded-[14px]"
                >
                  <img
                    src="/20+_brain.svg"
                    alt="Years of Experience"
                    className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                  />
                </div>

                <div className="flex flex-col mt-8 sm:mt-10 gap-2">
                  <span
                    ref={metric1Ref}
                    className="font-clash-grotesk font-medium text-[#00A2E2] leading-none text-[42px] sm:text-[46px] md:text-[50px]"
                  >
                    0
                  </span>
                  <span
                    className="font-instrument-sans font-normal text-[#989898] leading-snug text-sm sm:text-[15px]"
                  >
                    Years of Experience
                  </span>
                </div>
              </div>

              {/* Card 2: 6+ */}
              <div
                className="about-card bg-white rounded-2xl sm:rounded-[22px] border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between select-none min-h-[290px] sm:min-h-[310px] md:min-h-[330px]"
                style={{ padding: "clamp(34px, 3.8vw, 48px)" }}
              >
                <div
                  className="flex items-center justify-center shrink-0 w-[64px] h-[64px] sm:w-[70px] sm:h-[70px] bg-[#F3F3F3] rounded-[12px] sm:rounded-[14px]"
                >
                  <img
                    src="/pie_chart.svg"
                    alt="Investment Sectors"
                    className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                  />
                </div>

                <div className="flex flex-col mt-8 sm:mt-10 gap-2">
                  <span
                    ref={metric2Ref}
                    className="font-clash-grotesk font-medium text-[#00A2E2] leading-none text-[42px] sm:text-[46px] md:text-[50px]"
                  >
                    0
                  </span>
                  <span
                    className="font-instrument-sans font-normal text-[#989898] leading-snug text-sm sm:text-[15px]"
                  >
                    Investment Sectors
                  </span>
                </div>
              </div>

              {/* Card 3: Global */}
              <div
                className="about-card bg-white rounded-2xl sm:rounded-[22px] border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between select-none min-h-[290px] sm:min-h-[310px] md:min-h-[330px]"
                style={{ padding: "clamp(34px, 3.8vw, 48px)" }}
              >
                <div
                  className="flex items-center justify-center shrink-0 w-[64px] h-[64px] sm:w-[70px] sm:h-[70px] bg-[#F3F3F3] rounded-[12px] sm:rounded-[14px]"
                >
                  <img
                    src="/globe_blue.svg"
                    alt="Investment Perspective"
                    className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                  />
                </div>

                <div className="flex flex-col mt-8 sm:mt-10 gap-2">
                  <span
                    ref={metric3Ref}
                    className="font-clash-grotesk font-medium text-[#00A2E2] leading-none text-[42px] sm:text-[46px] md:text-[50px]"
                  >
                    Global
                  </span>
                  <span
                    className="font-instrument-sans font-normal text-[#989898] leading-snug text-sm sm:text-[15px]"
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

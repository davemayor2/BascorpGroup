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
  "Operational Strengthening",
  "Strategic Direction",
  "Commercial Expertise",
  "Market Access & Expansion",
  "Scalable Systems Architecture",
  "Relationship Networks",
  "Growth Roadmapping",
  "Executive Execution Advisory",
];

const STEPS = [
  {
    tag: "Step 1",
    title: "Operational Assessment",
    description:
      "We evaluate operational foundations, commercial readiness, and market positioning to identify high-impact growth levers.",
  },
  {
    tag: "Step 2",
    title: "Strategic Direction",
    description:
      "We define clear strategic priorities, aligning executive teams around actionable milestones for sustainable scale.",
  },
  {
    tag: "Step 3",
    title: "Commercial Execution",
    description:
      "We contribute commercial expertise, opening doors to new customer segments, distribution channels, and regional networks.",
  },
  {
    tag: "Step 4",
    title: "Scale & Institutionalize",
    description:
      "We support long-term capability building, ensuring businesses develop resilient systems that endure across market cycles.",
  },
];

const VALUE_POINTS = [
  "Hands-on commercial expertise to accelerate revenue and operational efficiency",
  "Direct access to established relationships across the Arabian Gulf, Middle East, and Asia",
  "Practical strategic direction turning high-level ambition into measurable execution",
  "Scaling operations while instilling governance, discipline, and organizational resilience",
  "Enduring partnership aligned with long-term enterprise growth and sustainability",
  "Active capability to help businesses capture emergent opportunities and new markets",
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

export default function BusinessBuildingDevelopmentPage() {
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
          { opacity: 1, duration: 0.6, clearProps: "opacity" }
        )
        .fromTo(
          ".hero-anim-item",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, clearProps: "transform,opacity" },
          "-=0.3"
        );

      // 2. Intro Section Entrance Animation
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 92%",
          once: true,
        },
      });
      introTl.fromTo(
        ".intro-anim-item",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );

      // 3. Word-by-Word Scroll Scrub Animation
      if (problemDescRef.current) {
        const words = problemDescRef.current.querySelectorAll<HTMLElement>(".word-scrub");
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

      // 4. "How It Works" Section Scroll Reveal
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
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        )
        .fromTo(
          ".step-row-anim",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.4"
        );

      // 5. First Split Section Scroll Reveal
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

      // 6. Second Split Section Scroll Reveal
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
      <Navbar />

      <main className="w-full">
        {/* =====================================================================
            1. HERO SECTION
           ===================================================================== */}
        <section
          ref={heroRef}
          className="relative bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col justify-end min-h-screen"
          style={{
            backgroundImage: "url('/images/investment_strategy_1.png')",
            backgroundPosition: "center 50%",
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

                {/* Main Title */}
                <h1
                  className="hero-anim-item font-clash-grotesk font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.08] tracking-tight"
                  style={{ marginBottom: "20px" }}
                >
                  Business Building & <span className="text-[#00A2E2]">Development</span>
                </h1>

                {/* Subtitle */}
                <p
                  className="hero-anim-item font-instrument-sans text-sm sm:text-base text-white/95 leading-relaxed max-w-lg"
                  style={{ marginBottom: "36px" }}
                >
                  We work with businesses to strengthen, develop, and scale their operations. Beyond capital, we contribute strategic direction, commercial expertise, market access, and relationships.
                </p>

                {/* Book A Call Button */}
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
              {/* Category Label */}
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
                    "We work with businesses to strengthen, develop, and scale their operations across regional and international markets."
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
                    "Beyond capital, we contribute strategic direction, commercial expertise, market access, and relationships to help businesses capture opportunities and achieve sustainable growth."
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
            3. "HOW IT WORKS" WHITE BOX SECTION
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
              <div
                className="how-box-container bg-white w-full rounded-[24px] sm:rounded-[32px] border border-[#E5E5E5] shadow-xs"
                style={{
                  paddingTop: "64px",
                  paddingBottom: "64px",
                  paddingLeft: "clamp(28px, 6vw, 76px)",
                  paddingRight: "clamp(28px, 6vw, 76px)",
                }}
              >
                <div
                  className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-12"
                  style={{ marginBottom: "56px" }}
                >
                  <div className="hidden md:block shrink-0 md:w-36" aria-hidden="true" />
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

                      <p className="font-instrument-sans text-[#2B2B2B] leading-relaxed max-w-xl md:flex-1 text-[14.5px] sm:text-[15.5px]">
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
            4. FIRST SPLIT SECTION
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
                <div className="lg:col-span-6 relative">
                  <div
                    className="relative overflow-hidden aspect-square border border-neutral-200/80 shadow-sm group"
                    style={{ borderRadius: "14px" }}
                  >
                    <img
                      src="/images/disciplined_presentation_hall.jpg"
                      alt="Business Building and Development Strategy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

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
                      <div className="self-end">
                        <img
                          src="/guidance_up-arrow.svg"
                          alt="Arrow"
                          className="w-6 h-6 object-contain transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>
                      <span
                        className="font-instrument-sans font-medium text-[#111111] leading-none block"
                        style={{ fontSize: "18px", fontWeight: 500 }}
                      >
                        Book A Call
                      </span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{ fontSize: "18px", fontWeight: 500, marginBottom: "16px" }}
                  >
                    DEVELOPMENT PRINCIPLES
                  </span>

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
                    Strengthening operations and unlocking market opportunities
                  </h2>

                  <ul className="space-y-4 sm:space-y-5">
                    {VALUE_POINTS.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
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
            5. SECOND SPLIT SECTION
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
                <div className="lg:col-span-6">
                  <span
                    className="font-clash-grotesk font-medium text-[#111111] uppercase tracking-wide block"
                    style={{ fontSize: "18px", fontWeight: 500, marginBottom: "16px" }}
                  >
                    WHO IT IS FOR
                  </span>

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
                    Enterprises looking to scale, expand, and capture market share
                  </h2>

                  <p
                    className="font-instrument-sans font-normal"
                    style={{
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 400,
                      color: "#2B2B2B",
                    }}
                  >
                    Tailored for ambitious operating companies, leadership teams, and growing enterprises looking for practical strategic direction, commercial acumen, and institutional networks to expand their market footprint and build long-term competitive advantage.
                  </p>
                </div>

                <div className="lg:col-span-6 relative">
                  <div
                    className="relative overflow-hidden aspect-square border border-neutral-200/80 shadow-sm group"
                    style={{ borderRadius: "14px" }}
                  >
                    <img
                      src="/images/disciplined_business_meeting.jpg"
                      alt="Leadership team discussing business development"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

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
                      <div className="self-end">
                        <img
                          src="/guidance_up-arrow.svg"
                          alt="Arrow"
                          className="w-6 h-6 object-contain transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </div>
                      <span
                        className="font-instrument-sans font-medium text-[#111111] leading-none block"
                        style={{ fontSize: "18px", fontWeight: 500 }}
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

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

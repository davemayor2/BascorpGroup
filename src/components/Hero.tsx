"use client";

import React, { useRef } from "react";
import { ArrowRight, ArrowDown, Phone, Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ExploreButton from "@/components/ExploreButton";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    );

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    tl.fromTo(
      buttonRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.5"
    );

    tl.fromTo(
      [scrollRef.current, socialsRef.current, locationsRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      "-=0.4"
    );

    // Continuous scroll indicator bounce
    gsap.to(".scroll-arrow", {
      y: 4,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex flex-col justify-start md:justify-center items-start bg-black overflow-hidden"
      style={{ minHeight: "820px" }}
    >
      {/* Background Image - framed on both subjects */}
      <div
        className="hero-bg-image absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero section image.jpg')",
        }}
      />
      {/* Dark overlay gradients matching reference */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 z-10" />

      {/* Main Content - paddingTop: 152px pushes content down cleanly below floating navbar */}
      <div
        className="relative z-20 container-custom flex flex-col gap-6 mb-auto md:mb-0"
        style={{ paddingTop: "152px" }}
      >
        <div className="max-w-3xl flex flex-col gap-6">
          <h1
            ref={titleRef}
            className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-white font-medium font-clash-grotesk tracking-[-0.01em] leading-[1.18]"
          >
            Building Partnerships<br />
            That Create{" "}
            <span className="text-primary italic">
              Lasting Value
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-[15.5px] sm:text-[16px] md:text-[16px] text-white/80 font-instrument-sans font-normal leading-[1.75] max-w-lg"
          >
            We partner with businesses across the Middle East, the Arabian Gulf and Asia,
            bringing strategic insight, market expertise and a strong network to support
            sustainable growth.
          </p>

          {/* CTA Button */}
          <div ref={buttonRef} className="mt-4">
            <ExploreButton href="#portfolio" />
          </div>
        </div>
      </div>

      {/* Social/Contact Shortcut Widget - absolute bottom-left touching the screen edge */}
      <div
        ref={socialsRef}
        className="absolute bottom-0 left-0 z-20 bg-[#F3F3F3] rounded-tr-[9px] shadow-xl flex items-center gap-3"
        style={{
          height: "74px",
          paddingTop: "15px",
          paddingBottom: "15px",
          paddingLeft: "32px",
          paddingRight: "24px",
          borderTopRightRadius: "9px",
          backgroundColor: "#F3F3F3",
        }}
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white border border-gray-200/60 hover:border-[#00A2E2] hover:bg-[#00A2E2]/10 transition-all duration-200 shadow-xs group"
          aria-label="LinkedIn"
        >
          <img
            src="/linkedin_black.svg"
            alt="LinkedIn"
            className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
          />
        </a>
        <a
          href="mailto:info@bascorpgroup.com"
          className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white border border-gray-200/60 hover:border-[#00A2E2] hover:bg-[#00A2E2]/10 transition-all duration-200 shadow-xs group"
          aria-label="Email"
        >
          <img
            src="/email_icon.svg"
            alt="Email"
            className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
          />
        </a>
        <a
          href="tel:+97317530816"
          className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white border border-gray-200/60 hover:border-[#00A2E2] hover:bg-[#00A2E2]/10 transition-all duration-200 shadow-xs group"
          aria-label="Phone"
        >
          <img
            src="/call_icon_black.svg"
            alt="Phone"
            className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-110"
          />
        </a>
      </div>

      {/* Bottom Row Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 container-custom pointer-events-none">
        <div className="relative w-full pointer-events-auto">
          {/* Scroll Down indicator - positioned above on mobile */}
          <div
            ref={scrollRef}
            className="absolute bottom-[170px] md:bottom-[90px] left-0 flex items-center gap-2.5 select-none"
          >
            <span className="text-[13px] md:text-[14px] text-white/80 font-instrument-sans font-normal tracking-wide">
              Scroll Down
            </span>
            <ArrowDown className="scroll-arrow w-3.5 h-3.5 md:w-4 md:h-4 text-white/80" />
          </div>

          {/* Where We Operate - positioned above social box on mobile, bottom right on desktop */}
          <div
            ref={locationsRef}
            className="absolute bottom-[92px] md:bottom-8 right-0 flex flex-col items-end gap-2.5 select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-[15px] md:text-[17px] text-white font-instrument-sans font-semibold tracking-wide">
                Where We Operate
              </span>
              <img
                src="/WHERE_WE_OPERATE_GLOBE.svg"
                alt="Globe"
                className="w-4 h-4 md:w-[22px] md:h-[22px] object-contain"
              />
            </div>
            <img
              src="/WHERE_WE_OPERATE.svg"
              alt="Arabian Gulf, Middle East, Asia"
              className="h-[24px] sm:h-[26px] md:h-[30px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

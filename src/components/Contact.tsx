"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative bg-cover bg-no-repeat overflow-hidden flex items-center"
      style={{
        backgroundImage: "url('/images/request a callback.jpg')",
        backgroundPosition: "center 35%",
        minHeight: "480px",
        paddingTop: "90px",
        paddingBottom: "90px",
      }}
    >
      {/* Dark overlay gradients matching reference design */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to right, rgba(17, 17, 17, 0.88) 0%, rgba(17, 17, 17, 0.65) 45%, rgba(17, 17, 17, 0.25) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/30 z-1 md:hidden" />

      {/* Main Left-Aligned CTA Content */}
      <div className="container-custom relative z-10 w-full">
        <div ref={contentRef} className="max-w-2xl flex flex-col items-start gap-6">
          {/* Heading */}
          <h2
            className="font-clash-grotesk font-semibold text-white tracking-[-0.01em] leading-[1.12]"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
          >
            Have an Opportunity<br />in Mind?
          </h2>

          {/* Subheading */}
          <p
            className="font-instrument-sans font-normal text-white/85 leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}
          >
            Whether you&apos;re seeking investment, exploring a strategic partnership, or looking to expand into the Middle East, we&apos;re ready to start the conversation.
          </p>

          {/* Let's Connect Button with blue SVG arrow */}
          <div className="pt-2">
            <a
              href="mailto:info@bascorpgroup.com"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#1A1A1A] font-instrument-sans font-semibold rounded-[8px] transition-all duration-200 hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] shadow-md select-none group"
              style={{
                height: "54px",
                paddingLeft: "32px",
                paddingRight: "28px",
                fontSize: "17px",
              }}
            >
              <span>Let&apos;s Connect</span>
              <img
                src="/send_enquiry_arrow_icon.svg"
                alt="Arrow"
                className="w-5 h-5 object-contain transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

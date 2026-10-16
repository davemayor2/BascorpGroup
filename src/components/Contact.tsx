"use client";

import React, { useRef } from "react";
import Image from "next/image";
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
        }
      ).fromTo(
        contentRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.15"
      );
    },
    { scope: containerRef }
  );

  React.useEffect(() => {
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

    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el && typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (window.getComputedStyle(el).opacity === "0") {
                gsap.to(el, { opacity: 1, y: 0, duration: 0.4, clearProps: "all" });
              }
              if (contentRef.current && window.getComputedStyle(contentRef.current).opacity === "0") {
                gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.4, clearProps: "all" });
              }
            }
          });
        },
        { rootMargin: "50px 0px 50px 0px" }
      );
      observer.observe(el);
    }

    const handleScrollFallback = () => {
      if (el && window.getComputedStyle(el).opacity === "0") {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.4, clearProps: "all" });
          if (contentRef.current) {
            gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.4, clearProps: "all" });
          }
        }
      }
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
    };
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full relative overflow-hidden flex flex-col justify-center"
      style={{
        backgroundColor: "#161616",
        minHeight: "clamp(480px, 46vh, 560px)",
        paddingTop: "clamp(100px, 9vw, 140px)",
        paddingBottom: "clamp(100px, 9vw, 140px)",
      }}
    >
      {/* Background Image Container with Next.js Image optimization */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/request-a-callback.jpg"
          alt="Have an Opportunity in Mind"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />

        {/* Dark overlay gradients matching reference design */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(17, 17, 17, 0.90) 0%, rgba(17, 17, 17, 0.72) 48%, rgba(17, 17, 17, 0.30) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/30 md:hidden" />
      </div>

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
            style={{ fontSize: "clamp(17px, 1.6vw, 19px)" }}
          >
            Whether you are seeking strategic capital, exploring a long-term partnership, or looking to unlock opportunities across the Middle East and Asia, we are ready to build lasting value together.
          </p>

          {/* Let's Connect Button with blue SVG arrow */}
          <div className="pt-2">
            <a
              href="mailto:info@bascorpgroup.com"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#1A1A1A] font-instrument-sans font-semibold rounded-[8pt] transition-all duration-200 hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] shadow-md select-none group"
              style={{
                height: "54px",
                paddingLeft: "32px",
                paddingRight: "28px",
                fontSize: "17px",
                borderRadius: "8pt",
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

"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BASE_SERVICES = [
  {
    title: "Debt Funding",
    description:
      "Bascorp Group provides tailored funding solutions designed to support businesses through strategic growth opportunities and changing market conditions. Obtaining the finance for your business needs can sometimes be difficult.",
    image: "/images/service 3.png",
  },
  {
    title: "Finance Investments",
    description:
      "As part of its strategy to seek consistent growth opportunities, Bascorp Group diversified its operations in the Financial Investments sector, with strategic investments and partnerships.",
    image: "/images/business dev.jpg",
  },
  {
    title: "Business Development",
    description:
      "Since its conception, Bascorp Group has been committed to helping businesses through all stages of their development. Our involvement with a client begins from concept and ends with implementation.",
    image: "/images/financial investments.jpg",
  },
];

// Triple the array so we can loop infinitely without a visible jump
const services = [...BASE_SERVICES, ...BASE_SERVICES, ...BASE_SERVICES];
const BASE_COUNT = BASE_SERVICES.length;

const CARD_W = 494;
const CARD_H = 538;
const INNER_IMG_W = 468;
const INNER_IMG_H = 370;
const INNER_PAD = 13;
const CARD_GAP = 20;

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  // Start at the middle set (index = BASE_COUNT) so we can go prev & next indefinitely
  const [currentIndex, setCurrentIndex] = useState(BASE_COUNT);
  const [displayIndex, setDisplayIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useGSAP(
    () => {
      // Silently jump to the middle set on mount — no animation
      if (carouselRef.current) {
        const cardEl = carouselRef.current.children[BASE_COUNT] as HTMLElement;
        if (cardEl) {
          gsap.set(carouselRef.current, { x: -cardEl.offsetLeft });
        }
      }

      gsap.fromTo(
        ".services-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
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
    }, 400);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
      clearTimeout(timer);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const carousel = carouselRef.current;
      if (!carousel) {
        isAnimating.current = false;
        return;
      }

      const cardEl = carousel.children[index] as HTMLElement;
      if (!cardEl) {
        isAnimating.current = false;
        return;
      }

      // Immediately sync active display index for instant, smooth progress bar animation
      const nextBaseIdx = ((index % BASE_COUNT) + BASE_COUNT) % BASE_COUNT;
      setDisplayIndex(nextBaseIdx);

      gsap.to(carousel, {
        x: -cardEl.offsetLeft,
        duration: 0.55,
        ease: "power2.out",
        onComplete: () => {
          // After sliding, if we've entered the outer copies, silently snap to the middle copy
          let snapped = index;
          if (index < BASE_COUNT) {
            snapped = index + BASE_COUNT;
          } else if (index >= BASE_COUNT * 2) {
            snapped = index - BASE_COUNT;
          }

          if (snapped !== index) {
            const snapCard = carousel.children[snapped] as HTMLElement;
            if (snapCard) gsap.set(carousel, { x: -snapCard.offsetLeft });
            setCurrentIndex(snapped);
          } else {
            setCurrentIndex(index);
          }

          isAnimating.current = false;
        },
      });
    },
    []
  );

  const prevSlide = () => goTo(currentIndex - 1);
  const nextSlide = () => goTo(currentIndex + 1);

  // Touch gesture support for mobile & tablet horizontal swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goTo(currentIndex + 1);
      } else {
        goTo(currentIndex - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.min(Math.floor(ratio * BASE_COUNT), BASE_COUNT - 1);
    goTo(BASE_COUNT + targetIdx);
  };

  // Map to percentage based on active display index
  const progressPercent = ((displayIndex + 1) / BASE_COUNT) * 100;

  return (
    <section
      id="services"
      ref={containerRef}
      style={{ backgroundColor: "#00194C", paddingTop: "140px", paddingBottom: "140px" }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-14 xl:gap-20">

          {/* ── LEFT INFO COLUMN — col-span-4 gives heading room, pushes carousel right ── */}
          <div
            className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 services-reveal lg:pr-4 xl:pr-6"
          >
            {/* Services tag */}
            <div className="flex items-center gap-2">
              <img
                src="/services_icon.svg"
                alt="Services"
                style={{ width: "22px", height: "22px", objectFit: "contain" }}
              />
              <span
                className="font-instrument-sans font-bold uppercase tracking-widest text-white"
                style={{ fontSize: "15px" }}
              >
                Services
              </span>
            </div>

            {/* Heading — two lines */}
            <h2
              className="font-clash-grotesk font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(32px, 3.2vw, 46px)" }}
            >
              Strategic Services<br />for Organization
            </h2>

            {/* Description — All texts white with generous clearance to the cards */}
            <p
              className="font-instrument-sans font-normal leading-relaxed text-white max-w-sm lg:max-w-[330px] xl:max-w-[370px]"
              style={{ fontSize: "16px", color: "#FFFFFF" }}
            >
              We partner with businesses across the Middle East, the Arabian Gulf
              and Asia, bringing strategic insight, market expertise and a strong
              network to support sustainable growth.
            </p>

            {/* Discover More — White button, black text */}
            <a
              href="#contact"
              className="inline-flex items-center justify-between gap-6 transition-all duration-300 hover:opacity-90 group select-none shadow-md"
              style={{
                paddingLeft: "24px",
                paddingRight: "8px",
                paddingTop: "8px",
                paddingBottom: "8px",
                height: "52px",
                borderRadius: "8px",
                border: "1px solid #FFFFFF",
                backgroundColor: "#FFFFFF",
                width: "fit-content",
              }}
            >
              <span
                className="font-instrument-sans font-semibold text-black leading-none"
                style={{ fontSize: "17px" }}
              >
                Discover More
              </span>
              <div
                className="flex items-center justify-center bg-[#00A2E2] group-hover:bg-[#008bc4] transition-all duration-300 shrink-0"
                style={{ width: "40px", height: "40px", borderRadius: "4px" }}
              >
                <img
                  src="/button arrow.svg"
                  alt="Arrow"
                  style={{ width: "18px", height: "18px", objectFit: "contain" }}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </div>
            </a>

            {/* Arrow nav buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous service"
                className="flex items-center justify-center transition-all duration-200 hover:opacity-80"
                style={{
                  width: "48px", height: "48px", borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF",
                }}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next service"
                className="flex items-center justify-center transition-all duration-200 hover:opacity-90"
                style={{
                  width: "48px", height: "48px", borderRadius: "8px",
                  backgroundColor: "#00A2E2", border: "1px solid #00A2E2", color: "#FFFFFF",
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── RIGHT CAROUSEL — fade cutout applied between subheading and cards, and trailing edge ── */}
          <div
            className="lg:col-span-8 services-reveal services-carousel-mask relative overflow-hidden pb-4 sm:pb-6"
          >
            {/* Right fade cut out overlay on trailing edge */}
            <div
              className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 lg:w-36 z-10 pointer-events-none bg-gradient-to-l from-[#00194C] to-transparent"
              aria-hidden="true"
            />

            <div
              ref={carouselRef}
              className="flex"
              style={{ gap: `${CARD_GAP}px`, willChange: "transform", alignItems: "flex-start" }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {services.map((service, idx) => (
                /* ── OUTER CARD: primary blue (#00A2E2), all text white ── */
                <div
                  key={idx}
                  className="shrink-0 flex flex-col w-[85vw] max-w-[340px] sm:w-[380px] sm:max-w-none lg:w-[494px] shadow-lg"
                  style={{
                    backgroundColor: "#00A2E2",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    borderRadius: "16px",
                    padding: "13px",
                    boxSizing: "border-box",
                    minHeight: "460px",
                  }}
                >
                  {/* ── INNER IMAGE BOX: responsive width, 6pt radius ── */}
                  <div
                    className="w-full h-[210px] sm:h-[260px] lg:h-[370px]"
                    style={{
                      borderRadius: "6px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Card text body — all white text */}
                  <div
                    className="flex flex-col flex-1"
                    style={{
                      paddingTop: "16px",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      gap: "6px",
                    }}
                  >
                    <h3
                      className="font-clash-grotesk font-semibold leading-tight text-white"
                      style={{ fontSize: "20px", color: "#FFFFFF" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="font-instrument-sans font-normal leading-relaxed text-white/95"
                      style={{
                        fontSize: "13.5px",
                        color: "#FFFFFF",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROGRESS BAR — centered with balanced spacing and smooth indicator ── */}
        <div
          className="services-reveal services-progress-wrapper w-full flex flex-col items-center justify-center select-none"
          style={{
            marginTop: "clamp(84px, 9vw, 120px)",
          }}
        >
          <div className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px]">
            {/* Progress track */}
            <div
              className="relative w-full h-[5px] sm:h-[6px] bg-white/[0.18] rounded-full overflow-hidden backdrop-blur-xs cursor-pointer group"
              onClick={handleTrackClick}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              title="Click to jump between services"
            >
              {/* Animated Progress Fill */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#00A2E2] rounded-full shadow-[0_0_12px_rgba(0,162,226,0.8)]"
                style={{
                  width: `${progressPercent}%`,
                  transition: "width 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useRef, useCallback } from "react";
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
      "Bascorp Group has financing solutions for everybody is a well-established and recognized investment and financial company. Obtaining the finance for your business needs can sometimes be difficult.",
    image: "/images/service 3.png",
  },
  {
    title: "Finance Investments",
    description:
      "As part of its strategy to seek consistent growth opportunities, Bascorp Group diversified its operations in the Financial Investments sector, with strategic investments and partnerships.",
    image: "/images/tele-communications.jpg",
  },
  {
    title: "Business Development",
    description:
      "Since its conception, Bascorp Group has been committed to helping businesses through all stages of their development. Our involvement with a client begins from concept and ends with implementation.",
    image: "/images/request a callback.jpg",
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
  const isAnimating = useRef(false);

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
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

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

  // Map back to 0-2 for progress bar
  const baseIdx = ((currentIndex % BASE_COUNT) + BASE_COUNT) % BASE_COUNT;
  const progressPercent = ((baseIdx + 1) / BASE_COUNT) * 100;

  return (
    <section
      id="services"
      ref={containerRef}
      style={{ backgroundColor: "#0A0A0A", paddingTop: "140px", paddingBottom: "140px" }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">

          {/* ── LEFT INFO COLUMN — col-span-4 gives heading room, pushes carousel right ── */}
          <div
            className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 services-reveal lg:pr-12"
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
                style={{ fontSize: "13px" }}
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

            {/* Description */}
            <p
              className="font-instrument-sans font-normal leading-relaxed"
              style={{ fontSize: "14px", color: "#AAAAAA" }}
            >
              We partner with businesses across the Middle East, the Arabian Gulf
              and Asia, bringing strategic insight, market expertise and a strong
              network to support sustainable growth.
            </p>

            {/* Discover More — #323232 bg, white text, 8pt outer radius, 4pt arrow box, 1pt #636363 border */}
            <a
              href="#contact"
              className="inline-flex items-center justify-between gap-6 transition-all duration-300 hover:opacity-90 group select-none"
              style={{
                paddingLeft: "24px",
                paddingRight: "8px",
                paddingTop: "8px",
                paddingBottom: "8px",
                height: "52px",
                borderRadius: "8px",
                border: "1px solid #636363",
                backgroundColor: "#323232",
                width: "fit-content",
              }}
            >
              <span
                className="font-instrument-sans font-semibold text-white leading-none"
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
                  backgroundColor: "#1D1D1D", border: "1px solid #787878", color: "#FFFFFF",
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

          {/* ── RIGHT CAROUSEL — fade cutout applied on desktop only ── */}
          <div
            className="lg:col-span-8 services-reveal services-carousel-mask relative overflow-hidden"
          >
            <div
              ref={carouselRef}
              className="flex"
              style={{ gap: `${CARD_GAP}px`, willChange: "transform", alignItems: "flex-start" }}
            >
              {services.map((service, idx) => (
                /* ── OUTER CARD: responsive on mobile, 494×538 on desktop ── */
                <div
                  key={idx}
                  className="shrink-0 flex flex-col w-[85vw] max-w-[340px] sm:w-[380px] sm:max-w-none lg:w-[494px]"
                  style={{
                    backgroundColor: "#1D1D1D",
                    border: "1px solid #787878",
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

                  {/* Card text body — balanced spacing with generous bottom clearance */}
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
                      className="font-clash-grotesk font-semibold leading-tight"
                      style={{ fontSize: "20px", color: "#00A2E2" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="font-instrument-sans font-normal leading-relaxed text-[#AAAAAA]"
                      style={{
                        fontSize: "13.5px",
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

        {/* ── PROGRESS BAR — centered ── */}
        <div
          className="services-reveal"
          style={{ marginTop: "56px", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "50%",
              height: "3px",
              backgroundColor: "#2A2A2A",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                backgroundColor: "#00A2E2",
                borderRadius: "2px",
                transition: "width 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

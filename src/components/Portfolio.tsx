"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Bento grid card definitions — exact dimensions per spec
const col1 = [
  {
    title: "Healthcare & Pharmaceuticals",
    description:
      "Bascorp Group is a private concern that combines the strength and security of a large, international institution with the nimbleness of our entrepreneurial beginnings.",
    image: "/images/health.jpg",
    height: 399,
  },
  {
    title: "Aviation",
    description:
      "Bascorp Group is a private concern that combines the strength and security of a large, international institution with the nimbleness of our entrepreneurial beginnings.",
    image: "/images/Aviation.jpg",
    height: 242,
  },
];

const col2 = [
  {
    title: "Construction Trade",
    description:
      "Bascorp Group is the flagship of our Hospitality vertical. Middle East -renowned, the Retail and Mall are the epitome of luxury and have won numerous international travel and tourism awards.",
    image: "/images/Construction Trade.jpg",
    height: 321,
  },
  {
    title: "Tele-communications",
    description:
      "Bascorp Group is the flagship of our Hospitality vertical. Middle East -renowned, the Retail and Mall are the epitome of luxury and have won numerous international travel and tourism awards.",
    image: "/images/tele-communications.jpg",
    height: 321,
  },
];

const col3 = [
  {
    title: "Private Equity",
    description:
      "Bascorp Group is a private concern that combines the strength and security of a large, international institution with the nimbleness of our entrepreneurial beginnings.",
    image: "/images/private equity.png",
    height: 399,
  },
  {
    title: "Real Estate",
    description:
      "Bascorp Group is a private concern that combines the strength and security of a large, international institution with the nimbleness of our entrepreneurial beginnings.",
    image: "/images/Real Estate.png",
    height: 242,
  },
];

const CARD_W = 391;
const CARD_RADIUS = 14;
const COL_GAP = 24; // gap between columns and rows

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  height: number;
}

function PortfolioCard({ title, description, image, height }: PortfolioCardProps) {
  return (
    <div
      className="portfolio-card relative overflow-hidden shrink-0 group"
      style={{
        width: `${CARD_W}px`,
        height: `${height}px`,
        borderRadius: `${CARD_RADIUS}px`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Progressive dark gradient overlay — stronger at bottom for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      {/* Text content pinned to bottom */}
      <div
        className="absolute left-0 right-0 bottom-0 flex flex-col gap-2 text-white"
        style={{
          padding: "20px 22px 24px 22px",
          backdropFilter: "blur(0px)",
        }}
      >
        <h3
          className="font-clash-grotesk font-semibold leading-tight text-white"
          style={{ fontSize: "22px" }}
        >
          {title}
        </h3>
        <p
          className="font-instrument-sans font-normal leading-snug text-white/85"
          style={{ fontSize: "15px" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".portfolio-header-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".portfolio-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-bento-grid",
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
      id="portfolio"
      ref={containerRef}
      className="bg-bg-custom"
      style={{ paddingTop: "140px", paddingBottom: "140px" }}
    >
      <div className="container-custom flex flex-col gap-16">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center gap-4">
          {/* Portfolio tag with portfolio_icon.svg */}
          <div className="flex items-center gap-2 portfolio-header-reveal">
            <img
              src="/portfolio_icon.svg"
              alt="Portfolio"
              style={{ width: "22px", height: "22px", objectFit: "contain" }}
            />
            <span
              className="font-instrument-sans font-bold uppercase tracking-widest text-navbar-bg"
              style={{ fontSize: "15px" }}
            >
              Our Portfolio
            </span>
          </div>

          <h2
            className="portfolio-header-reveal font-clash-grotesk font-semibold leading-tight text-navbar-bg"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            Investing in Opportunities.{" "}
            <span className="text-primary">Building Lasting Value</span>
          </h2>

          <p
            className="portfolio-header-reveal font-instrument-sans font-normal leading-relaxed text-grey-medium max-w-xl"
            style={{ fontSize: "17px" }}
          >
            Our portfolio reflects our commitment to partnering with businesses to
            support sustainable growth and create value across multiple sectors.
          </p>
        </div>

        {/* ── Bento Grid — 3 equal-width columns, exact card heights per spec ── */}
        {/* Desktop: side-scroll if narrower than 3×391 + gaps */}
        <div
          className="portfolio-bento-grid hidden lg:flex"
          style={{ gap: `${COL_GAP}px`, alignItems: "flex-start" }}
        >
          {/* Column 1 */}
          <div className="flex flex-col" style={{ gap: `${COL_GAP}px` }}>
            {col1.map((item, i) => (
              <PortfolioCard key={i} {...item} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col" style={{ gap: `${COL_GAP}px` }}>
            {col2.map((item, i) => (
              <PortfolioCard key={i} {...item} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col" style={{ gap: `${COL_GAP}px` }}>
            {col3.map((item, i) => (
              <PortfolioCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Mobile: single column stacked */}
        <div className="lg:hidden flex flex-col gap-6 px-2 sm:px-4">
          {[...col1, ...col2, ...col3].map((item, i) => (
            <div
              key={i}
              className="portfolio-card relative overflow-hidden group w-full shadow-md"
              style={{ height: "310px", borderRadius: `${CARD_RADIUS}px` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.88) 100%)",
                }}
              />
              <div
                className="absolute left-0 right-0 bottom-0 flex flex-col gap-2.5 text-white"
                style={{ padding: "24px 26px 28px 26px" }}
              >
                <h3
                  className="font-clash-grotesk font-semibold text-white leading-snug"
                  style={{ fontSize: "21px" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-instrument-sans font-normal text-white/90 leading-relaxed"
                  style={{ fontSize: "13.5px" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

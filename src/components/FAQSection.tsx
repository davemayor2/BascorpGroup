"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What can I contact Bascorp Group about?",
    answer:
      "You can contact us regarding investment opportunities, strategic partnerships, business development, financing requirements, or opportunities to expand into new markets.",
  },
  {
    question: "Does Bascorp consider new investment opportunities?",
    answer:
      "Yes. Bascorp evaluates investment opportunities based on factors such as sector fundamentals, management experience, financial performance, business plans, governance, and potential value creation.",
  },
  {
    question: "What types of businesses does Bascorp work with?",
    answer:
      "Bascorp works with business owners, private companies, family offices, financial sponsors, and other organizations seeking investment, financing, or strategic partnerships.",
  },
  {
    question: "Which sectors does Bascorp invest in?",
    answer:
      "Our investment activities span healthcare and pharmaceuticals, wholesale and retail trade, private equity, transportation, telecommunications, and public equity.",
  },
  {
    question: "Does Bascorp provide financing solutions?",
    answer:
      "Bascorp considers a range of capital solutions, including private debt, senior and subordinated debt, equity, and other tailored investment structures depending on the opportunity.",
  },
  {
    question: "How can I submit an investment or partnership proposal?",
    answer:
      "You can submit your enquiry through the contact form on this page, providing relevant information about your business, opportunity, and requirements. Our team can then review the enquiry and determine the appropriate next steps.",
  },
  {
    question: "How long does it take to receive a response?",
    answer:
      "Response times may vary depending on the nature and complexity of the enquiry. Our team will review your submission and respond when appropriate.",
  },
];

interface FAQSectionProps {
  onBookCallClick?: () => void;
}

export default function FAQSection({ onBookCallClick }: FAQSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Only one FAQ can be open at a time. When one opens, any currently open FAQ closes.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        leftColRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      ).fromTo(
        rightColRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBookCallClick) {
      onBookCallClick();
    } else {
      const formEl = document.getElementById("contact-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        const nameInput = document.getElementById("name");
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      } else {
        window.location.href = "mailto:info@bascorpgroup.com";
      }
    }
  };

  return (
    <section
      id="faq-section"
      ref={containerRef}
      className="w-full flex justify-center bg-[#F3F3F3]"
      style={{
        paddingTop: "clamp(36px, 4vw, 56px)",
        paddingBottom: "clamp(90px, 10vw, 150px)",
      }}
    >
      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-stretch">
          {/* =============================================================
              LEFT COLUMN:
              - Top: "Questions & answers" kicker + "Frequently Asked Questions" heading
              - Bottom: "Can't find an answer to your question?" white card
             ============================================================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col justify-between gap-10 lg:gap-12"
          >
            {/* Top Headings */}
            <div>
              <span
                className="block font-instrument-sans text-[#111111] leading-none mb-4 select-none"
                style={{ fontSize: "clamp(17px, 1.2vw, 19px)", fontWeight: 500 }}
              >
                Questions &amp; answers
              </span>
              <h2
                className="font-clash-grotesk text-[#111111] leading-[1.08] tracking-tight select-none"
                style={{
                  fontSize: "clamp(38px, 4.4vw, 58px)",
                  fontWeight: 500,
                }}
              >
                Frequently
                <br />
                Asked Questions
              </h2>
            </div>

            {/* Bottom Card: Can't find an answer to your question? */}
            <div
              onClick={handleBookCall}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleBookCall(e as unknown as React.MouseEvent);
                }
              }}
              className="group cursor-pointer bg-white border border-black/[0.06] hover:border-[#00A2E2]/40 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 relative select-none w-full max-w-[420px]"
              style={{
                // Universal Rule: Generous padding across cards
                padding: "clamp(28px, 3.2vw, 42px)",
              }}
            >
              {/* Top-Right Angled Arrow */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#111111] group-hover:text-[#00A2E2] transition-colors duration-300">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="pr-8">
                <h3
                  className="font-instrument-sans text-[#111111] font-semibold leading-snug tracking-tight"
                  style={{ fontSize: "clamp(20px, 1.4vw, 23px)" }}
                >
                  Can&apos;t find an answer to your question?
                </h3>
                <p
                  className="font-instrument-sans text-[#71717A] group-hover:text-[#00A2E2] transition-colors duration-200 mt-2.5 font-normal"
                  style={{ fontSize: "clamp(16px, 1.05vw, 17px)" }}
                >
                  Click to book a call.
                </p>
              </div>
            </div>
          </div>

          {/* =============================================================
              RIGHT COLUMN:
              - Accordion FAQ List (Single open item at a time)
              - Generous padding between answers and horizontal divider lines
             ============================================================= */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="flex flex-col">
                  {/* Question Row Button */}
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer select-none transition-colors"
                    style={{
                      paddingTop: idx === 0 ? "8px" : "24px",
                      paddingBottom: isOpen ? "16px" : "24px",
                    }}
                  >
                    <span
                      className={`font-instrument-sans transition-colors leading-snug pr-2 ${
                        isOpen
                          ? "text-[#00A2E2]"
                          : "text-[#111111] group-hover:text-[#00A2E2]"
                      }`}
                      style={{
                        fontSize: "clamp(18px, 1.35vw, 20px)",
                        fontWeight: 500,
                      }}
                    >
                      {item.question}
                    </span>

                    {/* Plus / Close Icon (Rotates 45deg to close, turns cyan when open) */}
                    <span
                      className={`shrink-0 flex items-center justify-center w-7 h-7 transition-colors ${
                        isOpen
                          ? "text-[#00A2E2]"
                          : "text-[#111111] group-hover:text-[#00A2E2]"
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  {/* Smooth Collapsible Answer Container */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out overflow-hidden ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="font-instrument-sans text-[#666666] leading-relaxed pr-8"
                        style={{
                          fontSize: "clamp(16px, 1.1vw, 17.5px)",
                          fontWeight: 400,
                          lineHeight: "1.65",
                          paddingTop: "4px",
                          paddingBottom: "36px",
                          margin: 0,
                        }}
                      >
                        {item.answer}
                      </p>
                      {/* Explicit spacer div guarantees ample bottom breathing room before separator */}
                      <div style={{ height: "12px", width: "100%" }} />
                    </div>
                  </div>

                  {/* Horizontal Divider Line */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "rgba(189, 189, 189, 0.6)",
                      display: "block",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

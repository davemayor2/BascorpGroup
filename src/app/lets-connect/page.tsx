"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LetsConnectPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
    }, 900);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      ).fromTo(
        cardRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.35"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F3F3F3] text-[#111111] overflow-x-hidden font-instrument-sans selection:bg-[#00A2E2] selection:text-white flex flex-col justify-between"
    >
      {/* 1. Floating Dark Navigation Bar */}
      <Navbar />

      <main className="w-full flex-1 flex flex-col items-center">
        {/* =====================================================================
            HERO INTRO SECTION
            - Centered container matching Navbar (.container-custom)
            - "Let's Talk." size 68, "Talk" in primary blue, Clash display font.
            - Aligned to border left.
            - Subheading aligned to far border right.
           ===================================================================== */}
        <section
          ref={heroRef}
          className="w-full flex justify-center"
          style={{
            paddingTop: "clamp(136px, 14vw, 168px)",
            paddingBottom: "clamp(32px, 3.5vw, 52px)",
          }}
        >
          <div className="container-custom w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 w-full">
              {/* Big Heading aligned to border left */}
              <h1
                className="font-clash-grotesk text-[#111111] tracking-tight leading-[1.08] select-none shrink-0"
                style={{
                  fontSize: "clamp(42px, 5.2vw, 68px)",
                  fontWeight: 500,
                }}
              >
                Let&apos;s <span className="text-[#00A2E2]">Talk</span>.
              </h1>

              {/* Subheading aligned to far border right */}
              <p
                className="font-instrument-sans text-[#666666] leading-relaxed max-w-[420px] text-left md:text-left select-none"
                style={{
                  fontSize: "clamp(15px, 1.15vw, 16px)",
                  fontWeight: 400,
                }}
              >
                If you’re looking for clarity, structure, and a more effective way to scale, start the conversation here.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            CONTACT FORM CARD (THE BIG WHITE BOX)
            - Perfectly centered with Navbar (.container-custom)
            - Desktop: Left hand side (info & copy) + Right hand side (form)
            - Generous padding across the container and info boxes
            - Greatly reduced icon boxes (42px) with subtle stroke lines (1px)
            - Input boxes with stroke size 1 (#B4B4B4)
           ===================================================================== */}
        <section
          ref={cardRef}
          className="w-full flex justify-center"
          style={{
            paddingBottom: "clamp(80px, 9vw, 140px)",
          }}
        >
          <div className="container-custom w-full">
            {/* The Big White Box */}
            <div
              className="w-full bg-white border border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
              style={{
                borderRadius: "0px",
                padding: "clamp(28px, 4.8vw, 72px)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-stretch">
                {/* -------------------------------------------------------------
                    LEFT HAND SIDE:
                    - Heading "Get in touch" (size 32, instrument sans)
                    - Subheading copy with ample breathing room
                    - Info section with generous padding & compact 42px icon boxes
                   ------------------------------------------------------------- */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  {/* Top: Heading & Subheading */}
                  <div>
                    <h2
                      className="font-instrument-sans font-medium text-[#111111] leading-tight tracking-tight"
                      style={{ fontSize: "clamp(26px, 2.5vw, 32px)" }}
                    >
                      Get in touch
                    </h2>
                    <p
                      className="font-instrument-sans font-normal text-[#666666] leading-relaxed mt-4 max-w-lg"
                      style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}
                    >
                      Provide context, describe your current situation, and outline what you’d like support with. The more detail you share, the more productive our first call will be.
                    </p>
                  </div>

                  {/* Bottom: Info Items with Generous Padding & Delicate 1px Stroke Lines */}
                  <div className="mt-12 lg:mt-24 flex flex-col">
                    {/* Item 1: General Enquiries */}
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{
                        paddingTop: "22px",
                        paddingBottom: "22px",
                      }}
                    >
                      <div className="flex items-center" style={{ gap: "18px" }}>
                        <div
                          className="bg-black flex items-center justify-center shrink-0"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "7px",
                          }}
                        >
                          <img
                            src="/mail_icon.svg"
                            alt="Mail"
                            style={{ width: "20px", height: "20px", objectFit: "contain" }}
                          />
                        </div>
                        <span
                          className="font-instrument-sans font-medium text-[#111111] leading-none"
                          style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}
                        >
                          General Enquiries
                        </span>
                      </div>
                      <a
                        href="mailto:info@bascorpgroup.com"
                        className="font-instrument-sans font-normal text-[#71717A] hover:text-[#00A2E2] transition-colors sm:text-right pl-[60px] sm:pl-0"
                        style={{ fontSize: "15px" }}
                      >
                        info@bascorpgroup.com
                      </a>
                    </div>
                    {/* Delicate 1px Stroke Divider */}
                    <div className="w-full h-[1px] bg-[#E8E8E8]" />

                    {/* Item 2: Office Location */}
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{
                        paddingTop: "22px",
                        paddingBottom: "22px",
                      }}
                    >
                      <div className="flex items-center" style={{ gap: "18px" }}>
                        <div
                          className="bg-black flex items-center justify-center shrink-0"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "7px",
                          }}
                        >
                          <img
                            src="/location_icon.svg"
                            alt="Location"
                            style={{ width: "20px", height: "20px", objectFit: "contain" }}
                          />
                        </div>
                        <span
                          className="font-instrument-sans font-medium text-[#111111] leading-none"
                          style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}
                        >
                          Office Location
                        </span>
                      </div>
                      <span
                        className="font-instrument-sans font-normal text-[#71717A] sm:text-right max-w-[270px] leading-snug pl-[60px] sm:pl-0"
                        style={{ fontSize: "15px" }}
                      >
                        1 Sheikh Issa Ave, Building 440, Manama, Kingdom Of Bahrain
                      </span>
                    </div>
                    {/* Delicate 1px Stroke Divider */}
                    <div className="w-full h-[1px] bg-[#E8E8E8]" />

                    {/* Item 3: Office Hours */}
                    <div
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{
                        paddingTop: "22px",
                        paddingBottom: "22px",
                      }}
                    >
                      <div className="flex items-center" style={{ gap: "18px" }}>
                        <div
                          className="bg-black flex items-center justify-center shrink-0"
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "7px",
                          }}
                        >
                          <img
                            src="/time_icon.svg"
                            alt="Office Hours"
                            style={{ width: "20px", height: "20px", objectFit: "contain" }}
                          />
                        </div>
                        <span
                          className="font-instrument-sans font-medium text-[#111111] leading-none"
                          style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}
                        >
                          Office Hours
                        </span>
                      </div>
                      <span
                        className="font-instrument-sans font-normal text-[#71717A] sm:text-right pl-[60px] sm:pl-0"
                        style={{ fontSize: "15px" }}
                      >
                        Mon to Fri: 9:00 AM – 6:00 PM CET
                      </span>
                    </div>
                    {/* Delicate 1px Stroke Bottom Divider */}
                    <div className="w-full h-[1px] bg-[#E8E8E8]" />
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    RIGHT HAND SIDE:
                    - Form containing:
                      "Your Name*", "Email*", "Phone Number*", "Subject*", "Your Message*"
                    - Form boxes stroke size reduced to 1 (1px solid #B4B4B4)
                    - Generous padding between greyed-out text and box borders
                    - Services black submit button with cyan arrow box
                    - Agreement text beside button
                   ------------------------------------------------------------- */}
                <div className="lg:col-span-6 flex flex-col justify-start">
                  {formStatus === "success" ? (
                    <div className="w-full bg-[#F4FBF7] border border-[#A6E9C5] rounded-[0px] p-8 text-center my-auto flex flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#00A2E2]/10 flex items-center justify-center text-[#00A2E2]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-instrument-sans text-[22px] font-semibold text-[#111111]">
                        Message Received
                      </h3>
                      <p className="font-instrument-sans text-[15px] text-[#666666] max-w-md">
                        Thank you for reaching out. We have received your submission and a member of our team will connect with you promptly.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus("idle");
                          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                        }}
                        className="mt-2 text-sm text-[#00A2E2] font-medium underline underline-offset-4 hover:text-[#008bc4] transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                      {/* Row 1: Your Name * & Email* */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block font-instrument-sans font-medium text-[#111111] mb-2"
                            style={{ fontSize: "15px" }}
                          >
                            Your Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full text-[#111111] placeholder:text-[#8E8E93] font-instrument-sans focus:outline-none focus:border-[#00A2E2] transition-colors"
                            style={{
                              height: "50px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              borderRadius: "0px",
                              border: "1px solid #B4B4B4",
                              outline: "none",
                              boxShadow: "none",
                              fontSize: "15px",
                              backgroundColor: "#FFFFFF",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block font-instrument-sans font-medium text-[#111111] mb-2"
                            style={{ fontSize: "15px" }}
                          >
                            Email*
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full text-[#111111] placeholder:text-[#8E8E93] font-instrument-sans focus:outline-none focus:border-[#00A2E2] transition-colors"
                            style={{
                              height: "50px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              borderRadius: "0px",
                              border: "1px solid #B4B4B4",
                              outline: "none",
                              boxShadow: "none",
                              fontSize: "15px",
                              backgroundColor: "#FFFFFF",
                            }}
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone Number * & Subject* */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block font-instrument-sans font-medium text-[#111111] mb-2"
                            style={{ fontSize: "15px" }}
                          >
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full text-[#111111] placeholder:text-[#8E8E93] font-instrument-sans focus:outline-none focus:border-[#00A2E2] transition-colors"
                            style={{
                              height: "50px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              borderRadius: "0px",
                              border: "1px solid #B4B4B4",
                              outline: "none",
                              boxShadow: "none",
                              fontSize: "15px",
                              backgroundColor: "#FFFFFF",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block font-instrument-sans font-medium text-[#111111] mb-2"
                            style={{ fontSize: "15px" }}
                          >
                            Subject*
                          </label>
                          <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            placeholder="Enter your subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full text-[#111111] placeholder:text-[#8E8E93] font-instrument-sans focus:outline-none focus:border-[#00A2E2] transition-colors"
                            style={{
                              height: "50px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              borderRadius: "0px",
                              border: "1px solid #B4B4B4",
                              outline: "none",
                              boxShadow: "none",
                              fontSize: "15px",
                              backgroundColor: "#FFFFFF",
                            }}
                          />
                        </div>
                      </div>

                      {/* Row 3: Your Message * */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block font-instrument-sans font-medium text-[#111111] mb-2"
                          style={{ fontSize: "15px" }}
                        >
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          placeholder="Enter your message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full text-[#111111] placeholder:text-[#8E8E93] font-instrument-sans focus:outline-none focus:border-[#00A2E2] transition-colors resize-none"
                          style={{
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            paddingTop: "16px",
                            paddingBottom: "16px",
                            borderRadius: "0px",
                            border: "1px solid #B4B4B4",
                            outline: "none",
                            boxShadow: "none",
                            fontSize: "15px",
                            backgroundColor: "#FFFFFF",
                          }}
                        />
                      </div>

                      {/* Bottom Action Row: Services black button with text "Submit" + Agreement text */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 pt-2">
                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="inline-flex items-center justify-between gap-6 sm:gap-8 bg-black text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group select-none cursor-pointer shrink-0 disabled:opacity-70"
                          style={{
                            paddingLeft: "28px",
                            paddingRight: "8px",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            height: "52px",
                            borderRadius: "8px",
                          }}
                        >
                          <span
                            className="font-instrument-sans font-medium text-white leading-none"
                            style={{ fontSize: "16px" }}
                          >
                            {formStatus === "submitting" ? "Submitting..." : "Submit"}
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
                              style={{ width: "16px", height: "16px", objectFit: "contain" }}
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                          </div>
                        </button>

                        <p
                          className="font-instrument-sans text-[#71717A] leading-snug max-w-[340px] select-none"
                          style={{ fontSize: "13px" }}
                        >
                          By sending this form, you agree to our Terms &amp; Conditions, Privacy and Data Protection Policy
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}

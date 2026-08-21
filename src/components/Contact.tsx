"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  height: "44px",
  borderRadius: "5px",
  backgroundColor: "#C4C4C4",
  border: "none",
  outline: "none",
  paddingLeft: "14px",
  paddingRight: "14px",
  fontSize: "13px",
  color: "#1A1A1A",
  fontFamily: "var(--font-instrument-sans), sans-serif",
};

const TEXTAREA_STYLE: React.CSSProperties = {
  width: "100%",
  borderRadius: "5px",
  backgroundColor: "#C4C4C4",
  border: "none",
  outline: "none",
  paddingLeft: "14px",
  paddingRight: "14px",
  paddingTop: "12px",
  paddingBottom: "12px",
  fontSize: "13px",
  color: "#1A1A1A",
  fontFamily: "var(--font-instrument-sans), sans-serif",
  resize: "none",
  minHeight: "90px",
};

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    interest: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-header-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formCardRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.interest) newErrors.interest = "Please select an area of interest";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: "", companyName: "", email: "", phoneNumber: "", interest: "", message: "" });
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: "url('/images/request a callback.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        paddingTop: "140px",
        paddingBottom: "140px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(17, 17, 17, 0.78)",
          zIndex: 1,
        }}
      />
      <div className="container-custom flex flex-col gap-16 relative z-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col gap-4 contact-header-reveal">
          {/* Main large heading */}
          <h2
            className="font-clash-grotesk font-semibold text-white uppercase leading-tight"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-0.01em" }}
          >
            Let's Start a<br />Conversation
          </h2>

          {/* Subheading */}
          <p
            className="font-instrument-sans font-normal text-white/60 leading-relaxed"
            style={{ fontSize: "15px", maxWidth: "520px" }}
          >
            Tell us a little about your business and how we can help. A member of the
            Bascorp team will get in touch with you shortly.
          </p>
        </div>

        {/* ── Two-column layout: Form (left) + Image (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT: Glassmorphism Form Box — 661×486pt ── */}
          <div
            ref={formCardRef}
            className="lg:col-span-7"
          >
            <div
              className="flex flex-col h-full"
              style={{
                backgroundColor: "rgba(75, 76, 76, 0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid #787878",
                borderRadius: "16px",
                padding: "36px 36px 36px 36px",
                minHeight: "486px",
                boxSizing: "border-box",
              }}
            >
              {/* Form header */}
              <h3
                className="font-clash-grotesk font-semibold text-white leading-tight"
                style={{ fontSize: "24px", marginBottom: "6px" }}
              >
                Let's Discuss Your Next Opportunity
              </h3>
              <p
                className="font-instrument-sans font-normal text-white/60 leading-relaxed"
                style={{ fontSize: "13px", marginBottom: "28px" }}
              >
                Fill in the form below and a member of our team will be in touch shortly.
              </p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center text-white py-8">
                  <CheckCircle2 className="w-14 h-14 text-[#00A2E2] animate-bounce" />
                  <h3 className="font-clash-grotesk font-semibold text-xl">Enquiry Sent Successfully!</h3>
                  <p className="font-instrument-sans font-normal text-white/60 text-sm max-w-xs">
                    Thank you for contacting Bascorp Group. Our representative will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">

                  {/* Row 1: Full Name + Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        style={INPUT_STYLE}
                      />
                      {errors.fullName && (
                        <span className="text-[10px] text-red-400 font-semibold px-1">{errors.fullName}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        style={INPUT_STYLE}
                      />
                      {errors.companyName && (
                        <span className="text-[10px] text-red-400 font-semibold px-1">{errors.companyName}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        style={INPUT_STYLE}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 font-semibold px-1">{errors.email}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        style={INPUT_STYLE}
                      />
                      {errors.phoneNumber && (
                        <span className="text-[10px] text-red-400 font-semibold px-1">{errors.phoneNumber}</span>
                      )}
                    </div>
                  </div>

                  {/* Area of Interest dropdown */}
                  <div className="flex flex-col gap-1">
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{
                        ...INPUT_STYLE,
                        appearance: "none",
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A1A1A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        backgroundSize: "14px",
                        cursor: "pointer",
                        color: formData.interest ? "#1A1A1A" : "#555555",
                      } as React.CSSProperties}
                    >
                      <option value="" disabled>Area of Interest</option>
                      <option value="debt-funding">Debt Funding</option>
                      <option value="finance-investments">Finance Investments</option>
                      <option value="private-equity">Private Equity</option>
                      <option value="public-equity">Public Equity</option>
                      <option value="business-dev">Business Development</option>
                      <option value="wholesale-retail">Wholesale & Retail Trade</option>
                      <option value="telecommunications">Telecommunications</option>
                      <option value="transportation">Transportation</option>
                    </select>
                    {errors.interest && (
                      <span className="text-[10px] text-red-400 font-semibold px-1">{errors.interest}</span>
                    )}
                  </div>

                  {/* Enquiry textarea */}
                  <div className="flex flex-col gap-1 flex-1">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What is about your enquiry"
                      style={{ ...TEXTAREA_STYLE, height: "100%", minHeight: "90px" }}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-400 font-semibold px-1">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 group transition-all duration-200 hover:opacity-90 active:scale-[0.98] select-none"
                    style={{
                      marginTop: "4px",
                      width: "100%",
                      height: "50px",
                      backgroundColor: "#00A2E2",
                      borderRadius: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="font-instrument-sans font-semibold text-white"
                      style={{ fontSize: "16px" }}
                    >
                      Send Enquiry
                    </span>
                    <img
                      src="/send_enquiry_arrow_icon.svg"
                      alt="Send"
                      style={{
                        width: "18px",
                        height: "18px",
                        objectFit: "contain",
                        filter: "brightness(0) invert(1)",
                      }}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT: Direct Contact Info Box ── */}
          <div
            ref={imageRef}
            className="lg:col-span-5"
          >
            <div
              className="flex flex-col justify-center h-full"
              style={{
                backgroundColor: "rgba(75, 76, 76, 0.45)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "36px",
                minHeight: "300px",
                boxSizing: "border-box",
              }}
            >
              <h4
                className="font-clash-grotesk font-semibold text-white uppercase tracking-wider"
                style={{ fontSize: "22px", marginBottom: "24px" }}
              >
                Direct Contact
              </h4>
              <ul className="flex flex-col gap-6 text-white/80 font-instrument-sans text-[14px]">
                <li className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-[#00A2E2] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Business Hours</span>
                    <span className="text-white/60">Sunday to Thursday, 9:00 AM to 6:00 PM (AST)</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-[#00A2E2] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Call Us</span>
                    <a href="tel:+97143975550" className="text-white/60 hover:text-white transition-colors">
                      +971 4 397 5550
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-[#00A2E2] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Email Us</span>
                    <a href="mailto:info@bascorpgroup.com" className="text-white/60 hover:text-white transition-colors break-all">
                      info@bascorpgroup.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-[#00A2E2] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-white">Visit Us</span>
                    <span className="text-white/60">
                      1 Sheikh Issa Ave, Building 440,<br />
                      Manama, Kingdom Of Bahrain
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

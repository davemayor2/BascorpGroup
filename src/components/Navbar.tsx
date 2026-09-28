"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ServiceItem {
  title: string;
  description: string;
  iconSrc: string;
  href: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    title: "Investment Approach",
    description:
      "Bascorp Group works with companies to develop capital solutions tailored around specific requirements.",
    iconSrc: "/investment_approach.svg",
    href: "/investment-approach",
  },
  {
    title: "Disciplined Investment Strategy",
    description:
      "Bascorp Group works with companies to develop capital solutions tailored around specific requirements.",
    iconSrc: "/Disciplined_icon.svg",
    href: "/disciplined-investment-strategy",
  },
  {
    title: "Corporate Governance",
    description:
      "Bascorp Group works with companies to develop capital solutions tailored around specific requirements.",
    iconSrc: "/corporate_governance.svg",
    href: "/corporate-governance",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";
  const isInvestmentApproach = pathname === "/investment-approach";
  const isDisciplined = pathname === "/disciplined-investment-strategy";
  const isCorporateGovernance = pathname === "/corporate-governance";
  const isOurInvestments = pathname === "/our-investments" || pathname === "/our-investment";
  const isServicePage = isInvestmentApproach || isDisciplined || isCorporateGovernance;
  const isHome = (pathname === "/" || !pathname) && !isAbout && !isServicePage && !isOurInvestments;

  const [isOpen, setIsOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle outside click to close mega menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Smooth hover handlers with small debounce to bridge the gap
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  // ── Scroll-direction hide / reveal ──────────────────────────────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let ticking = false;

    const update = () => {
      // If mobile menu is open, don't hide the navbar
      if (isOpen) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Close mega menu on scroll
      if (Math.abs(delta) > 10 && isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
      }

      // Add shadow when scrolled past 30px
      if (navRef.current) {
        if (currentScrollY > 30) {
          navRef.current.classList.add("shadow-2xl");
        } else {
          navRef.current.classList.remove("shadow-2xl");
        }
      }

      // Only react after 60px from top to avoid twitching near the top
      if (currentScrollY > 60) {
        if (delta > 6 && !isHidden) {
          // Scrolling DOWN — hide navbar
          isHidden = true;
          setIsMegaMenuOpen(false);
          gsap.to(headerRef.current, {
            y: -120,
            opacity: 0,
            duration: 0.45,
            ease: "power3.inOut",
          });
        } else if (delta < -4 && isHidden) {
          // Scrolling UP — reveal navbar
          isHidden = false;
          gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      } else {
        // Near the top — always visible
        if (isHidden) {
          isHidden = false;
          gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen, isMegaMenuOpen]);

  // ── Initial slide-in from top ────────────────────────────────────────────────
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.1 }
    );
  }, { scope: navRef });

  // ── Mobile drawer animation ──────────────────────────────────────────────────
  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".mobile-nav-link",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.07, delay: 0.12, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, { dependencies: [isOpen] });

  const navLinks = [
    { label: "Home", href: "#home", active: false },
    { label: "About Us", href: "#about", active: false },
    { label: "Our Investment", href: "#portfolio", active: false },
    { label: "Contact Us", href: "#contact", active: false },
  ];

  return (
    <>
      <header
        ref={headerRef}
        style={{ top: "18px" }}
        className="fixed left-0 right-0 z-50 flex flex-col items-center container-custom pointer-events-none"
      >
        {/* Main Floating Navigation Bar Container */}
        <div
          ref={navRef}
          className="pointer-events-auto flex items-center justify-between w-full bg-[#272727] text-white rounded-[14px] shadow-xl relative z-20"
          style={{ height: "80px", paddingLeft: "16px", paddingRight: "16px" }}
        >
          {/* Logo Badge */}
          <Link
            href="/"
            aria-label="Bascorp Home"
            onClick={() => setIsMegaMenuOpen(false)}
            className="flex items-center justify-center bg-white rounded-[12px] shrink-0 select-none transition-transform duration-200 hover:scale-[1.02] shadow-sm"
            style={{ height: "62px", paddingLeft: "24px", paddingRight: "24px" }}
          >
            <img
              src="/logo.png"
              alt="Bascorp Group"
              style={{ height: "42px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center" style={{ gap: "32px" }}>
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsMegaMenuOpen(false)}
              className={`font-instrument-sans transition-colors duration-200 whitespace-nowrap text-[17px] lg:text-[18px] ${
                isHome
                  ? "text-white font-bold"
                  : "text-white/85 hover:text-white font-medium"
              }`}
            >
              Home
            </Link>

            {/* What We Do (Dropdown Trigger) */}
            <div
              className="relative flex items-center py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 font-instrument-sans transition-all duration-200 whitespace-nowrap text-[17px] lg:text-[18px] cursor-pointer outline-none focus:outline-none ${
                  isMegaMenuOpen || isServicePage
                    ? "text-white font-bold"
                    : "text-white/85 hover:text-white font-medium"
                }`}
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
              >
                <span>What We Do</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isMegaMenuOpen ? "rotate-180 text-white" : "text-white/70"
                  }`}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setIsMegaMenuOpen(false)}
              className={`font-instrument-sans transition-colors duration-200 whitespace-nowrap text-[17px] lg:text-[18px] ${
                isAbout
                  ? "text-white font-bold"
                  : "text-white/85 hover:text-white font-medium"
              }`}
            >
              About Us
            </Link>

            {/* Our Investment */}
            <Link
              href="/our-investments"
              onClick={() => setIsMegaMenuOpen(false)}
              className={`font-instrument-sans transition-colors duration-200 whitespace-nowrap text-[17px] lg:text-[18px] ${
                isOurInvestments
                  ? "text-white font-bold"
                  : "text-white/85 hover:text-white font-medium"
              }`}
            >
              Our Investment
            </Link>

            {/* Contact Us */}
            <Link
              href="/lets-connect"
              onClick={() => setIsMegaMenuOpen(false)}
              className="font-instrument-sans transition-colors duration-200 whitespace-nowrap text-[17px] lg:text-[18px] text-white/85 hover:text-white font-medium"
            >
              Contact Us
            </Link>
          </nav>

          {/* Let's Connect CTA Button - Desktop */}
          <Link
            href="/lets-connect"
            onClick={() => setIsMegaMenuOpen(false)}
            className="hidden md:flex items-center justify-center bg-[#00A2E2] text-white font-instrument-sans font-semibold whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#008ec7] hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            style={{
              height: "58px",
              paddingLeft: "32px",
              paddingRight: "32px",
              fontSize: "18px",
              borderRadius: "8px",
              backgroundColor: "#00A2E2",
              color: "#FFFFFF",
            }}
          >
            Let&apos;s Connect
          </Link>

          {/* Mobile Hamburger / Transform to X Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-11 h-11 rounded-[8px] bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 md:hidden text-white focus:outline-none"
            aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-200" />
            ) : (
              <Menu className="w-6 h-6 text-white transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Interactive Dropdown Mega-Menu Panel ("What We Do") */}
        <div
          ref={megaMenuRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ marginTop: "8px" }}
          className={`hidden md:block w-full transition-all duration-300 ease-out origin-top relative z-10 ${isMegaMenuOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none invisible"
            }`}
        >
          {/* Invisible hit bridge to prevent cursor gap drop */}
          <div className="absolute -top-9 left-0 right-0 h-11 bg-transparent" />

          <div
            className="w-full bg-[#272727] text-white shadow-2xl border border-white/[0.08]"
            style={{
              borderRadius: "20px",
              padding: "16px 16px 16px 36px",
            }}
          >
            <div className="flex items-stretch justify-between gap-8">
              {/* Left Side: Services List */}
              <div className="flex-1 flex flex-col justify-center pr-2 py-4">
                <div>
                  <h3 className="text-white text-[20px] lg:text-[22px] font-semibold font-instrument-sans tracking-tight">
                    Services
                  </h3>
                  <div
                    style={{
                      marginTop: "16px",
                      marginBottom: "36px",
                      height: "1px",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      width: "100%",
                    }}
                  />
                </div>

                <div
                  className="flex flex-col"
                  style={{
                    gap: "20px",
                  }}
                >
                  {SERVICES_LIST.map((service) => {
                    return (
                      <a
                        key={service.title}
                        href={service.href}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="group flex items-start gap-4 py-2 px-1.5 cursor-pointer"
                      >
                        {/* Icon Box */}
                        <div className="w-[50px] h-[50px] lg:w-[54px] lg:h-[54px] rounded-[10px] bg-white flex items-center justify-center shrink-0 shadow-sm">
                          <img
                            src={service.iconSrc}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                        </div>

                        {/* Title & Description */}
                        <div className="flex flex-col pt-0.5">
                          <span className="text-[17px] lg:text-[18px] font-semibold text-white group-hover:text-[#00A2E2] transition-colors duration-200 font-instrument-sans tracking-tight">
                            {service.title}
                          </span>
                          <p className="text-[13px] lg:text-[13.5px] text-[#A0A0A0] leading-snug mt-1 font-instrument-sans">
                            {service.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Featured Skyscraper Image Card */}
              <div className="w-[280px] lg:w-[310px] shrink-0 flex flex-col">
                <div className="relative w-full h-full min-h-[360px] lg:min-h-[380px] rounded-[16px] overflow-hidden group shadow-lg border border-white/5 flex flex-col justify-end">
                  <img
                    src="/images/Nav_Img.png"
                    alt="Bascorp Services Architecture"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

                  {/* Corner External Link Icon Badge */}
                  <a
                    href="#services"
                    onClick={() => setIsMegaMenuOpen(false)}
                    className="absolute top-3.5 right-3.5 w-11 h-11 bg-black hover:bg-neutral-900 text-white rounded-[10px] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md border border-white/10 z-10"
                    aria-label="Get Started"
                  >
                    <img
                      src="/mega_menu_arrow.svg"
                      alt=""
                      className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>

                  {/* Text Content Overlay */}
                  <div
                    className="relative z-10 flex flex-col"
                    style={{
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingBottom: "26px",
                    }}
                  >
                    <h4 className="text-white text-[20px] lg:text-[22px] font-bold font-instrument-sans tracking-tight">
                      Get Started
                    </h4>
                    <p className="text-white/80 text-[13px] lg:text-[13.5px] font-instrument-sans leading-snug mt-1.5">
                      A gateway for companies wanting to enter the Middle East market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        ref={menuRef}
        style={{
          clipPath: "circle(0% at 90% 10%)",
        }}
        className={`fixed inset-0 z-40 bg-[#272727] flex flex-col justify-between px-6 sm:px-10 pb-8 text-white md:hidden overflow-y-auto ${isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Top spacer so links start comfortably below the floating navbar pill */}
        <div style={{ height: "116px" }} />

        {/* Middle Navigation Links */}
        <div className="flex flex-col gap-5 my-auto py-4 px-1">
          <p className="text-[12px] text-[#00A2E2] font-bold uppercase tracking-widest font-instrument-sans pb-1">
            Menu
          </p>
          <nav className="flex flex-col gap-3">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`mobile-nav-link text-2xl sm:text-3xl font-instrument-sans tracking-wide py-1 font-medium transition-colors ${
                isHome && !isAbout && !isInvestmentApproach
                  ? "text-[#00A2E2] font-semibold"
                  : "text-white hover:text-[#00A2E2]"
              }`}
            >
              Home
            </Link>

            {/* What We Do with Expandable Services Accordion */}
            <div className="mobile-nav-link flex flex-col">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between text-2xl sm:text-3xl font-instrument-sans tracking-wide py-1 text-white hover:text-[#00A2E2] font-medium transition-colors text-left"
              >
                <span>What We Do</span>
                <ChevronDown
                  className={`w-5 h-5 text-white/70 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-[#00A2E2]" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="flex flex-col gap-3 pl-3 pt-2 pb-1 border-l border-white/15 mt-2">
                  {SERVICES_LIST.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="text-base text-white/80 hover:text-[#00A2E2] font-instrument-sans py-1 transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`mobile-nav-link text-2xl sm:text-3xl font-instrument-sans tracking-wide py-1 font-medium transition-colors ${
                isAbout
                  ? "text-[#00A2E2] font-semibold"
                  : "text-white hover:text-[#00A2E2]"
              }`}
            >
              About Us
            </Link>

            {/* Our Investment */}
            <Link
              href="/our-investments"
              onClick={() => setIsOpen(false)}
              className={`mobile-nav-link text-2xl sm:text-3xl font-instrument-sans tracking-wide py-1 font-medium transition-colors ${
                isOurInvestments
                  ? "text-[#00A2E2] font-semibold"
                  : "text-white hover:text-[#00A2E2]"
              }`}
            >
              Our Investment
            </Link>

            {/* Contact Us */}
            <Link
              href="/lets-connect"
              onClick={() => setIsOpen(false)}
              className="mobile-nav-link text-2xl sm:text-3xl font-instrument-sans tracking-wide py-1 text-white hover:text-[#00A2E2] font-medium transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Bottom Actions: Let's Connect Button & Copyright */}
        <div className="flex flex-col items-center gap-5 pt-6 mt-auto">
          <Link
            href="/lets-connect"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] mx-auto bg-[#00A2E2] text-white font-instrument-sans font-semibold transition-all duration-200 hover:bg-[#008ec7] active:scale-[0.98] shadow-md"
            style={{
              height: "58px",
              minHeight: "58px",
              fontSize: "17px",
              borderRadius: "10px",
              backgroundColor: "#00A2E2",
              color: "#FFFFFF",
            }}
          >
            Let&apos;s Connect
          </Link>
          <div className="text-center text-xs text-white/40 font-instrument-sans">
            © Bascorp Group, 2026. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}


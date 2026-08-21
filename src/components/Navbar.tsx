"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // ── Scroll-direction hide / reveal ──────────────────────────────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isHidden = false;
    let ticking = false;

    const update = () => {
      // If menu is open, don't hide the navbar
      if (isOpen) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

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
          gsap.to(headerRef.current, {
            y: -110,
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
  }, [isOpen]);

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
    { label: "Home", href: "#home", active: true },
    { label: "About Us", href: "#about", active: false },
    { label: "Team", href: "#team", active: false },
    { label: "Our Investment", href: "#portfolio", active: false },
    { label: "Contact Us", href: "#contact", active: false },
  ];

  return (
    <>
      <header
        ref={headerRef}
        style={{ top: "18px" }}
        className="fixed left-0 right-0 z-50 flex justify-center container-custom pointer-events-none"
      >
        <div
          ref={navRef}
          className="pointer-events-auto flex items-center justify-between w-full bg-[#272727] text-white rounded-[14px] shadow-xl"
          style={{ height: "80px", paddingLeft: "16px", paddingRight: "16px" }}
        >
          {/* Logo Badge */}
          <a
            href="#home"
            aria-label="Bascorp Home"
            className="flex items-center justify-center bg-white rounded-[12px] shrink-0 select-none transition-transform duration-200 hover:scale-[1.02] shadow-sm"
            style={{ height: "58px", paddingLeft: "24px", paddingRight: "24px" }}
          >
            <img
              src="/logo.png"
              alt="Bascorp Group"
              style={{ height: "34px", width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center" style={{ gap: "36px" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-instrument-sans transition-colors duration-200 whitespace-nowrap"
                style={{
                  fontSize: "18px",
                  fontWeight: link.active ? 700 : 500,
                  color: link.active ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Let's Connect Button - Desktop */}
          <a
            href="#contact"
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
          </a>

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
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        ref={menuRef}
        style={{
          clipPath: "circle(0% at 90% 10%)",
        }}
        className={`fixed inset-0 z-40 bg-[#272727] flex flex-col justify-between px-6 sm:px-10 pb-8 text-white md:hidden overflow-y-auto ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Top spacer so links start comfortably below the floating navbar pill */}
        <div style={{ height: "116px" }} />

        {/* Middle Navigation Links */}
        <div className="flex flex-col gap-6 my-auto py-6 px-1">
          <p className="text-[12px] text-[#00A2E2] font-bold uppercase tracking-widest font-instrument-sans pb-1">
            Menu
          </p>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link text-3xl sm:text-4xl font-instrument-sans tracking-wide py-1.5 transition-colors ${
                  link.active
                    ? "text-[#00A2E2] font-bold"
                    : "text-white hover:text-[#00A2E2] font-medium"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Actions: Let's Connect Button with Shorter Width & Copyright */}
        <div className="flex flex-col items-center gap-5 pt-6 mt-auto">
          <a
            href="#contact"
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
          </a>
          <div className="text-center text-xs text-white/40 font-instrument-sans">
            © Bascorp Group, 2026. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}

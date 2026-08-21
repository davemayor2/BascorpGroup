"use client";

import React from "react";

interface ExploreButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function ExploreButton({
  text = "Explore Bascorp",
  href = "#portfolio",
  onClick,
  className = "",
}: ExploreButtonProps) {
  const content = (
    <>
      <span
        className="font-instrument-sans font-semibold tracking-normal text-black leading-none"
        style={{ fontSize: "17px" }}
      >
        {text}
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
    </>
  );

  const styleProps: React.CSSProperties = {
    paddingLeft: "24px",
    paddingRight: "8px",
    paddingTop: "8px",
    paddingBottom: "8px",
    height: "52px",
    borderRadius: "8px",
  };

  const baseClasses = `inline-flex items-center justify-between gap-6 bg-white text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg group select-none ${className}`;

  if (href) {
    return (
      <a href={href} style={styleProps} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={styleProps} className={baseClasses}>
      {content}
    </button>
  );
}

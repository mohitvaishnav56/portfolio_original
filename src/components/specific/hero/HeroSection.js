"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Magnetic Link/Button Component
   ───────────────────────────────────────────── */
function MagneticButton({ children, className = "", onClick, href, target }) {
  const btnRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    xTo.current = gsap.quickTo(el, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
    });
    yTo.current = gsap.quickTo(el, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
    });

    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      xTo.current((clientX - cx) * 0.35);
      yTo.current((clientY - cy) * 0.35);
    };

    const handleLeave = () => {
      xTo.current(0);
      yTo.current(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const Tag = href ? "a" : "button";
  const linkProps = href
    ? {
        href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <Tag ref={btnRef} className={className} {...linkProps} onClick={onClick}>
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   Editorial Inline Canvas Hero
   - Perfectly centered typographic layout breathing with macro-whitespace
   - Small interactive visual project screen pills embedded directly inline
   - Pre-filtered custom gradient overlays on the inline mockups
   - Telemetry indicators: Location base, UTC time, looping stack list, social bridge
   ───────────────────────────────────────────── */
const HeroSection = () => {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const footerRef = useRef(null);
  const [skillIndex, setSkillIndex] = useState(0);

  const skillsList = ["React.js", "Next.js", "GSAP Motion", "UI/UX Design", "C++ & Go"];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    /* Skill loop */
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % skillsList.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set([textContentRef.current, footerRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      /* Core typography & canvas components fade/slide up */
      tl.fromTo(
        textContentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: "power4.out",
        }
      );

      /* Bottom telemetry cards reveal */
      tl.fromTo(
        footerRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.55"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-28 pb-16 overflow-hidden bg-[var(--bg-dark)]"
    >
      {/* Subtle center ambient lighting glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none filter blur-[140px] opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-12 flex-1 justify-between items-center">
        
        {/* Spacer top (replacing deleted header to push content perfectly to vertical center) */}
        <div className="h-4 w-full" aria-hidden="true" />

        {/* ─── Center: Editorial Inline Canvas ─── */}
        <div
          ref={textContentRef}
          className="flex-1 flex flex-col justify-center items-center gap-10 md:gap-14 py-8 w-full"
        >
          {/* Headline Stack */}
          <div className="flex flex-col items-center text-center select-none w-full">
            
            {/* Line 1: CRAFTING [pill] DIGITAL */}
            <div className="overflow-hidden py-1.5 w-full flex justify-center">
              <h1 className="text-[clamp(2.2rem,7.5vw,7rem)] font-black tracking-[-0.04em] leading-[0.98] text-[var(--text-primary)] uppercase font-sans flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span>Crafting</span>
                
                {/* Embedded Pill 1: Prono project mockup preview */}
                <span 
                  onClick={scrollToProjects}
                  className="inline-flex items-center justify-center w-16 h-8 md:w-28 md:h-14 rounded-full border border-white/10 overflow-hidden relative align-middle cursor-pointer group bg-white/5 transition-transform duration-500 hover:scale-105 hover:border-white/20 shadow-inner shrink-0"
                >
                  <Image 
                    src="/Prono.webp"
                    alt="Prono platform mockup preview"
                    fill
                    sizes="110px"
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500 filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                  {/* Luxury Purple/Indigo Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#9333ea]/20 via-[#4f46e5]/10 to-transparent mix-blend-overlay opacity-90 group-hover:opacity-0 transition-opacity duration-500" />
                </span>

                <span className="text-[var(--text-secondary)] font-light italic font-serif lowercase ml-1">digital</span>
              </h1>
            </div>

            {/* Line 2: [pill] EXPERIENCES. */}
            <div className="overflow-hidden py-1.5 w-full flex justify-center">
              <h2 className="text-[clamp(2.2rem,7.5vw,7rem)] font-black tracking-[-0.04em] leading-[0.98] uppercase font-sans flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                {/* Embedded Pill 2: Real Estate project thumbnail */}
                <span 
                  onClick={scrollToProjects}
                  className="inline-flex items-center justify-center w-16 h-8 md:w-28 md:h-14 rounded-full border border-white/10 overflow-hidden relative align-middle cursor-pointer group bg-white/5 transition-transform duration-500 hover:scale-105 hover:border-white/20 shadow-inner shrink-0"
                >
                  <Image 
                    src="/RealEstate.webp"
                    alt="Real Estate app layout preview"
                    fill
                    sizes="110px"
                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500 filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                  {/* Luxury Emerald/Indigo Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#059669]/20 via-[#3b82f6]/10 to-transparent mix-blend-overlay opacity-90 group-hover:opacity-0 transition-opacity duration-500" />
                </span>

                <span
                  style={{
                    WebkitTextStroke: "1.5px var(--text-primary)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  experiences.
                </span>
              </h2>
            </div>

          </div>

          {/* Subcopy & Actions split */}
          <div className="flex flex-col items-center text-center gap-8 w-full max-w-2xl">
            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-lg font-light">
              {personalInfo.heroParagraphs[0]}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <MagneticButton
                onClick={scrollToProjects}
                className="group relative pl-7 pr-3 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-dark)] font-semibold text-[11px] uppercase tracking-wider overflow-hidden active:scale-[0.97] flex items-center gap-3 border border-white/10 cursor-pointer"
              >
                <span className="relative z-10">Explore projects</span>
                <span className="w-7 h-7 rounded-full bg-[var(--bg-dark)]/10 dark:bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="w-3 h-3 text-[var(--bg-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </MagneticButton>

              <button
                onClick={scrollToContact}
                className="px-7 py-3.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium text-[11px] uppercase tracking-wider hover:border-[var(--border-hover)] transition-all duration-300 active:scale-[0.97] cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          </div>

        </div>

        {/* ─── Bottom: Telemetry Row ─── */}
        <div
          ref={footerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--border-subtle)] w-full"
        >
          {/* Location details */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider font-bold">
              [ BASE COORDINATES ]
            </span>
            <span className="text-xs font-semibold text-[var(--text-primary)] tracking-wide uppercase">
              {personalInfo.location}
            </span>
          </div>

          {/* Scrolling active stack loop */}
          <div className="flex flex-col gap-1 justify-center md:items-center">
            <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider font-bold md:text-center">
              [ STACK ACTIVE ]
            </span>
            <div className="h-4 relative flex items-center justify-start md:justify-center">
              {skillsList.map((skill, index) => (
                <span
                  key={skill}
                  className={`absolute text-xs font-bold uppercase tracking-wider transition-all duration-700 ease-in-out ${
                    index === skillIndex 
                      ? "opacity-100 transform translate-y-0 scale-100 text-[var(--text-primary)]" 
                      : "opacity-0 transform -translate-y-2 scale-95 text-[var(--text-tertiary)] pointer-events-none"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social bridges */}
          <div className="flex flex-col gap-1 justify-end md:items-end">
            <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider font-bold md:text-right">
              [ SOCIAL BRIDGES ]
            </span>
            <div className="flex items-center gap-4">
              {personalInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-white transition-colors duration-300 cursor-pointer font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
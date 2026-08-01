"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { personalInfo } from "@/data/portfolioData";

/* ─────────────────────────────────────────────
   Magnetic Button Component
   GSAP quickTo for spring physics coordinates
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
      ease: "elastic.out(1, 0.4)",
    });
    yTo.current = gsap.quickTo(el, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
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
    <Tag ref={btnRef} className={className} onClick={onClick} {...linkProps}>
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   Brutalist Editorial Footer
   - Massive contact display headline CTA
   - Live UTC clock / location ticker
   - Magnetic social coordinates with underline reveals
   - Crisp, full-bleed design rules
   ───────────────────────────────────────────── */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const timeRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    /* Update live ticker clock */
    const updateTime = () => {
      if (!timeRef.current) return;
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      timeRef.current.textContent = `${hrs}:${mins}:${secs} UTC`;
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#050508] text-[var(--text-secondary)] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t border-[var(--border-subtle)] relative overflow-hidden">
      
      {/* Subtle bottom glow mesh */}
      <div 
        className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none filter blur-[120px] opacity-[0.015]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
      />

      <div className="max-w-[1400px] mx-auto flex flex-col gap-20">
        
        {/* ─── Massive Display Contact CTA ─── */}
        <div className="flex flex-col gap-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] font-bold font-mono">
            // Start a conversation
          </span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group block text-[clamp(2rem,8vw,5.5rem)] font-black tracking-[-0.05em] leading-[0.95] text-[var(--text-primary)] hover:text-white uppercase transition-colors duration-500 max-w-5xl"
          >
            Let's build
            <br />
            something new
            <span className="inline-block text-[var(--text-secondary)] font-light italic font-serif lowercase ml-4 group-hover:text-white transition-colors duration-500">
              together.
            </span>
          </a>
        </div>

        {/* ─── Horizontal separating line ─── */}
        <div className="w-full h-[1px] bg-[var(--border-subtle)]" aria-hidden="true" />

        {/* ─── Metadata & Links Footer Strip ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start md:items-center">
          
          {/* Copyright info (col-span-4) */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Mohit Vaishnav
            </span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              © {currentYear} ALL RIGHTS RESERVED
            </span>
          </div>

          {/* Magnetic Socials (col-span-5) */}
          <div className="md:col-span-5 flex items-center gap-6 flex-wrap">
            {personalInfo.socials.map((social) => (
              <MagneticButton
                key={social.name}
                href={social.url}
                target="_blank"
                className="group/link text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 py-1"
              >
                <span className="relative">
                  {social.name}
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[var(--text-primary)] group-hover/link:w-full transition-all duration-300" />
                </span>
              </MagneticButton>
            ))}
          </div>

          {/* Time & Scroll up (col-span-3) */}
          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-10">
            {/* Live Ticker Clock */}
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">INDORE // LIVE</span>
              <span ref={timeRef} className="text-xs font-mono font-medium text-[var(--text-primary)]">00:00:00 UTC</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              onClick={scrollToTop}
              className="group/btn w-10 h-10 rounded-full border border-[var(--border-subtle)] hover:border-[var(--border-hover)] flex items-center justify-center transition-colors duration-300"
              aria-label="Scroll back to top"
            >
              <svg
                className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover/btn:text-[var(--text-primary)] transition-colors duration-300 transform group-hover/btn:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

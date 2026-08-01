"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { personalInfo } from "@/data/portfolioData";

/* ─────────────────────────────────────────────
   Magnetic Social Links for Contact Panel
   ───────────────────────────────────────────── */
function MagneticSocial({ children, href, className = "" }) {
  const socialRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const el = socialRef.current;
    if (!el) return;

    xTo.current = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.45)" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.45)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      xTo.current((clientX - cx) * 0.3);
      yTo.current((clientY - cy) * 0.3);
    };

    const handleMouseLeave = () => {
      xTo.current(0);
      yTo.current(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={socialRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

const TextContent = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full lg:col-span-5 flex flex-col justify-between gap-12">
      
      {/* ─── Typography Headers ─── */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[1.05] text-[var(--text-primary)] uppercase">
          Start a
          <br />
          conversation
        </h2>
        
        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-sm font-light">
          {personalInfo.heroParagraphs[1]}
        </p>
      </div>

      {/* ─── Contact Coordinates: Double-Bezel nested chassis ─── */}
      <div className="flex flex-col gap-5">
        
        {/* Email Enclosure */}
        <div className="p-1 bg-white/5 border border-white/10 rounded-2xl shadow-sm">
          <div className="w-full h-full rounded-[calc(1rem-4px)] bg-[var(--bg-elevated)] p-5 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 truncate">
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">Email coordinate</span>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="text-sm font-semibold text-[var(--text-primary)] hover:text-white transition-colors truncate"
              >
                {personalInfo.email}
              </a>
            </div>

            <button
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative"
            >
              {copied ? (
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
              {copied && (
                <span className="absolute -top-9 right-0 text-[9px] font-mono font-bold tracking-wide uppercase px-2.5 py-1 rounded bg-emerald-500 text-slate-950 shadow">
                  Copied
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Info Rows (Separated cleanly by lines, no box icons) */}
        <div className="flex flex-col border-t border-[var(--border-subtle)]">
          {[
            { label: "Phone number", value: personalInfo.phone, link: `tel:${personalInfo.phone.replace(/\s+/g, '')}` },
            { label: "Studio location", value: personalInfo.location }
          ].map((item) => (
            <div 
              key={item.label}
              className="flex items-center justify-between py-4 border-b border-[var(--border-subtle)]"
            >
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">{item.label}</span>
              {item.link ? (
                <a 
                  href={item.link} 
                  className="text-xs font-semibold text-[var(--text-primary)] hover:text-white transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-xs font-semibold text-[var(--text-primary)]">{item.value}</span>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* ─── Magnetic Social Links ─── */}
      <div className="flex items-center gap-6 pt-2">
        {personalInfo.socials.map((social) => (
          <MagneticSocial
            key={social.name}
            href={social.url}
            className="group/link text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 py-1"
          >
            <span className="relative">
              {social.name}
              <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[var(--text-primary)] group-hover/link:w-full transition-all duration-300" />
            </span>
          </MagneticSocial>
        ))}
      </div>

    </div>
  );
};

export default TextContent;
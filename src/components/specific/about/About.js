"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   About & Philosophy Section
   - Clean, luxury editorial aesthetic
   - Spacious layout spacing
   - Two-column asymmetric cards (no neon glows)
   - High typographic contrast (serif quotes)
   - Linear list rows instead of 3-column cards
   ───────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef(null);

  const highlights = [
    { 
      num: "01", 
      title: "Full-Stack Mindset", 
      desc: "React, Next.js, and modern web performance optimization." 
    },
    { 
      num: "02", 
      title: "UI/UX Precision", 
      desc: "Figma prototyping, precise typography, and layout hierarchies." 
    },
    { 
      num: "03", 
      title: "Fluid Motion", 
      desc: "Interactive layouts built using GSAP ScrollTrigger maps." 
    }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* Quote fade reveal */
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Cards horizontal reveal */
      gsap.fromTo(
        ".about-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-cards-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Feature rows stagger reveal */
      gsap.fromTo(
        ".about-feature-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-[var(--bg-dark)]"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24 md:gap-32">
        
        {/* ─── Editorial Statement (Serif Quote) ─── */}
        <div ref={quoteRef} className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light italic font-serif leading-relaxed text-[var(--text-primary)]">
            "{aboutData.quote}"
          </h2>
        </div>

        {/* ─── Asymmetric Bento Cards ─── */}
        <div className="about-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Core Focus Card */}
          <div className="about-card opacity-0 p-[1px] bg-white/5 border border-white/10 rounded-2xl shadow-sm">
            <div className="w-full h-full rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-8">
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">Focus Areas</span>
              <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mt-3 mb-2 tracking-tight">Core Focus</h3>
              <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                {aboutData.coreFocus}
              </p>
            </div>
          </div>

          {/* Design Philosophy Card */}
          <div className="about-card opacity-0 p-[1px] bg-white/5 border border-white/10 rounded-2xl shadow-sm">
            <div className="w-full h-full rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-8">
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">Aesthetic Guide</span>
              <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mt-3 mb-2 tracking-tight">Design Philosophy</h3>
              <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                {aboutData.designPhilosophy}
              </p>
            </div>
          </div>

        </div>

        {/* ─── Capabilities Index (Linear rows instead of 3-column blocks) ─── */}
        <div ref={featuresRef} className="flex flex-col border-t border-[var(--border-subtle)] mt-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="about-feature-row opacity-0 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 py-8 border-b border-[var(--border-subtle)] items-center"
            >
              {/* Index Column */}
              <div className="md:col-span-1">
                <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase font-semibold">
                  {item.num}
                </span>
              </div>
              
              {/* Title Column */}
              <div className="md:col-span-4">
                <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">
                  {item.title}
                </h4>
              </div>

              {/* Description Column */}
              <div className="md:col-span-7">
                <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
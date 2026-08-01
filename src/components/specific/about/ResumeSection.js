"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationData, experienceData, achievementsData } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Resume / Professional History Section
   - Clean, modern editorial list layouts
   - Segmented: Work History, Academic Foundation, Achievements
   - Left column: Years/Period (Monospace)
   - Right column: Details, Badges, bullet lists
   - Separated by thin, responsive dividing rules
   ───────────────────────────────────────────── */
const ResumeSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set([headerRef.current, ...itemsRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Stagger reveal of all rows */
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let elementIdx = 0;

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative w-full py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-[var(--bg-dark)]"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-24">
        
        {/* ─── Header ─── */}
        <div ref={headerRef} className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-[var(--text-primary)] uppercase font-sans">
            History &
            <br />
            Foundation
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mt-4 max-w-md">
            A selective trace of full-stack engineering roles, academic studies, and core developer achievements.
          </p>
        </div>

        {/* ─── Segment 1: Work Experience ─── */}
        <div className="flex flex-col">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[var(--text-tertiary)] uppercase mb-6">
            // Work History
          </h3>
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {experienceData.map((item) => {
              const currentIdx = elementIdx++;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[currentIdx] = el)}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-12 border-b border-[var(--border-subtle)] transition-all duration-500 hover:bg-white/[0.01] px-4 md:px-6 rounded-2xl"
                >
                  {/* Left Column: Period */}
                  <div className="md:col-span-3">
                    <span className="text-sm font-mono font-semibold tracking-wider text-[var(--text-primary)] uppercase">
                      {item.period}
                    </span>
                  </div>

                  {/* Right Column: Experience Details */}
                  <div className="md:col-span-9 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <h4 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
                        {item.role}
                      </h4>
                      <span className="text-xs text-[var(--text-secondary)] font-medium tracking-wide uppercase">
                        {item.company}
                      </span>
                      
                      {/* Highlight bullets */}
                      <ul className="list-disc pl-4 space-y-2 mt-2">
                        {item.highlights.map((bullet, i) => (
                          <li key={i} className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 shrink-0 max-w-[200px] justify-start md:justify-end">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)] uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Segment 2: Academic Foundation ─── */}
        <div className="flex flex-col">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[var(--text-tertiary)] uppercase mb-6">
            // Academics
          </h3>
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {educationData.map((item) => {
              const currentIdx = elementIdx++;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[currentIdx] = el)}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-12 border-b border-[var(--border-subtle)] transition-all duration-500 hover:bg-white/[0.01] px-4 md:px-6 rounded-2xl"
                >
                  {/* Left Column: Period */}
                  <div className="md:col-span-3">
                    <span className="text-sm font-mono font-semibold tracking-wider text-[var(--text-primary)] uppercase">
                      {item.period}
                    </span>
                  </div>

                  {/* Right Column: Academic Details */}
                  <div className="md:col-span-9 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
                        {item.degree}
                      </h4>
                      <span className="text-xs text-[var(--text-secondary)] font-medium tracking-wide uppercase">
                        {item.field}
                      </span>
                      <p className="text-sm text-[var(--text-secondary)] font-light max-w-xl">
                        {item.institution}
                      </p>
                    </div>

                    {/* Scores & Status */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
                      {item.status && (
                        <span className="text-[10px] font-mono px-3.5 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-bold tracking-wider uppercase">
                          {item.status}
                        </span>
                      )}
                      {item.score && (
                        <span className="text-[10px] font-mono px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[var(--text-primary)] font-bold tracking-wider uppercase">
                          {item.score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Segment 3: Key Achievements ─── */}
        <div className="flex flex-col">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[var(--text-tertiary)] uppercase mb-6">
            // Achievements & Certifications
          </h3>
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {achievementsData.map((item) => {
              const currentIdx = elementIdx++;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[currentIdx] = el)}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 border-b border-[var(--border-subtle)] transition-all duration-500 hover:bg-white/[0.01] px-4 md:px-6 rounded-2xl"
                >
                  {/* Left Column: Index */}
                  <div className="md:col-span-3">
                    <span className="text-sm font-mono font-semibold tracking-wider text-[var(--text-primary)] uppercase">
                      Award
                    </span>
                  </div>

                  {/* Right Column: Achievements Details */}
                  <div className="md:col-span-9 flex flex-col gap-2">
                    <h4 className="text-lg font-bold tracking-tight text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResumeSection;

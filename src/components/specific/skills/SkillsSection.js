"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Technical Capabilities - Minimalist Bento Grid
   - Clean, luxury editorial styling
   - Crisp border-radius (rounded-2xl)
   - Zero terminal brackets, telemetry prefixes, or neon glows
   - High typographic contrast & spacious margins
   ───────────────────────────────────────────── */
const SkillsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* Header entrance reveal */
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

      /* Bento cards scale/fade reveal */
      gsap.fromTo(
        ".skills-bento-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
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
      id="skills"
      className="relative w-full py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-[var(--bg-dark)]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* ─── Header ─── */}
        <div ref={headerRef} className="mb-20 md:mb-24 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-[var(--text-primary)] uppercase font-sans">
            Technical Capabilities
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mt-4 max-w-md">
            A selective index of frontend frameworks, compiled language systems, and interface prototyping pipelines.
          </p>
        </div>

        {/* ─── Bento Grid Matrix ─── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto w-full"
        >
          
          {/* Card 1: Full Stack Web Engineering (col-span-8) */}
          <div className="skills-bento-card opacity-0 md:col-span-8 p-[1px] bg-white/5 border border-white/10 rounded-2xl shadow-sm min-h-[280px]">
            <div className="w-full h-full rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Full Stack Web Engineering</h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed max-w-xl">
                  Structuring highly optimized client environments integrated with performant application servers. Focus is placed on component modularity, global state management, and bundle optimizations.
                </p>
              </div>

              {/* Clean tech chips */}
              <div className="flex flex-wrap gap-2 mt-2">
                {["React.js", "Next.js", "Node.js", "JavaScript", "Tailwind CSS", "MongoDB", "SQL"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Systems Core (col-span-4) */}
          <div className="skills-bento-card opacity-0 md:col-span-4 p-[1px] bg-white/5 border border-white/10 rounded-2xl shadow-sm min-h-[280px]">
            <div className="w-full h-full rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-6 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">C++ & Go Systems</h3>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  Building concurrent server models, low-level data structures, and gRPC endpoint frameworks. Emphasis on threading safety, resource utilization, and compiler safety.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {["C++", "Go Language", "Concurrency", "Algorithms"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] bg-white/[0.01] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: UI/UX & Motion (col-span-4) */}
          <div className="skills-bento-card opacity-0 md:col-span-4 p-[1px] bg-white/5 border border-white/10 rounded-2xl shadow-sm min-h-[280px]">
            <div className="w-full h-full rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-6 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">UI/UX & Creative Engineering</h3>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  Interfacing interface layouts from mockup definitions to final browser execution. Specifying custom animation curves, responsive frame logic, and interactive mechanics.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {["Figma", "GSAP Motion", "Prototyping", "Fluid Layouts"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] bg-white/[0.01] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Open Source Workflows (col-span-8) */}
          <div className="skills-bento-card opacity-0 md:col-span-8 p-[1px] bg-white/5 border border-white/10 rounded-2xl shadow-sm min-h-[280px]">
            <div className="w-full h-full rounded-[calc(1rem-1px)] bg-[var(--bg-elevated)] p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">Open Source & Git Collaboration</h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed max-w-xl">
                  Contributing clean code to shared directories, maintaining strict code standards, and managing atomic pull requests. Experience in semantic version tracking and continuous build deployments.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {["Git Versioning", "GitHub Actions", "Terminal Scripts", "PR Audits"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] bg-white/[0.01] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SkillsSection;

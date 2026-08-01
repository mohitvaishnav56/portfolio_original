"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/portfolioData";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set([headerRef.current, ...cardsRef.current], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      /* Header entrance reveal */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Stagger reveal project cards as they enter the viewport */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-[var(--bg-dark)]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* ─── Section Header (No metadata eyebrows, clean visual focus) ─── */}
        <div ref={headerRef} className="mb-20 md:mb-28 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-[var(--text-primary)] uppercase font-sans">
            Featured
            <br />
            Engineering Works
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mt-4 max-w-md">
            A selective index of digital systems, developer tools, and responsive interfaces crafted with focus.
          </p>
        </div>

        {/* ─── Asymmetric Stacked Cards ─── */}
        <div className="flex flex-col gap-28 md:gap-36">
          {projectsData.map((project, index) => (
            <div
              key={project.id || index}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

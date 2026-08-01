"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Project Card Component
   - Asymmetric alternating layouts
   - Creative slide clip-path reveal on viewport entry
   - Smooth 3D tilt cursor response on image frame hover
   - Scroll-scrubbed image parallax y-translation
   - Clean, scannable technology tags below description
   ───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(imageWrapRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      /* Creative reveal: Clip-path horizontal slide mask opens on scroll */
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Staggered text content reveal accompanying the image reveal */
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: isReversed ? 30 : -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* Scroll-scrubbed parallax translation of the inner image */
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [isReversed]);

  useEffect(() => {
    /* 3D Tilt mouse-move hover effect on image container */
    const container = imageWrapRef.current;
    if (!container) return;

    const xTo = gsap.quickTo(container, "rotateY", { duration: 0.5, ease: "power2.out" });
    const yTo = gsap.quickTo(container, "rotateX", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotY = (x / (rect.width / 2)) * 6;  // Maximum 6 degrees tilt
      const rotX = -(y / (rect.height / 2)) * 6;
      xTo(rotY);
      yTo(rotX);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const hasLinks = project.projectLink || project.githubLink || project.figmaLink;

  return (
    <article
      ref={cardRef}
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      
      {/* ─── Image Column (Col-span 7) ─── */}
      <div className={`lg:col-span-7 perspective-[1000px] ${isReversed ? "lg:[direction:ltr]" : ""}`}>
        <div
          ref={imageWrapRef}
          className="relative w-full aspect-[16/10] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)] group-hover:border-[var(--border-hover)] transition-colors duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/60"
          style={{ willChange: "transform, clip-path", transformStyle: "preserve-3d" }}
          onClick={() => {
            if (project.projectLink) {
              window.open(project.projectLink, "_blank", "noopener,noreferrer");
            }
          }}
        >
          {project.coverImg ? (
            <Image
              ref={imageRef}
              src={project.coverImg}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-top scale-[1.18] group-hover:scale-[1.22] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              quality={85}
              style={{ willChange: "transform" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--bg-elevated)]">
              <span className="text-[var(--text-tertiary)] text-xs uppercase tracking-wider font-mono">
                interactive sandbox
              </span>
            </div>
          )}
          
          {/* Shadow gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/40 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-20 transition-opacity duration-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ─── Text Column (Col-span 5) ─── */}
      <div
        ref={textRef}
        className={`lg:col-span-5 flex flex-col justify-center gap-6 py-2 lg:py-6 opacity-0 ${
          isReversed ? "lg:[direction:ltr]" : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          
          {/* Metadata Row */}
          <div className="flex items-center gap-3">
            {project.year && (
              <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--text-tertiary)] font-mono uppercase">
                {project.year}
              </span>
            )}
            
            {project.tag?.length > 0 && (
              <>
                <span className="w-[1px] h-2.5 bg-[var(--border-subtle)]" aria-hidden="true" />
                <div className="flex flex-wrap gap-1.5">
                  {project.tag.map((t, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black tracking-[-0.03em] leading-tight text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light max-w-md">
            {project.description}
          </p>

          {/* Tech Stack pills (scannable tags below description) */}
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)] font-mono uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Links */}
        {hasLinks && (
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <span className="relative">
                  Live demo
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-white group-hover/link:w-full transition-all duration-300" />
                </span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 cursor-pointer"
              >
                <span className="relative">
                  Source
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[var(--text-secondary)] group-hover/link:w-full transition-all duration-300" />
                </span>
              </a>
            )}

            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 cursor-pointer"
              >
                <span className="relative">
                  Design
                  <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[var(--text-secondary)] group-hover/link:w-full transition-all duration-300" />
                </span>
              </a>
            )}
          </div>
        )}

      </div>
    </article>
  );
}

export default ProjectCard;

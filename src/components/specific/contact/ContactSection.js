"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextContent from "./TextContent";
import Form from "./Form";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* Staggered entrance for the contact grid components */
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
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
      id="contact"
      className="relative w-full py-32 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden bg-[var(--bg-dark)]"
    >
      <div className="max-w-[1400px] mx-auto z-10 relative">
        {/* Content & Form Grid - Airy layout, clean gaps */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 opacity-0"
        >
          <TextContent />
          <Form />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
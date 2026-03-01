"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    // Simple elegant fade and slight upward reveal on scroll
    gsap.fromTo(textRef.current.children,
      { opacity: 0.1, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1, // Smoothly link animation strictly to scroll progress
        }
      }
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-[var(--bg-color)] flex items-center justify-center px-6 md:px-12 py-32 relative z-10">
      <div className="max-w-6xl w-full">
        <p
          ref={textRef}
          className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.2] text-white tracking-tight"
        >
          <span>I bridge the gap </span>
          <span className="text-gray-500 italic font-serif">between design and engineering, </span>
          <span>transforming complex problems into </span>
          <span className="text-transparent [-webkit-text-stroke:1px_white] xl:[-webkit-text-stroke:2px_white] uppercase tracking-widest">elegant</span>
          <span>, intuitive digital experiences that people love to use.</span>
        </p>

        <div className="mt-20 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between gap-10 items-start">


          <div className="md:w-1/3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Core Focus</h3>
            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              My workflow is fundamentally rooted in React, Next.js, and GSAP. I obsess over micro-interactions and performance optimization without sacrificing aesthetics.
            </p>
          </div>

          <div className="md:w-1/3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Design Philosophy</h3>
            <p className="text-lg text-gray-300 leading-relaxed font-normal">
              Design is not just what it looks like; it's how it moves and flows. Great structure must be paired with seamless fluidity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
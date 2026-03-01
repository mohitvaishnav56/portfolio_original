"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Staggered reveal for the massive text lines
    tl.fromTo(".hero-line",
      { y: 100, opacity: 0, rotate: 5 },
      { y: 0, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    )
      // Reveal the subtitle
      .fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )
      // Fade in the scroll indicator
      .fromTo(".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

    // Continuous subtle bounce on the scroll indicator
    gsap.to(".scroll-indicator-dot", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });

  }, { scope: container });

  return (
    <div ref={container} className="h-screen w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-[var(--bg-color)]">

      {/* Background Texture/Noise Layer - Subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <div className="z-10 mt-16 md:mt-0">
        <div className="overflow-hidden mb-2 md:mb-0">
          <h1 className="hero-line text-6xl md:text-[8vw] leading-[0.9] font-black tracking-tighter uppercase text-white">
            Crafting
          </h1>
        </div>
        <div className="overflow-hidden mb-2 md:mb-0">
          <h1 className="hero-line text-6xl md:text-[8vw] leading-[0.9] font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_white] xl:[-webkit-text-stroke:3px_white]">
            Digital
          </h1>
        </div>
        <div className="overflow-hidden mb-6 md:mb-10">
          <h1 className="hero-line text-6xl md:text-[8vw] leading-[0.9] font-black tracking-tighter uppercase text-white">
            Experiences.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between w-full md:w-3/4 lg:w-1/2 gap-6">
          <p className="hero-subtitle text-lg md:text-xl text-gray-400 font-medium max-w-sm leading-relaxed">
            I am Mohit Vaishnav, a frontend developer and hobby UI/UX designer focused on building immersive and scalable web applications.
          </p>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-subtitle w-fit px-8 py-4 rounded-full border border-white/30 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 ease-out flex items-center gap-3 group"
          >
            Let's Talk
            <span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span>
          </button>
        </div>
      </div>


    </div>
  );
};

export default HeroSection;
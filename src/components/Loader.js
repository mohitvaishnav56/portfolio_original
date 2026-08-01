"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   Premium Typographic Preloader
   - Counts from 00 to 100 in monospace
   - Clean, luxury dark theme branding details
   - Smooth clip-path slide-up exit reveal
   ───────────────────────────────────────────── */
const Loader = ({ setLoading }) => {
  const containerRef = useRef(null);
  const countRef = useRef(null);
  const brandingRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    /* Fast, smooth count transition from 0 to 100 */
    const duration = 1.4; // 1.4 seconds loader
    const val = { value: 0 };
    
    gsap.to(val, {
      value: 100,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.floor(val.value);
        setProgress(rounded);
        if (countRef.current) {
          countRef.current.textContent = String(rounded).padStart(3, "0");
        }
      },
      onComplete: () => {
        /* Exit Animation: Slide container up via clip-path for cinematic transition */
        const tl = gsap.timeline({
          onComplete: () => {
            setLoading(false);
          }
        });

        tl.to([countRef.current, brandingRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power3.in"
        })
        .to(containerRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.85,
          ease: "power4.inOut"
        }, "-=0.2");
      }
    });
  }, [setLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#050508] z-[9999] flex flex-col justify-between p-8 md:p-16 overflow-hidden"
      style={{ clipPath: "inset(0% 0% 0% 0%)", willChange: "clip-path" }}
    >
      {/* Top telemetry indicators */}
      <div 
        ref={brandingRef}
        className="flex justify-between items-center w-full text-[9px] font-mono tracking-[0.25em] text-[var(--text-tertiary)] uppercase"
      >
        <span>MOHIT VAISHNAV</span>
        <span>SYSTEM.INIT // V1.0</span>
      </div>

      {/* Center percentage counter */}
      <div className="flex-1 flex items-center justify-center">
        <span
          ref={countRef}
          className="text-[clamp(4.5rem,14vw,12rem)] font-black tracking-tighter leading-none text-white font-mono"
        >
          000
        </span>
      </div>

      {/* Bottom loading bar & progress */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4">
        {/* Progress track */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden" aria-hidden="true">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-[9px] font-mono tracking-[0.2em] text-[var(--text-tertiary)] uppercase">
          <span>LOADING DATABASE</span>
          <span>{progress}%</span>
        </div>
      </div>

    </div>
  );
};

export default Loader;
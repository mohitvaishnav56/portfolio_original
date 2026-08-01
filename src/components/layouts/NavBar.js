"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Magnetic Wrapper Component for Nav Items
   Uses quickTo for performant spring coordinates
   ───────────────────────────────────────────── */
function MagneticLink({ children, onClick, className = "", dataId }) {
  const linkRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    xTo.current = gsap.quickTo(el, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
    });
    yTo.current = gsap.quickTo(el, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
    });

    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      /* Subtle magnetic scale for small text link elements */
      xTo.current((clientX - cx) * 0.25);
      yTo.current((clientY - cy) * 0.25);
    };

    const handleLeave = () => {
      xTo.current(0);
      yTo.current(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <button
      ref={linkRef}
      onClick={onClick}
      className={className}
      data-nav-id={dataId}
    >
      {children}
    </button>
  );
}

const NavBar = ({ menuOpen, setMenuOpen }) => {
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    /* Entrance animation */
    gsap.fromTo(
      nav,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      }
    );

    /* Section tracking via IntersectionObserver */
    const sections = ["hero", "about", "education", "skills", "projects", "contact"];
    const observers = [];
    let timeoutId;

    const setupObservers = () => {
      const allFound = sections.every((id) => document.getElementById(id));
      if (!allFound) {
        timeoutId = setTimeout(setupObservers, 100);
        return;
      }

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { rootMargin: "-45% 0px -50% 0px" }
        );
        observer.observe(el);
        observers.push(observer);
      });
    };

    setupObservers();

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((o) => o.disconnect());
    };
  }, [setActiveSection]);

  /* Indicator position/width update animation with GSAP */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !indicatorRef.current) return;

    const updateIndicator = () => {
      const activeLink = nav.querySelector(`[data-nav-id="${activeSection}"]`);
      const navContainer = nav.querySelector("nav");
      if (activeLink && navContainer) {
        const parentRect = navContainer.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();
        const left = activeRect.left - parentRect.left;
        const width = activeRect.width;

        gsap.to(indicatorRef.current, {
          x: left,
          width: width,
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        // Hide/scale indicator to 0 if we scroll to a section not represented in Desktop nav items (e.g. Hero)
        gsap.to(indicatorRef.current, {
          opacity: 0,
          scaleX: 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    // Delay calculation slightly to allow for entrance animations / layout settling
    const timer = setTimeout(updateIndicator, 100);

    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (menuOpen) setMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Education", id: "education" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 lg:px-20 py-5 opacity-0"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Brand wordmark - Magnetic */}
        <MagneticLink
          onClick={() => scrollToSection("hero")}
          className="text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)] hover:opacity-70 transition-opacity duration-300 select-none cursor-pointer"
        >
          Mohit Vaishnav
        </MagneticLink>

        {/* Desktop nav links - all Magnetic Link instances */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <MagneticLink
                key={item.id}
                dataId={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-500 py-1 ${
                  isActive ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </MagneticLink>
            );
          })}
          {/* Animated active indicator underline */}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 h-[1.5px] bg-[var(--text-primary)] rounded-full left-0 pointer-events-none opacity-0 origin-left"
          />
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="relative w-8 h-8 flex flex-col items-end justify-center gap-1.5 md:hidden z-[60]"
        >
          <span
            className={`block h-[1.5px] bg-[var(--text-primary)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen ? "w-6 rotate-45 translate-y-[4.5px]" : "w-6"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-[var(--text-primary)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen ? "w-6 -rotate-45 -translate-y-[4.5px]" : "w-4"
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default NavBar;
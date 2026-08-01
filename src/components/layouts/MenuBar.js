"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MenuBar = ({ menuOpen, setMenuOpen }) => {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      gsap.to(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          delay: 0.15,
          duration: 0.7,
          ease: "power4.out",
        }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const menuItems = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Education", id: "education" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 opacity-0 pointer-events-none flex flex-col justify-center items-start px-10"
      style={{ backgroundColor: "rgba(5, 5, 8, 0.97)" }}
    >
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => (linksRef.current[i] = el)}
            onClick={() => scrollToSection(item.id)}
            className="text-left text-[clamp(2rem,8vw,4rem)] font-bold tracking-[-0.03em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-500 leading-[1.15]"
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
        <span className="text-[11px] text-[var(--text-tertiary)] tracking-wide">
          Indore, India
        </span>
        <span className="text-[11px] text-[var(--text-tertiary)] tracking-wide">
          mohitvaishnav5642@gmail.com
        </span>
      </div>
    </div>
  );
};

export default MenuBar;

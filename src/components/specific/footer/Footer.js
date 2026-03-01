"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

const Magnet = ({ children }) => {
  const magnetRef = useRef(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(magnetRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    magnetRef.current.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.5);
      yTo(y * 0.5);
    });

    magnetRef.current.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  }, { scope: magnetRef });

  return React.cloneElement(children, { ref: magnetRef });
};

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="w-full bg-[var(--bg-color)] pt-32 pb-12 px-6 md:px-12 relative overflow-hidden flex flex-col items-center justify-center">

      <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter text-white leading-[0.8] mb-16 text-center z-10">
        Let's <span className="text-transparent [-webkit-text-stroke:2px_white]">Build</span><br />Together
      </h2>

      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 mt-16 z-10 gap-8">

        <div className="flex flex-col gap-2">
          <p className="text-gray-400 font-medium">© {year} Mohit Vaishnav.</p>
          <div className="flex flex-col gap-1 mt-2 text-gray-500 text-sm">
            <a href="mailto:mohitvaishnav5642@gmail.com" className="hover:text-white transition-colors">mohitvaishnav5642@gmail.com</a>
            <a href="tel:+919301135305" className="hover:text-white transition-colors">+91-9301135305</a>
          </div>
        </div>

        <div className="flex gap-8 text-2xl text-white">
          <Magnet>
            <Link href="https://github.com/mohitvaishnav56" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center">
              <FaGithub />
            </Link>
          </Magnet>
          <Magnet>
            <Link href="https://linkedin.com/in/mohit-vaishnav-50682428b" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center">
              <FaLinkedin />
            </Link>
          </Magnet>
          <Magnet>
            <Link href="https://instagram.com/Vaishnav_56.in" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center">
              <FaInstagram />
            </Link>
          </Magnet>
        </div>

        <Magnet>
          <button onClick={scrollToTop} className="flex items-center gap-2 text-white font-medium uppercase tracking-widest text-sm hover:text-gray-400 transition-colors p-4">
            Back to top <FaArrowUp />
          </button>
        </Magnet>
      </div>

    </footer>
  );
};

export default Footer;

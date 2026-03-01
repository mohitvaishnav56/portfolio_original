"use client";
import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaEquals, FaChevronDown } from "react-icons/fa6";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { projectSlice } from "@/slices/projectSlice"; // Need to check export strategy, wait, usually we import an action
import store from "@/store"; // or just use slice actions directly

const NavBar = ({ menuOpen, setMenuOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Initial animation
        gsap.fromTo(".nav-bar",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
        );

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`nav-bar fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference ${scrolled ? 'py-4 backdrop-blur-md bg-black/50 mix-blend-normal' : ''}`}>

            {/* Logo */}
            <h1
                className="text-2xl md:text-3xl font-bold tracking-tighter text-white cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => scrollToSection('hero')}
            >
                MV.
            </h1>

            {/* Desktop Links with Nested Dropdown */}
            <ul className="hidden md:flex gap-10 text-sm font-medium text-white/80 items-center h-full">
                <li className="cursor-pointer group relative overflow-hidden" onClick={() => scrollToSection('about')}>
                    <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">About</span>
                    <span className="block absolute top-full group-hover:-translate-y-full transition-transform duration-300 ease-in-out text-white">About</span>
                </li>

                {/* Nested Menu Container */}
                <li className="cursor-pointer group relative flex items-center h-full">
                    <div className="flex items-center gap-1 hover:text-white transition-colors py-4">
                        <span>Work</span>
                        <FaChevronDown className="text-[10px] group-hover:rotate-180 transition-transform duration-300" />
                    </div>

                    {/* Dropdown Box */}
                    <div className="absolute top-[80%] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        {/* Invisible bridge to prevent hover loss */}
                        <div className="w-full h-6 absolute -top-4 left-0"></div>

                        <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-2 w-48 flex flex-col gap-1 relative">
                            <span
                                onClick={() => {
                                    dispatch({ type: 'projects/setFilter', payload: 'All' });
                                    scrollToSection('projects');
                                    setMenuOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                            >
                                All Projects
                            </span>
                            <span
                                onClick={() => {
                                    dispatch({ type: 'projects/setFilter', payload: 'Web Apps' });
                                    scrollToSection('projects');
                                    setMenuOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                            >
                                Web Apps
                            </span>
                            <span
                                onClick={() => {
                                    dispatch({ type: 'projects/setFilter', payload: 'UI/UX Design' });
                                    scrollToSection('projects');
                                    setMenuOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                            >
                                UI/UX Design
                            </span>
                        </div>
                    </div>
                </li>

                <li className="cursor-pointer group relative overflow-hidden" onClick={() => scrollToSection('resume')}>
                    <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">Resume</span>
                    <span className="block absolute top-full group-hover:-translate-y-full transition-transform duration-300 ease-in-out text-white">Resume</span>
                </li>

                <li className="cursor-pointer group relative overflow-hidden" onClick={() => scrollToSection('contact')}>
                    <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">Contact</span>
                    <span className="block absolute top-full group-hover:-translate-y-full transition-transform duration-300 ease-in-out text-white">Contact</span>
                </li>
            </ul>

            {/* Mobile/Hamburger Toggle */}
            <span
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl cursor-pointer text-white md:hidden hover:opacity-70 transition-opacity z-[60]"
            >
                {menuOpen ? <RxCross1 /> : <FaEquals />}
            </span>
        </div>
    );
}

export default NavBar;
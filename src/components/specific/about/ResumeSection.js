"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    "HTML", "CSS", "JavaScript", "React.js", "C Language", "C++",
    "Figma", "GSAP", "SQL", "Node.js", "MongoDB", "Git", "Tailwind CSS"
];

const ResumeSection = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Staggered reveal for skills
        gsap.fromTo(".skill-pill",
            { opacity: 0, scale: 0.8, y: 30 },
            {
                opacity: 1, scale: 1, y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".skills-container",
                    start: "top 85%",
                }
            }
        );

        // Timeline line reveal
        gsap.fromTo(".timeline-line",
            { height: 0 },
            {
                height: "100%",
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: ".education-container",
                    start: "top 70%",
                }
            }
        );

        // Education items reveal
        gsap.fromTo(".education-item",
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".education-container",
                    start: "top 70%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-[var(--bg-color)] px-6 md:px-12 py-32 border-t border-white/10 relative z-10" id="resume">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left Column: Education */}
                <div className="education-container">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12">
                        Education <span className="text-transparent [-webkit-text-stroke:1px_white]">&</span> Journey
                    </h2>

                    <div className="relative pl-8">
                        {/* Timeline Line */}
                        <div className="timeline-line absolute left-0 top-2 bottom-0 w-[1px] bg-gradient-to-b from-white to-transparent origin-top"></div>

                        {/* Item 1 */}
                        <div className="education-item relative mb-12">
                            <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-white ring-4 ring-black"></div>
                            <span className="text-[var(--accent)] font-mono text-sm tracking-widest mb-2 block">Aug 2023 - Aug 2027</span>
                            <h3 className="text-2xl font-bold text-white mb-1">Bachelor of Technology</h3>
                            <h4 className="text-lg text-gray-300 mb-2">Computer Science and Engineering</h4>
                            <p className="text-gray-500 font-medium">Sushila Devi Bansal College of Engineering, Indore, MP</p>
                        </div>

                        {/* Item 2 */}
                        <div className="education-item relative mb-12">
                            <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-white ring-4 ring-black"></div>
                            <span className="text-[var(--accent)] font-mono text-sm tracking-widest mb-2 block">2023</span>
                            <h3 className="text-xl font-bold text-white mb-1">Senior Secondary (Class 12)</h3>
                            <p className="text-gray-500 font-medium tracking-wide">Score: 82.60% (Mathematics)</p>
                            <p className="text-gray-600 text-sm mt-1">MPBSE - Maa Umiya Patidar Higher Secondary School, Dhar</p>
                        </div>

                        {/* Item 3 */}
                        <div className="education-item relative">
                            <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-gray-500 ring-4 ring-black"></div>
                            <span className="text-gray-500 font-mono text-sm tracking-widest mb-2 block">2021</span>
                            <h3 className="text-xl font-bold text-gray-300 mb-1">Secondary (Class 10)</h3>
                            <p className="text-gray-500 font-medium tracking-wide">Score: 92% (Mathematics)</p>
                            <p className="text-gray-600 text-sm mt-1">MPBSE - Geeta Devi Public Higher Secondary School, MP</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Skills */}
                <div className="skills-container flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12 lg:text-right">
                        Core <span className="text-transparent [-webkit-text-stroke:1px_white]">Arsenal</span>
                    </h2>

                    <div className="flex flex-wrap gap-4 lg:justify-end">
                        {skills.map((skill, i) => (
                            <span
                                key={i}
                                className="skill-pill px-6 py-3 rounded-full border border-white/20 text-white/90 text-sm md:text-base font-medium tracking-wide hover:bg-white hover:text-black transition-colors duration-300 cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResumeSection;

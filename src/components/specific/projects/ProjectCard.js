import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GoArrowRight } from "react-icons/go";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const arrowRef = useRef(null);

    useGSAP(() => {
        const card = cardRef.current;

        // Hover interactions
        card.addEventListener('mouseenter', () => {
            gsap.to(imageRef.current, { scale: 1.05, duration: 0.6, ease: "power3.out" });
            gsap.to(arrowRef.current, { x: 10, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: "power3.out" });
            gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
        });

    }, { scope: cardRef });

    return (
        <div ref={cardRef} className="project-card flex flex-col md:flex-row gap-8 lg:gap-16 border-t border-white/10 py-16 group">

            {/* Left: Info */}
            <div className="w-full md:w-1/3 flex flex-col justify-between">
                <div>
                    <span className="text-gray-500 font-mono text-sm mb-4 block">0{index + 1}</span>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {project.title}
                    </h3>

                    <div className="flex gap-3 mb-6 flex-wrap">
                        {project.tag?.map((t, i) => (
                            <span key={i} className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/70 uppercase tracking-wider">
                                {t}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-400 leading-relaxed font-light text-lg">
                        {project.description}
                    </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-6">
                    {project.projectLink && (
                        <Link
                            href={project.projectLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-white uppercase text-sm tracking-[0.2em] font-medium w-fit overflow-hidden group/link"
                        >
                            <span className="relative">
                                Live Showcase
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500"></span>
                            </span>
                            <GoArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    )}

                    {project.githubLink && (
                        <Link
                            href={project.githubLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-white uppercase text-sm tracking-[0.2em] font-medium w-fit overflow-hidden group/link"
                        >
                            <span className="relative">
                                GitHub Repo
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500"></span>
                            </span>
                            <GoArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    )}

                    {project.figmaLink && (
                        <Link
                            href={project.figmaLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-white uppercase text-sm tracking-[0.2em] font-medium w-fit overflow-hidden group/link"
                        >
                            <span className="relative">
                                Design Link
                                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500"></span>
                            </span>
                            <GoArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Right: Image Container */}
            <div className="w-full md:w-2/3 h-[400px] md:h-[600px] overflow-hidden bg-white/5 relative mt-8 md:mt-0">
                <div
                    ref={imageRef}
                    className="w-full h-full relative"
                >
                    <Image
                        src={project.coverImg}
                        alt={project.title}
                        fill
                        className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </div>
            </div>

        </div>
    );
}

export default ProjectCard;

import React from 'react';
import { FaGithub, FaFigma } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import Link from 'next/link';
import Image from 'next/image';

function ProjectCard({ project }) {
    return (
        <div
            className="group h-100 md:h-90 w-full md:w-90 relative flex flex-col bg-[#D4BD9B] rounded-lg overflow-hidden 
            border border-black/10 shadow-[0px_4px_10px_rgba(0,0,0,0.25)]"
        >
            {/* IMAGE */}
            <Image
                src={project.coverImg}
                alt={project.title}
                className="object-cover object-top  h-1/2
                group-hover:scale-[1.02] transition-all duration-300 ease-out"
            />

            {/* ICON + TAG */}
            <div className="flex justify-between px-3 mt-2 items-center">
                <div className="flex gap-2">
                    {project.projectLink && (
                        <Link
                            href={project.projectLink}
                            target="_blank"
                            className="h-7 w-7 flex items-center justify-center rounded-full
                            bg-[#E3AF84] hover:bg-[#d49a72] transition text-black"
                        >
                            <GoArrowUpRight className="text-[14px]" />
                        </Link>
                    )}
                    {project.githubLink && (
                        <Link
                            href={project.githubLink}
                            target="_blank"
                            className="h-7 w-7 flex items-center justify-center rounded-full
                            bg-[#2B4854] hover:bg-[#1f3942] transition"
                        >
                            <FaGithub className="text-white text-[14px]" />
                        </Link>
                    )}
                    {project.figmaLink && (
                        <Link
                            href={project.figmaLink}
                            target="_blank"
                            className="h-7 w-7 flex items-center justify-center rounded-full
                            bg-[#2B4854] hover:bg-[#1f3942] transition"
                        >
                            <FaFigma className="text-white text-[14px]" />
                        </Link>
                    )}
                </div>

                <span className="text-[10px] px-2 py-1 rounded-full bg-[#853D39] text-white capitalize">
                    {project.tag?.[0] ?? "Design"}
                </span>
            </div>

            {/* BODY */}
            <div className="p-3">
                <h3 className="text-lg font-bold tracking-tight leading-snug md:mb-1 text-black">
                    {project.title}
                </h3>

                <p style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }} className="text-sm text-black/80 leading-relaxed line-clamp-3 md:mb-2">
                    {project.description}
                </p>

                <Link
                    href={`/projects/${project.id}`}
                    className="text-sm font-semibold text-[#853D39] hover:text-[#612a27]"
                >
                    View More...
                </Link>
            </div>
        </div>
    );
}

export default ProjectCard;

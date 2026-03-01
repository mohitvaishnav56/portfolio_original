import useProjects from '@/hooks/useProjects';
import ProjectCard from './ProjectCard';
import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const projects = useProjects();
  const activeFilter = useSelector(state => state.projects.activeFilter);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal the main title when scrolling into view
    gsap.fromTo(".projects-title-word",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-header-container",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='w-full min-h-screen bg-[var(--bg-color)] px-6 md:px-12 py-32'>

      {/* Header Container */}
      <div className="projects-header-container mb-24 md:mb-40 max-w-6xl mx-auto overflow-hidden">
        <h2 className="text-5xl md:text-[6vw] font-black uppercase tracking-tighter text-white leading-none flex gap-4 flex-wrap">
          <span className="projects-title-word">Selected</span>
          <span className="projects-title-word text-transparent [-webkit-text-stroke:1px_white] xl:[-webkit-text-stroke:2px_white]">Works</span>
          <span className="projects-title-word text-sm md:text-xl font-normal tracking-normal self-end mb-2 ml-4 text-gray-400 lowercase italic">
            (2023 - Present)
          </span>
        </h2>
      </div>

      {/* Cards Stack (No longer a grid, but a vertical list of massive features) */}
      <div className='w-full max-w-6xl mx-auto flex flex-col'>
        {projects
          .filter(project => {
            if (activeFilter === 'All') return true;
            if (activeFilter === 'Web Apps') {
              return project.tag.some(t => t.toLowerCase().includes('development') || t.toLowerCase().includes('frontend'));
            }
            if (activeFilter === 'UI/UX Design') {
              return project.tag.some(t => t.toLowerCase().includes('design'));
            }
            return true;
          })
          .map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
      </div>

    </div>
  )
}

export default ProjectsSection;

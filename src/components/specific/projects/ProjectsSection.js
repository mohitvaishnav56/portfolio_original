import useProjects from '@/hooks/useProjects'
import ProjectCard from './ProjectCard'
import React, { useEffect, useState } from 'react'

const ProjectsSection = () => {
  const projects = useProjects();

  return (
    <div className='w-full bg-[#2B4854] p-2 pt-8 md:p-12'>
      <h1 className="md:text-4xl text-3xl leading-tight md:leading-snug font-semibold text-white">
        The Stories Behind the Screens
      </h1>

      <div className='pt-8 pb-5 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center'>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection

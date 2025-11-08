import React from 'react'
import ProfilePicCard from './ProfilePicCard'
import CustomBtn from '@/components/CustomBtn'
const About = () => {
  return (
    <div className="w-full h-auto md:h-[90vh] bg-[#8A623E] md:flex justify-around px-2 md:px-4">
        <div className="md:w-3/5 w-full h-full flex flex-col py-10 justify-start gap-10">
  <h1 className="text-5xl font-bold text-white">About Me</h1>

  <p className="text-xl text-gray-200">
    I’m Mohit Vaishnav, a Computer Science student and frontend developer passionate about bridging design and code. I create seamless digital experiences using React.js, JavaScript, and Figma.
  </p>

  <p className="text-xl text-gray-200">
    When I’m not sketching wireframes or fixing a stubborn line of code, you’ll probably find me humming a tune, exploring new design trends, or breaking down everyday problems into fun little projects. I love blending creativity with logic — it keeps my work exciting and my ideas fresh.
  </p>

  <CustomBtn
    src="/about"
    className="bg-[#853D39] hover:scale-105 w-fit"
    title="Peek Into My Story"
  />
</div>

        <ProfilePicCard />
    </div>
  )
}

export default About
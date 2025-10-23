import React from 'react'
import HeroImg from './HeroImg'
import HeroText from './HeroText'
const HeroSection = () => {
  return (
    <div className='md:h-[90vh] w-full flex-col-reverse md:flex-row flex justify-start '>
        <HeroImg />
        <HeroText />
    </div>
  )
}

export default HeroSection
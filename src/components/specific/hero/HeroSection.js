import React from 'react'
import HeroImg from './HeroImg'
import HeroText from './HeroText'
const HeroSection = () => {
  return (
    <div className='h-[90vh] w-full flex justify-start '>
        <HeroImg />
        <HeroText />
    </div>
  )
}

export default HeroSection
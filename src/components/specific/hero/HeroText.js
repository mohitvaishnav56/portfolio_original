import React from 'react'
import TagLine from './TagLine'
import HeroTitle from './HeroTitle'
import HeroPara from './HeroPara'
import HeroBtns from './HeroBtns'
const HeroText = () => {
  return (
    <div className='pl-[100px] w-full h-full flex flex-col justify-center items-start'>
        <TagLine />
        <HeroTitle />
        <HeroPara />
        <HeroBtns/>
    </div>
  )
}

export default HeroText
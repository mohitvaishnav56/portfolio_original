import React from 'react'
import TagLine from './TagLine'
import HeroTitle from './HeroTitle'
import HeroPara from './HeroPara'
import HeroBtns from './HeroBtns'
const HeroText = () => {
  return (
    <div className='md:pl-[100px] pt-4 pl-4 w-full md:h-full flex flex-col justify-center items-start'>
        <TagLine />
        <HeroTitle />
        <HeroPara />
        <HeroBtns/>
    </div>
  )
}

export default HeroText
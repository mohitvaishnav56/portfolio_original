import CustomBtn from '@/components/CustomBtn'
import React from 'react'
const HeroBtns = () => {
  return (
    <div className='flex gap-4 flex-wrap mt-2'>
      <CustomBtn
        src={'#projects'}
        className={
          'bg-[#CC8D59] hover:scale-105'
        }
        title={'See My Works'}
      />
      <CustomBtn
        src={'#contact'}
        className={
          'bg-[#853D39] hover:scale-105'
        }
        title={'Download Resume'}
      />
    </div>
  )
}

export default HeroBtns
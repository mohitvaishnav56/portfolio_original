import Image from 'next/image'
import React from 'react'
const ProfilePicCard = () => {
  return (
    <div className="h-[98%] hidden w-3/10 bg-[#853D39]  rounded-b-full md:flex items-end overflow-hidden">
        <Image
          className="h-auto w-full"
          src="/ProfilePic.svg"
          alt="Hero Image"
          width={500}
          height={300}
        />
    </div>
  )
}

export default ProfilePicCard
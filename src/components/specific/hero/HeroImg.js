import React from 'react';
import Image from 'next/image';
const HeroImg = () => {
    return (<Image
      className="h-auto md:w-1/2 w-full"
      src="/heroImg.svg"
      alt="Hero Image"
      width={500}
      height={300}
      priority
    />
    )
}

export default HeroImg
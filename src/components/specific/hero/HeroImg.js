import React from 'react';
import Image from 'next/image';
const HeroImg = () => {
    return (
        <Image width={500}   // base pixel width
      height={300}  // base pixel height
      style={{ width: '50%', height: "100%" }} src={"/heroImg.svg"} alt="Hero Image" />
    )
}

export default HeroImg
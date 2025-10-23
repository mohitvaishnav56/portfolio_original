import Link from 'next/link'
import React from 'react'
const CustomBtn = ({src, className, title}) => {
  return (
    <button className={'px-5 py-3 cursor-pointer  rounded-md text-white' + ' ' + className}>
      <Link href={src}>{title}</Link>
    </button>
  )
}

export default CustomBtn
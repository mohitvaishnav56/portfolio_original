import React from 'react'

const TextContent = () => {
    return (
        <div className='w-full md:w-1/2 flex flex-col justify-center gap-8 pr-0 md:pr-16'>
            <h1 className='text-white font-black text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9]'>
                Say <br /> <span className="text-transparent [-webkit-text-stroke:2px_white]">Hello.</span>
            </h1>
            <p className='text-xl text-gray-400 font-light leading-relaxed max-w-md'>
                I am currently seeking new opportunities and love collaborating on exciting projects. Have a role or idea in mind? I'd love to hear from you.
            </p>
        </div>
    )
}

export default TextContent
import React, { useState } from 'react'
const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    }

  return (
    <div className='md:w-[55%] w-full md:h-full px-2 py-5  md:px-14 md:border-none border-t-[0.2px] border-t-gray-300'>
        <form className='flex flex-col gap-2 md:gap-4 justify-center h-full '>
            <label htmlFor="name" className='text-gray-200 text-lg font-medium'>Name:</label>
            <input 
                value={formData.name}
                id="name"
                type="text" 
                placeholder='Your Name' 
                className='p-4 rounded-md border text-white placeholder:text-gray-200 border-gray-300 focus:border-none focus:outline-none focus:ring-2 focus:ring-[#CC8D59]'
                onChange={handleChange}
            />
            <label htmlFor="email" className='text-gray-200 text-lg font-medium'>Email:</label>
            <input 
                value={formData.email}
                id="email"
                type="email" 
                placeholder='Your Email' 
                className='p-4 rounded-md border text-white placeholder:text-gray-200 border-gray-300 focus:border-none focus:outline-none focus:ring-2 focus:ring-[#CC8D59]'
                onChange={handleChange}
            />
            <label htmlFor="mesage" className='text-gray-200 text-lg font-medium'>Message:</label>
            <textarea 
                value={formData.message}
                id="message"
                placeholder='Your Message' 
                className='p-4 h-2/10 rounded-md border text-white placeholder:text-gray-200 border-gray-300 focus:border-none focus:outline-none focus:ring-2 focus:ring-[#CC8D59]'
                onChange={handleChange}
            />

            <button 
                type="submit" 
                className='w-fit bg-[#CC8D59] hover:scale-105 transition-transform duration-200 ease-in-out text-white font-bold py-3 px-6 rounded-md mt-4'
            >
                Send Message
            </button>
        </form>
    </div>
  )
}

export default Form
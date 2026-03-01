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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct the mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.open(`mailto:mohitvaishnav5642@gmail.com?subject=${subject}&body=${body}`);

        // Optional: Reset form
        setFormData({ name: '', email: '', message: '' });
    }

    return (
        <div className='w-full md:w-1/2'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full'>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className='text-gray-400 text-sm tracking-widest uppercase'>What's your name?</label>
                    <input
                        value={formData.name}
                        id="name"
                        type="text"
                        placeholder='John Doe'
                        className='w-full bg-transparent border-b border-white/20 pb-2 text-white text-xl placeholder:text-gray-600 focus:border-white focus:outline-none transition-colors rounded-none'
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="email" className='text-gray-400 text-sm tracking-widest uppercase'>What's your email?</label>
                    <input
                        value={formData.email}
                        id="email"
                        type="email"
                        placeholder='john@example.com'
                        className='w-full bg-transparent border-b border-white/20 pb-2 text-white text-xl placeholder:text-gray-600 focus:border-white focus:outline-none transition-colors rounded-none'
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="message" className='text-gray-400 text-sm tracking-widest uppercase'>Your Message</label>
                    <textarea
                        value={formData.message}
                        id="message"
                        placeholder='Hello Mohit, I want to talk about...'
                        rows={4}
                        className='w-full bg-transparent border-b border-white/20 pb-2 text-white text-xl placeholder:text-gray-600 focus:border-white focus:outline-none transition-colors rounded-none resize-none'
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className='mt-8 w-fit px-8 py-4 bg-white text-black font-semibold uppercase tracking-widest text-sm rounded-full hover:bg-gray-200 transition-colors'
                >
                    Send Message
                </button>
            </form>
        </div>
    )
}

export default Form
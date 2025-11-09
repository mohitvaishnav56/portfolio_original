import React from 'react'
import TextContent from './TextContent'
import Form from './Form'

const ContactSection = () => {
  return (
    <div className="md:h-[80vh] w-full flex flex-col md:flex-row bg-[#853D39] px-2">
        <TextContent />
        <Form />
    </div>
  )
}

export default ContactSection
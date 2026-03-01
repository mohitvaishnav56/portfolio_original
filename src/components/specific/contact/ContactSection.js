import React from 'react'
import TextContent from './TextContent'
import Form from './Form'

const ContactSection = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col md:flex-row bg-[var(--bg-color)] px-6 md:px-12 py-24 gap-16 border-t border-white/10 relative z-10">
      <TextContent />
      <Form />
    </div>
  )
}

export default ContactSection
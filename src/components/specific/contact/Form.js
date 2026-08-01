"use client";
import React, { useState } from "react";
import { personalInfo } from "@/data/portfolioData";

/* ─────────────────────────────────────────────
   Form Component
   - Clean luxury minimalist styling
   - High-contrast, highly readable input fields
   - Rectangular, full-width actions with arrow indicators
   - Interactive focus states and click feedback
   ───────────────────────────────────────────── */
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="w-full lg:col-span-7 p-1 bg-white/5 border border-white/10 rounded-2xl shadow-sm">
      <div className="w-full h-full rounded-[calc(1rem-4px)] bg-[var(--bg-elevated)] p-6 sm:p-8 md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
            Send a message
          </h3>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Your name
            </label>
            <input
              required
              value={formData.name}
              id="name"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-white/20 transition-colors text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Email address
            </label>
            <input
              required
              value={formData.email}
              id="email"
              type="email"
              placeholder="john@example.com"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-white/20 transition-colors text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Your message
            </label>
            <textarea
              required
              value={formData.message}
              id="message"
              placeholder="Describe your project idea..."
              rows={5}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-white/20 transition-colors text-sm resize-none"
            />
          </div>

          {/* Action submit button - high contrast, cursor pointer */}
          <button
            type="submit"
            className="group mt-2 w-full pl-7 pr-3 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-dark)] font-semibold text-xs uppercase tracking-wider overflow-hidden active:scale-[0.98] transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer"
          >
            <span>{submitted ? "Message ready" : "Send message"}</span>
            <span className="w-8 h-8 rounded-full bg-[var(--bg-dark)]/10 dark:bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <svg
                className="w-3.5 h-3.5 text-[var(--bg-dark)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
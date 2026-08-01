"use client";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import HeroSection from "@/components/specific/hero/HeroSection";
import About from "@/components/specific/about/About";
import ResumeSection from "@/components/specific/about/ResumeSection";
import SkillsSection from "@/components/specific/skills/SkillsSection";
import ProjectsSection from "@/components/specific/projects/ProjectsSection";
import ContactSection from "@/components/specific/contact/ContactSection";
import Footer from "@/components/specific/footer/Footer";

/* ─────────────────────────────────────────────
   Home Page Component
   - Sets base dark canvas bg [#050508]
   - Integrates typographic preloader (loading state: true)
   - Layout sequence: Hero, About, Resume, Skills, Projects, Contact, Footer
   ───────────────────────────────────────────── */
export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#050508] flex items-center justify-center">
        <Loader setLoading={setLoading} />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#050508] text-slate-100 overflow-x-hidden selection:bg-white/10 selection:text-white">
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="education">
        <ResumeSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}

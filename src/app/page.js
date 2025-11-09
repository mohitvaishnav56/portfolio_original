"use client"
import Loader from "@/components/Loader";
import About from "@/components/specific/about/About";
import ContactSection from "@/components/specific/contact/ContactSection";
import Footer from "@/components/specific/footer/Footer";
import HeroSection from "@/components/specific/hero/HeroSection";
import ProjectsSection from "@/components/specific/projects/ProjectsSection";
import UnderDevelopmentPopup from "@/components/UnderDevelopmentPopup";
import { useState, useEffect } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000); // Simulate a 3-second loading time

  //   return () => clearTimeout(timer); // Cleanup the timer on unmount
  // }, []);

  if (loading) {
    return (<div className="min-h-full overflow-x-hidden bg-black">
      <Loader setLoading={setLoading} />
    </div>)
  }
  return (
    <div className="overflow-x-hidden bg-[#2B4854]">

      <UnderDevelopmentPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

      <HeroSection />
      <About />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

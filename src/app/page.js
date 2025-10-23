"use client"
import Loader from "@/components/Loader";
import HeroSection from "@/components/specific/hero/HeroSection";
import { useState, useEffect } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000); // Simulate a 3-second loading time
    
  //   return () => clearTimeout(timer); // Cleanup the timer on unmount
  // }, []);

  if (loading) {
    return (<div className="min-h-full overflow-x-hidden bg-black">
      <Loader setLoading = {setLoading} />
    </div>)
  }
  return (
    <div className="overflow-x-hidden bg-[#2B4854]">
      <HeroSection />
    </div>
  );
}

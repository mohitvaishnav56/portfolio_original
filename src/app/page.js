"use client"
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-full overflow-x-hidden bg-white">

    </div>
  );
}

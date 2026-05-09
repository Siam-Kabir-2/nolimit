"use client";

import { useEffect, useRef, useState } from "react";

export default function TracingBeam({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [beamHeight, setBeamHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / rect.height, 0), 1);
      setBeamHeight(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className="relative w-full">
      <div className="absolute left-4 md:left-10 lg:left-20 top-0 bottom-0 w-[1px] bg-white/5 hidden sm:block">
        <div 
          className="absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-brand to-transparent transition-all duration-150 ease-out"
          style={{ 
            height: "150px", 
            top: `${beamHeight}%`,
            boxShadow: "0 0 15px oklch(65% 0.22 55 / 0.5)"
          }}
        />
      </div>
      {children}
    </div>
  );
}

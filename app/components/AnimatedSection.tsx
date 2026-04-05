"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function AnimatedSection({
  children,
  className = "",
  style,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const x = direction === "left" ? -100 : direction === "right" ? 100 : 0;
    const y = direction === "up" ? 100 : 0;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x,
        y,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          // Adding a bit of "heavy" scrub if desired, but 1.5s duration is already quite heavy.
        },
      }
    );
  }, [delay, direction]);

  return (
    <div ref={ref} className={`opacity-0 will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
}

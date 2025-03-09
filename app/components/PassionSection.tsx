"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Define panel data outside component to avoid re-creation
const PANEL_DATA = [
  {
    title: "Building Digital Experiences",
    gradient: "from-blue-600 to-indigo-600",
    content:
      "My passion for web development began with curiosity about how websites work. Today, I'm dedicated to creating intuitive and engaging digital experiences that solve real problems and delight users.",
  },
  {
    title: "Continuous Learning",
    gradient: "from-indigo-600 to-purple-600",
    content:
      "Technology evolves rapidly, and I embrace this challenge. I devote time each day to learn new tools and techniques, experiment with emerging frameworks, and refine my skills to stay at the cutting edge.",
  },
  {
    title: "Problem Solving",
    gradient: "from-purple-600 to-pink-600",
    content:
      "I thrive on solving complex challenges. Whether it's optimizing performance, improving accessibility, or creating elegant solutions to technical problems, I approach each obstacle as an opportunity to grow and innovate.",
  },
];

export default function PassionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelContainerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Clean up existing ScrollTriggers to avoid conflicts
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initialize panels - hide all except first
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;

      if (i === 0) {
        gsap.set(panel, { opacity: 1, y: 0 });
      } else {
        gsap.set(panel, { opacity: 0, y: 30 });
      }
    });

    // Create animation timeline
    const tl = gsap.timeline();

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "+=300%",
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      animation: tl,
      onUpdate: (self) => {
        // Calculate current panel index based on progress
        // First panel stays visible until we're 20% through the scroll
        if (self.progress < 0.2) {
          if (activeIndex !== 0) setActiveIndex(0);
          return;
        }

        // Divide remaining progress among remaining panels
        const adjustedProgress = (self.progress - 0.2) / 0.8;
        const panelCount = PANEL_DATA.length;
        const segment = 1 / (panelCount - 1);

        // Determine active index
        for (let i = 1; i < panelCount; i++) {
          const threshold = segment * (i - 0.5);
          if (
            adjustedProgress >= threshold &&
            adjustedProgress < threshold + segment
          ) {
            if (activeIndex !== i) setActiveIndex(i);
            break;
          }
        }
      },
    });

    // Add animations for panel transitions
    for (let i = 1; i < PANEL_DATA.length; i++) {
      // Fade out previous panel
      tl.to(
        panelRefs.current[i - 1],
        {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power1.out",
        },
        (i - 1) * 0.5
      );

      // Fade in current panel
      tl.to(
        panelRefs.current[i],
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.in",
        },
        (i - 1) * 0.5
      );
    }

    // Update on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activeIndex]);

  // Navigate to a specific panel
  const navigateToPanel = (index: number) => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + sectionRect.top;

    let progress = 0;
    if (index === 0) {
      progress = 0.1; // First panel (10% through scroll)
    } else {
      // For other panels, map to the remaining 80% of the scroll
      progress = 0.2 + ((index - 0.5) / (PANEL_DATA.length - 1)) * 0.8;
    }

    // Calculate how much we need to scroll
    const totalScrollDistance = sectionRect.height * 3; // 300% of section height
    const targetScrollY = sectionTop + totalScrollDistance * progress;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-hidden bg-[#0A0A0A]"
      id="passion-section"
    >
      {/* Center container */}
      <div className="flex h-full w-full items-center justify-center">
        {/* Panel container - fixed size container to prevent layout shifts */}
        <div
          ref={panelContainerRef}
          className="relative w-full max-w-3xl px-6 mx-auto h-96 flex items-center justify-center"
        >
          {/* Text panels */}
          {PANEL_DATA.map((panel, index) => (
            <div
              key={index}
              ref={(el) => (panelRefs.current[index] = el)}
              className={`
                absolute inset-0
                flex flex-col items-center justify-center
                transition-opacity duration-300
                ${activeIndex === index ? "z-10" : "z-0"}
              `}
            >
              <h3
                className={`text-3xl font-bold mb-6 bg-gradient-to-r ${panel.gradient} bg-clip-text text-transparent text-center`}
              >
                {panel.title}
              </h3>
              <p className="text-center text-lg max-w-xl text-gray-300">
                {panel.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots - keep outside the center container to avoid affecting layout */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {PANEL_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToPanel(index)}
            className={`
              w-3 h-3 rounded-full border border-gray-400 
              transition-all duration-300 
              ${
                activeIndex === index
                  ? "bg-indigo-600 w-4 h-4 border-indigo-400"
                  : "bg-transparent hover:bg-gray-300"
              }
            `}
            aria-label={`Navigate to panel ${index + 1}`}
          />
        ))}
      </div>

      {/* Connecting line between dots */}
      <div className="fixed right-[21px] top-1/2 -translate-y-1/2 h-32 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent z-40"></div>
    </section>
  );
}

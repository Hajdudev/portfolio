// "use client";

// // Simple data for the passion sections
// const PASSION_SECTIONS = [
//   {
//     id: "experience",
//     title: "Building Digital Experiences",
//     gradient: "from-blue-600 to-indigo-600",
//     content:
//       "My passion for web development began with curiosity about how websites work. Today, I'm dedicated to creating intuitive digital experiences that solve real problems.",
//   },
//   {
//     id: "learning",
//     title: "Continuous Learning",
//     gradient: "from-indigo-600 to-purple-600",
//     content:
//       "Technology evolves rapidly. I devote time each day to learn new tools and techniques, experimenting with emerging frameworks to stay at the cutting edge.",
//   },
//   {
//     id: "problem-solving",
//     title: "Problem Solving",
//     gradient: "from-purple-600 to-pink-600",
//     content:
//       "I thrive on solving complex challenges. Whether optimizing performance or improving accessibility, I turn obstacles into opportunities to grow.",
//   },
// ];

// function SimplePassionSection() {
//   return (
//     <div className="py-12 bg-[#0A0A0A]">
//       {PASSION_SECTIONS.map((section) => (
//         <section
//           key={section.id}
//           className="flex flex-col  items-center justify-center py-16 px-4 "
//         >
//           <h2
//             className={`text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
//           >
//             {section.title}
//           </h2>
//           <p className="max-w-lg mt-4 lg:text-2xl text-lg text-gray-200 text-center">
//             {section.content}
//           </p>
//         </section>
//       ))}

//       {/* Optional indicator showing where to add more content */}
//       <div className="w-full flex justify-center py-8">
//         <span className="w-2 h-2 rounded-full bg-gray-700"></span>
//       </div>
//     </div>
//   );
// }

// export default SimplePassionSection;
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Simple data for the passion sections
const PASSION_SECTIONS = [
  {
    id: "experience",
    title: "Building Digital Experiences",
    gradient: "from-blue-600 to-indigo-600",
    content:
      "My passion for web development began with curiosity about how websites work. Today, I'm dedicated to creating intuitive digital experiences that solve real problems.",
  },
  {
    id: "learning",
    title: "Continuous Learning",
    gradient: "from-indigo-600 to-purple-600",
    content:
      "Technology evolves rapidly. I devote time each day to learn new tools and techniques, experimenting with emerging frameworks to stay at the cutting edge.",
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    gradient: "from-purple-600 to-pink-600",
    content:
      "I thrive on solving complex challenges. Whether optimizing performance or improving accessibility, I turn obstacles into opportunities to grow.",
  },
];

function SimplePassionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionContentsRef = useRef<(HTMLElement | null)[]>([]);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial state
    sectionContentsRef.current.forEach((section) => {
      if (section) {
        gsap.set(section, {
          opacity: 0,
          y: 20,
          pointerEvents: "none",
        });
      }
    });

    // Make first section visible initially
    if (sectionContentsRef.current[0]) {
      gsap.set(sectionContentsRef.current[0], {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
      });
    }

    // Create scroll trigger for the pinned section
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${PASSION_SECTIONS.length * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        // Calculate which section should be active based on scroll position
        const newIndex = Math.floor(self.progress * PASSION_SECTIONS.length);
        if (
          newIndex !== activeIndex &&
          newIndex >= 0 &&
          newIndex < PASSION_SECTIONS.length
        ) {
          // Hide all sections
          sectionContentsRef.current.forEach((section, idx) => {
            if (section) {
              gsap.to(section, {
                opacity: 0,
                y: idx < newIndex ? -20 : 20,
                duration: 0.3,
                pointerEvents: "none",
              });
            }
          });

          // Show active section
          const activeSection = sectionContentsRef.current[newIndex];
          if (activeSection) {
            gsap.to(activeSection, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              pointerEvents: "auto",
            });
          }

          setActiveIndex(newIndex);
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [activeIndex]);

  // Navigate to a specific section when dot is clicked
  const navigateToSection = (index: number) => {
    if (sectionRef.current) {
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offset =
        (index / PASSION_SECTIONS.length) *
        window.innerHeight *
        PASSION_SECTIONS.length;

      window.scrollTo({
        top: sectionTop + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="h-screen bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Side Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
        {PASSION_SECTIONS.map((section, index) => (
          <button
            key={section.id}
            ref={(el) => {
              dotsRef.current[index] = el;
            }}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full hidden border md:block border-gray-400 transition-all duration-300 ${
              activeIndex === index
                ? "bg-indigo-600 w-4 h-4 border-indigo-400"
                : "bg-transparent hover:bg-gray-300"
            }`}
            aria-label={`Navigate to ${section.title}`}
          />
        ))}
      </div>

      {/* Stacked sections */}
      <div className="h-full relative text-center">
        {PASSION_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => {
              sectionContentsRef.current[index] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 opacity-0 transition-opacity"
          >
            <h2
              className={`text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
            >
              {section.title}
            </h2>
            <p className="max-w-lg mt-4 lg:text-2xl text-lg text-gray-200 text-center">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SimplePassionSection;

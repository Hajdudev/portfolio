"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect } from "react";

function TechStack() {
  const techStackItems = [
    {
      Name: "HTML",
      Icon: "/images/stack/html.svg",
    },
    {
      Name: "CSS",
      Icon: "/images/stack/css.svg",
    },
    {
      Name: "JavaScript",
      Icon: "/images/stack/javascript.svg",
    },
    {
      Name: "TypeScript",
      Icon: "/images/stack/typescript.svg",
    },
    {
      Name: "React",
      Icon: "/images/stack/react.svg",
    },
    {
      Name: "Next.js",
      Icon: "/images/stack/nextjs.svg",
    },
    {
      Name: "Tailwind CSS",
      Icon: "/images/stack/tailwindcss.svg",
    },
    {
      Name: "Node.js",
      Icon: "/images/stack/nodejs.svg",
    },
    {
      Name: "PostgreSQL",
      Icon: "/images/stack/postgresql.svg",
    },
    {
      Name: "Supabase",
      Icon: "/images/stack/supabase.svg",
    },
    {
      Name: "GSAP",
      Icon: "/images/stack/gsap.svg",
    },
    {
      Name: "Redux",
      Icon: "/images/stack/redux.svg",
    },
    {
      Name: "Git",
      Icon: "/images/stack/git.svg",
    },
    {
      Name: "Figma",
      Icon: "/images/stack/figma.svg",
    },
    {
      Name: "Vercel",
      Icon: "/images/stack/vercel.svg",
    },
    {
      Name: "Postman",
      Icon: "/images/stack/postman.svg",
    },
    {
      Name: "Java",
      Icon: "/images/stack/java.svg",
    },
    {
      Name: "SASS",
      Icon: "/images/stack/sass.svg",
    },
    {
      Name: "Auth.js",
      Icon: "/images/stack/authjs.svg",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Only rotate the image, not the container with text
      gsap.to("#rotatingImage", {
        scrollTrigger: {
          trigger: "#rotatingImage",
          scrub: true,
        },
        rotation: 360,
        duration: 6,
        ease: "none",
        delay: 1,
      });
    }
  }, []);

  return (
    <section
      className="flex relative h-screen items-center justify-center flex-col"
      id="tech-stack"
    >
      {/* Container with relative positioning */}
      <div className="relative flex items-center justify-center w-full mb-16">
        {/* Image container - this rotates but doesn't affect text */}
        <div className="absolute " id="imageRotate">
          <Image
            src="/images/gpt.png"
            width={400}
            height={400}
            alt="GPT"
            id="rotatingImage"
            className="opacity-30" // Lower opacity so text is more readable
          />
        </div>

        {/* Text container - this stays fixed in place */}
        <div className="relative z-10 text-center pointer-events-none">
          <p className="text-lg text-amber-50/60 font-medium mb-4 px-4 py-1 rounded-full">
            Constantly trying to improve
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center text-white drop-shadow-lg p-4">
            My Tech Stack
          </h1>
        </div>
      </div>

      {/* Tech stack container */}
      <div className="xl:max-w-3xl lg:max-w-[80%] mx-auto z-60 px-4 ">
        <div className="flex flex-wrap justify-center z-20 gap-3">
          {techStackItems.map((tech, index) => (
            <div
              key={index}
              className="flex items-center group bg-gray-800/50  px-3 py-1 hover:rotate-4 transition-all rounded-full text-md hover:bg-gray-700/50 duration-300 "
              title={tech.Name}
            >
              {tech.Icon && (
                <div className="relative w-4 h-4 mr-2">
                  <Image
                    src={tech.Icon}
                    alt={tech.Name}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-pink-400">
                {tech.Name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;

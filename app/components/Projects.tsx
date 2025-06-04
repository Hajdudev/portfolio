"use client";

import { useState } from "react";
import Image from "next/image";

type TechStackItem = {
  name: string;
  icon: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  url: string;
  github?: string;
  stack: TechStackItem[];
};

export default function Projects() {
  const projects: Project[] = [
    {
      title: "GoEco",
      description:
        "A website for public transport in Bratislava. Helps users find eco-friendly routes and reduce carbon footprint.",
      image: "/images/go-eco.png", // Project screenshot
      url: "https://hajdu.live",
      github: "https://github.com/Hajdudev/goeco",
      stack: [
        { name: "React", icon: "/images/stack/react.svg" },
        { name: "Next.js", icon: "/images/stack/nextjs.svg" },
        { name: "Tailwind CSS", icon: "/images/stack/tailwindcss.svg" },
        { name: "TypeScript", icon: "/images/stack/typescript.svg" },
        { name: "Tanstack Query", icon: "/images/stack/tanstack.svg" },
        { name: "Go", icon: "/images/stack/golang.svg" },
      ],
    },

    {
      title: "hajdu.dev",
      description: "A web agency website with really cool animations",
      image: "/images/agency.png",
      github: "https://github.com/Hajdudev/hajdu",
      url: "https://hajdu.dev/",
      stack: [
        { name: "React", icon: "/images/stack/react.svg" },
        { name: "Next.js", icon: "/images/stack/nextjs.svg" },
        { name: "TypeScript", icon: "/images/stack/typescript.svg" },
        { name: "GSAP", icon: "/images/stack/gsap.svg" },
        { name: "Tailwind CSS", icon: "/images/stack/tailwindcss.svg" },
      ],
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio showcasing projects and skills with interactive elements and animations.",
      image: "/images/portfolio.png",
      url: "https://hajdupeter.com",
      github: "https://github.com/Hajdudev/portfolio",
      stack: [
        { name: "React", icon: "/images/stack/react.svg" },
        { name: "Next.js", icon: "/images/stack/nextjs.svg" },
        { name: "TypeScript", icon: "/images/stack/typescript.svg" },
        { name: "GSAP", icon: "/images/stack/gsap.svg" },
        { name: "Tailwind CSS", icon: "/images/stack/tailwindcss.svg" },
      ],
    },

    {
      title: "NextChat",
      description: "A messaging app to learn authorisation and websocket ",
      image: "/images/next-chat.png", // Project screenshot
      url: "https://next-chat-psi-nine.vercel.app",
      github: "https://github.com/Hajdudev/NextChat",
      stack: [
        { name: "React", icon: "/images/stack/react.svg" },
        { name: "Appwrite", icon: "/images/stack/appwrite.svg" },
        { name: "Node.js", icon: "/images/stack/nodejs.svg" },
        { name: "Nextjs", icon: "/images/stack/nextjs.svg" },
        { name: "TypeScript", icon: "/images/stack/typescript.svg" },
        { name: "Tailwind CSS", icon: "/images/stack/tailwindcss.svg" },
      ],
    },
    {
      title: "ReactChess",
      description: "Chess website made using react completetly from scratch",
      image: "/images/reactChess.png", // Project screenshot
      url: "https://react-chess-three.vercel.app/",
      github: "https://github.com/Hajdudev/ReactChess",
      stack: [
        { name: "React", icon: "/images/stack/react.svg" },
        { name: "Node.js", icon: "/images/stack/nodejs.svg" },
        { name: "ContextApi", icon: "/images/stack/react.svg" },
        { name: "useReducer", icon: "/images/stack/react.svg" },
      ],
    },
    {
      title: "Brainwawe",
      description:
        "Website for AI chat bot that can help you with your productivy",
      image: "/images/brainwawe.png", // Project screenshot
      url: "https://brainwawe-one.vercel.app/",

      stack: [
        { name: "React", icon: "/images/stack/react.svg" },
        { name: "Next.js", icon: "/images/stack/nextjs.svg" },
        { name: "Tailwind CSS", icon: "/images/stack/tailwindcss.svg" },
        { name: "react-just-parallax", icon: "/images/stack/react.svg" },
        { name: "react-router-dom", icon: "/images/stack/reactrouter.svg" },
        { name: "scroll-lock", icon: "/images/stack/react.svg" },
      ],
    },
  ];

  // State for active project (can be used for animations or focus)
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-[#0A0A0A]" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent text-center">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-gray-900/40  rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 ${
                activeProject === index
                  ? "scale-[1.02] shadow-xl shadow-indigo-500/10"
                  : "hover:scale-[1.01]"
              }`}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center">
                    <span className="text-xl font-semibold">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="mb-5">
                  <h4 className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center bg-gray-800/50 px-3 py-1 rounded-full text-xs"
                        title={tech.name}
                      >
                        {/* Tech Icon */}
                        <div className="relative w-4 h-4 mr-2">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 rounded-md text-sm font-medium transition-colors"
                  >
                    View Project
                  </a>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                        />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

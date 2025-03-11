"use client";

import { useState, useEffect, useMemo } from "react";
import { UserCircleIcon, LinkIcon } from "@heroicons/react/24/outline";

function Header() {
  const [active, setActive] = useState(0);

  // Define your navigation sections with ids that match your page sections
  const navItems = useMemo(
    () => [
      { name: "Home", id: "hero" },
      { name: "Projects", id: "projects" },
      { name: "Tech Stack", id: "tech-stack" },
      { name: "Contact", id: "contact" },
    ],
    []
  );

  // Function to scroll to a section when nav item is clicked
  const scrollToSection = (id: string, index: number) => {
    setActive(index);
    const element = document.getElementById(id);
    if (element) {
      // If using locomotive scroll
      const smoothScroller = document.querySelector("[data-scroll-container]");
      // Type-safe access to window.locomotiveScroll
      if (
        smoothScroller &&
        typeof window !== "undefined" &&
        window.locomotiveScroll
      ) {
        window.locomotiveScroll.scrollTo(`#${id}`);
      } else {
        // Fallback to native scroll
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Track scroll position to update active nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset to trigger slightly before section top

      // Find the section that's currently in view
      const sections = navItems.map((item) => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActive(i);
          break;
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check on page load
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <header className="fixed top-5 left-0 right-0 w-full z-50 flex justify-center items-center">
      <div className="flex items-center justify-between w-full max-w-5xl px-4 sm:px-6">
        {/* Left icon - hidden on mobile */}
        <div className="hidden md:block">
          <UserCircleIcon className="w-8 h-8 text-gray-300 hover:text-white transition-colors" />
        </div>

        {/* Center navigation - visible on all screens */}
        <div className="bg-[#0a0a0a]/60 backdrop-blur-md rounded-full py-2 px-3 sm:px-4 border border-gray-800 shadow-lg mx-auto md:mx-0">
          <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id, index)}
                className={`px-1.5 sm:px-2 py-1 rounded-full transition-all ease-in-out duration-300 text-xs sm:text-sm md:text-base ${
                  active === index
                    ? "bg-amber-50/50 text-black"
                    : "text-gray-300 hover:bg-amber-50/30 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right icon - hidden on mobile */}
        <div className="hidden md:block">
          <LinkIcon className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
}

export default Header;

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
      { name: "About", id: "about" },
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
      // Get viewport height and scroll position
      const viewportHeight = window.innerHeight;

      // Calculate which section is most visible in the viewport
      let maxVisibleSection = 0;
      let maxVisibleArea = 0;

      const sections = navItems.map((item) => document.getElementById(item.id));

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);

        // Add a bias for sections at the top of the page
        if (rect.top < 100 && index === 0) {
          // Boost the home section when near the top
          const topBoost = 200;
          if (visibleArea + topBoost > maxVisibleArea) {
            maxVisibleArea = visibleArea + topBoost;
            maxVisibleSection = index;
          }
        } else if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          maxVisibleSection = index;
        }
      });

      setActive(maxVisibleSection);
    };

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial check on page load
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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

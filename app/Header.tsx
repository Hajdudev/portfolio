"use client";

import { useState } from "react";
import { UserCircleIcon, LinkIcon } from "@heroicons/react/24/outline";

function Header() {
  const [active, setActive] = useState(3);

  const navItems = ["Home", "Project", "Content", "Blog"];

  return (
    <div className="fixed z-60 left-1/2 transform -translate-x-1/2 top-5 w-[90%] max-w-5xl">
      <div className="flex items-center justify-between w-full">
        <UserCircleIcon className="w-8 hidden md:block h-8" />
        <div className="rounded-full p-3 gap-6 border-gray-300 border border-solid flex">
          {navItems.map((item, index) => (
            <span
              key={index}
              onClick={() => setActive(index)}
              className={`rounded-full transition-all ease-in-out p-1 duration-300 cursor-pointer ${
                active === index
                  ? "bg-amber-50/50 text-black"
                  : "hover:bg-amber-50/50 hover:text-black"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <LinkIcon className="w-6 h-6 hidden md:block " />
      </div>
    </div>
  );
}

export default Header;

"use client";
import { useState } from "react";
import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactButtons() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hajdu2024@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
      {/* Let's connect button */}
      <a
        href="#contact"
        className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <span className="relative z-10 font-medium">Let&rsquo;s connect</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        <ArrowRightIcon className="ml-2 -mr-1 inline-block h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      {/* Email copy button */}
      <button
        onClick={copyEmail}
        className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        <EnvelopeIcon className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-blue-500" />
        <span className="font-medium">
          {copied ? "Copied!" : "hajdu2024@gmail.com"}
        </span>
        <span
          className={`ml-2 text-xs text-green-500 transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          ✓
        </span>
      </button>
    </div>
  );
}

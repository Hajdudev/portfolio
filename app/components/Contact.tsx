"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import Image from "next/image";

interface FormState {
  name: string;
  email: string;
  message: string;
}

enum SubmissionStatus {
  IDLE,
  SUBMITTING,
  SUCCESS,
  ERROR,
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmissionStatus>(SubmissionStatus.IDLE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [charCount, setCharCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const MAX_MESSAGE_LENGTH = 500;

  // Update character count when message changes
  useEffect(() => {
    setCharCount(formState.message.length);
  }, [formState.message]);

  // Intersection Observer to handle scroll animations instead of Framer Motion
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // If it's the message field, enforce character limit
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus(SubmissionStatus.SUBMITTING);

    try {
      console.log("Submitting form data:", {
        ...formState,
        message: formState.message.substring(0, 20) + "...",
      });

      // Simple fetch to our API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        throw new Error(data.error || "Network response was not ok");
      }

      console.log("Success response:", data);
      setStatus(SubmissionStatus.SUCCESS);

      // Reset form
      setFormState({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus(SubmissionStatus.IDLE);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus(SubmissionStatus.ERROR);

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus(SubmissionStatus.IDLE);
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 bg-[#0A0A0A] relative overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
            Let s Connect
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have a question or want to work together? Drop me a message and I ll
            get back to you soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-gray-800 shadow-lg"
            >
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full bg-gray-800/50 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full bg-gray-800/50 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-2 text-sm font-medium"
                >
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-gray-800/50 border ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    } rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="Your message..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    ) : (
                      <div></div> // Empty div for spacing
                    )}
                    <span
                      className={`text-sm ${
                        charCount > MAX_MESSAGE_LENGTH * 0.9
                          ? "text-amber-500"
                          : "text-gray-400"
                      }`}
                    >
                      {charCount}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === SubmissionStatus.SUBMITTING}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                  status === SubmissionStatus.SUBMITTING
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {status === SubmissionStatus.SUBMITTING ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              {status === SubmissionStatus.SUCCESS && (
                <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-400 text-center animate-fadeIn">
                  <p>Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {status === SubmissionStatus.ERROR && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-400 text-center animate-fadeIn">
                  Sorry, there was an error sending your message. Please try
                  again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div
            className={`space-y-8 transition-all duration-700 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-900/50 p-3 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:peter@example.com"
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      peter@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-900/50 p-3 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">
                      Location
                    </h4>
                    <p className="text-white">Bratislava, Slovakia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Latest Projects</h3>
              <ul className="space-y-3">
                <li className="border-b border-gray-800 pb-3">
                  <a href="#projects" className="flex items-center group">
                    <div className="mr-3 relative w-12 h-12 rounded-md overflow-hidden bg-gray-800">
                      <Image
                        src="/images/go-eco.png"
                        alt="GoEco"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold group-hover:text-blue-400 transition-colors">
                        GoEco
                      </h4>
                      <p className="text-sm text-gray-400">
                        Public Transport App
                      </p>
                    </div>
                  </a>
                </li>
                <li className="border-b border-gray-800 pb-3">
                  <a href="#projects" className="flex items-center group">
                    <div className="mr-3 relative w-12 h-12 rounded-md overflow-hidden bg-gray-800">
                      <Image
                        src="/images/portfolio.png"
                        alt="Portfolio"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold group-hover:text-blue-400 transition-colors">
                        Portfolio
                      </h4>
                      <p className="text-sm text-gray-400">
                        Next.js & Three.js
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

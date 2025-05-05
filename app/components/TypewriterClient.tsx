"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypewriterClient() {
  return (
    <div className="max-w-md lg:max-w-lg mx-auto">
      <TypeAnimation
        sequence={[
          "I build responsive front-end with React and Next.js.",
          1000,
          "I build responsive front-end with React and Next.js. Backend expert with Node.js and Express and GoLang.",
          1000,
          "I build responsive front-end with React and Next.js. Backend expert with Node.js and Express and GoLang. Database management with PostgreSQL.",
          1000,
          "I build responsive front-end with React and Next.js. Backend expert with Node.js and Express and GoLang. Database management with PostgreSQL. Clean code enthusiast, always learning.",
          1000,
        ]}
        speed={50}
        className="break-normal text-gray-500 lg:text-xl text-lg"
      />
    </div>
  );
}

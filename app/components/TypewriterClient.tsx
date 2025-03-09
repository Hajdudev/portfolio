"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypewriterClient() {
  return (
    <div className="max-w-md mx-auto">
      <TypeAnimation
        sequence={[
          "I build responsive front-end with React and Next.js.",
          1000,
          "Backend expert with Node.js and Express.",
          1000,
          "Database management with PostgreSQL.",
          1000,
          "Clean code enthusiast, always learning.",
          1000,
        ]}
        speed={50}
        repeat={Infinity}
        className="break-normal text-gray-500 lg:text-xl text-lg"
      />
    </div>
  );
}

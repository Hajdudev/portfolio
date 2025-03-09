"use client";
import dynamic from "next/dynamic";

// Dynamically import the passion section with no SSR
const DynamicPassionSection = dynamic(() => import("./PassionSection"), {
  ssr: false,
});

export default function PassionSectionWrapper() {
  return <DynamicPassionSection />;
}

import ContactButtons from "./components/ContactButtons";
import TypewriterClient from "./components/TypewriterClient";
import PassionSectionWrapper from "./components/PassionSectionWrapper";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <section className="flex p-4 text-center flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Transforming Ideas into Interactive Web Solutions
        </h1>

        <h2 className="pt-1 text-gray-400 lg:text-xl text-lg">
          I am Peter Hajdu a 17year old FullStack Developer based in
          <span className="text-blue-600"> Slo</span>
          <span className="text-white text-shadow">va</span>
          <span className="text-red-600">kia</span>
        </h2>

        <TypewriterClient />
        <ContactButtons />
      </section>

      {/* Passion Section */}
      <PassionSectionWrapper />
    </main>
  );
}

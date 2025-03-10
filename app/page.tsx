import ContactButtons from "./components/ContactButtons";
import SimplePassionSection from "./components/SimplePassionSection";
import TypewriterClient from "./components/TypewriterClient";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <section className="flex p-4 text-center flex-col items-center justify-center min-h-[80vh]">
        {/* Reduced min-height from min-h-screen to min-h-[80vh] */}
        <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Transforming Ideas into Interactive Web Solutions
        </h1>

        <h2 className="pt-4 text-gray-400 lg:text-xl text-lg">
          I am Peter Hajdu a 17year old FullStack Developer based in
          <span className="text-blue-600"> Slo</span>
          <span className="text-white text-shadow">va</span>
          <span className="text-red-600">kia</span>
        </h2>

        <TypewriterClient />
        <ContactButtons />
      </section>
      <SimplePassionSection />
    </main>
  );
}

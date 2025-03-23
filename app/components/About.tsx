import Image from "next/image";

function About() {
  return (
    <section className="py-10 px-4 bg-[#0A0A0A]" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-12 items-stretch">
          <div className="w-full md:w-2/5 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px]  md:w-[400px] md:h-[400px] overflow-hidden rounded-full border-2 border-blue-400">
              <Image
                src="/images/me.png"
                alt="myself"
                fill
                className="rotate-[-90deg] object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 text-white flex flex-col">
            <div className="relative mb-8">
              <h2 className="text-4xl font-bold inline-block pb-2 text-white">
                About <span className="text-blue-400">Me</span>
              </h2>
              <div className="h-[2px] w-full max-w-[120px] bg-gradient-to-r from-blue-400 to-purple-500 mt-1"></div>
            </div>

            <div className="space-y-6 bg-transparent flex-grow flex flex-col justify-center">
              <div className="p-5 rounded-lg bg-gray-900/30 border-l-2 border-blue-400 hover:bg-gray-900/40 transition-all duration-300">
                <p className="text-lg text-gray-100 font-light leading-relaxed">
                  I&apos;m <span className="text-blue-300">Peter Hajdu</span>, a
                  full-stack web developer. I enjoy learning new technologies
                  and bringing ideas to life through clean, efficient code.
                  Whether it&apos;s building interactive websites, solving
                  technical challenges, or optimizing performance, I always
                  strive for high-quality results.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-gray-900/30 border-l-2 border-purple-400 hover:bg-gray-900/40 transition-all duration-300">
                <p className="text-lg text-gray-100 font-light leading-relaxed">
                  Lately, I&apos;ve been especially passionate about creating
                  exceptional{" "}
                  <span className="text-purple-300">animations</span> and
                  developing complex, functional web applications. I pay close
                  attention to details, ensuring that every project is not only
                  visually appealing but also fast and seamless for users.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-gray-900/30 border-l-2 border-green-400 hover:bg-gray-900/40 transition-all duration-300">
                <p className="text-lg text-gray-100 font-light leading-relaxed">
                  I&apos;m a{" "}
                  <span className="text-green-300">self-taught developer</span>{" "}
                  who believes in learning by building real projects. For me,
                  hands-on experience is the best way to grow and improve. While
                  I know how to use AI tools, I prefer to rely on my own skills
                  and problem-solving abilities as much as possible. I enjoy
                  tackling challenges, refining details, and pushing myself to
                  create high-quality, well-optimized websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

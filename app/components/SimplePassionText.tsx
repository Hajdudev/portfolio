import Card from "../ui/Card";

function SimplePassionText() {
  const data = [
    {
      id: "experience",
      title: "Building Digital Experiences",
      gradient: "from-blue-600 to-indigo-600",
      content:
        "My passion for web development began with curiosity about how websites work. Today, I'm dedicated to creating intuitive digital experiences that solve real problems.",
      top: "25%", // Using percentage values for exact positioning
    },
    {
      id: "learning",
      title: "Continuous Learning",
      gradient: "from-indigo-600 to-purple-600",
      content:
        "Technology evolves rapidly. I devote time each day to learn new tools and techniques, experimenting with emerging frameworks to stay at the cutting edge.",
      top: "50%",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      gradient: "from-purple-600 to-pink-600",
      content:
        "I thrive on solving complex challenges. Whether optimizing performance or improving accessibility, I turn obstacles into opportunities to grow.",
      top: "75%",
    },
  ];

  return (
    <div className="flex flex-col w-1/2 relative min-h-[200vh]">
      {data.map((section) => (
        <div key={section.id} className="mb-96">
          <Card
            title={section.title}
            gradient={section.gradient}
            content={section.content}
            top={section.top}
          />
        </div>
      ))}
    </div>
  );
}

export default SimplePassionText;

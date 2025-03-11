import Card from "../ui/Card";

function SimplePassionText() {
  const data = [
    {
      id: "experience",
      title: "Building Digital Experiences",
      gradient: "from-blue-600 to-indigo-600",
      content:
        "My passion for web development began with curiosity about how websites work. Today, I'm dedicated to creating intuitive digital experiences that solve real problems.",
    },
    {
      id: "learning",
      title: "Continuous Learning",
      gradient: "from-indigo-600 to-purple-600",
      content:
        "Technology evolves rapidly. I devote time each day to learn new tools and techniques, experimenting with emerging frameworks to stay at the cutting edge.",
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      gradient: "from-purple-600 to-pink-600",
      content:
        "I thrive on solving complex challenges. Whether optimizing performance or improving accessibility, I turn obstacles into opportunities to grow.",
    },
  ];

  return (
    <div className="flex  flex-col gap-96  max-w-[50%]">
      {data.map((section) => {
        return (
          <Card
            key={section.id}
            title={section.title}
            gradient={section.gradient}
            content={section.content}
          />
        );
      })}
    </div>
  );
}

export default SimplePassionText;

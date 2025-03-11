type CardProps = {
  title: string;
  gradient: string;
  content: string;
  top: string;
};

function Card({ title, gradient, content, top }: CardProps) {
  return (
    <div
      className={`flex sticky top-${top} bg-gray-900/40 border-1 border-gray-300/20  rounded-2xl m-3 text-center flex-col items-center justify-center `}
    >
      <h1
        className={` text-transparent text-3xl m-3 bg-gradient-to-r bg-clip-text ${gradient}`}
      >
        {title}
      </h1>
      <p className="max-w-96 m-5 font-bold text-lg">{content}</p>
    </div>
  );
}

export default Card;

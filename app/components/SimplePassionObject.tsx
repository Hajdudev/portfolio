import Image from "next/image";

function SimplePassionObject() {
  return (
    <div className="min-w-[50%]">
      <div className="w-full flex align-center justify-center">
        <Image
          src="/images/stack/tailwindcss.svg"
          className="opacity-40 "
          width={190}
          alt="gpt"
          height={10}
        />
      </div>
    </div>
  );
}

export default SimplePassionObject;

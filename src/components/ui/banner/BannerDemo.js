import Image from "next/image";

const BannerDemo = ({ title, text, img, background }) => {
  return (
    <div
      className="flex justify-center items-center gap-20 py-10"
      style={{ background: background }}
    >
      <div className="w-1/2 flex flex-col justify-center items-center text-center px-16 py-10 md:mb-0">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{text}</p>
        <button className="buttons">Shop Now</button>
      </div>
      <div className="flex-1 flex justify-center pr-20">
        <Image
          src={img}
          alt="banner"
          width={500}
          height={400}
          className="rounded-lg w-full h-[400px]"
        />
      </div>
    </div>
  );
};

export default BannerDemo;

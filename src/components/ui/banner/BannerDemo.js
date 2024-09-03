import Image from "next/image";
import Link from "next/link";

const BannerDemo = ({ title, text, img, background }) => {
  return (
    <div
      className="flex justify-center max-md:flex-col-reverse items-center gap-20 py-10"
      style={{ background: background }}
    >
      <div className="md:w-1/2 flex flex-col justify-center items-center text-center px-16 py-10 md:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 dark:text-white">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-6 dark:text-white">
          {text}
        </p>
        <Link href={"/allProducts"}>
          <button className="buttons">Shop Now</button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center md:pr-20">
        <Image
          src={img}
          alt="banner"
          width={"auto"}
          height={"auto"}
          className="rounded-lg w-full h-[400px]"
          priority
          style={{ height: "400px" }}
        />
      </div>
    </div>
  );
};

export default BannerDemo;

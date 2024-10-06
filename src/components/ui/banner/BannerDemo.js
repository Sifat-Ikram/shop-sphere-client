import Image from "next/image";
import Link from "next/link";

const BannerDemo = ({ title, text, img, background }) => {
  return (
    <div
      className="w-11/12 mx-auto flex flex-row justify-center items-center gap-2 md:gap-20"
      style={{ background: background }}
    >
      <div className="w-1/2 flex flex-col justify-between items-start text-left px-1 md:px-16 py-6 md:py-10">
        <h1 className="text-sm sm:text-xl md:text-4xl font-bold mb-2 md:mb-4 dark:text-white animate-fade-in-out">
          {title}
        </h1>
        <p className="text-[10px] sm:text-base md:text-2xl mb-4 md:mb-6 dark:text-white">
          {text}
        </p>
        <Link href="/allProducts">
          <button className="px-3 py-2 md:px-8 md:py-3 rounded-md bg-[#725523] dark:bg-white dark:text-black dark:border-2 border-solid dark:border-white text-white text-xs md:text-lg font-medium md:font-semibold">
            Shop Now
          </button>
        </Link>
      </div>
      <div className="flex-1">
        <Image
          src={img}
          alt="banner"
          width={500}
          height={400}
          className="rounded-lg w-full md:h-[400px] object-cover"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
        />
      </div>
    </div>
  );
};

export default BannerDemo;

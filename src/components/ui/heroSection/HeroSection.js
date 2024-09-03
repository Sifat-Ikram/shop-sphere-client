import Image from "next/image";
import Link from "next/link";
import shopping from "../../../assets/homePage/shopping.webp";

const HeroSection = () => {
  return (
    <section className="relative w-full md:space-x-20 my-10 px-4 md:px-8">
      <div
        className="flex items-center justify-end text-right"
        style={{
          backgroundImage: `url("https://i.ibb.co/VSBkKHP/shopping.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="bg-opacity-75 p-6 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8">
            Discover our latest collections and exclusive offers.
          </p>
          <Link href="/shop">
            <button className="bg-[#725523] text-white py-2 px-6 rounded-lg text-sm md:text-base lg:text-lg font-semibold hover:bg-[#624108] transition duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

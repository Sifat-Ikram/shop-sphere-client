"use client";
import Cover from "@/components/hooks/Cover";
import useOffer from "@/components/hooks/useOffer";
import useProduct from "@/components/hooks/useProduct";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const OfferDetails = () => {
  const { id } = useParams();
  const [offer] = useOffer();
  const [product] = useProduct();

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const selectedProduct = shuffleArray(
    product.filter((productItem) => productItem.category == "Electronics")
  );

  const selectedOffer = offer.find((offerItem) => offerItem._id === id);

  if (!selectedOffer) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <div className="relative">
      <div
        className="hero relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${selectedOffer.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "450px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#624108cc] via-[#725523cc] to-[#896c1fcc] opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <h1 className="lg:text-6xl md:text-4xl sm:text-3xl text-xl font-bold uppercase text-white drop-shadow-lg animate-fadeIn">
            {selectedOffer.name}
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-8 py-12 text-center dark:text-white">
        <h2 className="lg:text-5xl md:4xl sm:text-xl dark:text-white text-lg font-bold text-gray-800 mb-4">
          {selectedOffer.name}
        </h2>
        <p className="sm:text-lg md:text-xl lg:text-4xl dark:text-white font-semibold text-gray-700 mb-6">
          {selectedOffer.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-11/12 mx-auto">
        {selectedProduct.slice(0, 20).map((productItem) => (
          <Link
            href={`/productDetail/${productItem._id}`}
            key={productItem._id}
          >
            <div className="bg-[#896c1fcc] dark:bg-dark dark:border-2 border-white border-solid h-[350px] rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl relative group">
              <Image
                src={productItem.image}
                alt={productItem.name}
                height={100}
                width={100}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity"></div>
              <div className="p-4 relative z-10">
                <h3 className="text-xl font-bold dark:text-white text-[#ffffff] mb-2 group-hover:text-[#ffde94] transition-colors">
                  {productItem.name}
                </h3>
                <p className="text-gray-200 dark:text-white mb-4 group-hover:text-gray-100 transition-colors">
                  {productItem.brand}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg dark:text-white font-semibold text-[#ffffff] group-hover:text-[#ffde94] transition-colors">
                    ${productItem.price}
                  </span>
                  <span className="text-lg dark:text-white font-semibold text-[#ffffff] group-hover:text-[#ffde94] transition-colors">
                    ★ {productItem.rating}
                  </span>
                </div>
              </div>
              <div className="absolute p-2 top-0 right-0 bg-[#624108] text-white text-xs rounded-bl-lg">
                {productItem.type}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OfferDetails;

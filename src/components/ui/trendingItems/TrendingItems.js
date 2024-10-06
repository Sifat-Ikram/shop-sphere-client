"use client";
import useProduct from "@/components/hooks/useProduct";
import Image from "next/image";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";

const TrendingItems = () => {
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

  // Shuffle the products array
  const shuffledProducts = shuffleArray([...product]);

  return (
    <main>
      <section className="">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              Trending Items
            </h2>
            <p className="text-lg text-gray-700 dark:text-white">
              Discover the hottest trends and top picks of the season. Don’t
              miss out on these must-have items!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shuffledProducts.slice(0, 8).map((productItem) => (
              <div
                key={productItem._id}
                className="relative h-[400px] cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 animate-fadeIn"
              >
                <Image
                  src={productItem.image}
                  alt={productItem.name}
                  width={100}
                  height={100}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white tracking-wide">
                    {productItem.name}
                  </h3>
                  <p className="mt-3 space-y-2 text-lg font-semibold dark:text-white">
                    Category: {productItem.category}
                  </p>
                  <p className="text-xl font-semibold text-[#a67c00] dark:text-white">
                    ${productItem.price}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={productItem.rating}
                        readOnly
                      />
                      <span className="text-sm text-gray-700 dark:text-white">
                        {productItem.rating}
                      </span>
                    </div>
                    <Link href={`/productDetail/${productItem._id}`}>
                      <button className="buttons">Buy now</button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-0 left-0 bg-[#725523] text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                  {productItem.brand}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TrendingItems;

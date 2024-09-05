"use client";
import useCategory from "@/components/hooks/useCategory";
import useProduct from "@/components/hooks/useProduct";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const CategoryDetails = () => {
  const { id } = useParams();
  const [category] = useCategory();
  const [product] = useProduct();

  const selectedCategory = category?.find((cat) => cat._id === id);
  const selectedProduct = product?.filter(
    (productItem) => productItem.category === selectedCategory?.name
  );

  const [activeTab, setActiveTab] = useState("All");

  const uniqueTypes = [
    "All",
    ...new Set(selectedProduct?.map((item) => item.type)),
  ];

  const filteredProducts =
    activeTab === "All"
      ? selectedProduct
      : selectedProduct?.filter(
          (productItem) => productItem.type === activeTab
        );

  if (!selectedCategory) {
    return <p className="text-center text-red-500">Category not found</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="pb-10 pt-20">
        {/* Hero Section */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            backgroundImage: `url(${selectedCategory?.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "450px",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <h1 className="lg:text-6xl md:text-4xl dark:text-white sm:text-3xl text-xl font-bold uppercase text-white drop-shadow-lg animate-fadeIn tracking-wider">
              {selectedCategory.name}
            </h1>
          </div>
        </div>

        <div className="container mx-auto mt-8 px-4">
          <h2 className="text-3xl font-semibold text-center dark:text-white text-[#624108] mb-6 animate-slideIn tracking-wider">
            Explore Our {selectedCategory.name} Collection
          </h2>
          <p className="text-center text-gray-700 mb-10 dark:text-white max-w-2xl mx-auto animate-fadeIn">
            Discover the best {selectedCategory.name} products that we have to
            offer. Our collection is curated to provide you with only the finest
            options.
          </p>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            {uniqueTypes.map((type) => (
              <button
                key={type}
                className={`py-2 px-4 rounded-full font-semibold border ${
                  activeTab === type
                    ? "bg-[#725523] text-white border-[#725523]"
                    : "bg-gray-200 dark:bg-dark  dark:text-white text-gray-700 border-gray-300 hover:bg-[#725523] hover:text-white transition-colors duration-300"
                }`}
                onClick={() => setActiveTab(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts?.map((productItem) => (
              <Link
                href={`/productDetail/${productItem._id}`}
                key={productItem._id}
              >
                <div className="relative bg-white dark:bg-dark rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 animate-fadeIn">
                  <Image
                    src={productItem.image}
                    alt={productItem.name}
                    width={100}
                    height={100}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg dark:text-white font-bold text-gray-800 tracking-wide">
                      {productItem.name}
                    </h3>
                    <p className="mt-4 text-lg dark:text-white font-semibold text-green-600">
                      ${productItem.price}
                    </p>
                  </div>
                  <div className="absolute top-0 left-0 bg-[#725523] dark:bg-white  dark:text-[#725523] text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                    {productItem.brand}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#725523] dark:bg-white  dark:text-[#725523] text-white text-xs font-bold px-2 py-1 rounded-tl-lg">
                    {productItem.type}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryDetails;

"use client";
import useCategory from "@/components/hooks/useCategory";
import { useParams } from "next/navigation";
import React from "react";

const CategoryDetails = () => {
  const { id } = useParams();
  const [category] = useCategory();

  const selectedCategory = category?.find((cat) => cat._id === id);

  if (!selectedCategory) {
    return <p className="text-center text-red-500">Category not found</p>;
  }

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${selectedCategory?.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "450px",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <h1 className="lg:text-6xl md:text-4xl sm:text-3xl text-xl font-bold uppercase text-white drop-shadow-lg">
            {selectedCategory.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;

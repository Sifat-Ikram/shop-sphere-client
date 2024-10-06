"use client";
import { useState } from "react";
import Cover from "@/components/hooks/Cover";
import useCategory from "@/components/hooks/useCategory";
import useProduct from "@/components/hooks/useProduct";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const ITEMS_PER_PAGE = 8;

const AllProducts = () => {
  const [product] = useProduct();
  const [category] = useCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 7000]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = product.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    const matchesSalary =
      item.price >= salaryRange[0] && item.price <= salaryRange[1];
    return matchesSearch && matchesCategory && matchesSalary;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="mb-16 pt-20">
        {/* Cover Component */}
        <div id="cover" className="w-full">
          <Cover
            img="https://i.ibb.co/pdzbF9y/f1fd2bd5-e90f-48fa-85d1-840e2c4ace3b.jpg"
            title="All Products"
          />
        </div>
        <div className="mt-10 mb-4 px-8 flex justify-between items-center">
          <h1 className="w-1/2 text-left dark:text-white lg:text-5xl md:text-3xl text-xl font-semibold">
            Choose your Product
          </h1>
          <div className="drawer flex-1">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex justify-end">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="text-[#624108] cursor-pointer dark:text-white lg:text-3xl md:text-xl text-lg font-semibold"
              >
                Filters
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              {/* Sidebar */}
              <div className="bg-white shadow min-h-screen pt-5 px-5 dark:bg-dark space-y-8 w-80 mt-20">
                {/* Search Input */}
                <div>
                  <h2 className="text-xs sm:text-base dark:text-white md:text-lg lg:text-xl font-medium sm:font-semibold mb-2 text-gray-700">
                    Search Products
                  </h2>
                  <input
                    name="product"
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-full border-gray-300 dark:bg-white rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-400 transition duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <h2 className="text-xs sm:text-base dark:text-white md:text-lg lg:text-xl font-medium sm:font-semibold mb-2 text-gray-700">
                    Filter by Category
                  </h2>
                  <select
                    className="select select-bordered dark:bg-white w-full max-w-xs rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-400 transition duration-300"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {category.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Range Filter */}
                <div>
                  <h2 className="text-sm sm:text-base dark:text-white md:text-lg lg:text-xl font-medium sm:font-semibold text-gray-700">
                    Filter by Salary Range
                  </h2>
                  <div>
                    <div>
                      <h2 className="text-xs dark:text-white sm:text-base md:text-lg lg:text-xl text-gray-600">
                        Min value
                      </h2>
                      <input
                        type="range"
                        min="0"
                        max="7000"
                        value={salaryRange[0]}
                        onChange={(e) =>
                          setSalaryRange([
                            Number(e.target.value),
                            salaryRange[1],
                          ])
                        }
                        className="w-full accent-black"
                      />
                    </div>
                    <div>
                      <h2 className="text-xs dark:text-white sm:text-base md:text-lg lg:text-xl text-gray-600">
                        Max value
                      </h2>
                      <input
                        type="range"
                        min="0"
                        max="7000"
                        value={salaryRange[1]}
                        onChange={(e) =>
                          setSalaryRange([
                            salaryRange[0],
                            Number(e.target.value),
                          ])
                        }
                        className="w-full accent-black"
                      />
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg mt-2 dark:text-white text-gray-700">
                      Salary Range: ${salaryRange[0]} - ${salaryRange[1]}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      setSalaryRange([0, 7000]);
                    }}
                    className="px-3 py-2 md:px-16 mt-3 md:py-3 rounded-md bg-[#725523] dark:bg-white dark:text-black dark:border-2 border-solid dark:border-white text-white text-xs md:text-lg font-medium md:font-semibold"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-md:flex-col min-h-screen border-t-2 pt-10 lg:px-8 sm:px-2 md:px-4 border-gray-300 dark:border-gray-700 shadow-lg">
          <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4">
            {paginatedProducts.map((item) => (
              <Link key={item._id} href={`/productDetail/${item._id}`}>
                <div className="relative rounded-xl dark:shadow-dark dark:bg-dark dark:border-2 border-solid border-white overflow-hidden w-auto max-md:w-4/5 mx-auto h-[420px] bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={200}
                    width={200}
                    className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                  />
                  <div className="p-5 flex flex-col z-10 relative">
                    <h1 className="text-lg dark:text-white md:text-xl lg:text-2xl font-bold text-[#624108]">
                      {item.name}
                    </h1>
                    <h2 className="text-sm dark:text-white md:text-base lg:text-lg text-gray-600">
                      {item.category}
                    </h2>
                    <div className="lg:flex items-center justify-between mt-3">
                      <p className="text-xl dark:text-white font-semibold text-[#a67c00]">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <Rating
                          style={{ maxWidth: 100 }}
                          value={item.rating}
                          readOnly
                        />
                        <span className="text-sm dark:text-white text-gray-700">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 dark:bg-dark left-0 w-full h-1 bg-[#624108]"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center lg:gap-20 md:gap-10 gap-2 my-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn bg-[#624108] dark:bg-dark dark:border-2 border-solid border-white dark:text-white text-white hover:bg-[#624108] mr-2 transition-transform duration-200"
          >
            Previous
          </button>
          <span className="lg:text-lg dark:text-white sm:text-base text-xs">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn bg-[#624108] dark:bg-dark dark:text-white dark:border-2 border-solid border-white text-white hover:bg-[#624108] ml-2 transition-transform duration-200"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;

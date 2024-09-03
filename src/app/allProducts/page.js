"use client";
import { useState, useEffect } from "react";
import Cover from "@/components/hooks/Cover";
import useCategory from "@/components/hooks/useCategory";
import useProduct from "@/components/hooks/useProduct";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

const AllProducts = () => {
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);
  const [sidebarBottom, setSidebarBottom] = useState(null);
  const [product] = useProduct();
  const [category] = useCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 10000]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const coverHeight = document.getElementById("cover").offsetHeight;
      const footer = document.getElementById("footer");
      const sidebar = document.getElementById("sidebar");

      const sidebarHeight = sidebar ? sidebar.offsetHeight : 0;
      const sidebarTop = sidebar ? sidebar.getBoundingClientRect().top : 0;

      if (window.scrollY >= coverHeight) {
        setIsSidebarFixed(true);
        if (footer) {
          const footerTop = footer.getBoundingClientRect().top + window.scrollY;
          const sidebarBottomPosition = sidebarTop + sidebarHeight;

          if (sidebarBottomPosition >= footerTop) {
            setSidebarBottom(footerTop - sidebarHeight);
          } else {
            setSidebarBottom(null);
          }
        }
      } else {
        setIsSidebarFixed(false);
        setSidebarBottom(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="mb-16">
      {/* Cover Component */}
      <div id="cover" className="w-full">
        <Cover
          img="https://i.ibb.co/pdzbF9y/f1fd2bd5-e90f-48fa-85d1-840e2c4ace3b.jpg"
          title="All Products"
        />
      </div>
      <div className="my-10">
        <h1 className="text-center dark:text-white lg:text-5xl md:text-3xl text-xl lg:ml-40 font-semibold">
          Choose your Product
        </h1>
      </div>
      <div className="flex max-md:flex-col min-h-screen border-solid border-t-2 pt-10">
        {/* Sidebar */}
        <div
          id="sidebar"
          className={`md:w-1/4 max-md:w-4/5 max-md:mx-auto dark:bg-dark md:px-4 shadow-lg p-6 pt-10 border-r-2 border-solid space-y-6 min-h-screen ${
            isSidebarFixed ? "md:fixed" : "relative"
          }`}
          style={{
            top: isSidebarFixed
              ? sidebarBottom !== null
                ? sidebarBottom
                : 0
              : "auto",
            bottom: isSidebarFixed
              ? sidebarBottom !== null
                ? "auto"
                : 0
              : "auto",
            height: isSidebarFixed
              ? sidebarBottom !== null
                ? sidebarBottom -
                  window.scrollY +
                  document.documentElement.clientHeight
                : "auto"
              : "auto",
            zIndex: 10,
          }}
        >
          {/* Search Input */}
          <div>
            <h2 className="text-xs sm:text-base dark:text-white md:text-lg lg:text-xl font-medium sm:font-semibold mb-4 text-gray-700">
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
            <h2 className="text-xs sm:text-base dark:text-white md:text-lg lg:text-xl font-medium sm:font-semibold mb-4 text-gray-700">
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
            <h2 className="text-sm sm:text-base dark:text-white md:text-lg lg:text-xl font-medium sm:font-semibold mb-4 text-gray-700">
              Filter by Salary Range
            </h2>
            <div className="space-y-2">
              <div>
                <h2 className="text-xs dark:text-white sm:text-base md:text-lg lg:text-xl mt-3 text-gray-600">
                  Min value
                </h2>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={salaryRange[0]}
                  onChange={(e) =>
                    setSalaryRange([Number(e.target.value), salaryRange[1]])
                  }
                  className="w-full accent-[#624108]"
                />
              </div>
              <div>
                <h2 className="text-xs dark:text-white sm:text-base md:text-lg lg:text-xl mt-3 text-gray-600">
                  Max value
                </h2>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={salaryRange[1]}
                  onChange={(e) =>
                    setSalaryRange([salaryRange[0], Number(e.target.value)])
                  }
                  className="w-full accent-[#624108]"
                />
              </div>
              <div className="text-sm sm:text-base lg:text-lg mt-2 dark:text-white text-gray-700">
                Salary Range: ${salaryRange[0]} - ${salaryRange[1]}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-4 ${
            isSidebarFixed ? "md:ml-[25%]" : ""
          }`}
        >
          {paginatedProducts.map((item) => (
            <Link key={item._id} href={`/productDetail/${item._id}`}>
              <div className="relative rounded-xl dark:shadow-dark dark:bg-dark dark:border-2 border-solid border-white overflow-hidden w-auto max-md:w-4/5 mx-auto lg:h-[380px] h-[400px] py-5 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
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
      <div className="flex justify-center items-center lg:gap-20 md:gap-10 gap-2 lg:ml-80">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn bg-[#624108] dark:bg-dark dark:border-2 border-solid border-white dark:text-white text-white hover:bg-[#624108] mr-2"
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
          className="btn bg-[#624108] dark:bg-dark  dark:text-white dark:border-2 border-solid border-white text-white hover:bg-[#624108] ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;

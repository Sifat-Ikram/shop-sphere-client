"use client";
import "swiper/css";
import Image from "next/image";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useProduct from "@/components/hooks/useProduct";
import Link from "next/link";

const NewArrivals = () => {
  const [product] = useProduct();
  const selectedProduct = product.filter(
    (productItem) => productItem.type === "Others"
  );

  return (
    <section className="py-12 mt-8">
      <div className="container mx-auto space-y-10">
        <div className="text-center space-y-5">
          <h2 className="text-3xl md:text-5xl font-extrabold dark:text-white text-gray-900">
            New Arrivals
          </h2>
          <p className="text-gray-600 text-xs md:text-xl dark:text-white w-3/5 mx-auto leading-relaxed">
            Discover the latest additions to our collection. Find your next
            favorite product from our handpicked selection of new arrivals.
            Swipe through and explore now!
          </p>
        </div>
        <div>
          <Swiper
            spaceBetween={0}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {selectedProduct.map((product) => (
              <SwiperSlide key={product._id} className="px-2">
                <Link href={`/productDetail/${product._id}`}>
                  <div className="flex items-center border-[1px] border-solid dark:border-white border-[#624108] h-32 rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 animate-fadeIn">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={200}
                      width={200}
                      className="object-cover w-28 h-32"
                    />
                    <div className="p-4 flex-1">
                      <h1 className="text-lg font-bold dark:text-white text-gray-800 mb-2">
                        {product.name.length > 20
                          ? `${product.name.slice(0, 20)}...`
                          : product.name}
                      </h1>
                      <p className="text-gray-600 dark:text-white text-sm mb-1">
                        {product.category}
                      </p>
                      <p className="text-gray-900 dark:text-white font-semibold text-lg">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev text-gray-800 text-3xl"></div>
            <div className="swiper-button-next text-gray-800 text-3xl"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;

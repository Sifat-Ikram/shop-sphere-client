"use client";
import Link from "next/link";
import Image from "next/image";
import useCategory from "@/components/hooks/useCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Categories = () => {
  const [category] = useCategory();

  return (
    <section className="my-20">
      <div className="container mx-auto px-4">
        <h2 className="lg:text-5xl md:text-3xl text-xl dark:text-white font-bold text-center mb-12 text-gray-800">
          Featured Categories
        </h2>
        <Swiper
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {category.map((cat) => (
            <SwiperSlide
              key={cat._id}
              className="relative group overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Link href={`categoryDetails/${cat._id}`}>
                <div className="relative w-full h-60 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center p-4">
                    <h3 className="text-gray-100 text-2xl font-bold text-center shadow-md">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev text-white text-2xl"></div>
          <div className="swiper-button-next text-white text-2xl"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;

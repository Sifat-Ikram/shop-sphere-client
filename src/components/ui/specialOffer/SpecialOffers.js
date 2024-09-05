"use client";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import "swiper/css/navigation";
import useOffer from "@/components/hooks/useOffer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const SpecialOffers = () => {
  const [offer] = useOffer();

  return (
    <section className="lg:py-16 md:py-12 py-8">
      <div className="container mx-auto px-6">
        <h2 className="lg:text-5xl md:text-4xl dark:text-white text-3xl font-bold text-center mb-10 lg:mb-16 text-gray-800 tracking-wide">
          Special Offers
        </h2>
        <Swiper
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            // For mobile phones
            500: {
              slidesPerView: 2,
            },
            // For tablets
            768: {
              slidesPerView: 3,
            },
            // For desktops
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {offer.map((offer) => (
            <SwiperSlide
              key={offer._id}
              className="relative group overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Link
                href={`/offerDetails/${offer._id}`}
                className="block relative"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    fill={true}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: "center" }}
                  />
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

export default SpecialOffers;

"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import BannerDemo from "./BannerDemo";
import img2 from "../../../assets/banner/image3.png";
import gift from "../../../assets/banner/gift.png";
import summer from "../../../assets/banner/summer.png";
import winter from "../../../assets/banner/winter.jpg";
import decor from "../../../assets/banner/home-decor.webp";
import fitness from "../../../assets/banner/fitness.jpg";

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerDemo
            title={"New Arrivals"}
            text={"Discover the latest trends with our newest collection"}
            img={img2}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerDemo
            title={"Summer Sale Extravaganza!"}
            text={
              "Up to 50% off on selected items. Grab your favorites before they're gone!"
            }
            img={summer}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerDemo
            title={"Winter Wonderland"}
            text={
              "Cozy up with our winter collection. Warm styles for the chilly days ahead"
            }
            img={winter}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerDemo
            title={"Holiday Gift Guide"}
            text={"Find the perfect gifts for everyone on your list"}
            img={gift}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerDemo
            title={"Home Decor Deals"}
            text={
              "Transform your space with our stunning home decor collection. Sale ends soon!"
            }
            img={decor}
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerDemo
            title={"Fitness Gear"}
            text={
              "Get fit with our range of fitness equipment and apparel. Start your journey today"
            }
            img={fitness}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

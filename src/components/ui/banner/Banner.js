"use client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import BannerDemo from "./BannerDemo";
import useBanner from "@/components/hooks/useBanner";

const Banner = () => {
  const [banners] = useBanner();

  return (
    <div className="w-full pt-5">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {banners?.map((bannerItem) => (
          <SwiperSlide key={bannerItem._id}>
            <BannerDemo
              title={bannerItem.title}
              text={bannerItem.text}
              img={bannerItem.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

{
  /* <SwiperSlide>
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
        </SwiperSlide> */
}

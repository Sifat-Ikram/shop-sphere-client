import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import {
  FaHandshake,
  FaGlobe,
  FaShippingFast,
  FaThumbsUp,
} from "react-icons/fa";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12 dark:text-white md:pt-40 pt-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          About Shop Sphere
        </h1>
        <p className="text-base md:text-lg lg:text-xl dark:text-white text-gray-600 text-center mb-12">
          Welcome to{" "}
          <span className="font-bold text-[#725523] dark:text-white">
            Shop Sphere
          </span>
          , your go-to destination for the best shopping experience! We are
          dedicated to offering you the finest products, with a focus on
          quality, affordability, and customer satisfaction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <FaGlobe className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Global Reach
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              We serve customers worldwide, ensuring that everyone has access to
              our top-notch products.
            </p>
          </div>
          <div className="text-center">
            <FaShippingFast className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Fast Shipping
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              Our reliable shipping partners ensure that your order reaches you
              in no time, no matter where you are.
            </p>
          </div>
          <div className="text-center">
            <FaHandshake className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Customer Commitment
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              Customer satisfaction is our top priority. We are here to make
              your shopping experience seamless and enjoyable.
            </p>
          </div>
          <div className="text-center">
            <FaThumbsUp className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Quality Assurance
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              All our products are sourced from trusted suppliers to ensure they
              meet the highest standards of quality.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
            Our Story
          </h2>
          <p className="text-base md:text-lg lg:text-xl dark:text-white text-gray-600 text-center mb-8">
            Founded in 2024, Shop Sphere started with a vision to make online
            shopping easy and accessible for everyone. Today, we’re proud to be
            a trusted name in e-commerce, bringing the best of fashion,
            electronics, and lifestyle products to our valued customers around
            the globe.
          </p>
          <p className="text-base md:text-lg lg:text-xl dark:text-white text-gray-600 text-center mb-8">
            At Shop Sphere, we believe that every customer deserves the best.
            Whether you’re looking for the latest trends or everyday essentials,
            we’ve got you covered.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

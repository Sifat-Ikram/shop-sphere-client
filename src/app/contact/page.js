import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 dark:text-white text-gray-800">
          Get In Touch With Shop Sphere
        </h1>

        <p className="text-base md:text-lg lg:text-xl dark:text-white text-gray-600 text-center mb-12">
          Have any questions or need support? We are here to help! Feel free to
          reach out through any of the channels below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-gray-100 dark:bg-dark border-white dark:border-2 border-solid p-6 rounded-lg shadow-md">
            <FaMapMarkerAlt className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-white font-bold mb-2">
              Our Office
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              1234 Shop Sphere Blvd
              <br />
              Khilkhet, Dhaka
              <br />
              Bangladesh
            </p>
          </div>

          {/* Email */}
          <div className="text-center bg-gray-100 dark:bg-dark border-white dark:border-2 border-solid p-6 rounded-lg shadow-md">
            <FaEnvelope className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-white font-bold mb-2">
              Email Us
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              support@shopsphere.com
            </p>
          </div>

          {/* Phone */}
          <div className="text-center bg-gray-100 dark:bg-dark border-white dark:border-2 border-solid p-6 rounded-lg shadow-md">
            <FaPhoneAlt className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-white font-bold mb-2">
              Call Us
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              +8801718837796
            </p>
          </div>

          {/* Business Hours */}
          <div className="text-center bg-gray-100 dark:bg-dark border-white dark:border-2 border-solid p-6 rounded-lg shadow-md">
            <FaClock className="text-[#725523] dark:text-white text-5xl md:text-6xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl dark:text-white font-bold mb-2">
              Business Hours
            </h2>
            <p className="text-sm md:text-base lg:text-lg dark:text-white text-gray-600">
              Monday - Friday: 9am - 6pm
              <br />
              Saturday: 10am - 4pm
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Additional Info or CTA */}
        <div className="bg-[#725523] py-12 rounded-lg shadow-md text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-base md:text-lg lg:text-xl mb-6">
            Reach out to our support team anytime, and we’ll get back to you as
            soon as possible!
          </p>
          <a
            href="mailto:support@shopsphere.com"
            className="bg-white text-[#725523] font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition duration-300"
          >
            Email Us
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

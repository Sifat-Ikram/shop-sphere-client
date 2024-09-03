import { FaRocket, FaHandshake, FaLeaf } from "react-icons/fa";

const BrandStory = () => {
  return (
    <div className="bg-gradient-to-r from-[#725523] to-[#9f7d49]">
      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                We believe in delivering quality products that elevate your
                lifestyle. Founded on the principles of integrity and
                innovation, our mission is to provide exceptional value and
                create unforgettable experiences for our customers.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-around items-start gap-5">
              <div className="w-full md:w-1/3 text-center mb-6 md:mb-0 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <FaRocket className="text-4xl text-[#725523] mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-700">
                  Our mission is to revolutionize the industry with cutting-edge
                  solutions and exceptional service. We are dedicated to
                  sustainability and strive to make a positive impact on our
                  community.
                </p>
              </div>
              <div className="w-full md:w-1/3 text-center mb-6 md:mb-0 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <FaHandshake className="text-4xl text-[#725523] mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Our Values
                </h3>
                <p className="text-gray-700">
                  We uphold the highest standards of honesty and fairness. Our
                  customers are at the heart of everything we do. We embrace
                  creativity and strive for continuous improvement.
                </p>
              </div>
              <div className="w-full md:w-1/3 text-center p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <FaLeaf className="text-4xl text-[#725523] mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Why Choose Us
                </h3>
                <p className="text-gray-700">
                  We offer exceptional products backed by unparalleled customer
                  service. Our dedication to quality and customer satisfaction
                  makes us a trusted choice for your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BrandStory;

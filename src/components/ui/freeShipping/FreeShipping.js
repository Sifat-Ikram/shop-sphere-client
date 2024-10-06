import Link from "next/link";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { GoInbox } from "react-icons/go";

const FreeShipping = () => {
  const navButton = (
    <>
      <Link href="/register">
        <button className="btn btn-outline dark:border-white text-[#624108] dark:text-white hover:bg-[#624108] dark:hover:bg-dark hover:text-white transition-colors duration-300 px-5 lg:px-20 md:px-14 sm:px-8 rounded-full shadow-md hover:shadow-lg">
          Sign up
        </button>
      </Link>
      <Link href="/logIn">
        <button className="btn btn-outline dark:border-white text-[#624108] dark:text-white hover:bg-[#624108] dark:hover:bg-dark hover:text-white transition-colors duration-300 px-5 lg:px-20 md:px-14 sm:px-8 rounded-full shadow-md hover:shadow-lg">
          Sign in
        </button>
      </Link>
    </>
  );

  return (
    <div className="w-11/12 mx-auto mb-20 bg-gradient-to-r dark:bg-dark p-6 rounded-lg shadow">
      <div className="sm:flex sm:w-11/12 mx-auto justify-between items-center">
        <div className="md:w-3/5 text-center md:text-left max-sm:mb-10">
          <h1 className="text-xl font-semibold dark:text-white text-[#624108] text-center">
            Register now & get Free shipping
          </h1>
          <div className="flex justify-center items-center lg:my-8 md:my-7 sm:my-5 my-4 gap-4">
            {navButton}
          </div>
        </div>
        <div className="space-y-5 flex-1">
          <div className="flex items-center gap-5">
            <FaShoppingCart className="text-[#624108] dark:text-white text-2xl" />
            <h1 className="text-lg font-medium text-[#624108] dark:text-white">
              Faster Delivery
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <FaExchangeAlt className="text-[#624108] dark:text-white text-2xl" />
            <h1 className="text-lg font-medium text-[#624108] dark:text-white">
              Easier returns and exchanges
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <GoInbox className="text-[#624108] dark:text-white text-2xl" />
            <h1 className="text-lg font-medium text-[#624108] dark:text-white">
              Quick order information and tracking
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeShipping;

"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#725523] dark:bg-dark dark:text-white text-white py-10 px-5 md:px-20 z-20 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold">Shop Sphere</h2>
          <p className="text-sm mt-2 text-gray-400">Your one-stop shop for all your needs.</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" legacyBehavior>
                <a className="hover:text-gray-400">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/shop" legacyBehavior>
                <a className="hover:text-gray-400">Shop</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className="hover:text-gray-400">About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="hover:text-gray-400">Contact</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" legacyBehavior>
                <a className="hover:text-gray-400">FAQ</a>
              </Link>
            </li>
            <li>
              <Link href="/returns" legacyBehavior>
                <a className="hover:text-gray-400">Returns</a>
              </Link>
            </li>
            <li>
              <Link href="/shipping" legacyBehavior>
                <a className="hover:text-gray-400">Shipping</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" legacyBehavior>
                <a className="hover:text-gray-400">Privacy Policy</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.04c-5.48 0-9.96 4.48-9.96 9.96 0 5.48 4.48 9.96 9.96 9.96s9.96-4.48 9.96-9.96c0-5.48-4.48-9.96-9.96-9.96zm0 18.4c-4.65 0-8.43-3.78-8.43-8.43s3.78-8.43 8.43-8.43 8.43 3.78 8.43 8.43-3.78 8.43-8.43 8.43zm.1-11.22v2.33h2.34v1.82h-2.34v6.04h-2.07v-6.04h-1.4v-1.82h1.4v-1.59c0-1.44.79-2.31 2.26-2.31.58 0 1.08.04 1.23.06v1.54h-.84c-.66 0-.79.3-.79.77v1.52h1.6l-.2 1.82h-1.4z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.25 5.5c-.79.35-1.63.58-2.5.69.9-.54 1.58-1.39 1.9-2.4-.84.5-1.77.86-2.77 1.05-.8-.84-1.93-1.36-3.19-1.36-2.41 0-4.37 1.96-4.37 4.37 0 .34.04.66.1.97-3.63-.18-6.84-1.92-9-4.56-.38.64-.6 1.39-.6 2.19 0 1.52.77 2.86 1.95 3.65-.71-.02-1.38-.22-1.97-.55v.06c0 2.12 1.51 3.89 3.52 4.3-.37.1-.76.15-1.16.15-.28 0-.56-.03-.83-.08.56 1.74 2.19 3 4.12 3.04-1.51 1.18-3.42 1.88-5.5 1.88-.36 0-.71-.02-1.06-.06 1.96 1.26 4.28 2 6.79 2 8.15 0 12.6-6.76 12.6-12.6 0-.19 0-.37-.01-.56.86-.62 1.6-1.4 2.19-2.28z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 8.56c-.77.35-1.61.59-2.48.69a4.31 4.31 0 001.89-2.37 8.71 8.71 0 01-2.75 1.05 4.27 4.27 0 00-7.27 3.88 12.14 12.14 0 01-8.82-4.47 4.27 4.27 0 001.32 5.7 4.23 4.23 0 01-1.94-.53v.05a4.27 4.27 0 003.43 4.18 4.29 4.29 0 01-1.93.07 4.27 4.27 0 003.98 2.96 8.6 8.6 0 01-5.32 1.84c-.35 0-.7-.02-1.05-.06a12.13 12.13 0 006.57 1.93c7.89 0 12.21-6.54 12.21-12.21 0-.19 0-.38-.01-.56a8.68 8.68 0 002.14-2.18z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-10 border-t border-gray-500 pt-5">
        <p>&copy; {new Date().getFullYear()} UniShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

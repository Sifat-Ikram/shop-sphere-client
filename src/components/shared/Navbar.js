"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const activeSegment = useSelectedLayoutSegment();
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      const res = await logOut();
    } catch (err) {
      console.error(err.message);
    }
  };

  const navList = (
    <>
      <li>
        <Link
          href="/"
          className={`text-white font-semibold hover:bg-[#624108] ${
            activeSegment === null ? "bg-[#624108] text-white" : ""
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/allProducts"
          className={`text-white font-semibold hover:bg-[#624108] ${
            activeSegment === "allProducts" ? "bg-[#624108] text-white" : ""
          }`}
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          href="/shop"
          className={`text-white font-semibold hover:bg-[#624108] ${
            activeSegment === "shop" ? "bg-[#624108] text-white" : ""
          }`}
        >
          Shop
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`text-white font-semibold hover:bg-[#624108] ${
            activeSegment === "about" ? "bg-[#624108] text-white" : ""
          }`}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`text-white font-semibold hover:bg-[#624108] ${
            activeSegment === "contact" ? "bg-[#624108] text-white" : ""
          }`}
        >
          Contact
        </Link>
      </li>
    </>
  );

  const navButton = (
    <>
      <Link href={"/register"} className="flex justify-center items-center">
        <button className="text-white hover:bg-white hover:text-[#624108] px-3 py-2 rounded-md w-full">
          Sign up
        </button>
      </Link>
      <Link href={"/logIn"} className="flex justify-center items-center">
        <button className="text-white hover:bg-white hover:text-[#624108] px-3 py-2 rounded-md w-full">
          Sign in
        </button>
      </Link>
    </>
  );

  return (
    <div className="navbar bg-[#725523] px-4 sm:px-10 py-4 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#725523] rounded-box mt-3 w-52 p-2 shadow z-50"
          >
            {navList}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl sm:text-3xl text-white font-semibold">
          ShopSphere
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 sm:space-x-4">
          {navList}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full bg-white">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL || "/default-avatar.png"}
                    alt="user image"
                    height={40}
                    width={40}
                  />
                ) : (
                  <BsFillPersonFill className="text-4xl text-[#624108]" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="flex flex-col dropdown-content bg-[#624108] rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li className="text-white hover:bg-white cursor-pointer hover:text-[#624108] px-3 py-2 rounded-md w-full">
                {user.displayName}
              </li>
              <li>
                <button
                  className="text-white hover:bg-white hover:text-[#624108] px-3 py-2 rounded-md w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogOut();
                  }}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {navButton}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

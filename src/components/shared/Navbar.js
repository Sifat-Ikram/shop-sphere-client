"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = () => {
  const activeSegment = useSelectedLayoutSegment();

  const navList = (
    <>
      <li>
        <Link href="/" legacyBehavior>
          <a
            style={{
              background: activeSegment === null ? "#624108" : "",
              color: activeSegment === null ? "white" : "",
            }}
            className="text-white font-semibold hover:bg-[#624108]"
          >
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link href="/shop" legacyBehavior>
          <a
            style={{
              background: activeSegment === "shop" ? "#624108" : "",
              color: activeSegment === "shop" ? "white" : "",
            }}
            className="text-white font-semibold hover:bg-[#624108]"
          >
            Shop
          </a>
        </Link>
      </li>
      <li>
        <Link href="/about" legacyBehavior>
          <a
            style={{
              background: activeSegment === "about" ? "#624108" : "",
              color: activeSegment === "about" ? "white" : "",
            }}
            className="text-white font-semibold hover:bg-[#624108]"
          >
            About
          </a>
        </Link>
      </li>
      <li>
        <Link href="/contact" legacyBehavior>
          <a
            style={{
              background: activeSegment === "contact" ? "#624108" : "",
              color: activeSegment === "contact" ? "white" : "",
            }}
            className="text-white font-semibold hover:bg-[#624108]"
          >
            Contact
          </a>
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
    <div className="navbar bg-[#725523] px-10 py-4 shadow-lg">
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
            className="menu menu-sm dropdown-content bg-[#725523] rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navList}
          </ul>
        </div>
        <a className="btn btn-ghost text-3xl text-white font-semibold">
          UniShop
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{navList}</ul>
      </div>
      <div className="navbar-end space-x-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full bg-white p-1">
              <BsFillPersonFill className="text-4xl text-[#624108]" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="flex flex-col dropdown-content bg-[#624108] rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navButton}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

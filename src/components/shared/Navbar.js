"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import { BsFillPersonFill } from "react-icons/bs";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isAdmin] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const activeSegment = useSelectedLayoutSegment();
  const { user, logOut } = useContext(AuthContext);

  const { data: users = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching cart data:", err);
    },
  });

  if (!user && !users) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const currentUser = users.find((userItem) => userItem?.email === user?.email);

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      router.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const navList = (
    <>
      <li>
        <Link
          href="/"
          className={`font-semibold hover:bg-[#624108] ${
            activeSegment === null ? "bg-white text-[#624108]" : "text-white"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/allProducts"
          className={`font-semibold hover:bg-[#624108] ${
            activeSegment === "allProducts"
              ? "bg-white text-[#624108]"
              : "text-white"
          }`}
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          href={
            isAdmin
              ? "/dashboardLayout/adminRoute/adminHome"
              : "/dashboardLayout/userRoute/userHome"
          }
          className={`font-semibold hover:bg-[#624108] ${
            activeSegment === (isAdmin ? "adminHome" : "userHome")
              ? "bg-white text-[#624108]"
              : "text-white"
          }`}
        >
          Dashboard
        </Link>
      </li>
      <li>
        {user && (
          <>
            <Link
              href="/shop"
              className={`font-semibold hover:bg-[#624108] ${
                activeSegment === "shop"
                  ? "bg-white text-[#624108]"
                  : "text-white"
              }`}
            >
              Shop
            </Link>
          </>
        )}
      </li>
      <li>
        <Link
          href="/about"
          className={`font-semibold hover:bg-[#624108] ${
            activeSegment === "about" ? "bg-white text-[#624108]" : "text-white"
          }`}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`font-semibold hover:bg-[#624108] ${
            activeSegment === "contact"
              ? "bg-white text-[#624108]"
              : "text-white"
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
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full bg-white overflow-hidden border border-gray-200">
                {currentUser?.photoUrl ? (
                  <Image
                    src={currentUser?.photoUrl}
                    alt="user image"
                    height={40}
                    width={40}
                    className="object-cover"
                  />
                ) : (
                  <BsFillPersonFill className="text-4xl text-[#624108] p-2" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content absolute bg-[#624108] text-white rounded-lg shadow-lg mt-2 w-56 p-2 z-50"
            >
              <div className="hover:bg-[#8c5d2f] px-4 py-2 rounded-md transition duration-200 ease-in-out">
                <h1>
                  <span className="block uppercase text-center text-xl font-medium">
                    {currentUser?.name}
                  </span>
                </h1>
                <h1>
                  <span className="block text-center text-lg">
                    {currentUser?.email}
                  </span>
                </h1>
              </div>
              <li className="hover:bg-[#8c5d2f] cursor-pointer rounded-md transition duration-200 ease-in-out">
                <button
                  className="w-full text-center px-4 py-2 text-sm font-medium"
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
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full bg-white overflow-hidden border border-gray-200">
                {currentUser?.photoUrl ? (
                  <Image
                    src={currentUser?.photoUrl}
                    alt="user image"
                    height={40}
                    width={40}
                    className="object-cover"
                  />
                ) : (
                  <BsFillPersonFill className="text-4xl text-[#624108] p-2" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content absolute bg-[#624108] text-white rounded-lg shadow-lg mt-2 w-56 p-2 z-50"
            >
              <div className="flex flex-col justify-center items-center gap-2">
                {navButton}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

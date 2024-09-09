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
import DarkModeButton from "../ui/darkModeButton/DarkModeButton";

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
          className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black ${
            activeSegment === "Home" ? "bg-white text-[#624108]" : "text-white"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/allProducts"
          className={`font-semibold dark:hover:bg-white dark:text-white dark:hover:text-black hover:bg-[#624108] ${
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
          href={user ? "/shop" : "/logIn"}
          className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black ${
            activeSegment === "shop" ? "bg-white text-[#624108]" : "text-white"
          }`}
        >
          Shop
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black md:hidden ${
            activeSegment === "about" ? "bg-white text-[#624108]" : "text-white"
          }`}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`font-semibold hover:bg-[#624108] md:hidden ${
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
      <li>
        <Link
          href={"/register"}
          className="flex justify-center w-full items-center"
        >
          <button className="text-white hover:bg-[#8c5d2f] dark:hover:bg-white dark:text-white dark:hover:text-black hover:text-white px-16 py-2 rounded-md w-full">
            Sign up
          </button>
        </Link>
      </li>
      <li>
        <Link
          href={"/logIn"}
          className="flex justify-center w-full items-center"
        >
          <button className="text-white hover:bg-[#8c5d2f] dark:hover:bg-white dark:text-white dark:hover:text-black hover:text-white px-16 py-2 rounded-md w-full">
            Sign in
          </button>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#725523] px-4 sm:px-10 py-4 shadow z-10 mb-20 dark:bg-dark fixed">
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
            className="menu menu-sm dropdown-content bg-[#725523] dark:bg-dark rounded-box mt-3 w-44 p-2 shadow z-50"
          >
            {navList}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl sm:text-3xl text-white font-semibold">
          ShopSphere
        </a>
      </div>
      <div className="navbar-end space-x-2">
        <ul className="menu menu-horizontal max-md:hidden px-1 space-x-2 sm:space-x-4">
          {navList}
        </ul>
        <div>
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
                    <BsFillPersonFill className="text-4xl text-[#624108] dark:text-white p-2" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content absolute bg-[#725523] space-y-3 dark:bg-dark text-white rounded-lg shadow-lg mt-2 w-60 py-2 px-5 z-50"
              >
                <div className="px-4 py-2 mb-5 rounded-md dark:text-white transition duration-200 ease-in-out">
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
                <li className="hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black flex py-2 rounded-md justify-center">
                  <Link href={`/myProfile/${currentUser?._id}`}>
                    My Profile
                  </Link>
                </li>
                <li className="flex justify-center">
                  <Link
                    href={
                      isAdmin
                        ? "/dashboardLayout/adminRoute/adminHome"
                        : "/dashboardLayout/userRoute/userHome"
                    }
                    className={`font-semibold rounded-md hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black w-full py-2 text-center ${
                      activeSegment === (isAdmin ? "adminHome" : "userHome")
                        ? "bg-white text-[#624108]"
                        : "text-white"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black flex justify-center p-2 rounded-md ${
                      activeSegment === "about"
                        ? "bg-white text-[#624108]"
                        : "text-white"
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black flex justify-center p-2 rounded-md ${
                      activeSegment === "contact"
                        ? "bg-white text-[#624108]"
                        : "text-white"
                    }`}
                  >
                    Contact
                  </Link>
                </li>
                <li className="hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black rounded-md cursor-pointer transition duration-200 ease-in-out">
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
                <li className="flex justify-center rounded-md">
                  <DarkModeButton />
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
                <div className="rounded-full bg-white dark:bg-dark overflow-hidden border border-gray-200">
                  {currentUser?.photoUrl ? (
                    <Image
                      src={currentUser?.photoUrl}
                      alt="user image"
                      height={40}
                      width={40}
                      className="object-cover"
                    />
                  ) : (
                    <BsFillPersonFill className="text-4xl text-[#624108] dark:text-white p-2" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content absolute bg-[#624108] dark:bg-dark text-white rounded-lg shadow-lg space-y-1 mt-2 w-56 p-2 z-50"
              >
                <li className="hover:bg-[#8c5d2f] dark:hover:bg-white dark:text-white dark:hover:text-black flex py-2 rounded-md justify-center">
                  <Link
                    href={user ? `/myProfile/${currentUser?._id}` : "/logIn"}
                  >
                    My Profile
                  </Link>
                </li>
                <li className="flex justify-center">
                  <Link
                    href={
                      user
                        ? isAdmin
                          ? "/dashboardLayout/adminRoute/adminHome"
                          : "/dashboardLayout/userRoute/userHome"
                        : "/logIn"
                    }
                    className={`font-semibold rounded-md hover:bg-[#8c5d2f] dark:hover:bg-white dark:text-white dark:hover:text-black w-full py-2 text-center ${
                      activeSegment === (isAdmin ? "adminHome" : "userHome")
                        ? "bg-white text-[#624108]"
                        : "text-white"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black w-full flex justify-center p-2 rounded-md ${
                      activeSegment === "about"
                        ? "bg-white text-[#624108]"
                        : "text-white"
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`font-semibold hover:bg-[#624108] dark:hover:bg-white dark:text-white dark:hover:text-black w-full flex justify-center p-2 rounded-md ${
                      activeSegment === "contact"
                        ? "bg-white text-[#624108]"
                        : "text-white"
                    }`}
                  >
                    Contact
                  </Link>
                </li>
                {navButton}
                <li className="flex justify-center">
                  <DarkModeButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

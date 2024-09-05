import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCartArrowDown, FaHome, FaUser, FaElementor } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdDashboard, MdDomainAdd } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import DarkModeButton from "../ui/darkModeButton/DarkModeButton";

const AdminNavbar = () => {
  const [isAdmin] = useAdmin();
  const pathname = usePathname();

  const adminNavList = (
    <>
      <li className="flex justify-center items-center">
        <Link
          href="/dashboardLayout/adminRoute/adminHome"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/adminRoute/adminHome"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <FaHome className="max-md:hidden text-2xl" /> Admin Home
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/adminRoute/user"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/adminRoute/user"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <FaUser className="md:text-base lg:text-xl max-md:hidden" /> Users
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/adminRoute/addProduct"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/adminRoute/addProduct"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <MdDomainAdd className="md:text-base lg:text-xl max-md:hidden" /> Add
          Product
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/adminRoute/product"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <TbToolsKitchen3 className="md:text-base lg:text-xl max-md:hidden" />{" "}
          Products
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/adminRoute/cart"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/adminRoute/cart"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <FaCartArrowDown className="md:text-base lg:text-xl max-md:hidden" />{" "}
          Cart
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/adminRoute/order"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/adminRoute/order"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <BsFillBookmarkCheckFill className="md:text-base lg:text-xl max-md:hidden" />{" "}
          Order
        </Link>
      </li>
    </>
  );
  const userNavList = (
    <>
      <li className="flex justify-center items-center">
        <Link
          href="/dashboardLayout/userRoute/userHome"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/userRoute/userHome"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <FaHome className="max-md:hidden text-2xl" /> User Home
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/userRoute/bookings"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/userRoute/bookings"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <TbToolsKitchen3 className="md:text-base lg:text-xl max-md:hidden" />{" "}
          My Bookings
        </Link>
      </li>
      <li>
        <Link
          href="/dashboardLayout/userRoute/order"
          className={`font-semibold hover:bg-[#624108] w-full dark:hover:bg-white dark:hover:text-black text-sm md:pl-2 lg:text-xl lg:px-10 py-2 rounded flex items-center gap-2 ${
            pathname === "/dashboardLayout/userRoute/order"
              ? "bg-[#624108] text-white dark:bg-white dark:text-black"
              : "text-white"
          }`}
        >
          <BsFillBookmarkCheckFill className="md:text-base lg:text-xl max-md:hidden" />{" "}
          My Orders
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-[#725523] dark:bg-dark w-full fixed md:left-0 max-md:top-0 z-10 md:w-40 lg:w-72 md:min-h-screen">
      <div className="md:my-10 flex justify-between md:justify-center items-center max-md:px-8 max-md:py-5">
        <Link href={"/"}>
          <h1 className="text-center text-xl uppercase lg:text-3xl font-bold text-white">
            Shop Sphere
          </h1>
        </Link>
        <div className="dropdown dropdown-bottom dropdown-left md:hidden">
          <button
            tabIndex={0}
            className="h-8 w-8 rounded-md text-white border-2 border-solid border-white"
          >
            <MdDashboard className="text-2xl" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm justify-center items-center dropdown-content bg-[#725523] dark:bg-dark rounded-box w-52 py-2 shadow z-50"
          >
            {isAdmin ? adminNavList : userNavList}
            <li className="flex justify-center rounded-md">
              <DarkModeButton />
            </li>
          </ul>
        </div>
      </div>
      <hr className="max-md:hidden" />
      <div className="md:mt-8 hidden md:block">
        <ul className="flex flex-col space-y-5 list-none w-5/6 mx-auto">
          {isAdmin ? adminNavList : userNavList}
          <li className="flex justify-center rounded-md">
            <DarkModeButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;

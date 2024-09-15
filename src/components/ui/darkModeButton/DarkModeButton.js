"use client";
import { useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if ((theme = "light")) setDarkMode(false);
  }, []);

  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-[#725523] cursor-pointer rounded-full p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white dark:bg-medium w-6 h-6
      rounded-full shadow-md transform transition-transform duration-300"
        style={darkMode ? { left: "3px" } : { right: "3px" }}
      ></div>
      <BsSunFill className="ml-auto dark:text-white" />
    </div>
  );
};

export default DarkModeButton;

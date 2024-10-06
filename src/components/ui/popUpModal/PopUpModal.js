"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PopUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown before
    const popupShown = localStorage.getItem("popupShown");

    // If popup hasn't been shown, open the modal and mark it as shown
    if (!popupShown) {
      setIsOpen(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-700 mb-4">
              Get <span className="font-bold text-[#624108]">10% OFF</span> on
              your first order! Use code{" "}
              <span className="font-bold text-[#624108]">WELCOME10</span> at
              checkout.
            </p>
            <div className="flex justify-center items-center relative gap-5 mt-10">
              <Link
                href="/allProducts"
                className="buttons w-1/2"
                onClick={closeModal}
              >
                Shop Now
              </Link>
              <button
                className="flex-1 text-lg text-gray-500 underline hover:text-[#624108]"
                onClick={closeModal}
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModal;

"use client";
import useCart from "@/components/hooks/useCart";
import { AuthContext } from "@/components/provider/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [productNumber, setProductNumber] = useState("");
  const axiosPublic = useAxiosPublic();

  const selectedItem = cart.filter((cartItem) => cartItem.email === user.email);
  console.log(selectedItem);

  const navButton = (
    <>
      <Link href={"/register"}>
        <button className="btn btn-outline text-[#624108] hover:bg-[#624108] hover:text-white px-5 lg:px-20 md:px-14 sm:px-8">
          Sign up
        </button>
      </Link>
      <Link href={"/logIn"}>
        <button className="btn btn-outline text-[#624108] hover:bg-[#624108] hover:text-white px-5 lg:px-20 md:px-14 sm:px-8">
          Sign in
        </button>
      </Link>
    </>
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/cart/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Item Deleted!",
                text: "This item has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="md:flex justify-center gap-5 w-11/12 mx-auto">
      <div className="md:w-4/6 lg:py-20 sm:py-14 py-10">
        <div className="sm:flex justify-between items-center gap-8">
          <div className="md:w-3/5">
            <h1 className="max-md:text-center max-md:text-lg">
              Register now & get Free shipping
            </h1>
            <div className="flex justify-center items-center lg:my-8 md:my-7 sm:my-5 my-4 gap-4">
              {navButton}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5">
              <FaShoppingCart className="text-[#624108] text-xl" />
              <h1>Faster Delivery</h1>
            </div>
            <div className="flex items-center gap-5">
              <FaExchangeAlt className="text-[#624108] text-xl" />
              <h1>Easier returns and exchanges</h1>
            </div>
            <div className="flex items-center gap-5">
              <GoInbox className="text-[#624108] text-xl" />
              <h1>Quick order information and tracking</h1>
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold">My Cart</h1>
        <div className="border-t-2 border-solid py-8 mt-1">
          {selectedItem.length ? (
            selectedItem.map((productItem) => (
              <div
                key={productItem._id}
                className="border-b-2 border-solid rounded-md p-2 pb-5 flex justify-center bg-base-100 gap-5 shadow-lg items-center"
              >
                <Image
                  src={productItem.image}
                  alt="Product image"
                  height={100}
                  width={100}
                  className="h-32"
                />
                <div className="flex-1 flex justify-between items-center">
                  <div className="w-3/4">
                    <h1>{productItem.name}</h1>
                    <p>{productItem.category}</p>
                    <p>Available: 1</p>
                  </div>
                  <div>
                    <div>
                      <h1>Numbers of Product</h1>
                      <div className="flex justify-center items-center gap-3">
                        <AiOutlinePlusSquare className="text-3xl font-bold" />
                        <h1 className="text-2xl">{productItem.numberItem}</h1>
                        <AiOutlineMinusSquare className="text-3xl cursor-pointer" />
                      </div>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => handleDelete(productItem)}
                        className="bg-white rounded-md py-3 flex justify-center items-center gap-4 w-full border-red-600 hover:border-white text-red-600 hover:text-white hover:bg-red-600"
                      >
                        <MdDelete className="text-xl" /> DELETE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center gap-20 my-32">
              <h1 className="text-5xl text-center">Your cart is empty</h1>
              <Link href={"/allProducts"}>
                <button className="bg-[#624108] hover:bg-[#624108] text-white lg:rounded-xl rounded-md lg:px-20 md:px-14 sm:px-8 px-5 lg:py-4 sm:py-3 py-2">
                  Shop now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 bg-base-200 p-5 rounded-lg">
        <div>
          <h1>Products</h1>
          <div>
            {selectedItem.map((item, index) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                  <h1>{index + 1}</h1>
                  <h1>{item.name}</h1>
                </div>
                <h1>${item.price}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

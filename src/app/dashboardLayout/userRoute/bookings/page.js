"use client";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import "@smastrom/react-rating/style.css";
import { MdDelete } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import useCart from "@/components/hooks/useCart";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";

const UserBooking = () => {
  const axiosPublic = useAxiosPublic();
  const [cart, cartRefetch] = useCart();

  console.log(cart);

  const handleDelete = (cart) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#624108",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/cart/${cart._id}`).then((res) => {
          cartRefetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "cart Deleted!",
              text: "cart has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="lg:px-10 px-4 sm:px-6 mt-10">
      <h1 className="uppercase text-4xl font-bold text-[#624108] text-center mb-8">
        My Bookings
      </h1>
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cart?.map((cartItem) => (
            <div
              key={cartItem._id}
              className="relative rounded-xl cursor-pointer overflow-hidden w-72 max-md:w-4/5 mx-auto py-5 bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={cartItem?.image}
                  alt="cart photo"
                  width={100}
                  height={100}
                  priority
                  className="object-cover w-full h-40"
                />
              </div>
              <div className="px-5 py-2 flex flex-col z-10 relative">
                <div className="h-36">
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#624108]">
                    {cartItem?.name}
                  </h1>
                  <p className="text-lg text-[#624108]">
                    <span className="font-bold text-black">Price:</span> $
                    {cartItem?.price}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">Rating:</span>
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={cartItem?.rating}
                      readOnly
                    />
                  </div>
                  <p className="text-lg text-[#624108]">
                    <span className="font-bold text-black">Booked by: </span>
                    {cartItem?.username}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleDelete(cartItem)}
                    className="flex justify-center items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  >
                    <MdDelete size={20} /> DELETE
                  </button>
                  <Link href={`/productDetail/${cartItem.productId}`}>
                    <button className="flex justify-center items-center gap-2 px-4 py-2 text-white bg-[#725523] hover:bg-[#624108] rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
